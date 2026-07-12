import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Search,
  Phone,
  MessageCircle,
  Facebook,
  Instagram,
  Mail,
  ArrowRight,
  MapPin,
  UtensilsCrossed,
  Flame,
  Coffee,
  Armchair,
  Bike,
  Smartphone,
  ShoppingBasket,
  BusFront,
  Sparkles,
  Compass,
  MousePointerClick,
  PhoneCall,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  heroImages,
  tagline,
  categories,
  featuredShops,
  about,
  socials,
} from "@/data/home";

export const Route = createFileRoute("/")({
  component: Home,
});

const categoryIcons: Record<string, typeof UtensilsCrossed> = {
  restaurants: UtensilsCrossed,
  biryani: Flame,
  cafes: Coffee,
  furniture: Armchair,
  bikes: Bike,
  mobile: Smartphone,
  stalls: ShoppingBasket,
  bus: BusFront,
};

function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopBar />
      <Hero />
      <SearchStrip />
      <CategoryChips />
      <Featured />
      <RecentlyAdded />
      <HowItWorks />
      <AboutStrip />
      <Footer />
    </div>
  );
}

function TopBar() {
  return (
    <header className="absolute top-0 left-0 right-0 z-30">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link to="/" className="flex items-baseline gap-2">
          <span className="font-display text-2xl font-semibold tracking-tight text-primary-foreground drop-shadow-sm">
            Kohat<span className="text-accent">Shops</span>
          </span>
          <span className="font-urdu text-lg text-primary-foreground/85">
            کوہاٹ
          </span>
        </Link>
        <nav className="flex items-center gap-2">
          <a
            href={socials.facebook}
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
            className="rounded-sm border border-white/25 bg-white/10 p-2 text-primary-foreground backdrop-blur transition hover:bg-white/20"
          >
            <Facebook className="h-4 w-4" />
          </a>
          <a
            href={`mailto:${socials.contactEmail}`}
            aria-label="Contact"
            className="rounded-sm border border-white/25 bg-white/10 p-2 text-primary-foreground backdrop-blur transition hover:bg-white/20"
          >
            <Mail className="h-4 w-4" />
          </a>
          <Link
            to="/"
            className="ml-2 hidden items-center gap-2 rounded-sm bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition hover:bg-primary/90 sm:inline-flex"
          >
            Enter Directory
            <ArrowRight className="h-4 w-4" />
          </Link>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="grid min-h-[92vh] grid-cols-1 lg:grid-cols-12">
        {/* Main image */}
        <div className="relative col-span-1 lg:col-span-8">
          <img
            src={heroImages.main}
            alt="Kohat bazaar at golden hour"
            width={1600}
            height={1104}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.22_0.03_45_/_0.75)] via-[oklch(0.22_0.03_45_/_0.25)] to-[oklch(0.22_0.03_45_/_0.55)]" />

          {/* Copy */}
          <div className="absolute inset-x-0 bottom-0 px-6 pb-24 sm:pb-28 lg:px-16 lg:pb-32">
            <div className="max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-sm border border-white/25 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-primary-foreground backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                A city directory · Kohat, KPK
              </div>
              <h1 className="font-display text-4xl font-semibold leading-[1.05] text-primary-foreground sm:text-6xl lg:text-7xl">
                {tagline.english}
              </h1>
              <p className="font-urdu mt-4 text-2xl text-primary-foreground/90 sm:text-3xl" dir="rtl">
                {tagline.urdu}
              </p>
              <p className="mt-6 max-w-xl text-base text-primary-foreground/85">
                {tagline.sub}
              </p>
            </div>
          </div>
        </div>

        {/* Side stack */}
        <div className="hidden grid-rows-2 lg:col-span-4 lg:grid">
          <div className="relative overflow-hidden border-l border-b border-white/10">
            <img
              src={heroImages.side1}
              alt="Biryani stall"
              width={900}
              height={1100}
              className="h-full w-full object-cover transition duration-700 hover:scale-105"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-5">
              <span className="text-xs uppercase tracking-[0.2em] text-accent">
                Featured
              </span>
              <p className="font-display text-xl text-white">Biryani &amp; Karahi</p>
            </div>
          </div>
          <div className="relative overflow-hidden border-l border-white/10">
            <img
              src={heroImages.side2}
              alt="Bike shop"
              width={900}
              height={700}
              className="h-full w-full object-cover transition duration-700 hover:scale-105"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-5">
              <span className="text-xs uppercase tracking-[0.2em] text-accent">
                Featured
              </span>
              <p className="font-display text-xl text-white">Bikes &amp; Motors</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SearchStrip() {
  const [q, setQ] = useState("");
  return (
    <section className="relative z-20 -mt-10 px-6">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // Routes to /shops later
          window.location.href = `/shops?q=${encodeURIComponent(q)}`;
        }}
        className="mx-auto flex max-w-4xl items-center gap-2 rounded-sm border border-border bg-card p-2 shadow-[0_20px_60px_-20px_oklch(0.22_0.03_45_/_0.35)]"
      >
        <div className="flex flex-1 items-center gap-3 px-3">
          <Search className="h-5 w-5 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            type="search"
            placeholder="Search shops, restaurants, areas…"
            className="w-full bg-transparent py-3 text-base text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-sm bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
        >
          Search
          <ArrowRight className="h-4 w-4" />
        </button>
      </form>
    </section>
  );
}

function CategoryChips() {
  return (
    <section className="px-6 py-14 sm:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Browse by category
            </p>
            <h2 className="mt-1 font-display text-2xl font-semibold sm:text-3xl">
              What are you looking for today?
            </h2>
          </div>
          <Link
            to="/"
            className="hidden text-sm font-medium text-primary underline-offset-4 hover:underline sm:inline"
          >
            View all categories →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {categories.map((c) => {
            const Icon = categoryIcons[c.key] ?? ShoppingBasket;
            return (
              <a
                key={c.key}
                href={`/shops#${c.key}`}
                className="group flex flex-col items-start gap-3 rounded-sm border border-border bg-card p-4 transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-sm"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-sm bg-secondary text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-5 w-5" strokeWidth={1.5} />
                </span>
                <div>
                  <p className="font-display text-base font-medium">{c.label}</p>
                  <p className="font-urdu text-sm text-muted-foreground" dir="rtl">
                    {c.urdu}
                  </p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Featured() {
  const PAGE_SIZE = 6;
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(featuredShops.length / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;
  const pageItems = featuredShops.slice(start, start + PAGE_SIZE);

  return (
    <section className="border-t border-border bg-secondary/40 px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Handpicked this week
            </p>
            <h2 className="mt-1 font-display text-3xl font-semibold sm:text-4xl">
              Featured in Kohat
            </h2>
          </div>
          <a
            href="/shops"
            className="hidden text-sm font-medium text-primary underline-offset-4 hover:underline sm:inline"
          >
            See all shops →
          </a>
        </div>

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {pageItems.map((s) => (
            <article
              key={s.slug}
              className="group flex flex-col overflow-hidden rounded-sm border border-border bg-card transition hover:-translate-y-1 hover:shadow-[0_18px_40px_-20px_oklch(0.22_0.03_45_/_0.35)]"
            >
              <a href={`/shops/${s.slug}`} className="relative block overflow-hidden">
                <img
                  src={s.image}
                  alt={s.name}
                  width={900}
                  height={700}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded-sm bg-background/95 px-2.5 py-1 text-xs font-medium uppercase tracking-wider text-foreground">
                  {s.category}
                </span>
              </a>
              <div className="flex flex-1 flex-col gap-4 p-5">
                <div>
                  <a
                    href={`/shops/${s.slug}`}
                    className="font-display text-xl font-semibold text-foreground transition hover:text-primary"
                  >
                    {s.name}
                  </a>
                  <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" />
                    {s.area}
                  </p>
                </div>
                <div className="mt-auto flex items-center gap-2 border-t border-border pt-4">
                  <a
                    href={`https://wa.me/${s.whatsapp.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-sm bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </a>
                  <a
                    href={`tel:${s.phone}`}
                    className="inline-flex items-center justify-center gap-2 rounded-sm border border-border bg-background px-3 py-2 text-sm font-medium text-foreground transition hover:border-primary/40 hover:text-primary"
                    aria-label={`Call ${s.name}`}
                  >
                    <Phone className="h-4 w-4" />
                    Call
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {totalPages > 1 && (
          <nav
            aria-label="Featured shops pagination"
            className="mt-10 flex items-center justify-between gap-4 border-t border-border pt-6"
          >
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Showing <span className="text-foreground">{start + 1}</span>–
              <span className="text-foreground">
                {Math.min(start + PAGE_SIZE, featuredShops.length)}
              </span>{" "}
              of <span className="text-foreground">{featuredShops.length}</span>
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                aria-label="Previous page"
                className="inline-flex h-9 w-9 items-center justify-center rounded-sm border border-border bg-card text-foreground transition hover:border-primary/40 hover:text-primary disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-border disabled:hover:text-foreground"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => {
                const active = n === page;
                return (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setPage(n)}
                    aria-current={active ? "page" : undefined}
                    className={`inline-flex h-9 min-w-9 items-center justify-center rounded-sm border px-3 text-sm font-medium transition ${
                      active
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card text-foreground hover:border-primary/40 hover:text-primary"
                    }`}
                  >
                    {n}
                  </button>
                );
              })}
              <button
                type="button"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                aria-label="Next page"
                className="inline-flex h-9 w-9 items-center justify-center rounded-sm border border-border bg-card text-foreground transition hover:border-primary/40 hover:text-primary disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-border disabled:hover:text-foreground"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </nav>
        )}
      </div>
    </section>
  );
}

function RecentlyAdded() {
  const recent = [...featuredShops].reverse().slice(0, 4);
  return (
    <section className="border-t border-border px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              Fresh on the directory
            </p>
            <h2 className="mt-1 font-display text-3xl font-semibold sm:text-4xl">
              Recently added shops
            </h2>
          </div>
          <a
            href="/shops?sort=newest"
            className="hidden text-sm font-medium text-primary underline-offset-4 hover:underline sm:inline"
          >
            Browse newest →
          </a>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {recent.map((s) => (
            <a
              key={s.slug}
              href={`/shops/${s.slug}`}
              className="group flex flex-col overflow-hidden rounded-sm border border-border bg-card transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_18px_40px_-20px_oklch(0.22_0.03_45_/_0.35)]"
            >
              <div className="relative overflow-hidden">
                <img
                  src={s.image}
                  alt={s.name}
                  width={600}
                  height={450}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <span className="absolute left-2 top-2 rounded-sm bg-accent px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent-foreground">
                  New
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-1 p-4">
                <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                  {s.category}
                </p>
                <p className="font-display text-base font-semibold leading-snug text-foreground group-hover:text-primary">
                  {s.name}
                </p>
                <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  {s.area}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      icon: Search,
      title: "Search or browse",
      urdu: "تلاش کریں",
      body: "Find a shop by name, category or area — from biryani stalls on Bannu Road to bike mechanics in KDA.",
    },
    {
      icon: MousePointerClick,
      title: "Open the shop page",
      urdu: "دکان کھولیں",
      body: "See photos, address, timings, gallery and a map location — everything you need before you head out.",
    },
    {
      icon: PhoneCall,
      title: "Call or WhatsApp",
      urdu: "رابطہ کریں",
      body: "Contact the shop directly on WhatsApp or phone. No middleman, no signup — just tap and talk.",
    },
  ];
  return (
    <section className="border-t border-border bg-secondary/40 px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 max-w-2xl">
          <p className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <Compass className="h-3.5 w-3.5 text-accent" />
            How it works
          </p>
          <h2 className="mt-1 font-display text-3xl font-semibold sm:text-4xl">
            Three steps to reach any shop in Kohat
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            No apps to install, no accounts to create. Just browse, find and contact — the way the bazaar has always worked.
          </p>
        </div>
        <ol className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <li
                key={step.title}
                className="relative flex flex-col gap-4 rounded-sm border border-border bg-card p-6 transition hover:border-primary/40"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-sm bg-primary text-primary-foreground">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <span className="font-display text-4xl font-semibold text-muted-foreground/25">
                    0{i + 1}
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="font-urdu text-sm text-muted-foreground" dir="rtl">
                    {step.urdu}
                  </p>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}



function AboutStrip() {
  return (
    <section className="border-t border-border px-6 py-20">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            About Kohat Shops
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl lg:text-5xl">
            {about.headline}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {about.body}
          </p>
        </div>
        <div className="lg:col-span-5">
          <div className="rounded-sm border border-border bg-card p-6">
            <p className="font-urdu text-2xl text-foreground" dir="rtl">
              کوہاٹ کی ہر دکان، ایک کلک پر
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              Own a shop in Kohat? List it free — buyers reach you directly via
              WhatsApp or call.
            </p>
            <a
              href={`mailto:${socials.contactEmail}`}
              className="mt-5 inline-flex items-center gap-2 rounded-sm bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
            >
              List your shop
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-[oklch(0.22_0.03_45)] text-primary-foreground">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-14 sm:grid-cols-3">
        <div>
          <p className="font-display text-2xl font-semibold">
            Kohat<span className="text-accent">Shops</span>
          </p>
          <p className="mt-3 max-w-xs text-sm text-primary-foreground/70">
            A community directory for every shop, café, stall and business
            across Kohat.
          </p>
        </div>
        <div className="text-sm">
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-accent">
            Explore
          </p>
          <ul className="space-y-2 text-primary-foreground/80">
            <li><a href="/shops" className="hover:text-accent">All Shops</a></li>
            <li><a href="/shops#restaurants" className="hover:text-accent">Restaurants</a></li>
            <li><a href="/shops#bikes" className="hover:text-accent">Bikes &amp; Motors</a></li>
            <li><a href="/shops#furniture" className="hover:text-accent">Furniture</a></li>
          </ul>
        </div>
        <div className="text-sm">
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-accent">
            Follow
          </p>
          <div className="flex items-center gap-2">
            <a href={socials.facebook} aria-label="Facebook" className="rounded-sm border border-white/15 p-2 hover:border-accent hover:text-accent"><Facebook className="h-4 w-4" /></a>
            <a href={socials.instagram} aria-label="Instagram" className="rounded-sm border border-white/15 p-2 hover:border-accent hover:text-accent"><Instagram className="h-4 w-4" /></a>
            <a href={socials.whatsapp} aria-label="WhatsApp" className="rounded-sm border border-white/15 p-2 hover:border-accent hover:text-accent"><MessageCircle className="h-4 w-4" /></a>
            <a href={`mailto:${socials.contactEmail}`} aria-label="Email" className="rounded-sm border border-white/15 p-2 hover:border-accent hover:text-accent"><Mail className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-2 px-6 py-5 text-xs text-primary-foreground/60 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Kohat Shops. Built for the city.</p>
          <p className="font-urdu text-sm text-primary-foreground/70" dir="rtl">
            کوہاٹ سے، کوہاٹ کے لیے
          </p>
        </div>
      </div>
    </footer>
  );
}
