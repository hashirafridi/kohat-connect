-- Add index for subcategory filtering and ensure NOT NULL defaults for consistency
CREATE INDEX IF NOT EXISTS shops_subcategory_idx ON public.shops(subcategory);
CREATE INDEX IF NOT EXISTS shops_category_subcategory_idx ON public.shops(category, subcategory);