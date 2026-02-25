-- ================================================================
-- Beyond Peptides – Admin panel migration
-- Run this in Supabase SQL Editor
-- ================================================================

-- 1) Create storage bucket for product images
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- 2) Storage policies – anyone can read, only authenticated can upload/delete
CREATE POLICY "Public read product-images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'product-images');

CREATE POLICY "Auth upload product-images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'product-images');

CREATE POLICY "Auth update product-images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'product-images');

CREATE POLICY "Auth delete product-images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'product-images');

-- 3) Products – authenticated users can INSERT/UPDATE/DELETE
CREATE POLICY "Auth insert products"
  ON products FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Auth update products"
  ON products FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Auth delete products"
  ON products FOR DELETE TO authenticated USING (true);

-- 4) Product details – authenticated users can INSERT/UPDATE/DELETE
CREATE POLICY "Auth insert product_details"
  ON product_details FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Auth update product_details"
  ON product_details FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Auth delete product_details"
  ON product_details FOR DELETE TO authenticated USING (true);

-- 5) Orders – authenticated users can update status
CREATE POLICY "Auth update orders"
  ON orders FOR UPDATE TO authenticated USING (true);
