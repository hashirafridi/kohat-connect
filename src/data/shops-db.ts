// Database-backed shop data. Falls back to fake data (from ./shops) when
// nothing has been added to the DB yet.
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { mainLabel, subLabel, findSubCategory } from "@/data/categories";
import { shops as fakeShops, type Shop } from "@/data/shops";

type ShopRow = Database["public"]["Tables"]["shops"]["Row"];
type CoordRow = Database["public"]["Tables"]["shop_coordinates"]["Row"];

export type HoursEntry = { day: string; open: string; close?: string };

function toShop(row: ShopRow, coord?: Pick<CoordRow, "lat" | "lng">): Shop {
  const hoursRaw = Array.isArray(row.hours) ? (row.hours as HoursEntry[]) : [];
  const hours = hoursRaw.map((h) => ({
    day: h.day,
    open: h.close ? `${h.open} – ${h.close}` : h.open,
  }));

  // Derive main+sub. New rows store `category` = main key, `subcategory` = sub key.
  // Older rows may have `category` set to what is really a sub-category key —
  // fall back to inferring the main from the sub taxonomy.
  let mainKey = row.category;
  let mainL = row.category_label || mainLabel(row.category);
  const subKey = row.subcategory ?? undefined;
  const subL = row.subcategory_label ?? (subKey ? subLabel(subKey) : undefined);

  const found = findSubCategory(row.category);
  if (!subKey && found) {
    // legacy row: category actually held a sub-category key
    mainKey = found.main.key;
    mainL = found.main.label;
  }

  return {
    slug: row.slug,
    name: row.name,
    category: mainKey,
    categoryLabel: mainL,
    subcategory: subKey ?? (found ? found.sub.key : undefined),
    subcategoryLabel: subL ?? (found ? found.sub.label : undefined),
    area: row.area,
    lat: coord?.lat ?? 33.5872,
    lng: coord?.lng ?? 71.4432,
    image: row.cover_image,
    whatsapp: row.whatsapp ?? "",
    phone: row.phone ?? "",
    tagline: row.tagline ?? "",
    featured: row.featured,
    email: row.email ?? undefined,
    address: row.address ?? undefined,
    established: row.established ?? undefined,
    facebook: row.facebook ?? undefined,
    instagram: row.instagram ?? undefined,
    website: row.website ?? undefined,
    hours: hours.length ? hours : undefined,
    gallery: row.gallery && row.gallery.length ? row.gallery : undefined,
    about: row.about ?? undefined,
    metaTitle: row.meta_title ?? undefined,
    metaDescription: row.meta_description ?? undefined,
  };
}


export async function fetchShopsWithFallback(): Promise<{
  shops: Shop[];
  usingFallback: boolean;
}> {
  const { data, error } = await supabase
    .from("shops")
    .select("*, shop_coordinates(lat,lng)")
    .order("created_at", { ascending: false });
  if (error) {
    console.warn("[shops-db] fetch failed, using fallback", error.message);
    return { shops: fakeShops, usingFallback: true };
  }
  if (!data || data.length === 0) {
    return { shops: fakeShops, usingFallback: true };
  }
  const mapped = data.map((row) => {
    const coord = Array.isArray(row.shop_coordinates)
      ? row.shop_coordinates[0]
      : row.shop_coordinates;
    return toShop(row as ShopRow, coord ?? undefined);
  });
  return { shops: mapped, usingFallback: false };
}

export async function fetchShopBySlugWithFallback(slug: string) {
  const { data, error } = await supabase
    .from("shops")
    .select("*, shop_coordinates(lat,lng)")
    .eq("slug", slug)
    .maybeSingle();
  if (error) {
    console.warn("[shops-db] fetch by slug failed", error.message);
  }
  if (data) {
    const coord = Array.isArray(data.shop_coordinates)
      ? data.shop_coordinates[0]
      : data.shop_coordinates;
    return toShop(data as ShopRow, coord ?? undefined);
  }
  return fakeShops.find((s) => s.slug === slug);
}
