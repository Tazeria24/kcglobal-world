# KCGLOBAL Worldwide — Website

Premium multi-page marketing site for a Lagos luxury real-estate firm. Hand-built with HTML, CSS, and vanilla JS — no frameworks, no build step.

## Run it
Open `index.html` in any browser. That's it — there's no server or install.

## Structure
```
/
├── index.html            # home — condensed teaser of every section
├── about.html            # the firm, mission & vision, how we work, standards
├── services.html         # the five services, each with a full scope + fees
├── why-choose-us.html    # the six reasons, expanded, and what we won't do
├── properties.html       # full portfolio, titles explained, buying process
├── faq.html              # all questions, grouped (owns the FAQPage schema)
├── contact.html          # details, map, and the enquiry form
├── privacy.html          # privacy policy — linked from the footer, not the nav
├── 404.html              # not-found page — root-absolute paths, noindex, unlisted
├── css/style.css         # all styles, shared by every page (token-driven)
├── js/script.js          # nav, reveals, lightbox, form UX — shared, no-ops
│                         #   cleanly on pages missing a given element
├── assets/               # logo, favicon
├── netlify.toml          # publish config, security headers, caching
├── robots.txt · sitemap.xml
├── CLAUDE.md             # build rules / project memory (read first)
└── docs/
    ├── PRD.md            # what to build
    ├── DESIGN-SYSTEM.md  # colours, type, spacing, motion
    ├── CONTENT.md        # brand copy + property data (source of truth)
    └── BUILD-PLAN.md     # phase-by-phase build order
```

There is no templating: **the header and footer are duplicated into all eight pages on purpose**, since a no-build site has no includes and duplication keeps the chrome working without JavaScript. Change the nav or footer in one file and you must change it in all eight.

## Building with Claude Code
Open this folder in Claude Code and paste `prompts/KICKOFF-PROMPT.md`. Claude Code reads `CLAUDE.md` automatically and follows `docs/BUILD-PLAN.md`.

## Before launch
Replace everything marked **[SAMPLE — client review]** in `docs/CONTENT.md` (properties, testimonials, stats), and everything flagged in the pages with `<!-- REVIEW: sample data -->` or `<!-- REVIEW: expanded copy -->`. The expanded copy on the detail pages was authored to the brief and includes **commitments, fee structures and process promises the client must confirm or strike** — these carry legal and reputational weight, so do not launch without a read-through.

Also: confirm the email and social handles, swap the Google Maps embed for the client's exact pin, drop the real logo into `assets/`, and verify the Netlify form endpoint receives submissions.

The canonical host is the live Vercel URL as of 2026-08-19 — it was a placeholder domain that does not resolve, which told Google to index an address that does not exist and kept the site out of the index entirely. If a custom domain is connected, change it in every page's `canonical` and `og:url`, in `sitemap.xml`, `robots.txt` and the JSON-LD on `index.html`, all in one pass.

**Getting found on Google needs two things the code cannot do:** submit the site in Google Search Console (verify ownership, submit `sitemap.xml`, request indexing), and create a Google Business Profile for the Abule-Ado address — the business panel that appears beside a company-name search comes from that profile, not from the website.

## Brand
- **KCGLOBAL Worldwide** — *We Set The Pace In Real Estate*
- No. 5 Oteyi Garden Estate Road, Abule-Ado, Lagos State, Nigeria
- 08030555002 · 08182341691
