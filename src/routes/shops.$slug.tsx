import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Globe,
  Clock,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Share2,
  Star,
  BadgeCheck,
} from "lucide-react";
import { getShopBySlug, shops } from "@/data/shops";
import { socials } from "@/data/home";

export const Route = createFileRoute("/shops/$slug")({
  loader: ({ params }) => {
    const shop = getShopBySlug(params.slug);
    if (!shop) throw notFound();
    return { shop };
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
    const description = `${shop.tagline} Contact ${shop.name} on ${shop.area}, Kohat.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: shop.name },
        { property: "og:description", content: description },
        { property: "og:type", content: "business.business" },
      ],
    };
  },
  notFoundComponent: ShopNotFound,
  errorComponent: ({ error }) => (
    <div className="mx-auto max-w-xl px-6 py-24 text-center">
      <h1 className="font-display text-2xl">Something went wrong</h1>
      <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
      <Link to="/shops" className="mt-6 inline-block text-primary hover:underline">
        Back to all shops
      </Link>
    </div>
  ),
  component: ShopDetailPage,
});

function ShopNotFound() {
  return (
    <div className="mx-auto max-w-xl px-6 py-24 text-center">
      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">404</p>
      <h1 className="mt-3 font-display text-3xl font-semibold">Shop not found</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        The listing you are looking for isn't in the directory yet.
      </p>
      <Link
        to="/shops"
        className="mt-6 inline-flex items-center gap-2 rounded-sm bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
      >
        Browse all shops
      </Link>
    </div>
  );
}

function ShopDetailPage() {
  const { shop } = Route.useLoaderData();
  const [activeIdx, setActiveIdx] = useState(0);

  const related = shops
    .filter((s) => s.category === shop.category && s.slug !== shop.slug)
    .slice(0, 3);

  const mapQuery = encodeURIComponent(`${shop.name}, ${shop.address}`);
  const mapEmbed = `https://www.google.com/maps?q=${mapQuery}&output=embed`;
  const mapLink = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;
  const waNumber = shop.whatsapp.replace(/[^0-9]/g, "");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopBar />

      {/* Breadcrumb */}
      <div className="border-b border-border bg-secondary/30">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-6 py-3 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link to="/shops" className="hover:text-primary">Shops</Link>
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

      {/* Hero: banner left, contact + map right */}
      <section className="mx-auto max-w-7xl px-6 pt-8">
        <Link
          to="/shops"
          className="mb-5 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all shops
        </Link>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Banner */}
          <div className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-sm border border-border bg-card">
              <img
                src={shop.image}
                alt={shop.name}
                className="aspect-[4/3] w-full object-cover lg:aspect-[16/11]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-sm bg-background/95 px-2.5 py-1 text-xs font-medium uppercase tracking-wider text-foreground">
                    {shop.categoryLabel}
                  </span>
                  {shop.featured && (
                    <span className="inline-flex items-center gap-1 rounded-sm bg-accent px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-accent-foreground">
                      <BadgeCheck className="h-3 w-3" />
                      Featured
                    </span>
                  )}
                  <span className="rounded-sm bg-background/95 px-2.5 py-1 text-xs font-medium text-foreground">
                    {shop.established}
                  </span>
                </div>
                <h1 className="mt-3 font-display text-3xl font-semibold text-white sm:text-4xl lg:text-5xl">
                  {shop.name}
                </h1>
                <p className="mt-2 max-w-xl text-sm text-white/80 sm:text-base">
                  {shop.tagline}
                </p>
                <div className="mt-3 flex items-center gap-4 text-xs text-white/80">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" />
                    {shop.area}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-accent text-accent" />
                    ))}
                    <span className="ml-1 text-white/70">4.8 · 120+ visits</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact + map */}
          <aside className="lg:col-span-5">
            <div className="flex h-full flex-col gap-4">
              {/* Map */}
              <div className="overflow-hidden rounded-sm border border-border bg-card">
                <iframe
                  title={`${shop.name} location`}
                  src={mapEmbed}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-56 w-full border-0"
                />
                <a
                  href={mapLink}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between border-t border-border px-4 py-3 text-sm hover:bg-secondary"
                >
                  <span className="inline-flex items-center gap-2 text-foreground">
                    <MapPin className="h-4 w-4 text-primary" />
                    Open in Google Maps
                  </span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </a>
              </div>

              {/* Contact card */}
              <div className="rounded-sm border border-border bg-card p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Get in touch
                </p>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <a
                    href={`tel:${shop.phone}`}
                    className="inline-flex items-center justify-center gap-2 rounded-sm bg-primary px-3 py-2.5 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
                  >
                    <Phone className="h-4 w-4" />
                    Call
                  </a>
                  <a
                    href={`https://wa.me/${waNumber}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-sm bg-[#25D366] px-3 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </a>
                </div>
                <ul className="mt-5 space-y-3 text-sm">
                  <ContactRow icon={<Phone className="h-4 w-4" />} label="Phone" value={shop.phone} href={`tel:${shop.phone}`} />
                  <ContactRow icon={<Mail className="h-4 w-4" />} label="Email" value={shop.email} href={`mailto:${shop.email}`} />
                  <ContactRow icon={<MapPin className="h-4 w-4" />} label="Address" value={shop.address} />
                </ul>

                <div className="mt-5 flex items-center gap-2 border-t border-border pt-4">
                  {shop.facebook && (
                    <SocialIcon href={shop.facebook} label="Facebook">
                      <Facebook className="h-4 w-4" />
                    </SocialIcon>
                  )}
                  {shop.instagram && (
                    <SocialIcon href={shop.instagram} label="Instagram">
                      <Instagram className="h-4 w-4" />
                    </SocialIcon>
                  )}
                  {shop.website && (
                    <SocialIcon href={shop.website} label="Website">
                      <Globe className="h-4 w-4" />
                    </SocialIcon>
                  )}
                  <button
                    onClick={() => {
                      if (typeof navigator !== "undefined" && navigator.share) {
                        navigator.share({ title: shop.name, url: window.location.href }).catch(() => {});
                      } else if (typeof navigator !== "undefined") {
                        navigator.clipboard?.writeText(window.location.href);
                      }
                    }}
                    className="ml-auto inline-flex items-center gap-1.5 rounded-sm border border-border px-2.5 py-1.5 text-xs text-muted-foreground hover:border-primary/40 hover:text-primary"
                  >
                    <Share2 className="h-3.5 w-3.5" />
                    Share
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Gallery */}
      <section className="mx-auto mt-16 max-w-7xl px-6">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Gallery</p>
            <h2 className="mt-1 font-display text-2xl font-semibold">Inside {shop.name}</h2>
          </div>
          <div className="hidden gap-2 sm:flex">
            <GalleryBtn
              onClick={() => setActiveIdx((i) => (i - 1 + shop.gallery.length) % shop.gallery.length)}
              aria="Previous image"
            >
              <ChevronLeft className="h-4 w-4" />
            </GalleryBtn>
            <GalleryBtn
              onClick={() => setActiveIdx((i) => (i + 1) % shop.gallery.length)}
              aria="Next image"
            >
              <ChevronRight className="h-4 w-4" />
            </GalleryBtn>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="relative overflow-hidden rounded-sm border border-border bg-card md:col-span-2">
            <img
              src={shop.gallery[activeIdx]}
              alt={`${shop.name} photo ${activeIdx + 1}`}
              className="aspect-[16/10] w-full object-cover"
            />
            <div className="absolute bottom-3 right-3 rounded-sm bg-background/90 px-2 py-1 text-xs text-foreground">
              {activeIdx + 1} / {shop.gallery.length}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 md:grid-cols-2">
            {shop.gallery.map((img: string, i: number) => (
              <button
                key={i}
                onClick={() => setActiveIdx(i)}
                className={`relative overflow-hidden rounded-sm border transition ${
                  i === activeIdx
                    ? "border-primary ring-2 ring-primary/30"
                    : "border-border hover:border-primary/40"
                }`}
              >
                <img src={img} alt="" className="aspect-square w-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="mx-auto mt-16 max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">About</p>
            <h2 className="mt-1 font-display text-2xl font-semibold">
              About {shop.name}
            </h2>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
              {shop.about}
            </p>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <StatCard label="Category" value={shop.categoryLabel} />
              <StatCard label="Area" value={shop.area} />
              <StatCard label="Since" value={shop.established} />
            </div>

            <div className="mt-10">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                What people come for
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {["Fresh daily", "Home delivery", "Card accepted", "Family seating", "Parking"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="rounded-sm border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground"
                    >
                      {tag}
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>

          <aside className="lg:col-span-4">
            <div className="rounded-sm border border-border bg-card p-5">
              <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                Opening hours
              </p>
              <ul className="mt-4 divide-y divide-border text-sm">
                {shop.hours.map((h: { day: string; open: string }) => (
                  <li key={h.day} className="flex items-center justify-between py-2.5">
                    <span className="text-muted-foreground">{h.day}</span>
                    <span className="font-medium text-foreground">{h.open}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="mx-auto mt-20 max-w-7xl px-6">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                More like this
              </p>
              <h2 className="mt-1 font-display text-2xl font-semibold">
                Other {shop.categoryLabel.toLowerCase()} in Kohat
              </h2>
            </div>
            <Link
              to="/shops"
              search={{ q: "", category: shop.category, area: "", sort: "featured" }}
              className="hidden text-sm text-primary hover:underline sm:inline"
            >
              See all →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                to="/shops/$slug"
                params={{ slug: r.slug }}
                className="group overflow-hidden rounded-sm border border-border bg-card transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={r.image}
                    alt={r.name}
                    className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">
                    {r.categoryLabel} · {r.area}
                  </p>
                  <p className="mt-1 font-display text-lg font-semibold">{r.name}</p>
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{r.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}

/* -------------- Small pieces -------------- */

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
            className="rounded-sm border border-border px-3 py-2 text-sm text-foreground transition hover:border-primary/40 hover:text-primary"
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
    <footer className="mt-24 border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-7xl px-6 py-10 text-sm text-muted-foreground">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Kohat Shops — a community directory.</p>
          <div className="flex items-center gap-3">
            <a href={socials.facebook} target="_blank" rel="noreferrer" className="hover:text-primary">
              Facebook
            </a>
            <a href={socials.instagram} target="_blank" rel="noreferrer" className="hover:text-primary">
              Instagram
            </a>
            <a href={socials.whatsapp} target="_blank" rel="noreferrer" className="hover:text-primary">
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <>
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-sm bg-secondary text-primary">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block text-xs uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
        <span className="block truncate text-sm text-foreground">{value}</span>
      </span>
    </>
  );
  return (
    <li>
      {href ? (
        <a href={href} className="flex items-start gap-3 hover:text-primary">
          {inner}
        </a>
      ) : (
        <div className="flex items-start gap-3">{inner}</div>
      )}
    </li>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="rounded-sm border border-border p-2 text-muted-foreground transition hover:border-primary/40 hover:text-primary"
    >
      {children}
    </a>
  );
}

function GalleryBtn({
  onClick,
  aria,
  children,
}: {
  onClick: () => void;
  aria: string;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={aria}
      className="rounded-sm border border-border bg-card p-2 text-foreground transition hover:border-primary/40 hover:text-primary"
    >
      {children}
    </button>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-sm border border-border bg-card p-4">
      <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-1 font-display text-lg font-semibold text-foreground">{value}</p>
    </div>
  );
}
