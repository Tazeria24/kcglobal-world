# CLAUDE.md — KCGLOBAL WORLDWIDE Website

> This is the operating manual for building this site. Read it fully before writing any code, and re-read the relevant section before each task. The detailed specs live in `/docs`. This file is the source of truth for **rules**; the docs are the source of truth for **content and design tokens**.

---

## 1. What we are building

A premium, multi-page marketing website for a Lagos real-estate firm. It must read as an **award-winning luxury property brand** (think Sotheby's International Realty, Knight Frank), not a template.

> **Architecture change (2026-08-10):** this began as a single page and is now seven pages — a home page of condensed teasers plus a dedicated page per section. The home page sells; the inner pages convince. Sections below have been updated to match; where a rule still says "the page", read "each page".

- **Client:** KCGLOBAL WORLDWIDE
- **Tagline:** *We Set The Pace In Real Estate*
- **Location:** No. 5 Oteyi Garden Estate Road, Abule-Ado, Lagos State, Nigeria
- **The one job of this page:** make a high-net-worth Lagos property buyer or landowner trust this firm enough to book a consultation.

Full requirements: `docs/PRD.md`. Full copy and property data: `docs/CONTENT.md`. Design tokens: `docs/DESIGN-SYSTEM.md`. Task order: `docs/BUILD-PLAN.md`.

---

## 2. Tech stack — hard rules

**Use only:**
- HTML5 (semantic)
- CSS3 (hand-written, custom properties for tokens)
- Vanilla JavaScript — only where it earns its place (mobile nav toggle, scroll reveals, back-to-top, form UX, sticky-nav state). No JS for anything CSS can do.

**Never use:** Bootstrap, Tailwind, React, Vue, Angular, jQuery, or any build tooling. No npm, no bundler. The site must open by double-clicking `index.html`.

**File structure — build exactly this:**

```
/
├── index.html            (home — condensed teaser of every section)
├── about.html
├── services.html
├── why-choose-us.html
├── properties.html
├── faq.html
├── contact.html          (the only page carrying the enquiry form)
├── css/
│   └── style.css         (one stylesheet, shared by every page)
├── js/
│   └── script.js         (one script, shared by every page)
├── assets/
│   ├── logo.svg          (placeholder mark until real logo is dropped in)
│   └── favicon.svg
├── netlify.toml · robots.txt · sitemap.xml
└── docs/                 (specs — not shipped)
```

**One stylesheet and one script, shared across all pages.** Do not split CSS into multiple files or add a per-page script. Every module in `script.js` must no-op cleanly when its element is absent from the current page — that is how one file serves seven pages.

**Header and footer markup is duplicated into every page, deliberately.** With no build step there are no includes, and duplication beats JS injection: the chrome renders without scripting and every page stays crawlable. The cost is that a change to the nav or footer must be applied to all seven files — do it in one pass, and diff them afterwards.

---

## 3. Design law (summary — full version in DESIGN-SYSTEM.md)

- **Palette:** Deep Forest Green `#1B4332` (primary), `#2D6A4F` (secondary), Luxury Gold `#D4AF37` (accent, used sparingly — hairlines, underlines, key CTAs), `#FFFFFF` / `#F8F9FA` backgrounds, `#1F2937` / `#6B7280` text.
- **Type:** Display = **DM Serif Display** (editorial serif, luxury) — **weight 400 only**, it ships no bold, so never set 500/600/700 on it or the browser fakes one and the serif smears. Body/UI = **Manrope** (400/500/600/700). Load both from Google Fonts, including DM Serif's italic axis. The serif is editorial (`h1`, `h2`, pull quotes, statistics); the sans is interface (`h3`, `h4`, cards, nav, buttons, prices, forms, footer) — DM Serif goes weak below ~20px, which is why card titles and prices are Manrope by design. Poppins is a documented fallback only. Full scale in DESIGN-SYSTEM.md; every size, weight, leading and tracking value is a `:root` token — never hard-code one.
- **Signature element:** a **thin gold hairline rule** motif — under eyebrows, between sections, framing the hero headline. This is the one thread that ties the brand together. Spend the boldness here; keep everything else quiet.
- **Feel:** generous whitespace, soft shadows, rounded corners (12–20px), precise spacing on an 8px scale, confident type hierarchy.
- **Motion:** CSS-first. Fade-in + slide-up on scroll (via `IntersectionObserver` toggling a class), image zoom on hover, card lift on hover, smooth scroll, subtle nav shrink on scroll. Restraint over spectacle — no effect that doesn't serve trust.

---

## 4. Quality floor — non-negotiable

Every commit must satisfy all of these:

- **Responsive** with no layout breaks at 360px, 768px, 1024px, 1440px. Mobile-first CSS.
- **Accessible:** semantic landmarks (`header`, `nav`, `main`, `section`, `footer`), one `h1`, logical heading order, `alt` on every image, labelled form fields, visible keyboard focus states, colour contrast ≥ 4.5:1 for text (gold text on white fails — never use gold for body copy).
- **`prefers-reduced-motion: reduce`** disables all animation and reveals content statically.
- **SEO, per page:** a *unique* `<title>` and meta description, matching Open Graph tags, a self-referencing `<link rel="canonical">`, `lang="en"`, and descriptive headings. No two pages may share a title or description.
- **Navigation state:** the current page's nav link carries `aria-current="page"` in the markup (not via JS), and every inner page opens with a breadcrumb.
- **One owner per content block:** a given block of content lives on exactly one URL. Teasers on the home page are shortened, not duplicated, and page-level structured data (FAQPage, and later ItemList) belongs to the page that owns the content.
- **Performance:** no render-blocking beyond fonts; `loading="lazy"` on below-fold images; `font-display: swap`.
- **No console errors.**

---

## 5. Content rules

- Pull **all** copy, phone numbers, address, services, and property listings from `docs/CONTENT.md`. Do not invent or paraphrase contact details — the address and both phone numbers must appear exactly as written.
- Property listings, testimonials, and "why choose us" stats in CONTENT.md are **realistic sample data marked for client review** — build with them, but leave a `<!-- REVIEW: sample data -->` comment near each block so they're easy to swap.
- The detail pages need more copy than CONTENT.md carries. That expanded copy is **authored in-page**, in the brand's register, and every block of it is flagged `<!-- REVIEW: expanded copy — ... -->` with a note on what the client must confirm. CONTENT.md stays the source of truth for brand, contact details, services, listings and testimonials; it does not attempt to mirror the authored page copy, which would only drift.
- **Authored copy must not invent verifiable facts.** Scopes, commitments and process steps are fair to draft because the client can confirm or strike them. Fees, response times, title claims, credentials, awards, team names and client counts are not — flag anything of that kind rather than inventing it. Never fabricate testimonials or reviews, and never emit `Review` or `aggregateRating` structured data over sample quotes.
- **No prices anywhere.** The client instructed on 2026-08-19 that listing prices are not to be published. Cards, the lightbox and the WhatsApp enquiry text all omit them, and no `Offer` / `priceRange` structured data is emitted. Location and specification still show. Do not reintroduce a price — including a "from" figure or a price band — without the client asking.
- Images: Unsplash placeholders via the URLs listed in CONTENT.md. Every image needs a real `alt`.

---

## 6. How to work

- Follow `docs/BUILD-PLAN.md` phase by phase. Don't jump ahead; get the shell and design tokens right before decorating.
- Write CSS token-first: define all custom properties in `:root`, then never hard-code a colour, font, or spacing value below that.
- Watch selector specificity — keep section spacing on the section element, not on child utility classes, so paddings don't cancel out.
- Comment each major section of every file with a clear banner (`/* ===== HERO ===== */`).
- After each phase, self-check against the quality floor above before moving on.
- If something in the brief is ambiguous, make the luxury-correct choice, state the assumption in a comment, and keep moving.

---

## 7. Definition of done

The site is done when it opens from `index.html` with no server, **every page navigates to every other page with no dead links**, each passes the quality floor at all four breakpoints, every section in the PRD is present and populated from CONTENT.md, motion respects reduced-motion, and a first-time visitor would believe this firm charges a premium. It should not look like it came from a template.

Before calling it done, check across all seven pages: no duplicate `<title>`; every internal `href` resolves to a file and, where anchored, to an `id` that exists on it; the header and footer are identical everywhere; and one `<h1>` per page.
