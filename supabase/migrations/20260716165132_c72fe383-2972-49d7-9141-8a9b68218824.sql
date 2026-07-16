alter table public.shops
  add column if not exists meta_title text,
  add column if not exists meta_description text;