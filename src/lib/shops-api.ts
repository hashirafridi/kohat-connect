// Client-side CRUD + storage helpers for shops. No auth required (yet) —
// RLS policies allow anon writes; tighten once an admin role is added.
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import type { WebpImage, ShopFormValues } from "@/components/admin/ShopForm";
import { mainLabel, subLabel } from "@/data/categories";

const BUCKET = "shop-images";

type ShopInsert = Database["public"]["Tables"]["shops"]["Insert"];
type ShopUpdate = Database["public"]["Tables"]["shops"]["Update"];

async function uploadWebp(image: WebpImage, path: string): Promise<string> {
  if (!image.blob) {
    // No blob means it's an existing image URL — just return it.
    return image.dataUrl;
  }
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, image.blob, {
      contentType: "image/webp",
      upsert: true,
      cacheControl: "3600",
    });
  if (error) throw new Error(`Upload failed: ${error.message}`);
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

async function uploadShopImages(slug: string, values: ShopFormValues) {
  const stamp = Date.now();
  const coverUrl = values.cover
    ? await uploadWebp(values.cover, `shops/${slug}/cover-${stamp}.webp`)
    : "";
  const galleryUrls: string[] = [];
  for (let i = 0; i < values.gallery.length; i++) {
    const url = await uploadWebp(
      values.gallery[i],
      `shops/${slug}/gallery-${stamp}-${i}.webp`,
    );
    galleryUrls.push(url);
  }
  return { coverUrl, galleryUrls };
}

function baseFromValues(values: ShopFormValues, coverUrl: string, galleryUrls: string[]) {
  return {
    slug: values.slug,
    name: values.name,
    category: values.category,
    category_label: mainLabel(values.category),
    subcategory: values.subcategory || null,
    subcategory_label: values.subcategory ? subLabel(values.subcategory) : null,
    area: values.area,
    tagline: values.tagline,
    about: values.about || null,
    whatsapp: values.whatsapp,
    phone: values.phone,
    email: values.email || null,
    address: values.address || null,
    established: values.established || null,
    facebook: values.facebook || null,
    instagram: values.instagram || null,
    website: values.website || null,
    featured: values.featured,
    cover_image: coverUrl,
    gallery: galleryUrls,
    hours: values.hours,
  };
}

export async function createShop(values: ShopFormValues) {
  const slug = values.slug.trim();
  if (!slug) throw new Error("Slug is required");
  const { coverUrl, galleryUrls } = await uploadShopImages(slug, values);
  const insert: ShopInsert = baseFromValues(values, coverUrl, galleryUrls) as ShopInsert;

  const { data: shop, error } = await supabase
    .from("shops")
    .insert(insert)
    .select("id, slug")
    .single();
  if (error) throw new Error(error.message);

  const { error: coordErr } = await supabase.from("shop_coordinates").insert({
    shop_id: shop.id,
    lat: parseFloat(values.lat),
    lng: parseFloat(values.lng),
  });
  if (coordErr) throw new Error(`Coordinates: ${coordErr.message}`);

  return shop;
}

export async function updateShop(originalSlug: string, values: ShopFormValues) {
  const slug = values.slug.trim() || originalSlug;
  const { coverUrl, galleryUrls } = await uploadShopImages(slug, values);
  const update: ShopUpdate = baseFromValues(values, coverUrl, galleryUrls) as ShopUpdate;

  const { data: shop, error } = await supabase
    .from("shops")
    .update(update)
    .eq("slug", originalSlug)
    .select("id, slug")
    .single();
  if (error) throw new Error(error.message);

  const { error: coordErr } = await supabase.from("shop_coordinates").upsert(
    {
      shop_id: shop.id,
      lat: parseFloat(values.lat),
      lng: parseFloat(values.lng),
    },
    { onConflict: "shop_id" },
  );
  if (coordErr) throw new Error(`Coordinates: ${coordErr.message}`);

  return shop;
}

export async function deleteShop(slug: string) {
  // Get shop id + gallery/cover to clean up storage
  const { data: shop, error: fetchErr } = await supabase
    .from("shops")
    .select("id, cover_image, gallery")
    .eq("slug", slug)
    .single();
  if (fetchErr) throw new Error(fetchErr.message);

  // Delete coordinates first (FK)
  const { error: coordErr } = await supabase
    .from("shop_coordinates")
    .delete()
    .eq("shop_id", shop.id);
  if (coordErr) throw new Error(`Coordinates: ${coordErr.message}`);

  // Delete shop row
  const { error: delErr } = await supabase.from("shops").delete().eq("id", shop.id);
  if (delErr) throw new Error(delErr.message);

  // Best-effort storage cleanup — collect paths from public URLs
  const urls: string[] = [shop.cover_image, ...(shop.gallery ?? [])].filter(Boolean);
  const prefix = `/storage/v1/object/public/${BUCKET}/`;
  const paths = urls
    .map((u) => {
      const i = u.indexOf(prefix);
      return i === -1 ? null : u.slice(i + prefix.length);
    })
    .filter((p): p is string => !!p);
  if (paths.length > 0) {
    await supabase.storage.from(BUCKET).remove(paths);
  }

  return { id: shop.id };
}
