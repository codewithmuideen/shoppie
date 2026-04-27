-- One-shot migration: switch every adult shoe product to UK sizes
-- (5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5).
--
-- Kids shoes (subcategory 'shoes' but size_type 'kids') keep their own scale.
--
-- Run once in Supabase → SQL Editor → New query → Run.

update public.products
set sizes = '["5.5","6","6.5","7","7.5","8","8.5","9","9.5","10","10.5","11","11.5","12","12.5"]'::jsonb
where size_type = 'shoes';

-- Sanity check
select id, name, category, sizes
from public.products
where size_type = 'shoes'
order by id;
