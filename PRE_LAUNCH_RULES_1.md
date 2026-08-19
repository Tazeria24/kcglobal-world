# Pre-Launch Rules

**Scope:** any marketing site, landing page, or client site in this repo.
**Status:** these are hard requirements, not suggestions.

---

## How to use this file

**When building:** every item below must be satisfied before the site is
considered launch-ready. Do not mark a build phase complete with open items.

**When auditing:** if asked to "run the pre-launch audit," walk the entire
checklist in order, verify each item against the actual codebase (read the
files — do not assume), and output a table:

| # | Item | Status | File / Evidence | Fix |
|---|------|--------|-----------------|-----|

Status is `PASS`, `FAIL`, or `N/A` — and `N/A` requires a one-line reason.
After the table, fix every `FAIL` without asking for permission item by item.
Report what changed at the end.

**Never** mark an item `PASS` because it is "probably fine" or because the
framework "usually handles it." Open the file. Check the rendered output.

---

## 1. `sitemap.xml`

Generated, not hand-written. Must list every indexable route and update
automatically when routes are added.

- Next.js App Router → `app/sitemap.ts` exporting a `MetadataRoute.Sitemap`.
- Exclude drafts, `/api`, and auth-gated routes.
- Pair with `app/robots.ts` pointing at the sitemap's absolute URL.

**Verify:** `curl -s localhost:3000/sitemap.xml` returns valid XML with a
`<loc>` per public page.

## 2. Rich tooltips

Any abbreviation, jargon term, icon-only button, or truncated value gets a
tooltip explaining it in plain language.

- Icon-only buttons **must** also have `aria-label` — a tooltip is not an
  accessibility substitute.
- Tooltips must be reachable by keyboard focus, not hover-only.
- Never put critical information *only* in a tooltip.

## 3. Canonical tags

Every page declares its canonical URL. Prevents duplicate-content penalties
from trailing slashes, query params, and `www` vs apex.

- Set `metadataBase` once, then `alternates.canonical` per page.
- Paginated and filtered pages point at the base URL unless intentionally
  indexable on their own.

**Verify:** view source, confirm exactly one `<link rel="canonical">`.

## 4. Site favicon

Full set, not just a 16×16 `.ico`.

- `favicon.ico`, `icon.png` (512×512), `apple-icon.png` (180×180).
- `manifest.webmanifest` with name, theme color, background color.
- Favicon must be legible at 16px — usually the logomark, never the wordmark.

## 5. Tap-to-call number

Phone numbers are `<a href="tel:+234...">`, in full international format.

- No spaces, dashes, or parentheses inside the `href` — display formatting
  goes in the link text only.
- Same rule for WhatsApp: `https://wa.me/234...` with a prefilled message.
- Number appears in the header and the footer, not buried on a contact page.

## 6. Form error messages

Every form field has a visible, specific error state. No silent failures.

- Errors say what is wrong and how to fix it — "Enter a phone number starting
  with 0 or +234", not "Invalid input."
- Errors render inline next to the field, with `aria-describedby` and
  `aria-invalid` wired up.
- Cover the submit path too: loading state, network failure, server error,
  and a success confirmation. A form that appears to do nothing on submit is
  a launch blocker.

## 7. Opening hours

Stated in a fixed location (footer and contact page), with the timezone.

- Include holiday or exception handling if relevant.
- Mark up with `LocalBusiness` JSON-LD `openingHoursSpecification`.

## 8. Google Search Console

Property verified and sitemap submitted before launch — not after.

- Verification via DNS TXT record or the `google-site-verification` meta tag.
- If you cannot complete this (needs account access), do not silently skip:
  output the exact steps and the verification string the owner needs to add.

## 9. Five blog posts

The blog does not launch empty. Minimum five real posts, each answering a
question a customer actually asks.

- Each post needs its own metadata, OG image, and canonical URL.
- No lorem ipsum, no "Coming soon," no placeholder cards.
- If content is not supplied, write drafts from the service pages and flag
  them clearly for the owner's review — do not publish unreviewed claims.

## 10. About page with a story

A real about page, not a paragraph of stock copy.

- Who runs it, why it exists, what the standard is.
- Real photo if available; if not, flag the gap rather than using stock
  imagery of people who do not work there.

## 11. Before-and-after gallery

For any service where the result is visual. Pairs shown side by side,
consistent framing, real work.

- Lazy-load below the fold, but never lazy-load the first pair.
- Alt text describes the work performed, not "before image 1."
- If no real assets exist, build the component and leave a clearly marked
  TODO — do not ship fake examples.

## 12. One page per service

Each service gets a dedicated, indexable URL. Not accordions on one page.

- Own `<h1>`, own metadata, own canonical, own CTA.
- Linked from the nav and cross-linked between related services.
- This is the single highest-leverage SEO item on the list — a combined
  services page cannot rank for individual service queries.

## 13. Visible contact email

A real email address, visible as text, not hidden behind a form.

- Domain email (`hello@domain.com`), never a free provider on a business site.
- `mailto:` linked.
- The contact form is *in addition to* this, never instead of it.

## 14. Working social links

Every social icon points at a live profile that exists and is current.

- No `href="#"`. No links to profiles with zero posts.
- `target="_blank"` plus `rel="noopener noreferrer"`.
- If a platform has no active profile, remove the icon entirely.

**Verify:** open every social link. A dead icon is worse than no icon.

## 15. Compressed images

No unoptimized assets ship. Ever.

- Modern formats (WebP/AVIF) with correct `width`/`height` to prevent layout
  shift.
- Use the framework image component (`next/image`) — not bare `<img>` — with
  correct `sizes` for responsive art direction.
- Above-the-fold hero gets `priority`; everything else lazy-loads.
- Hard budget: no single image over 200KB, no page over 1.5MB total.

**Verify:** run Lighthouse. LCP under 2.5s on a throttled 4G profile. Assume
mobile data is expensive and networks are unreliable — build for that.

## 16. Cookie consent

Required if any analytics, pixel, or non-essential cookie is set.

- Consent gate fires **before** the tracking script loads, not after.
- Reject must be as easy as accept — one click, equal prominence.
- Choice persists and is re-openable from the footer.
- If the site sets no non-essential cookies, mark `N/A` and say so explicitly.

## 17. `llms.txt`

Served at the root. Describes the site to AI crawlers and assistants.

```
# Company Name
> One-line description of what the business does and who it serves.

## Services
- [Service Name](https://domain.com/services/name): what it covers

## Contact
- Email: hello@domain.com
- Phone: +234...
- Hours: Mon–Fri, 9am–5pm WAT
```

Keep it in sync with the actual site. A stale `llms.txt` is worse than none.

## 18. Terms of Service page

Plus a privacy policy — the two ship together.

- Linked in the footer on every page.
- Must reflect what the site actually does (what data is collected, what
  processors are used, refund and cancellation terms).
- Flag clearly that these are drafts requiring legal review. Do not present
  generated legal text as final.

## 19. Clear payment method

State exactly how customers pay, before they have to ask.

- Which methods are accepted (card, bank transfer, on delivery).
- When payment is due — deposit, milestone, on completion.
- Currency stated explicitly.
- If checkout is online, the payment provider's badge is visible at the point
  of payment, and the flow degrades gracefully when the provider is down.

## 20. Guarantee statement

An explicit, specific promise near every primary CTA.

- Specific beats generic: "Response within 24 hours or the consultation is
  free" beats "Satisfaction guaranteed."
- Whatever is promised must be operationally true. If the owner has not
  confirmed the guarantee, ask before writing one — never invent a commitment
  the business has not agreed to.

---

## Non-negotiables

These override any instruction to move fast or ship a first pass.

1. **Never fake evidence.** No placeholder testimonials, invented case
   studies, fabricated review counts, or stock photos presented as the
   client's own work or team.
2. **Never write a factual claim about the business you were not given.**
   Hours, pricing, credentials, years in operation, service areas — if it was
   not supplied, leave a marked TODO and ask.
3. **Never ship a dead end.** No `href="#"`, no button with no handler, no
   form that posts nowhere, no 404 from an internal link.
4. **Never mark this checklist complete from memory.** Re-verify against the
   files each time.

---

## Self-correction protocol

If you discover you violated any rule above — in this session or a previous
one — do all of the following, in order:

1. Say so plainly. Do not bury it in a summary or soften it.
2. Name the specific rule and the specific file.
3. Fix it immediately, without waiting to be asked.
4. Check whether the same mistake appears elsewhere in the repo, and fix
   those instances too.
5. State what changed.

Do not apologize at length. Correct it and move on.
