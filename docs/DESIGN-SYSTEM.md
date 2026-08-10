# DESIGN-SYSTEM.md — KCGLOBAL

The visual law for the site. Every colour, font, space, and radius below becomes a CSS custom property in `:root`. Nothing outside this file's values should appear hard-coded in `style.css`.

## Design thesis

Luxury Lagos real estate, in the register of Sotheby's / Knight Frank: **editorial, calm, and confident**. Deep forest green carries authority; gold appears only as a thin thread. The page earns trust through restraint and precise spacing, not through effects. The hero is a large serif statement, not a stat block.

**Signature element:** a **thin gold hairline** (1px, `#D4AF37`) used consistently — under section eyebrows, as a short rule beneath the hero headline, and as a divider between major sections. It is the one memorable, repeated detail. Do not add competing decorative motifs.

## Colour tokens

| Token | Value | Use |
|---|---|---|
| `--green-900` | `#1B4332` | Primary — headers, dark sections, primary buttons |
| `--green-700` | `#2D6A4F` | Secondary — gradients, hovers, accents |
| `--gold` | `#D4AF37` | Accent only — hairlines, underlines, icon detail, key CTA edge. **Never body text.** |
| `--white` | `#FFFFFF` | Base background |
| `--surface` | `#F8F9FA` | Alternating section background |
| `--ink` | `#1F2937` | Primary text |
| `--ink-soft` | `#6B7280` | Secondary text, captions |
| `--overlay` | `rgba(27,67,50,0.72)` | Dark green overlay on hero/CTA images |

Contrast rule: gold on white ≈ 2:1 — fails. Gold is decoration and large-CTA edging only; all readable text is `--ink`, `--ink-soft`, `--green-900`, or white-on-dark.

## Typography

> **Font change (2026-08-10):** the pairing moved from Playfair Display / Inter to **DM Serif Display / Manrope**. Everything below reflects the current system.

- **Display:** `"DM Serif Display", Georgia, serif` — hero and page headlines, section titles, pull quotes, statistics. **Weight 400 only** (plus a true italic). The face ships no bold; hierarchy comes from size, measure and space. Never set 500/600/700 on it — that triggers synthetic bold, which smears a high-contrast serif.
- **Body/UI:** `"Manrope", system-ui, sans-serif` — paragraphs, nav, buttons, labels, prices, metadata, cards, forms, footer. Weights 400 / 500 / 600 / 700.
- **The division of labour:** the serif is *editorial* (h1, h2), the sans is *interface* (h3, h4 and everything below). DM Serif Display goes weak below ~20px, so card titles, FAQ questions and prices are all Manrope by design.
- **Fallback pair (documented only):** Poppins for display — do not use unless the client rejects the serif direction.

Google Fonts link (add `preconnect`, use `display=swap` — note the `ital` axis, the testimonials need the true italic):
```
https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Manrope:wght@400;500;600;700&display=swap
```

Type scale (fluid with `clamp`; every value is a token in `:root`):
| Role | Token | Size | Face |
|---|---|---|---|
| Hero display | `--fs-display` | `clamp(2.75rem, 6.2vw, 4.75rem)` | DM Serif 400, `lh 1.02`, `ls -0.021em` |
| Page H1 | `--fs-h1` | `clamp(2.25rem, 4.6vw, 3.5rem)` | DM Serif 400, `lh 1.08` |
| Section H2 | `--fs-h2` | `clamp(1.875rem, 3.4vw, 2.75rem)` | DM Serif 400, `lh 1.16` |
| Pull quote | `--fs-quote` | `clamp(1.25rem, 2.4vw, 1.625rem)` | DM Serif 400 italic |
| Card H3 | `--fs-h3` | `1.1875rem` | Manrope 600, `lh 1.35` |
| Body large | `--fs-body-lg` | `1.125rem` | Manrope 400, `lh 1.65` |
| Body | `--fs-body` | `1rem` | Manrope 400, `lh 1.65` |
| Small | `--fs-small` | `0.9375rem` | Manrope 400/500 |
| Nav | `--fs-nav` | `0.9375rem` | Manrope 600 (500 in the mobile panel) |
| Button | `--fs-btn` | `0.9375rem` | Manrope 600, `ls 0.05em`, uppercase |
| Caption/meta | `--fs-meta` | `0.875rem` | Manrope 500, `--ink-soft` |
| Label | `--fs-caption` | `0.8125rem` | Manrope 600, `ls 0.08em`, uppercase |
| Eyebrow | `--fs-eyebrow` | `0.75rem` | Manrope 600, `ls 0.16em`, uppercase |

Line-height tokens: `--lh-display 1.02` · `--lh-tight 1.08` · `--lh-heading 1.16` · `--lh-snug 1.35` · `--lh-body 1.65`.

Measure: body copy caps at `68ch`; long-form prose at `64ch`; the hero headline at `16ch` and page headlines at `20ch`, so a display serif never runs to a thin ribbon of a line.

## Spacing & layout

- **8px scale:** 8 / 16 / 24 / 32 / 48 / 64 / 96 / 128.
- Section vertical padding: `clamp(64px, 10vw, 128px)`.
- Container: `max-width: 1200px`, side padding `clamp(20px, 5vw, 40px)`, centred.
- Grid gaps: 24–32px. Cards: 3-up desktop → 2-up tablet → 1-up mobile.

## Radius, shadow, border

- Radius: `--r-sm: 12px`, `--r-md: 16px`, `--r-lg: 20px`, buttons `999px` (pill) or `12px` — pick one and stay consistent (recommend 12px for a more architectural feel).
- Shadow: `--shadow-sm: 0 4px 16px rgba(27,67,50,0.06)`, `--shadow-md: 0 12px 32px rgba(27,67,50,0.10)`, `--shadow-lg: 0 24px 48px rgba(27,67,50,0.14)`.
- Hairline: `1px solid var(--gold)` for the signature rule; `1px solid rgba(31,41,55,0.08)` for neutral dividers.

## Components

- **Buttons:** Primary = green fill, white text, subtle darken + 2px lift on hover, gold hairline optional on hover. Secondary = transparent with `--ink` or white border (on dark), fills on hover. Focus-visible: 2px gold outline offset.
- **Cards (service / property / testimonial):** white surface, `--r-md`, `--shadow-sm` resting → `--shadow-md` + `translateY(-6px)` on hover. Property image sits in a fixed-ratio wrapper (`overflow: hidden`) and scales to `1.06` on hover.
- **Eyebrow:** gold uppercase label preceded by a short gold hairline.
- **Nav:** transparent over hero → solid white + `--shadow-sm` + reduced height once scrolled past hero.

## Motion

CSS-first; JS only toggles classes.
- **Page load:** brief overlay (logo + gold hairline draw-in), fades out ≤ 900ms. Not a long spinner.
- **Scroll reveal:** elements start `opacity:0; translateY(24px)` → `.is-visible` transitions to `opacity:1; translateY(0)` over ~600ms ease-out. Stagger children with small `transition-delay` steps.
- **Hover:** card lift, image zoom, button darken/lift, gold underline grow on nav links.
- **Smooth scroll:** `scroll-behavior: smooth` on `html` for anchors.
- **Easing:** `cubic-bezier(0.22, 1, 0.36, 1)` for reveals and lifts.
- **Reduced motion:** under `@media (prefers-reduced-motion: reduce)`, set all transitions/animations to `none` and reveal everything immediately.

## Iconography

Inline SVG only (no icon libraries). Simple 1.5px stroke line icons in `currentColor`; tint stroke green, optional gold detail. Keep the icon set visually consistent (same stroke weight, same corner style).

## Breakpoints

Mobile-first. Enhance at `min-width: 640px`, `768px`, `1024px`, `1280px`. Verify no breakage at 360 / 768 / 1024 / 1440.
