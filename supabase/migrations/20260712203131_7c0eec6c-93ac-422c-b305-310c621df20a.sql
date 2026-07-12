
-- Shops table
CREATE TABLE public.shops (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  category text NOT NULL,
  category_label text NOT NULL,
  area text NOT NULL,
  tagline text NOT NULL DEFAULT '',
  about text,
  whatsapp text NOT NULL DEFAULT '',
  phone text NOT NULL DEFAULT '',
  email text,
  address text,
  established text,
  facebook text,
  instagram text,
  website text,
  featured boolean NOT NULL DEFAULT false,
  cover_image text NOT NULL,
  gallery text[] NOT NULL DEFAULT '{}',
  hours jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.shops TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.shops TO authenticated;
GRANT ALL ON public.shops TO service_role;

ALTER TABLE public.shops ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read shops" ON public.shops FOR SELECT USING (true);
CREATE POLICY "Anyone can insert shops (no admin auth yet)" ON public.shops FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update shops (no admin auth yet)" ON public.shops FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Anyone can delete shops (no admin auth yet)" ON public.shops FOR DELETE USING (true);

-- Coordinates table (separate so map queries can be cheap)
CREATE TABLE public.shop_coordinates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  shop_id uuid NOT NULL UNIQUE REFERENCES public.shops(id) ON DELETE CASCADE,
  lat double precision NOT NULL,
  lng double precision NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.shop_coordinates TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.shop_coordinates TO authenticated;
GRANT ALL ON public.shop_coordinates TO service_role;

ALTER TABLE public.shop_coordinates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read shop coordinates" ON public.shop_coordinates FOR SELECT USING (true);
CREATE POLICY "Anyone can insert shop coordinates (no admin auth yet)" ON public.shop_coordinates FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update shop coordinates (no admin auth yet)" ON public.shop_coordinates FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Anyone can delete shop coordinates (no admin auth yet)" ON public.shop_coordinates FOR DELETE USING (true);

-- updated_at trigger
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER shops_set_updated_at
BEFORE UPDATE ON public.shops
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER shop_coordinates_set_updated_at
BEFORE UPDATE ON public.shop_coordinates
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX shops_category_idx ON public.shops(category);
CREATE INDEX shops_area_idx ON public.shops(area);
CREATE INDEX shops_featured_idx ON public.shops(featured);
CREATE INDEX shops_created_at_idx ON public.shops(created_at DESC);

-- Storage policies for the shop-images bucket (private bucket + public read policy)
CREATE POLICY "Public can read shop images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'shop-images');

CREATE POLICY "Anyone can upload shop images (no admin auth yet)"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'shop-images');

CREATE POLICY "Anyone can update shop images (no admin auth yet)"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'shop-images')
  WITH CHECK (bucket_id = 'shop-images');

CREATE POLICY "Anyone can delete shop images (no admin auth yet)"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'shop-images');
