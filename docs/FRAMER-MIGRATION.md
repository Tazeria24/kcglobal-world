# FRAMER-MIGRATION.md — porting KCGLOBAL into the Framer template

Working brief for the Framer template rebrand, captured so it survives a Claude Code
restart. The connector is configured in `.mcp.json` (git-ignored — it carries a secret).

**Status:** blocked on the `unframer` MCP server loading. MCP servers register at
startup, so Claude Code must be restarted and the project server approved before any
of this can be executed.

---

## The one rule

**Port content into the template. Do not redesign the template.**

Layout, spacing, section order, component structure, fonts, animations and
interactions stay exactly as the template ships them.

---

## What changes

| Item | Action |
|---|---|
| Body copy, headings, labels | Replace with KCGLOBAL copy — **length-matched** (see below) |
| Property listing images | **Replace** with KCGLOBAL's listing photos |
| Property details (price, location, beds, baths, area, type) | **Replace** with KCGLOBAL's six listings |
| Logo / wordmark | Replace with KCGLOBAL World Enterprises |
| Phone, email, address | Replace with the exact values below |
| Social links | Repoint to KCGLOBAL (placeholders until client confirms handles) |
| Nav / footer / CTA links | Repoint to KCGLOBAL pages |
| Forms | Repoint to KCGLOBAL's endpoint |
| Accent colour | Remap per the palette section below |

## What does NOT change

| Item | Action |
|---|---|
| **All non-property images** — hero, section backgrounds, textures, decorative | **Keep as-is.** Do not replace or delete. |
| Layout, grid, spacing, section order | Keep |
| Fonts and type scale | Keep (the template's, not the HTML site's DM Serif / Manrope) |
| Animations, transitions, interactions | Keep |
| Component structure | Keep |

## Copy length discipline

Every replacement string should land close to the character count of the template
string it replaces. Framer layouts are tuned to their placeholder copy; a headline
that doubles in length reflows the section or overflows its container.

- Match the original's length band, not its wording.
- Where KCGLOBAL's real copy is too long, compress it — never let it reflow the design.
- Where it is too short, do not pad; short is safe, long is not.
- Check every slot visually after replacing.

---

## Palette

KCGLOBAL's colours (from `docs/DESIGN-SYSTEM.md`):

| Token | Hex | Role |
|---|---|---|
| Deep Forest Green | `#1B4332` | Primary — brand, CTA fills, dark bands |
| Secondary Green | `#2D6A4F` | Hover states, secondary fills |
| Luxury Gold | `#D4AF37` | Accent — hairlines, underlines, small edging |
| Surface | `#F8F9FA` | Light background |
| Ink / Ink-soft | `#1F2937` / `#6B7280` | Body text |

**Mapping rule — read this before touching a colour variable.**

The template's *primary/accent* colour maps to **Deep Forest Green `#1B4332`**, not
to gold. Gold is KCGLOBAL's accent in the decorative sense only.

Gold on white measures roughly **2:1 contrast — it fails WCAG AA (4.5:1)**. If the
template uses its accent for button fills with light text, link text, or body copy,
mapping that to gold produces unreadable UI. `CLAUDE.md` §4 already forbids it:
*"gold text on white fails — never use gold for body copy."*

So:
- Template primary / CTA fill / active states → `#1B4332`
- Template hover / secondary → `#2D6A4F`
- Gold `#D4AF37` → hairlines, underlines, dividers, small icon accents, edging
- Gold is acceptable as **text on dark green** (5.3:1) — that combination passes

---

## Content sources

`docs/CONTENT.md` is authoritative for brand, contact, services, listings and
testimonials. The seven built HTML pages carry the expanded copy.

- **5 services** — `docs/CONTENT.md` › Services; full scopes in `services.html`
- **6 reasons** — `docs/CONTENT.md` › Why Choose Us; expanded in `why-choose-us.html`
- **6 property listings** — `docs/CONTENT.md` › Featured Properties (table); markup
  with image URLs and galleries in `properties.html`
- **3 testimonials** — `docs/CONTENT.md` › Testimonials
- **8 FAQs** — `faq.html`
- **3 stats** — 15+ years · 200+ properties managed · 500+ satisfied clients

### Contact — use exactly, do not alter

- **Address:** No. 5 Oteyi Garden Estate Road, Abule-Ado, Lagos State, Nigeria
- **Phone 1:** 08030555002 → `tel:+2348030555002`
- **Phone 2:** 08182341691 → `tel:+2348182341691`
- **Email:** info@kcglobalworld.com *(placeholder — confirm with client)*
- **WhatsApp:** `https://wa.me/2348030555002`
- **Tagline:** We Set The Pace In Real Estate

---

## Slot counts — all content goes in

Every item ships. The template bends to the content, not the other way round.

| Collection | Count | Rule |
|---|---|---|
| FAQs | **8** | All eight. |
| Testimonials | **3** | All three. |
| Property listings | **6** | All six. |

- **Template has more slots than content** → delete the surplus slots.
- **Template has fewer slots than content** → duplicate the existing slot/card
  component to add more. Duplicate the template's own component so styling,
  spacing and animation are inherited — never hand-build a new one.
- Never pad with invented filler to fill a slot, and never silently drop an item.

## Map

Add a location map for the office. Same keyless embed already used on the HTML
site's contact page, so no API key is needed:

```
https://www.google.com/maps?q=Abule-Ado,+Lagos,+Nigeria&output=embed
```

Place it where the template's contact/location section expects a map or media
block. If the template has no such slot, put it in the contact section using the
template's existing media/embed component.

**TODO(client):** this is centred on Abule-Ado generally, not the exact door.
Replace with the share-embed URL from KCGLOBAL's Google Business Profile, or the
exact pin for No. 5 Oteyi Garden Estate Road, before launch.

## Carry-over cautions

- **Sample data.** Listings, prices, testimonials and stats are placeholders flagged
  `REVIEW` in the HTML. They will carry into Framer as sample data and must be
  replaced before the client publishes. Do not present them as real.
- **Slot-count mismatch.** The template will not have exactly 6 listing slots, 8 FAQ
  slots or 3 testimonial slots. Inventory the template first and agree what gets cut
  or repeated — do not silently drop content or invent filler.
- **Geography.** Retained template background photography may depict non-Lagos
  locations. Per instruction these stay; flag any that read badly for a Lagos firm so
  the client can decide.
- **No fabrication.** Do not invent testimonials, awards, credentials, team members,
  fees or response times to fill a template slot. Leave it empty and flag it.

---

## Execution order (once connected)

1. Inventory the template — pages, CMS collections, components, colour variables,
   slot counts. Change nothing yet.
2. Present the mapping (template slot → KCGLOBAL content) for approval.
3. Remap colour variables.
4. Replace copy, length-matched, page by page.
5. Replace property images and details.
6. Add or delete listing / FAQ / testimonial slots so all 6 / 8 / 3 items fit.
7. Add the location map to the contact section.
8. Repoint logo, links, socials, contact, forms.
9. Review every page at each breakpoint for reflow or overflow.
10. Report what was flagged, cut, or left empty.
