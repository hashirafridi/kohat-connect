import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  Phone,
  MessageCircle,
  Facebook,
  Mail,
  MapPin,
  ArrowLeft,
  ArrowRight,
  Share2,
  Star,
  Clock,
  Tag,
} from "lucide-react";
import { shops, type Shop } from "@/data/shops";
import { socials } from "@/data/home";

export const Route = createFileRoute("/shops/$slug")({
  loader: ({ params }) => {
    const shop = shops.find((s) => s.slug === params.slug);
    if (!shop) throw notFound();
    const related = shops
      .filter((s) => s.slug !== shop.slug && s.category === shop.category)
      .slice(0, 3);
    return { shop, related };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Shop not found — Kohat Shops" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { shop } = loaderData;
    const title = `${shop.name} — ${shop.categoryLabel} in ${shop.area}, Kohat`;
    const description = `${shop.tagline} Located at ${shop.area}, Kohat. Call or WhatsApp directly.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: shop.name },
        { property: "og:description", content: description },
        { property: "og:image", content: shop.image },
        { property: "og:type", content: "business.business" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: shop.image },
      ],
    };
  },
  notFoundComponent: ShopNotFound,
  errorComponent: ShopError,
  component: ShopDetailPage,
});

function ShopDetailPage() {
  const { shop, related } = Route.useLoaderData();
  const waLink = `https://wa.me/${shop.whatsapp.replace(/\D/g, "")}`;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopBar />

      {/* Breadcrumb */}
      <div className="border-b border-border bg-secondary/30">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-6 py-3 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-primary">
            Home
          </Link>
          <span>/</span>
          <Link to="/shops" className="hover:text-primary">
            Shops
          </Link>
          <span>/</span>
          <Link
            to="/shops"
            search={{ q: "", category: shop.category, area: "", sort: "featured" }}
            className="hover:text-primary"
          >
            {shop.categoryLabel}
          </Link>
          <span>/</span>
          <span className="text-foreground">{shop.name}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="relative overflow-hidden rounded-sm border border-border bg-card">
                <img
                  src={shop.image}
                  alt={shop.name}
                  width={1400}
                  height={1000}
                  className="aspect-[4/3] w-full object-cover"
                />
                <span className="absolute left-4 top-4 rounded-sm bg-background/95 px-2.5 py-1 text-xs font-medium uppercase tracking-wider text-foreground">
                  {shop.categoryLabel}
                </span>
                {shop.featured && (
                  <span className="absolute right-4 top-4 rounded-sm bg-accent px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-accent-foreground">
                    Featured
                  </span>
                )}
              </div>
            </div>

            <div className="lg:col-span-5">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {shop.categoryLabel}
              </p>
              <h1 className="mt-2 font-display text-3xl font-semibold leading-tight sm:text-4xl">
                {shop.name}
              </h1>
              <p className="mt-3 flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {shop.area}, Kohat
              </p>
              <p className="mt-5 text-base leading-relaxed text-foreground/90">
                {shop.tagline}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-2">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-sm bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </a>
                <a
                  href={`tel:${shop.phone}`}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-sm border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground transition hover:border-primary/40 hover:text-primary"
                >
                  <Phone className="h-4 w-4" />
                  Call
                </a>
                <ShareButton name={shop.name} />
              </div>

              <dl className="mt-8 grid grid-cols-2 gap-3 border-t border-border pt-6 text-sm">
                <InfoRow icon={<Tag className="h-4 w-4" />} label="Category" value={shop.categoryLabel} />
                <InfoRow icon={<MapPin className="h-4 w-4" />} label="Area" value={shop.area} />
                <InfoRow icon={<Phone className="h-4 w-4" />} label="Phone" value={shop.phone} />
                <InfoRow icon={<Clock className="h-4 w-4" />} label="Hours" value="10:00 AM – 10:00 PM" />
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* About + Sidebar */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              About
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold sm:text-3xl">
              About {shop.name}
            </h2>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-foreground/85">
              <p>
                {shop.name} is a well-known {shop.categoryLabel.toLowerCase()} located
                on {shop.area}, serving customers across Kohat. {shop.tagline}
              </p>
              <p>
                Walk in during business hours or reach out on WhatsApp for orders,
                pricing and availability. Family-run and community-trusted.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Highlight icon={<Star className="h-4 w-4" />} title="Trusted locally" body="Listed in the Kohat directory." />
              <Highlight icon={<MessageCircle className="h-4 w-4" />} title="Direct contact" body="No middleman — reach the shop." />
              <Highlight icon={<MapPin className="h-4 w-4" />} title="Easy to find" body={`${shop.area}, Kohat.`} />
            </div>
          </div>

          <aside className="lg:col-span-4">
            <div className="sticky top-6 rounded-sm border border-border bg-card p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Get in touch
              </p>
              <p className="mt-2 font-display text-xl font-semibold">
                Contact {shop.name}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Message on WhatsApp for the fastest reply.
              </p>
              <div className="mt-5 space-y-2">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between gap-3 rounded-sm border border-border bg-background px-3 py-2.5 text-sm hover:border-primary/40 hover:text-primary"
                >
                  <span className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </span>
                  <span className="text-muted-foreground">{shop.whatsapp}</span>
                </a>
                <a
                  href={`tel:${shop.phone}`}
                  className="flex items-center justify-between gap-3 rounded-sm border border-border bg-background px-3 py-2.5 text-sm hover:border-primary/40 hover:text-primary"
                >
                  <span className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Phone
                  </span>
                  <span className="text-muted-foreground">{shop.phone}</span>
                </a>
                <div className="flex items-center justify-between gap-3 rounded-sm border border-border bg-background px-3 py-2.5 text-sm">
                  <span className="flex items-center gap-2 text-foreground">
                    <MapPin className="h-4 w-4" />
                    Location
                  </span>
                  <span className="text-muted-foreground">{shop.area}</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-border bg-secondary/30">
          <div className="mx-auto max-w-7xl px-6 py-14">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Related
                </p>
                <h2 className="mt-2 font-display text-2xl font-semibold sm:text-3xl">
                  More {shop.categoryLabel.toLowerCase()} in Kohat
                </h2>
              </div>
              <Link
                to="/shops"
                search={{ q: "", category: shop.category, area: "", sort: "featured" }}
                className="hidden items-center gap-2 text-sm font-medium text-primary hover:underline sm:inline-flex"
              >
                See all
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((s) => (
                <RelatedCard key={s.slug} shop={s} />
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="mx-auto max-w-7xl px-6 pb-14 pt-8">
        <Link
          to="/shops"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all shops
        </Link>
      </div>

      <Footer />
    </div>
  );
}

/* ------------ Sub-components ------------ */

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div>
      <dt className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-muted-foreground">
        {icon}
        {label}
      </dt>
      <dd className="mt-1 text-sm font-medium text-foreground">{value}</dd>
    </div>
  );
}

function Highlight({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="rounded-sm border border-border bg-card p-4">
      <div className="flex items-center gap-2 text-primary">{icon}<span className="text-sm font-semibold text-foreground">{title}</span></div>
      <p className="mt-1.5 text-sm text-muted-foreground">{body}</p>
    </div>
  );
}

function ShareButton({ name }: { name: string }) {
  return (
    <button
      onClick={async () => {
        const url = typeof window !== "undefined" ? window.location.href : "";
        if (typeof navigator !== "undefined" && navigator.share) {
          try {
            await navigator.share({ title: name, url });
            return;
          } catch {
            /* ignore */
          }
        }
        if (typeof navigator !== "undefined" && navigator.clipboard) {
          await navigator.clipboard.writeText(url);
        }
      }}
      className="inline-flex items-center justify-center gap-2 rounded-sm border border-border bg-card px-3 py-2.5 text-sm font-medium text-foreground transition hover:border-primary/40 hover:text-primary"
      aria-label="Share shop"
    >
      <Share2 className="h-4 w-4" />
    </button>
  );
}

function RelatedCard({ shop: s }: { shop: Shop }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-sm border border-border bg-card transition hover:-translate-y-1 hover:shadow-[0_18px_40px_-20px_oklch(0.22_0.03_45_/_0.35)]">
      <Link
        to="/shops/$slug"
        params={{ slug: s.slug }}
        className="relative block overflow-hidden"
      >
        <img
          src={s.image}
          alt={s.name}
          width={800}
          height={600}
          loading="lazy"
          className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-sm bg-background/95 px-2.5 py-1 text-xs font-medium uppercase tracking-wider text-foreground">
          {s.categoryLabel}
        </span>
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <Link
          to="/shops/$slug"
          params={{ slug: s.slug }}
          className="font-display text-lg font-semibold text-foreground transition hover:text-primary"
        >
          {s.name}
        </Link>
        <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />
          {s.area}
        </p>
        <p className="text-sm text-muted-foreground">{s.tagline}</p>
      </div>
    </article>
  );
}

function TopBar() {
  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-baseline gap-2">
          <span className="font-display text-2xl font-semibold tracking-tight text-foreground">
            Kohat<span className="text-primary">Shops</span>
          </span>
          <span className="font-urdu text-lg text-muted-foreground">کوہاٹ</span>
        </Link>
        <nav className="flex items-center gap-2">
          <Link
            to="/shops"
            className="rounded-sm border border-border px-3 py-2 text-sm font-medium text-foreground transition hover:border-primary/40 hover:text-primary"
          >
            All shops
          </Link>
          <a
            href={socials.facebook}
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
            className="rounded-sm border border-border p-2 text-muted-foreground transition hover:border-primary/40 hover:text-primary"
          >
            <Facebook className="h-4 w-4" />
          </a>
          <a
            href={`mailto:${socials.contactEmail}`}
            aria-label="Contact"
            className="rounded-sm border border-border p-2 text-muted-foreground transition hover:border-primary/40 hover:text-primary"
          >
            <Mail className="h-4 w-4" />
          </a>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-[oklch(0.22_0.03_45)] text-primary-foreground">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-2 px-6 py-6 text-xs text-primary-foreground/70 sm:flex-row sm:items-center">
        <p>© {new Date().getFullYear()} Kohat Shops. Built for the city.</p>
        <p className="font-urdu text-sm" dir="rtl">
          کوہاٹ سے، کوہاٹ کے لیے
        </p>
      </div>
    </footer>
  );
}

function ShopNotFound() {
  const { slug } = Route.useParams();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopBar />
      <section className="mx-auto max-w-3xl px-6 py-24 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          404
        </p>
        <h1 className="mt-2 font-display text-4xl font-semibold">
          Shop not found
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          We couldn't find a shop with the slug "{slug}".
        </p>
        <Link
          to="/shops"
          className="mt-8 inline-flex items-center gap-2 rounded-sm bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          <ArrowLeft className="h-4 w-4" />
          Browse all shops
        </Link>
      </section>
      <Footer />
    </div>
  );
}

function ShopError({ reset }: { reset: () => void }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopBar />
      <section className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="font-display text-3xl font-semibold">Something went wrong</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          We couldn't load this shop. Please try again.
        </p>
        <button
          onClick={reset}
          className="mt-6 inline-flex items-center gap-2 rounded-sm bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Retry
        </button>
      </section>
      <Footer />
    </div>
  );
}
