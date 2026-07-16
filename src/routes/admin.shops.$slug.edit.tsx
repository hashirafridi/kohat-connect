import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ShopForm, type ShopFormValues, type HourRow } from "@/components/admin/ShopForm";
import { fetchShopBySlugWithFallback } from "@/data/shops-db";
import { updateShop } from "@/lib/shops-api";

export const Route = createFileRoute("/admin/shops/$slug/edit")({
  head: () => ({
    meta: [
      { title: "Edit Shop — Admin" },
      { name: "robots", content: "noindex" },
    ],
  }),
  loader: async ({ params }) => {
    const shop = await fetchShopBySlugWithFallback(params.slug);
    if (!shop) throw notFound();
    return { shop, originalSlug: params.slug };
  },
  component: EditShopPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-5xl px-4 py-16 text-center">
      <h1 className="text-xl font-semibold">Shop not found</h1>
      <Link to="/admin/shops" className="mt-4 inline-block text-sm text-muted-foreground hover:text-foreground">
        ← Back to shops
      </Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="mx-auto max-w-5xl px-4 py-16 text-center">
      <h1 className="text-xl font-semibold">Something went wrong</h1>
      <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
    </div>
  ),
});

function parseHoursForForm(hours: { day: string; open: string }[] | undefined): HourRow[] {
  if (!hours || hours.length === 0) return [];
  return hours.map((h) => {
    const parts = h.open.split("–").map((p) => p.trim());
    return { day: h.day, open: parts[0] ?? "10:00", close: parts[1] ?? "22:00" };
  });
}

function EditShopPage() {
  const { shop, originalSlug } = Route.useLoaderData();
  const navigate = useNavigate();
  const qc = useQueryClient();

  const initial: Partial<ShopFormValues> = {
    name: shop.name,
    slug: shop.slug,
    category: shop.category,
    subcategory: shop.subcategory ?? "",
    area: shop.area,
    tagline: shop.tagline,
    about: shop.about ?? "",
    whatsapp: shop.whatsapp,
    phone: shop.phone,
    email: shop.email ?? "",
    address: shop.address ?? "",
    established: shop.established ?? "",
    facebook: shop.facebook ?? "",
    instagram: shop.instagram ?? "",
    website: shop.website ?? "",
    featured: shop.featured ?? false,
    lat: String(shop.lat),
    lng: String(shop.lng),
    cover: { name: `${shop.slug}-cover.webp`, dataUrl: shop.image },
    gallery: (shop.gallery ?? []).map((src: string, i: number) => ({
      name: `${shop.slug}-gallery-${i}.webp`,
      dataUrl: src,
    })),
    hours: parseHoursForForm(shop.hours),
    metaTitle: shop.metaTitle ?? "",
    metaDescription: shop.metaDescription ?? "",
  };


  async function handleSubmit(values: ShopFormValues) {
    try {
      toast.loading("Saving changes…", { id: "update-shop" });
      await updateShop(originalSlug, values);
      await qc.invalidateQueries({ queryKey: ["shops"] });
      await qc.invalidateQueries({ queryKey: ["shop", originalSlug] });
      await qc.invalidateQueries({ queryKey: ["shop", values.slug] });
      toast.success("Shop updated", { id: "update-shop" });
      navigate({ to: "/admin/shops" });
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Failed to update shop";
      toast.error(msg, { id: "update-shop" });
    }
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b bg-background">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Admin</p>
            <h1 className="text-xl font-semibold">Edit shop · {shop.name}</h1>
          </div>
          <Link to="/admin/shops" className="text-sm text-muted-foreground hover:text-foreground">
            ← Back to shops
          </Link>
        </div>
      </header>
      <ShopForm mode="edit" initial={initial} onSubmit={handleSubmit} />
    </div>
  );
}
