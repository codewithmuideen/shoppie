# Supabase Setup — 0528creatives inc.

This storefront is wired so that:

- If `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY` are present → the app reads from / writes to your Supabase project, with realtime updates pushed to every open browser.
- If they're missing → the app falls back to `localStorage` (single-device only).

Follow the steps below once. After that, every product change you make in the
admin panel propagates instantly to every visitor — on any host (Vercel,
GoDaddy cPanel, anywhere).

---

## 1. Create the Supabase project

1. Go to https://supabase.com → **New Project**
2. Pick a name (e.g. `0528creatives`) and a region close to your customers
3. Save the database password somewhere safe

## 2. Run the schema

1. In your project dashboard → **SQL Editor → New query**
2. Open `supabase/schema.sql` from this repo, copy its full contents into the editor
3. Click **Run**. You should see "Success".

This creates:
- The `products` table with realtime enabled
- Row Level Security policies (public read, authenticated write)
- A public `product-images` Storage bucket

## 3. Create the admin user

1. Dashboard → **Authentication → Users → Add user → Create new user**
2. Email: any email you control (e.g. `admin@0528creatives.com`)
3. Password: pick a strong one
4. Click **Create user**

The /admin panel will sign in with this email + password.

## 4. Grab your env vars

Dashboard → **Project Settings → API**:
- `Project URL` → `VITE_SUPABASE_URL`
- `anon public` key → `VITE_SUPABASE_ANON_KEY`

Then locally:
```
cp .env.example .env
# fill in VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY, VITE_ADMIN_PASSWORD
npm run dev
```

## 5. Deploy with the env vars

### Vercel
- Project → **Settings → Environment Variables**
- Add `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_ADMIN_PASSWORD`
- Trigger a redeploy (push a commit, or **Deployments → ⋯ → Redeploy**)

### GoDaddy cPanel (static hosting)
- After `npm run build`, the `dist/` folder contains the compiled site with env
  vars baked in at build time. Upload `dist/` contents to `public_html/`.
- If you change env vars later, you must rebuild and re-upload.

## 6. Migrate the seed catalogue (one-time)

The first time you log in to /admin with Supabase configured, you'll see an
**"Import seed catalogue"** banner. Click it once and the 47 seed products are
copied into your Supabase table. After that, you manage everything from the
admin dashboard.

---

## How the realtime sync works

Every visitor's browser opens a websocket to Supabase via the realtime channel
`products-changes`. When you create/edit/delete a product from any device,
Supabase broadcasts the change → every open tab updates within ~200ms. No
refresh needed.

## What's safe to expose

The **anon key** is safe in your client bundle — RLS policies on the products
table allow `select` for everyone and `insert/update/delete` only for
authenticated users. The **service_role** key must NEVER be in `.env`.

## Troubleshooting

- **"Loading…" forever** → check browser console. If you see a Supabase 401, the
  anon key is wrong.
- **Edits don't propagate** → ensure step 2's `alter publication supabase_realtime add table public.products` ran successfully.
- **Image uploads fail** → ensure the `product-images` bucket exists and is set
  to public.
