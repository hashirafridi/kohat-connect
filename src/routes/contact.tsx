import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Mail, Phone, MessageCircle, Send, CheckCircle2 } from "lucide-react";
import { socials } from "@/data/home";

export const Route = createFileRoute("/contact")({
  head: () => {
    const url = "https://kohat-connect.lovable.app/contact";
    const title = "Contact — Kohat Business Directory";
    const description =
      "Get in touch with Kohat Business Directory on WhatsApp, phone or email. List your business or send us a message using the form.";
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
  component: ContactPage,
});


function WhatsAppLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const waNumber = socials.whatsapp.replace(/\D/g, "");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const body = `Hi, I'm ${form.name} (${form.email}).\n\n${form.message}`;
    window.location.href = `mailto:${socials.contactEmail}?subject=${encodeURIComponent(
      "Kohat Shops enquiry"
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopBar />

      <section className="border-b border-border bg-secondary/40 px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Get in touch
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold sm:text-5xl">
            Contact us
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Want to list your shop, report a change, or just say hello? Reach us
            the way that suits you — WhatsApp is fastest.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-14">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Contact options */}
          <div className="space-y-4">
            <a
              href={`https://wa.me/${waNumber}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between gap-4 rounded-sm border border-border bg-card p-5 transition hover:border-[#25D366]/60"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-sm bg-[#25D366] text-white">
                  <WhatsAppLogo className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">
                    WhatsApp
                  </p>
                  <p className="mt-0.5 font-display text-base font-semibold">
                    {socials.whatsappNumber}
                  </p>
                </div>
              </div>
              <span className="text-sm text-primary">Chat →</span>
            </a>

            <a
              href={`tel:${socials.phone.replace(/\s/g, "")}`}
              className="flex items-center justify-between gap-4 rounded-sm border border-border bg-card p-5 transition hover:border-primary/40"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-sm bg-secondary text-primary">
                  <Phone className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">
                    Phone
                  </p>
                  <p className="mt-0.5 font-display text-base font-semibold">
                    {socials.phone}
                  </p>
                </div>
              </div>
              <span className="text-sm text-primary">Call →</span>
            </a>

            <a
              href={`mailto:${socials.contactEmail}`}
              className="flex items-center justify-between gap-4 rounded-sm border border-border bg-card p-5 transition hover:border-primary/40"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-sm bg-secondary text-primary">
                  <Mail className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">
                    Email
                  </p>
                  <p className="mt-0.5 font-display text-base font-semibold">
                    {socials.contactEmail}
                  </p>
                </div>
              </div>
              <span className="text-sm text-primary">Email →</span>
            </a>

            <div className="rounded-sm border border-dashed border-border bg-secondary/40 p-5 text-sm text-muted-foreground">
              <p className="flex items-start gap-2">
                <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>
                  <strong className="text-foreground">Note:</strong> We usually
                  reply within a few hours on WhatsApp. For adding your shop,
                  please share a name, area, category and one photo.
                </span>
              </p>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="rounded-sm border border-border bg-card p-6"
          >
            <h2 className="font-display text-xl font-semibold">Send a message</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              We'll get back to you as soon as we can.
            </p>

            <div className="mt-5 space-y-4">
              <label className="block">
                <span className="text-xs uppercase tracking-wider text-muted-foreground">
                  Your name
                </span>
                <input
                  required
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="mt-1 w-full rounded-sm border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none"
                  placeholder="Ali Khan"
                />
              </label>
              <label className="block">
                <span className="text-xs uppercase tracking-wider text-muted-foreground">
                  Email
                </span>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="mt-1 w-full rounded-sm border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none"
                  placeholder="you@example.com"
                />
              </label>
              <label className="block">
                <span className="text-xs uppercase tracking-wider text-muted-foreground">
                  Message
                </span>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="mt-1 w-full rounded-sm border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none"
                  placeholder="How can we help?"
                />
              </label>
            </div>

            <button
              type="submit"
              className="mt-5 inline-flex items-center justify-center gap-2 rounded-sm bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
            >
              <Send className="h-4 w-4" />
              Send message
            </button>

            {sent && (
              <p className="mt-4 flex items-center gap-2 text-sm text-primary">
                <CheckCircle2 className="h-4 w-4" />
                Opening your email app…
              </p>
            )}
          </form>
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
          <Link to="/about" className="hidden rounded-sm px-3 py-2 text-sm text-foreground transition hover:text-primary sm:inline-flex">
            About
          </Link>
          <Link to="/contact" className="rounded-sm px-3 py-2 text-sm text-primary">
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
