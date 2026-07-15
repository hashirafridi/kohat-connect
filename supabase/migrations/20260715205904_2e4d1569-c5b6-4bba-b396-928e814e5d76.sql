
ALTER TABLE public.shops
  ADD COLUMN IF NOT EXISTS subcategory text,
  ADD COLUMN IF NOT EXISTS subcategory_label text;
