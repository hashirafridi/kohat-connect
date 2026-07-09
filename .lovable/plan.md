# Home Page — Kohat Shops Directory (Step 1)

Scope: build ONLY the home page now, with hardcoded placeholder content in a shape that will later plug into the admin/DB. No backend, no listing page, no shop page, no admin yet — those come in later steps.

## Sections (top → bottom)

1. **Hero** — full-bleed image collage/carousel of Kohat markets, dark gradient overlay, centered tagline ("Discover Shops & Restaurants in Kohat"), primary "Enter" button (links to `/shops` placeholder route — page built later), small Facebook + Contact icon links in the top-right nav.
2. **Search bar** — prominent, overlapping the hero bottom edge. Submitting routes to `/shops?q=...` (route not built yet, link is fine).
3. **Quick category shortcuts** — horizontal row of small icon+label chips (Restaurants, Furniture, Bikes, Cafés, Biryani, Bus Tickets, Stalls, Mobile Shops). Each links to `/shops#<category>`.
4. **Featured Shops** — grid of 6 handpicked shop cards (image, name, category tag, area, quick WhatsApp/Call icons). Cards link to `/shops/<slug>`.
5. **About strip** — one short line about the site.
6. **Footer** — social links (Facebook, WhatsApp, Instagram), short "About this site" blurb, copyright.

## Design direction

- E-commerce/storefront feel (Shopify/WordPress-theme energy), NOT SaaS dashboard.
- Light theme, warm neutral palette suited to a Pakistani bazaar (off-white background, deep terracotta/saffron accent, charcoal text). Confirm palette via visual choice before building.
- Minimal rounding (~4–6px), subtle shadows, clear typography hierarchy, tasteful hover states.
- Real photography-forward; hero uses generated market imagery until user provides real Kohat photos.
- Custom look, not a generic template.

Because the request explicitly asks for a distinctive, image-heavy storefront look, I'll generate 3 design directions and let you pick one before building.

## Data shape (frontend-only for now)

Placeholder TypeScript arrays in `src/data/home.ts` mirroring the future DB shape, so swapping to Cloud later is a drop-in:

```ts
type FeaturedShop = { slug; name; category; area; image; whatsapp; phone };
type Category = { key; label; icon };
type HomeContent = { heroImages: string[]; tagline: string; about: string; socials: {...} };
```

## Routes

- `src/routes/index.tsx` — replace placeholder with the new home page.
- Header nav "Enter" / category chips / featured cards link to `/shops` and `/shops/$slug` — those routes don't exist yet, links will 404 until step 2. That's intentional.
- Update `__root.tsx` head: real title ("Kohat Shops — Discover Local Markets"), description, og tags.

## Out of scope for this step

Listing page, single shop page, admin, Supabase/Cloud, image upload/WebP conversion, interactions table, search backend, auth. All planned for later steps.

## Suggestions / open questions before I build

1. **Design directions** — I'll produce 3 storefront-style options for you to pick.
2. **Palette** — confirm terracotta/saffron warm neutrals, or prefer green/blue?
3. **Language** — English only, or English + Urdu (اردو) tagline?
4. **Hero imagery** — generate placeholder Kohat-market images now, or wait for your real photos?

I'll ask these as a quick question set right after you approve the plan.
