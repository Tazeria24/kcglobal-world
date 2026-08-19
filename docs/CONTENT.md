# CONTENT.md — KCGLOBAL

Single source of truth for all copy and data. Use verbatim. Blocks marked **[SAMPLE — client review]** are realistic placeholders; build with them but flag each with an HTML comment so they're easy to replace.

---

## Page map (added 2026-08-10)

The site is seven pages, not one. Each section below feeds both the home-page teaser and the detail page that owns it:

| Page | Owns |
|---|---|
| `index.html` | Hero, a shortened teaser of every section below, **and Testimonials in full** — the three quotes live only here, in a section, not on a page of their own |
| `about.html` | About, Mission & Vision, stat strip, how we work, standards |
| `services.html` | The five services in full scope, plus fees |
| `why-choose-us.html` | The six reasons, expanded, plus what we will not do |
| `properties.html` | All six listings, titles explained, the buying process |
| `faq.html` | All eight questions, grouped — and the FAQPage structured data |
| `contact.html` | Contact details, map, and the only enquiry form on the site |

**On expanded copy.** The detail pages carry more prose than this file specifies. That copy is authored in-page in the brand's register and flagged there with `<!-- REVIEW: expanded copy — ... -->`; it is deliberately **not** mirrored here, because two copies of the same paragraphs drift apart within a week. This file remains authoritative for brand, contact details, services, listings, testimonials and SEO — if those conflict with a page, this file wins.

**What the authored copy may and may not assert.** Service scopes, commitments and process steps are drafted for the client to confirm or strike. Fees, response times, title claims, credentials, awards, team names and client counts are never invented — and no testimonial or review is ever fabricated, nor emitted as `Review` / `aggregateRating` structured data while the quotes below are samples.

---

## Brand

- **Name:** KCGLOBAL WORLDWIDE
- **Tagline:** We Set The Pace In Real Estate
- **Business lines:** Property Management · Building Contractor · Property Development · Lease & Let · Sales of Landed Properties

## Contact — use exactly, do not alter

- **Address:** No. 5 Oteyi Garden Estate Road, Abule-Ado, Lagos State, Nigeria
- **Phone 1:** 08030555002  → `tel:+2348030555002`
- **Phone 2:** 08182341691  → `tel:+2348182341691`
- **Email:** info@kcglobalworld.com  *(placeholder — confirm with client)*

---

## Hero

- **Eyebrow:** We Set The Pace In Real Estate
- **Headline:** Building Trust Through Exceptional Real Estate Solutions
- **Subheadline:** From property management to landed sales and development, KCGLOBAL Worldwide delivers reliable, professional real-estate services across Lagos — built on transparency and lasting value.
- **Primary button:** View Services
- **Secondary button:** Contact Us

---

## About

**Overview:** KCGLOBAL Worldwide is a Lagos-based real-estate firm offering an end-to-end service — from managing and leasing properties to developing land and delivering quality construction. We work with buyers, landlords, and investors who expect their property decisions handled with care, clarity, and professionalism.

- **Mission:** To deliver dependable, transparent real-estate solutions that protect our clients' investments and set the standard for service in Lagos.
- **Vision:** To be the most trusted name in Nigerian real estate — known for integrity, quality, and results.

**Stat strip [SAMPLE — client review]:** 15+ Years' Experience · 200+ Properties Managed · 500+ Satisfied Clients

---

## Services

1. **Property Management** — Full-service management for landlords and investors: rent collection, tenant relations, maintenance, and reporting — handled transparently on your behalf.
2. **Property Development** — Turning land into value. We plan, finance, and deliver residential and mixed-use developments to a high standard.
3. **Building Contractor** — Quality construction from foundation to finish, with experienced project supervision and honest timelines.
4. **Lease & Let** — Matching quality tenants to quality properties, and managing leases so both sides are protected.
5. **Sales of Landed Properties** — Verified plots and homes across Lagos, with clean titles and guidance through every step of the purchase.

---

## Why Choose Us

1. **Years of Experience** — A track record across management, sales, and development in the Lagos market.
2. **Trusted Professionals** — A team that treats your property and capital as their own.
3. **Transparent Process** — Clear terms, honest pricing, and no surprises.
4. **Customer Satisfaction** — Relationships that outlast the transaction.
5. **Quality Construction** — Built to standard, delivered on schedule.
6. **Reliable Property Management** — Consistent, accountable management you can step back from.

---

## Featured Properties  [SAMPLE — client review]

Realistic Lagos luxury listings. Replace with live inventory before launch.

**No prices.** The client instructed on 2026-08-19 that no price is to appear
anywhere on the site. Prices were removed from every card, from the lightbox and
from the WhatsApp enquiry text; the price column was deleted from this table so
nobody reinstates one from here. Buyers are told to ask. Do not add a price back
without the client saying so.

| # | Title | Location | Beds | Baths | Area | Image query |
|---|---|---|---|---|---|---|
| 1 | 4-Bedroom Terrace Duplex | Lekki Phase 1, Lagos | 4 | 5 | 350 sqm | modern luxury duplex exterior |
| 2 | 5-Bedroom Detached Duplex | Ikoyi, Lagos | 5 | 6 | 600 sqm | luxury detached house |
| 3 | Serviced 3-Bedroom Apartment | Victoria Island, Lagos | 3 | 3 | 210 sqm | modern apartment interior |
| 4 | 648 sqm Dry Plot (C-of-O) | Abijo GRA, Ajah, Lagos | — | — | 648 sqm | land plot for sale |
| 5 | 4-Bedroom Semi-Detached Duplex | Chevron, Lekki, Lagos | 4 | 4 | 300 sqm | contemporary townhouse |
| 6 | 6-Bedroom Contemporary Mansion | Banana Island, Ikoyi, Lagos | 6 | 7 | 850 sqm | luxury mansion architecture |

**Photography is the client's own — do not go back to Unsplash.** As of
2026-08-19 all six listings use the client's photographs, in
`assets/properties/`, named by what they show. The "Image query" column above
is kept only as a record of what the placeholders were. The Unsplash pattern
below still applies to the page hero images and the og:image, which are still
stock **and stay that way** — the client reviewed them on 2026-08-19 and asked
that they be kept. Do not offer to replace them again.

- Card CTA label: **View Details**
- For land (row 4), hide beds/baths or show "—".
- Unsplash placeholder pattern (source URL — swap the query per card):
  `https://source.unsplash.com/800x600/?luxury,house,architecture`
  Prefer specific queries above for variety. Every image needs a descriptive `alt` (e.g. "4-bedroom terrace duplex in Lekki Phase 1").

---

## Testimonials  [SAMPLE — client review]

1. **Adebayo Okonkwo — Property Investor, Lekki:** "KCGLOBAL managed my rental portfolio for three years without a single headache. Transparent, responsive, and genuinely trustworthy."
2. **Ngozi Eze — Homeowner, Ikoyi:** "They found us the right home and handled the paperwork end to end. The process felt safe — which is rare in Lagos real estate."
3. **Ibrahim Salako — Developer, Ajah:** "Quality construction, delivered on schedule. KCGLOBAL is the contractor I now recommend to everyone I know."

---

## Call-to-action band

- **Headline:** Ready to Invest in Your Future?
- **Subline:** Speak with our team and take the next step with confidence.
- **Button:** Get Started

---

## Contact section

- **Heading:** Let's Talk Property
- **Sub:** Book a consultation or reach us directly — we respond quickly.
- Phones (both, as `tel:` links), address, email (above).
- **Map:** Google Maps embed placeholder centred on Abule-Ado, Lagos (leave a clearly-commented `<iframe>` placeholder to swap for the client's exact pin).
- **Form fields:** Full Name, Email, Phone, Message, submit button "Send Message". On submit: validate, show an inline success message, and leave a `// TODO: wire to backend/endpoint` comment. No real submission in v1.

---

## Footer

- Logo + one-line descriptor: "Setting the pace in Lagos real estate."
- Quick links: Home, About, Services, Properties, Contact.
- Services list (five lines above).
- Social icons (inline SVG): Facebook, Instagram, LinkedIn, WhatsApp (link WhatsApp to `https://wa.me/2348030555002`). Placeholder hrefs — confirm handles with client.
- Copyright: © [current year] KCGLOBAL Worldwide. All rights reserved. (Compute the year in JS so it never goes stale.)

## SEO

- **Title:** KCGLOBAL Worldwide — Luxury Real Estate in Lagos
- **Meta description:** Premium property management, development, and sales in Lagos. KCGLOBAL Worldwide sets the pace in Nigerian real estate — trusted, transparent, professional.
