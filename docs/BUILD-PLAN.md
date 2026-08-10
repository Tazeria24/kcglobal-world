# BUILD-PLAN.md — KCGLOBAL

Build in this order. Finish and self-check each phase before the next. Keep the site openable from `index.html` at every phase — no build step, ever.

## Phase 0 — Scaffold
- Create the file structure from `CLAUDE.md §2`.
- `index.html` with semantic skeleton: `header/nav`, `main` with empty `section`s (hero, about, services, why, properties, testimonials, cta, contact), `footer`.
- Add `<head>`: charset, viewport, title + meta description + Open Graph (from CONTENT.md), Google Fonts preconnect + link, favicon, link to `css/style.css`, defer `js/script.js`.
- Placeholder `assets/logo.svg` (simple house + gold roofline mark) and `favicon.svg`.
- **Check:** valid HTML, one `h1`, page loads with no errors.

## Phase 1 — Design tokens & base
- In `style.css`: `:root` with every token from `DESIGN-SYSTEM.md` (colours, fonts, spacing scale, radii, shadows, easing).
- Base reset, typography defaults, container class, `scroll-behavior: smooth`, `font-display: swap`.
- Define the reduced-motion media query block early.
- **Check:** fonts render, tokens resolve, base type scale looks right.

## Phase 2 — Navigation
- Sticky nav, transparent over hero → solid + shadow after scroll (JS toggles a class on scroll).
- Desktop links with gold underline-grow hover; **Book Consultation** CTA.
- Mobile hamburger → menu; closes on link click and `Esc`; focus managed.
- **Check:** works at 360px and 1440px; keyboard operable.

## Phase 3 — Hero
- Full-viewport hero, background image + `--overlay`, eyebrow (gold hairline), H1, subheadline, two buttons, scroll indicator.
- Signature gold hairline under the headline.
- **Check:** text legible over image; buttons reachable; no overflow on mobile.

## Phase 4 — About + Why Choose Us
- About: overview, mission, vision, image, sample stat strip.
- Why: six icon cards (inline SVG), responsive grid.
- **Check:** grid reflows 3→2→1; icons consistent.

## Phase 5 — Services
- Five premium service cards (icon, title, description) with hover lift + gold accent.
- **Check:** consistent card heights; hover feels intentional.

## Phase 6 — Featured Properties
- Six property cards from CONTENT.md: image (ratio-locked, zoom on hover), title, location, price ₦, beds/baths/area meta row, **View Details** CTA.
- Land card handles missing beds/baths gracefully.
- `loading="lazy"` on all property images; real `alt` text.
- **Check:** prices formatted with ₦ + separators; grid reflows cleanly.

## Phase 7 — Testimonials + CTA band
- Three testimonial cards with gold quote motif.
- CTA band: green gradient/overlay, headline, **Get Started** → contact.
- **Check:** contrast holds on the dark band.

## Phase 8 — Contact + Footer
- Contact: both phones as `tel:`, address, email, Maps embed placeholder, accessible form with validation + success state + backend TODO comment.
- Footer: logo, quick links, services, social SVG icons (WhatsApp → wa.me link), dynamic-year copyright.
- **Check:** every contact detail matches CONTENT.md exactly; form validates and announces success.

## Phase 9 — Motion & polish
- `IntersectionObserver` scroll reveals (fade + slide-up, staggered).
- Page-load animation (brief, tasteful).
- Back-to-top button (appears past hero, smooth-scrolls up).
- **Check:** all motion disabled under `prefers-reduced-motion`; no jank.

## Phase 10 — Final QA
Run the full quality floor from `CLAUDE.md §4`:
- Breakpoints 360 / 768 / 1024 / 1440 — no breaks.
- Keyboard nav + visible focus everywhere.
- Contrast, alt text, labels, single h1, landmark structure.
- Reduced-motion path.
- No console errors; lazy-loading works; title/meta/OG present.
- Final read: does it look like a $10k+ agency build, not a template? If any section reads generic, revise it and note what changed.
