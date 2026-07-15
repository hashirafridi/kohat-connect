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
import { enrichShop } from "@/data/shops";
import { fetchShopBySlugWithFallback } from "@/data/shops-db";
import { socials } from "@/data/home";
import { FeaturedShops } from "@/components/FeaturedShops";

export const Route = createFileRoute("/shops/$slug")({
  loader: async ({ params }) => {
    const shop = await fetchShopBySlugWithFallback(params.slug);
    if (!shop) throw notFound();
    return { shop: enrichShop(shop) };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Business not found — Kohat Business Directory" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { shop } = loaderData;
    const title = `${shop.name} — ${shop.subcategoryLabel ?? shop.categoryLabel} in ${shop.area}, Kohat`;
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
        Back to all businesses
      </Link>
    </div>
  ),
  component: ShopDetailPage,
});

function ShopNotFound() {
  return (
    <div className="mx-auto max-w-xl px-6 py-24 text-center">
      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">404</p>
      <h1 className="mt-3 font-display text-3xl font-semibold">Business not found</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        The listing you are looking for isn't in the directory yet.
      </p>
      <Link
        to="/shops"
        className="mt-6 inline-flex items-center gap-2 rounded-sm bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
      >
        Browse all businesses
      </Link>
    </div>
  );
}

function ShopDetailPage() {
  const { shop } = Route.useLoaderData();
  const [activeIdx, setActiveIdx] = useState(0);


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
          <Link to="/shops" className="hover:text-primary">Businesses</Link>
          <span>/</span>
          <Link
            to="/shops"
            search={{ q: "", category: shop.category, sub: "", area: "", sort: "featured" }}
            className="hover:text-primary"
          >
            {shop.categoryLabel}
          </Link>
          {shop.subcategory && (
            <>
              <span>/</span>
              <Link
                to="/shops"
                search={{ q: "", category: shop.category, sub: shop.subcategory, area: "", sort: "featured" }}
                className="hover:text-primary"
              >
                {shop.subcategoryLabel}
              </Link>
            </>
          )}
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
          Back to all businesses
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
                  {shop.subcategoryLabel && (
                    <span className="rounded-sm bg-background/80 px-2.5 py-1 text-xs font-medium uppercase tracking-wider text-foreground">
                      {shop.subcategoryLabel}
                    </span>
                  )}
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

            {/* Social links below the banner image */}
            <div className="mt-4 flex items-center gap-3">
              {shop.facebook && (
                <a
                  href={shop.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-sm border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition hover:border-[#1877F2]/40 hover:text-[#1877F2]"
                >
                  <FacebookIcon className="h-4 w-4" />
                  Facebook
                </a>
              )}
              {shop.instagram && (
                <a
                  href={shop.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-sm border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition hover:border-[#E4405F]/40 hover:text-[#E4405F]"
                >
                  <InstagramIcon className="h-4 w-4" />
                  Instagram
                </a>
              )}
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

            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <StatCard label="Category" value={shop.categoryLabel} />
              <StatCard label="Sub category" value={shop.subcategoryLabel ?? "—"} />
              <StatCard label="Area" value={shop.area} />
              <StatCard label="Since" value={shop.established} />
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

      <FeaturedShops className="mt-4" />

      {/* Floating WhatsApp */}
      <a
        href={`https://wa.me/${waNumber}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105 hover:shadow-xl"
      >
        <WhatsAppLogo className="h-7 w-7" />
      </a>

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
            Kohat<span className="text-primary">Business</span>
          </span>
          <span className="font-urdu text-lg text-muted-foreground">کوہاٹ</span>
        </Link>
        <nav className="flex items-center gap-2">
          <Link
            to="/shops"
            className="hidden rounded-sm border border-border px-3 py-2 text-sm text-foreground transition hover:border-primary/40 hover:text-primary sm:inline-flex"
          >
            All businesses
          </Link>
          <Link
            to="/about"
            className="hidden rounded-sm px-3 py-2 text-sm text-foreground transition hover:text-primary sm:inline-flex"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="rounded-sm px-3 py-2 text-sm text-foreground transition hover:text-primary"
          >
            Contact
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
          <div className="flex flex-wrap items-center gap-4">
            <Link to="/about" className="hover:text-primary">About</Link>
            <Link to="/contact" className="hover:text-primary">Contact</Link>
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

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="igGradientBanner" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f09433" />
          <stop offset="50%" stopColor="#e6683c" />
          <stop offset="100%" stopColor="#bc1888" />
        </linearGradient>
      </defs>
      <path
        fill="url(#igGradientBanner)"
        d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"
      />
    </svg>
  );
}

function WhatsAppLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}
