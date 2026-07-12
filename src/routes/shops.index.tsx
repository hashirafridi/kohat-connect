import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { fallback, zodValidator } from "@tanstack/zod-adapter";
import { z } from "zod";
import {
  Search,
  Phone,
  MessageCircle,
  Facebook,
  Mail,
  MapPin,
  ArrowRight,
  SlidersHorizontal,
  X,
  LayoutGrid,
  List as ListIcon,
  ChevronLeft,
  ChevronRight,
  Navigation,
} from "lucide-react";
import { shops, areas, type Shop } from "@/data/shops";
import { categories } from "@/data/home";
import { socials } from "@/data/home";

const searchSchema = z.object({
  q: fallback(z.string(), "").default(""),
  category: fallback(z.string(), "").default(""),
  area: fallback(z.string(), "").default(""),
  sort: fallback(z.string(), "featured").default("featured"),
});

export const Route = createFileRoute("/shops/")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "All Shops in Kohat — Kohat Shops Directory" },
      {
        name: "description",
        content:
          "Browse every restaurant, café, biryani stall, bike shop, furniture store and more across Kohat.",
      },
      { property: "og:title", content: "All Shops in Kohat" },
      {
        property: "og:description",
        content: "The complete directory of local businesses in Kohat, KPK.",
      },
    ],
  }),
  component: ShopsPage,
});

function ShopsPage() {
  const { q, category, area, sort } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [qInput, setQInput] = useState(q);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 6;

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    let list = shops.filter((s) => {
      if (category && s.category !== category) return false;
      if (area && s.area !== area) return false;
      if (needle) {
        const hay = `${s.name} ${s.categoryLabel} ${s.area} ${s.tagline}`.toLowerCase();
        if (!hay.includes(needle)) return false;
      }
      return true;
    });
    if (sort === "name") {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === "area") {
      list = [...list].sort((a, b) => a.area.localeCompare(b.area));
    } else {
      list = [...list].sort(
        (a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)),
      );
    }
    return list;
  }, [q, category, area, sort]);

  const activeCount =
    (q ? 1 : 0) + (category ? 1 : 0) + (area ? 1 : 0) + (sort !== "featured" ? 1 : 0);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopBar />
      <PageHeader
        total={shops.length}
        showing={filtered.length}
        q={qInput}
        setQ={setQInput}
        onSubmit={(value) =>
          navigate({ search: (prev: { q: string; category: string; area: string; sort: string }) => ({ ...prev, q: value }) })
        }
      />

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Filters — desktop */}
          <aside className="hidden lg:col-span-3 lg:block">
            <Filters
              category={category}
              area={area}
              sort={sort}
              onChange={(patch) =>
                navigate({ search: (prev: { q: string; category: string; area: string; sort: string }) => ({ ...prev, ...patch }) })
              }
              onClear={() =>
                navigate({ search: () => ({ q: "", category: "", area: "", sort: "featured" }) })
              }
            />
          </aside>

          {/* Results */}
          <div className="lg:col-span-9">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setFiltersOpen(true)}
                  className="inline-flex items-center gap-2 rounded-sm border border-border bg-card px-3 py-2 text-sm font-medium lg:hidden"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                  {activeCount > 0 && (
                    <span className="rounded-sm bg-primary px-1.5 text-xs text-primary-foreground">
                      {activeCount}
                    </span>
                  )}
                </button>
                <ActiveChips
                  q={q}
                  category={category}
                  area={area}
                  onClear={(key) =>
                    navigate({ search: (prev: { q: string; category: string; area: string; sort: string }) => ({ ...prev, [key]: "" }) })
                  }
                />
              </div>
              <label className="hidden items-center gap-2 text-sm text-muted-foreground sm:flex">
                Sort
                <select
                  value={sort}
                  onChange={(e) =>
                    navigate({
                      search: (prev: { q: string; category: string; area: string; sort: string }) => ({ ...prev, sort: e.target.value }),
                    })
                  }
                  className="rounded-sm border border-border bg-card px-2 py-1.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  <option value="featured">Featured first</option>
                  <option value="name">Name A–Z</option>
                  <option value="area">Area</option>
                </select>
              </label>
            </div>

            {filtered.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((s) => (
                  <ShopCard key={s.slug} shop={s} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Mobile filter drawer */}
      {filtersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setFiltersOpen(false)}
          />
          <div className="absolute inset-y-0 right-0 w-full max-w-sm overflow-y-auto bg-background p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <p className="font-display text-xl font-semibold">Filters</p>
              <button
                onClick={() => setFiltersOpen(false)}
                className="rounded-sm border border-border p-2"
                aria-label="Close filters"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <Filters
              category={category}
              area={area}
              sort={sort}
              onChange={(patch) =>
                navigate({ search: (prev: { q: string; category: string; area: string; sort: string }) => ({ ...prev, ...patch }) })
              }
              onClear={() =>
                navigate({ search: () => ({ q: "", category: "", area: "", sort: "featured" }) })
              }
            />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

/* ------------ Sub-components ------------ */

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

function PageHeader({
  total,
  showing,
  q,
  setQ,
  onSubmit,
}: {
  total: number;
  showing: number;
  q: string;
  setQ: (v: string) => void;
  onSubmit: (v: string) => void;
}) {
  return (
    <section className="border-b border-border bg-secondary/40 px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Directory
        </p>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-semibold sm:text-4xl">
              All shops in Kohat
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Showing <span className="font-medium text-foreground">{showing}</span> of{" "}
              {total} listings
            </p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit(q);
            }}
            className="flex w-full max-w-md items-center gap-2 rounded-sm border border-border bg-card p-1.5"
          >
            <div className="flex flex-1 items-center gap-2 px-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                type="search"
                placeholder="Search shops, food, areas…"
                className="w-full bg-transparent py-2 text-sm placeholder:text-muted-foreground focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="rounded-sm bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function Filters({
  category,
  area,
  sort,
  onChange,
  onClear,
}: {
  category: string;
  area: string;
  sort: string;
  onChange: (patch: Partial<{ category: string; area: string; sort: string }>) => void;
  onClear: () => void;
}) {
  return (
    <div className="space-y-8">
      <div>
        <div className="mb-3 flex items-center justify-between">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Category
          </p>
          {category && (
            <button
              onClick={() => onChange({ category: "" })}
              className="text-xs text-primary hover:underline"
            >
              Clear
            </button>
          )}
        </div>
        <ul className="space-y-1">
          <li>
            <FilterRow
              active={category === ""}
              label="All categories"
              onClick={() => onChange({ category: "" })}
            />
          </li>
          {categories.map((c) => (
            <li key={c.key}>
              <FilterRow
                active={category === c.key}
                label={c.label}
                urdu={c.urdu}
                onClick={() => onChange({ category: c.key })}
              />
            </li>
          ))}
        </ul>
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Area
          </p>
          {area && (
            <button
              onClick={() => onChange({ area: "" })}
              className="text-xs text-primary hover:underline"
            >
              Clear
            </button>
          )}
        </div>
        <ul className="space-y-1">
          <li>
            <FilterRow
              active={area === ""}
              label="All areas"
              onClick={() => onChange({ area: "" })}
            />
          </li>
          {areas.map((a) => (
            <li key={a}>
              <FilterRow
                active={area === a}
                label={a}
                onClick={() => onChange({ area: a })}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="sm:hidden">
        <p className="mb-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Sort
        </p>
        <select
          value={sort}
          onChange={(e) => onChange({ sort: e.target.value })}
          className="w-full rounded-sm border border-border bg-card px-3 py-2 text-sm"
        >
          <option value="featured">Featured first</option>
          <option value="name">Name A–Z</option>
          <option value="area">Area</option>
        </select>
      </div>

      <button
        onClick={onClear}
        className="w-full rounded-sm border border-border bg-card px-3 py-2 text-sm font-medium text-foreground transition hover:border-primary/40 hover:text-primary"
      >
        Reset all filters
      </button>
    </div>
  );
}

function FilterRow({
  active,
  label,
  urdu,
  onClick,
}: {
  active: boolean;
  label: string;
  urdu?: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center justify-between rounded-sm px-3 py-2 text-left text-sm transition ${
        active
          ? "bg-primary text-primary-foreground"
          : "text-foreground hover:bg-secondary"
      }`}
    >
      <span>{label}</span>
      {urdu && (
        <span
          className={`font-urdu text-sm ${
            active ? "text-primary-foreground/80" : "text-muted-foreground"
          }`}
          dir="rtl"
        >
          {urdu}
        </span>
      )}
    </button>
  );
}

function ActiveChips({
  q,
  category,
  area,
  onClear,
}: {
  q: string;
  category: string;
  area: string;
  onClear: (key: "q" | "category" | "area") => void;
}) {
  const items: Array<{ key: "q" | "category" | "area"; label: string }> = [];
  if (q) items.push({ key: "q", label: `“${q}”` });
  if (category) {
    const c = categories.find((x) => x.key === category);
    items.push({ key: "category", label: c?.label ?? category });
  }
  if (area) items.push({ key: "area", label: area });
  if (items.length === 0) return null;
  return (
    <div className="flex flex-wrap items-center gap-2">
      {items.map((it) => (
        <button
          key={it.key}
          onClick={() => onClear(it.key)}
          className="inline-flex items-center gap-1.5 rounded-sm border border-border bg-card px-2.5 py-1 text-xs font-medium text-foreground hover:border-primary/40 hover:text-primary"
        >
          {it.label}
          <X className="h-3 w-3" />
        </button>
      ))}
    </div>
  );
}

function ShopCard({ shop: s }: { shop: Shop }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-sm border border-border bg-card transition hover:-translate-y-1 hover:shadow-[0_18px_40px_-20px_oklch(0.22_0.03_45_/_0.35)]">
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
          {s.categoryLabel}
        </span>
        {s.featured && (
          <span className="absolute right-3 top-3 rounded-sm bg-accent px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-accent-foreground">
            Featured
          </span>
        )}
      </a>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <a
            href={`/shops/${s.slug}`}
            className="font-display text-lg font-semibold text-foreground transition hover:text-primary"
          >
            {s.name}
          </a>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            {s.area}
          </p>
        </div>
        <p className="text-sm text-muted-foreground">{s.tagline}</p>
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
  );
}

function EmptyState() {
  return (
    <div className="rounded-sm border border-dashed border-border bg-card px-6 py-16 text-center">
      <p className="font-display text-2xl font-semibold">No shops match</p>
      <p className="mt-2 text-sm text-muted-foreground">
        Try clearing a filter or searching with a different word.
      </p>
      <Link
        to="/shops"
        search={{ q: "", category: "", area: "", sort: "featured" }}
        className="mt-6 inline-flex items-center gap-2 rounded-sm bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
      >
        Reset filters
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
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
