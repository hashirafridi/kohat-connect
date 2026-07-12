import { useEffect, useMemo, useState } from "react";
import { MessageCircle, Phone, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { shops, type Shop } from "@/data/shops";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

export function ShopCard({ shop: s }: { shop: Shop }) {
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
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <Link
            to="/shops/$slug"
            params={{ slug: s.slug }}
            className="font-display text-lg font-semibold text-foreground transition hover:text-primary"
          >
            {s.name}
          </Link>
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

export function Pagination({
  page,
  totalPages,
  start,
  count,
  total,
  onChange,
}: {
  page: number;
  totalPages: number;
  start: number;
  count: number;
  total: number;
  onChange: (p: number) => void;
}) {
  return (
    <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
      <p className="text-xs text-muted-foreground">
        Showing{" "}
        <span className="font-medium text-foreground">
          {total === 0 ? 0 : start + 1}–{start + count}
        </span>{" "}
        of <span className="font-medium text-foreground">{total}</span>
      </p>
      {totalPages > 1 && (
        <nav className="flex items-center gap-1" aria-label="Pagination">
          <button
            onClick={() => onChange(Math.max(1, page - 1))}
            disabled={page === 1}
            className="inline-flex items-center gap-1 rounded-sm border border-border bg-card px-2.5 py-1.5 text-sm text-foreground transition hover:border-primary/40 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => onChange(p)}
              aria-current={p === page ? "page" : undefined}
              className={`min-w-9 rounded-sm px-3 py-1.5 text-sm font-medium transition ${
                p === page
                  ? "bg-primary text-primary-foreground"
                  : "border border-border bg-card text-foreground hover:border-primary/40"
              }`}
            >
              {p}
            </button>
          ))}
          <button
            onClick={() => onChange(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
            className="inline-flex items-center gap-1 rounded-sm border border-border bg-card px-2.5 py-1.5 text-sm text-foreground transition hover:border-primary/40 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Next page"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </nav>
      )}
    </div>
  );
}

export function FeaturedShops({ className }: { className?: string }) {
  const featured = useMemo(() => shops.filter((s) => s.featured), []);
  const isMobile = useIsMobile();
  const PAGE_SIZE = isMobile ? 3 : 8;
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(featured.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const pageItems = featured.slice(start, start + PAGE_SIZE);

  useEffect(() => {
    setPage(1);
  }, [isMobile]);

  return (
    <section className={cn("border-t border-border bg-background px-6 py-12 sm:py-16", className)}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 sm:mb-8">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Handpicked
          </p>
          <h2 className="mt-2 font-display text-xl font-semibold sm:text-2xl sm:text-3xl">
            Featured shops in Kohat
          </h2>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            Local favourites worth a visit — vetted by us, loved by the city.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 2xl:grid-cols-4">
          {pageItems.map((s) => (
            <ShopCard key={s.slug} shop={s} />
          ))}
        </div>

        <Pagination
          page={currentPage}
          totalPages={totalPages}
          start={start}
          count={pageItems.length}
          total={featured.length}
          onChange={setPage}
        />
      </div>
    </section>
  );
}
