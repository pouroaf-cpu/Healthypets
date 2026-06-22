# Healthy Pets — Site Spec (Custom build on Vercel)

> Custom-coded content + affiliate hub for **healthypets.co.nz**, deployed on Vercel.
> **LOCKED** = the decision; *italics* = alternative weighed. Optimised for: top-tier
> Core Web Vitals, full design control, AI-generated MDX content, NZ audience, and the
> affiliate mechanics (cloaked links, email re-treat reminders).

## 1. Stack — LOCKED
| Layer | Decision | Why |
|---|---|---|
| **Framework** | **Next.js (App Router, TypeScript)** | Vercel-native; SSG/ISR for SEO; flexible for future tools (reminder/dosage calculators) |
| **Hosting** | **Vercel** (Pro) | Edge network, image optimisation, analytics, preview deploys. *Hobby tier bans commercial use → Pro (~US$20/mo)* |
| **Styling** | **Tailwind CSS** | Utility-first; design tokens lock the brand theme |
| **Components** | **shadcn/ui** | Accessible, unstyled-then-themed React components (tables, accordion/FAQ, buttons) |
| **Content** | **MDX in-repo** (content as code) | Free, version-controlled, AI writes `.mdx`, statically rendered = fast + great SEO |
| **Fonts** | `next/font` — **Poppins** (headings) + **Inter** (body) | self-hosted, zero layout shift |
| **Backend/data** | **Supabase** (already set up) | email captures, affiliate click logs, reminder queue |
| **Email** | **MailerLite** (API) | list + re-treat automation. *Alt: Resend + Supabase + Vercel Cron for full control* |
| **Analytics** | Vercel Analytics + GA4 + GSC (+ PostHog optional) | CWV + search + behaviour |

*Framework alt: **Astro** — ships less JS, ideal for pure content. Chosen Next.js for Vercel-native
DX + room to add interactive tools later. Either is fine; Next.js if in doubt.*

*Content alt: a Git-based CMS (**Keystatic**) layered over the MDX later, if a non-dev needs a UI.*

## 2. Design theme — LOCKED (as Tailwind tokens)
```js
// tailwind.config — theme.extend.colors
brand:   { DEFAULT: '#2E9E6B', dark: '#247a53', light: '#E8F5EF' }, // fresh green (health/natural/NZ)
cta:     { DEFAULT: '#FF6B5C', dark: '#e85546' },                   // warm coral (buy buttons)
ink:     '#1F2A37',                                                  // charcoal text
surface: '#F4F7F5',                                                  // soft grey sections
```
- **Fonts:** Poppins (headings) + Inter (body) via `next/font/google`.
- **Logo:** "Healthy Pets" wordmark + paw-in-leaf mark (SVG in `/public`).
- **Feel:** clean, warm, generous whitespace, big scannable comparison tables, obvious coral CTAs.
- **Imagery:** real NZ pets, bright; product shots on clean backgrounds; all via `next/image`.

## 3. Repo structure
```
pet-health-hub/                  (this folder = the Next.js app)
  app/
    layout.tsx                   root layout, fonts, header/footer
    page.tsx                     homepage
    [territory]/page.tsx         category hubs (parasite, supplements, food…)
    [territory]/[slug]/page.tsx  pillar + spoke pages (rendered from MDX)
    go/[link]/route.ts           affiliate redirect (cloaking + click log)
    api/subscribe/route.ts       email capture → MailerLite + Supabase
    sitemap.ts  robots.ts  rss.xml/route.ts
  content/                       MDX articles (one file per page)
    parasite/best-cat-flea-treatment-nz.mdx ...
  components/                    ComparisonTable, ProductCard, CTAButton, FAQ, EmailCapture, Disclosure, Schema
  lib/                           affiliate-links.ts (central map), mdx, seo, supabase, mailerlite
  docs/                          ← move planning .md files here
  public/                        logo, images
```

## 4. Content model (MDX)
Each article = one `.mdx` file with frontmatter the templates read:
```yaml
---
title: "Best Flea Treatments for Cats (NZ 2026)"
slug: best-cat-flea-treatment-nz
territory: parasite
type: pillar            # pillar | spoke
primaryKeyword: "cat flea treatment"
nzVolume: 3600
description: "..."      # meta description
updated: 2026-06-22
vetReviewed: true
faq: [{ q, a }]
products: [ ... ]       # for the comparison table
related: [ slugs ]      # internal links
---
```
AI writes these to the persona + content-map rules. Pillars render the comparison table +
budget/premium picks; spokes render article + cross-links.

## 5. Core components
- **ComparisonTable** — products, NZ price, key specs, coral "Check price at Pet Direct →" CTA.
- **ProductCard / TopPick** — budget vs premium pick callouts.
- **CTAButton** — routes through `/go/<link>` (cloaked + logged).
- **FAQ** (shadcn accordion) → emits FAQ JSON-LD.
- **EmailCapture** — flea/worming reminder lead magnet → `/api/subscribe`.
- **Disclosure** — affiliate disclosure, auto-rendered on money pages.
- **Schema** — JSON-LD for Article / FAQ / Product-Review per page.

## 6. Affiliate links — cloaking & updates (custom)
- **Central map** in `lib/affiliate-links.ts`: `{ "petdirect-revolution-plus": "https://...tracking-url..." }`.
  Update a URL / swap a program / fix link rot → **edit one line, every page updates instantly.**
- `app/go/[link]/route.ts`: 302-redirect to the target, **log the click to Supabase**
  (key, page, timestamp) for your own EPC tracking. The affiliate **cookie is set by the
  retailer/network on arrival — we don't manage cookies**, only destinations.
- All buy links use `/go/<key>`; `rel="sponsored nofollow"`, `target="_blank"`.
- **Never hard-code prices.** Show recommendations/rankings (stable); the CTA is
  "Check price at Pet Direct →" so the live price stays on the retailer — no stale numbers,
  nothing to maintain.
- *Phase-2 option:* ingest a network product feed (e.g. Commission Factory) into Supabase via
  Vercel Cron to auto-refresh links/availability/prices.

## 7. Email + recurring-revenue automation
- Capture: `EmailCapture` → `/api/subscribe` → MailerLite group + Supabase row.
- Lead magnet: **"Free NZ Pet Flea & Worming Reminder Calendar"** (PDF).
- Automation (MailerLite, or Vercel Cron + Resend): timed **re-treat reminder** ~8 weeks
  later with the affiliate link → manufactures the repeat click (the recurring-commission play).

## 8. SEO baseline
- `generateMetadata` per page (title, description, canonical, OG); `next/og` for social images.
- JSON-LD: Article + FAQ + Product/Review; `sitemap.ts`, `robots.ts`, RSS.
- Permalinks `/<territory>/<slug>/`; internal-link rules from content-map (spoke→pillar→siblings).
- ISR (`revalidate`) so content updates without full redeploys.
- Target LCP < 2.0s — static + edge + `next/image` + self-hosted fonts gets this easily.

## 9. Trust / E-E-A-T pages (required — pet health is YMYL-adjacent)
About (who we are, why trust us, vet-reviewed), Author bio(s), Editorial policy, Affiliate
Disclosure, Privacy, Contact. Needed for Google trust **and** affiliate-program approval.

## 10. Launch checklist
1. [ ] Register healthypets.co.nz (+ .nz) at a NZ registrar; add domain in Vercel
2. [ ] `create-next-app` (TS, App Router, Tailwind); add shadcn/ui; commit; connect to Vercel
3. [ ] Lock theme tokens (§2) + fonts; build header/footer/layout + logo
4. [ ] Build core components (§5) + MDX pipeline + page templates
5. [ ] Affiliate redirect route + links map + Supabase click logging (§6)
6. [ ] Email capture API + MailerLite + reminder lead magnet (§7)
7. [ ] Trust/E-E-A-T pages (§9)
8. [ ] Publish Phase-1 parasite MDX (cat-flea pillar first) per content-map.md
9. [ ] SEO: metadata, schema, sitemap, GSC + GA4
10. [ ] Apply to Linkshop (Pet Direct) + Commission Factory (Petstock) once live
11. [ ] Deploy to production; insert cloaked links; monitor CWV + clicks

## 11. Rough monthly cost
- **Vercel Pro:** ~US$20/mo (commercial use requires it)
- **Domain:** ~NZ$25/yr
- **Supabase / MailerLite:** free tiers at launch
- **≈ US$20–25/month** (more predictable than WP once built; no plugin fees).

## 12. Honest trade-off vs WordPress
Custom = more upfront dev + ongoing maintenance (you own the code), but best-in-class speed,
total design control, no plugin bloat/security surface, and AI can generate both the MDX
content **and** the React components. Right call given you're technical and Vercel-native.
