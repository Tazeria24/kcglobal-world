# PRD — KCGLOBAL WORLDWIDE Landing Page

## Overview

A one-page marketing site that positions KCGLOBAL WORLDWIDE as a premium, trustworthy real-estate firm in Lagos and drives consultation bookings. Audience: high-net-worth property buyers, landowners, and developers in Lagos. Primary conversion: **Book Consultation** (and secondary: phone call / contact form).

## Success criteria

- Reads as a $10k+ agency build, not a template.
- Communicates trust, luxury, professionalism, confidence, reliability.
- Fully responsive, accessible, fast, SEO-ready.
- Every contact detail correct and reachable in one tap on mobile.

## Sections (in order)

### 1. Sticky navigation
- Logo (left). Links: Home, About, Services, Properties, Contact.
- CTA button (right): **Book Consultation** → scrolls to contact.
- Sticky on scroll; shrinks / gains background + shadow after the hero.
- Mobile: hamburger toggle → full-height or slide-down menu. Closes on link tap and on `Esc`.

### 2. Hero
- Large luxury property background image + dark green overlay for legibility.
- Eyebrow (with gold hairline): the tagline treatment.
- Headline: **"Building Trust Through Exceptional Real Estate Solutions"**
- Subheadline: one sentence on the business.
- Two buttons: **View Services** (primary), **Contact Us** (secondary/outline).
- Scroll indicator at the bottom.

### 3. About
- Company overview paragraph, Mission, Vision.
- Supporting professional image.
- Optional small stat strip (years, projects, clients) — sample data, marked for review.

### 4. Services
- Premium cards for: Property Management, Property Development, Building Contractor, Lease & Let, Sales of Landed Properties.
- Each card: icon (inline SVG), title, 1–2 line description, hover animation (lift + gold accent).

### 5. Why Choose Us
- Icon cards: Years of Experience, Trusted Professionals, Transparent Process, Customer Satisfaction, Quality Construction, Reliable Property Management.

### 6. Featured Properties
- 6 elegant property cards (data in CONTENT.md).
- Each: image (Unsplash), title, location, price (₦), beds, baths, area, CTA ("View Details").
- Card hover: image zoom + lift.

### 7. Testimonials
- 3 testimonial cards, premium styling, gold quote mark motif. Sample data, marked for review.

### 8. Call-to-action band
- Luxury background (green gradient or image + overlay).
- Headline: **"Ready to Invest in Your Future?"**
- Button: **Get Started** → contact.

### 9. Contact
- Two phone numbers (as `tel:` links), address, email placeholder, Google Maps embed placeholder.
- Contact form: Name, Email, Phone, Message + submit. Client-side validation, accessible labels, success state. No backend — form is a UX shell (log to console / show success message; note where to wire a real endpoint).

### 10. Footer
- Logo, quick links, services list, social icons (inline SVG), copyright with current year.

## Global features
- Premium page-load animation (brief, tasteful — not a long spinner).
- Back-to-top button (appears after scrolling past hero).
- Smooth scrolling for in-page anchors.
- Scroll-reveal (fade + slide-up) on sections.

## Out of scope (v1)
- Real backend / form submission, CMS, property search/filtering, multi-page routing, auth. Leave clear extension points where these would attach.
