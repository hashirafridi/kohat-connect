import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ShopForm, type ShopFormValues, type HourRow } from "@/components/admin/ShopForm";
import { getShopBySlug } from "@/data/shops";

export const Route = createFileRoute("/admin/shops/$slug/edit")({
  head: () => ({
    meta: [
      { title: "Edit Shop — Admin" },
      { name: "robots", content: "noindex" },
    ],
  }),
  loader: ({ params }) => {
    const shop = getShopBySlug(params.slug);
    if (!shop) throw notFound();
    return { shop };
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
});

function parseHoursForForm(hours: { day: string; open: string }[] | undefined): HourRow[] {
  if (!hours || hours.length === 0) return [];
  return hours.map((h) => {
    const parts = h.open.split("–").map((p) => p.trim());
    return { day: h.day, open: parts[0] ?? "10:00", close: parts[1] ?? "22:00" };
  });
}

function EditShopPage() {
  const { shop } = Route.useLoaderData();

  const initial: Partial<ShopFormValues> = {
    name: shop.name,
    slug: shop.slug,
    category: shop.category,
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
    gallery: (shop.gallery ?? []).map((src, i) => ({
      name: `${shop.slug}-gallery-${i}.webp`,
      dataUrl: src,
    })),
    hours: parseHoursForForm(shop.hours),
  };

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
      <ShopForm mode="edit" initial={initial} />
    </div>
  );
}
