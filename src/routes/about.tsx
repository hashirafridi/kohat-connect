import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Compass, Heart, Users } from "lucide-react";
import { socials, about } from "@/data/home";

export const Route = createFileRoute("/about")({
  head: () => {
    const url = "https://kohat-connect.lovable.app/about";
    const title = "About — Kohat Business Directory";
    const description =
      "Kohat Business Directory is a free community listing of every shop, café, workshop and service across Kohat, KPK — built to help buyers reach local businesses directly.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: AboutPage,
});


function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopBar />

      <section className="border-b border-border bg-secondary/40 px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            About Kohat Shops
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold sm:text-5xl">
            {about.headline}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {about.body}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {[
            {
              icon: Compass,
              title: "For the city",
              body: "Every shop, café and bazaar stall across Kohat in one simple directory.",
            },
            {
              icon: Users,
              title: "No middleman",
              body: "Buyers reach shops directly on WhatsApp or phone — no sign-ups, no fees.",
            },
            {
              icon: Heart,
              title: "Free forever",
              body: "Listing your shop is free. If you own a business in Kohat, add it today.",
            },
          ].map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="rounded-sm border border-border bg-card p-6"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-sm bg-primary text-primary-foreground">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {f.body}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-3">
          <Link
            to="/shops"
            className="inline-flex items-center gap-2 rounded-sm bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
          >
            Browse all shops
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-sm border border-border px-5 py-3 text-sm font-medium text-foreground transition hover:border-primary/40 hover:text-primary"
          >
            Get in touch
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

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
          <Link to="/shops" className="hidden rounded-sm px-3 py-2 text-sm text-foreground transition hover:text-primary sm:inline-flex">
            Shops
          </Link>
          <Link to="/about" className="hidden rounded-sm px-3 py-2 text-sm text-primary sm:inline-flex">
            About
          </Link>
          <Link to="/contact" className="rounded-sm px-3 py-2 text-sm text-foreground transition hover:text-primary">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-8 border-t border-border bg-secondary/40">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-6 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center">
        <p>© {new Date().getFullYear()} Kohat Shops — a community directory.</p>
        <div className="flex items-center gap-4">
          <Link to="/about" className="hover:text-primary">About</Link>
          <Link to="/contact" className="hover:text-primary">Contact</Link>
          <a href={socials.facebook} target="_blank" rel="noreferrer" className="hover:text-primary">
            Facebook
          </a>
        </div>
      </div>
    </footer>
  );
}
