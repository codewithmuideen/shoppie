-- ─────────────────────────────────────────────────────────────────────────────
-- 0528creatives inc. — Supabase schema
--
-- Run this once in the Supabase SQL editor (Dashboard → SQL → New query).
-- It creates the products table, RLS policies, the realtime publication
-- and the public Storage bucket for admin-uploaded imagery.
-- ─────────────────────────────────────────────────────────────────────────────

-- ── 1. PRODUCTS TABLE ────────────────────────────────────────────────────────
create table if not exists public.products (
  id            text        primary key,
  name          text        not null,
  brand         text,
  category      text        not null,         -- 'men' | 'women' | 'kids'
  subcategory   text,                         -- 'shoes' | 'bags' | 'jeans' | etc.
  description   text,
  price         numeric     not null default 0,
  size_type     text        default 'clothing', -- clothing | shoes | kids
  sizes         jsonb       default '[]'::jsonb,
  variants      jsonb       default '[]'::jsonb, -- [{color, hex, images:[url, …]}]
  new_in        boolean     default false,
  featured      boolean     default false,
  best_seller   boolean     default false,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

create index if not exists products_category_idx    on public.products (category);
create index if not exists products_subcategory_idx on public.products (subcategory);
create index if not exists products_created_at_idx  on public.products (created_at desc);

-- Trigger to maintain updated_at
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at := now(); return new; end $$;

drop trigger if exists products_touch_updated_at on public.products;
create trigger products_touch_updated_at
  before update on public.products
  for each row execute procedure public.touch_updated_at();

-- ── 2. ROW LEVEL SECURITY ────────────────────────────────────────────────────
alter table public.products enable row level security;

-- Anyone (even anon) can read the catalogue
drop policy if exists "products_select" on public.products;
create policy "products_select"
  on public.products for select
  using (true);

-- Authenticated users can write. (The /admin panel will sign in to Supabase.)
drop policy if exists "products_insert" on public.products;
create policy "products_insert"
  on public.products for insert
  to authenticated
  with check (true);

drop policy if exists "products_update" on public.products;
create policy "products_update"
  on public.products for update
  to authenticated
  using (true) with check (true);

drop policy if exists "products_delete" on public.products;
create policy "products_delete"
  on public.products for delete
  to authenticated
  using (true);

-- ── 3. REALTIME ──────────────────────────────────────────────────────────────
-- Adds the table to the supabase_realtime publication so insert/update/delete
-- events stream to subscribers via channels.
alter publication supabase_realtime add table public.products;

-- ── 4. STORAGE BUCKET FOR PRODUCT IMAGES ─────────────────────────────────────
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

-- NOTE: do NOT add a public SELECT policy on storage.objects for this bucket.
-- The bucket is marked `public = true`, which means anyone can fetch a file
-- by its exact URL (`…/object/public/product-images/…`). A SELECT policy
-- here would also enable anonymous LISTING of every file in the bucket,
-- which we don't want. Supabase's security advisor flags this.
--
-- If you previously ran an earlier version of this schema that added
-- "product_images_read", drop it:
drop policy if exists "product_images_read" on storage.objects;

-- Authenticated users can upload / update / delete inside the bucket
drop policy if exists "product_images_insert" on storage.objects;
create policy "product_images_insert"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'product-images');

drop policy if exists "product_images_update" on storage.objects;
create policy "product_images_update"
  on storage.objects for update to authenticated
  using (bucket_id = 'product-images');

drop policy if exists "product_images_delete" on storage.objects;
create policy "product_images_delete"
  on storage.objects for delete to authenticated
  using (bucket_id = 'product-images');
