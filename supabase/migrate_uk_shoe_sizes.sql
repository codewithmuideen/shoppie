-- One-shot migration: switch every shoe / sneaker / sandal product to UK
-- adult sizes (5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5).
-- Covers BOTH adult and kids' shoes (kids products had EU 24-32 before).
--
-- Run once in Supabase → SQL Editor → New query → Run.

update public.products
set sizes = '["5.5","6","6.5","7","7.5","8","8.5","9","9.5","10","10.5","11","11.5","12","12.5"]'::jsonb
where size_type = 'shoes'
   or subcategory in ('shoes', 'sneakers');

-- Sanity check
select id, name, category, subcategory, sizes
from public.products
where size_type = 'shoes' or subcategory in ('shoes', 'sneakers')
order by id;
