# Style Guide: PP Solar Energy Engineering Enterprises

This file is the single source of truth for how the website looks and behaves. Every page and component MUST follow it. It works together with [RULES.md](RULES.md) §3 (frontend rules); where the two overlap, RULES.md wins.

Brand source: the company profile card (`assets-source/brand/company-profile-card.jpeg`). Its colours are royal blue, navy and sun yellow, with green for electrical services, and its tagline is "Clean Energy | Safe Future".

---

## 1. Principles

1. **Trust first.** Visitors are home owners, shop owners, factories and farmers in Odisha who want a reliable installer. Use real photos, real contact details and plain language. Never show fake numbers or testimonials.
2. **One clear action per screen.** Every section ends with at most one primary call to action, usually *Get a quote*, *Call* or *WhatsApp us*. Do not promise anything "free" unless the client confirms it.
3. **Mobile first.** Most visitors arrive on a phone. Design at 375 px first, then enhance for 768 px and 1280 px.
4. **Fast.** WebP images sized for their slot, lazy loading below the fold, lazy-loaded pages, self-hosted fonts.
5. **Accessible.** WCAG 2.2 AA: contrast ≥ 4.5:1 for text, visible focus, keyboard reachable, never colour alone.
6. **No government or political imagery.** Do not use photos of politicians, government logos or scheme branding anywhere on the site (client requirement).

---

## 2. Colour tokens

Colours are defined **only** as CSS variables in `frontend/src/styles/index.css` and exposed to Tailwind in `tailwind.config.js`. Components MUST use token classes (`bg-surface`, `text-ink`, `bg-brand`, …), never raw hex values.

| Token | Light | Dark | Use |
|---|---|---|---|
| `brand` | `#1446A0` royal blue | `#5B8DEF` | Primary buttons, links, icons |
| `brand-strong` | `#0B2A5B` navy | `#9DBBF5` | Hover state of brand, headings on tinted panels |
| `brand-soft` | `#E8EFFB` | `#14254A` | Tinted backgrounds, icon chips |
| `sun` | `#FFC72C` sun yellow | `#FFC72C` | Accent bars, highlights, secondary CTA background |
| `sun-ink` | `#0B2A5B` | `#0B2A5B` | Text placed **on** `sun` (yellow never carries white text) |
| `leaf` | `#1F7A3A` green | `#4CC27A` | Electrical-service icons, success messages |
| `danger` | `#B42318` | `#F97066` | Errors |
| `canvas` | `#FFFFFF` | `#0A1020` | Page background |
| `surface` | `#F5F7FB` | `#111A2E` | Alternate section background |
| `card` | `#FFFFFF` | `#16213A` | Cards, inputs |
| `ink` | `#0F172A` | `#E6ECF5` | Body text |
| `ink-muted` | `#475569` | `#A3B1C6` | Secondary text |
| `line` | `#E2E8F0` | `#26324A` | Borders, dividers |
| `hero` | `#0B2A5B` | `#060C1A` | Dark hero and footer bands |

Rules:
- Yellow (`sun`) is an **accent**, never body text on white (it fails contrast).
- White text is allowed only on `brand`, `brand-strong`, `hero`, `leaf` or dark image overlays.
- Photos used behind text always get a navy overlay (`bg-hero/70` or stronger) so the text keeps 4.5:1 contrast.

---

## 3. Typography

| Role | Font | Weight | Size (mobile → desktop) | Line height |
|---|---|---|---|---|
| Display (hero H1) | Poppins | 700 | 32 → 52 px | 1.15 |
| H2 section title | Poppins | 700 | 26 → 38 px | 1.2 |
| H3 card title | Poppins | 600 | 18 → 20 px | 1.3 |
| Eyebrow (above H2) | Inter | 600, uppercase, 0.12em tracking | 13 px | 1.4 |
| Body | Inter | 400 | 16 px | 1.65 |
| Small / meta | Inter | 400 | 14 px | 1.5 |
| Button | Inter | 600 | 15–16 px | 1 |

- Fonts are self-hosted through `@fontsource`. No Google Fonts requests at runtime.
- One H1 per page. Headings go in order (H1 → H2 → H3) with no skipped levels.
- Body text width is at most 70 characters (`max-w-prose`).
- Use sentence case for headings and buttons ("Get a free site survey", not "GET A FREE SITE SURVEY"). The only uppercase text is the eyebrow.

---

## 4. Spacing, layout and grid

- **Spacing scale:** Tailwind 4 px scale. Allowed steps: 1, 2, 3, 4, 6, 8, 10, 12, 16, 20, 24.
- **Container:** `max-w-7xl` (1280 px), side padding `px-4` (16 px) on mobile, `sm:px-6`, `lg:px-8`.
- **Section rhythm:** `py-16` mobile, `lg:py-24` desktop. Sections alternate `canvas` and `surface` backgrounds.
- **Breakpoints:** `sm` 640, `md` 768, `lg` 1024, `xl` 1280.
- **Grids:** 1 column on mobile, 2 at `md`, 3–4 at `lg`. Gaps are `gap-6` (cards) or `gap-8` (feature blocks).
- No horizontal scrolling at 375 px. Every layout is checked at 375 px and 1280 px.

---

## 5. Shape, elevation and motion

| Token | Value | Use |
|---|---|---|
| `rounded-lg` | 8 px | Inputs, small chips |
| `rounded-xl` | 12 px | Buttons |
| `rounded-2xl` | 16 px | Cards, images |
| `shadow-card` | soft, 1 layer | Cards at rest |
| `shadow-lift` | larger, 2 layers | Card hover, floating buttons, sticky header |

- Transitions last 150–250 ms with `ease-out`. Only `transform`, `opacity`, `color`, `background-color` and `box-shadow` are animated.
- Card hover: lift by 2 px (`-translate-y-0.5`) and change to `shadow-lift`.
- Honour `prefers-reduced-motion`: all transitions and scroll effects are turned off.
- No parallax, autoplay video or auto-advancing carousels. Moving content hurts readability and performance.
- **Page changes:** the current page stays on screen until the next one is ready. A thin `sun` progress bar appears at the top only if loading takes longer than 150 ms. The new page opens at the top instantly (never an animated scroll) and fades in over 220 ms; Back/Forward restore the previous scroll position. Page chunks are prefetched when the browser is idle.
- Never set `scroll-behavior: smooth` or `scroll-padding` on `html`: the first animates every page change, and the second makes the page jump when header links get focus. Use `scroll-margin-top` on targets instead.

---

## 6. Components

All shared components live in `frontend/src/components/ui/`. Build new screens from them and do not restyle them locally.

### Buttons (`Button`)
| Variant | Look | Use |
|---|---|---|
| `primary` | `bg-brand` white text | Main action of a section |
| `accent` | `bg-sun` navy text | Main action on dark/hero backgrounds |
| `outline` | border `brand`, text `brand` | Secondary action |
| `ghost-light` | white border/text | Secondary action on dark backgrounds |
| `whatsapp` | `leaf` background, white text | WhatsApp actions only |

- Sizes `md` (h-11) and `lg` (h-12). Minimum touch target is 44×44 px.
- Icon buttons carry an `aria-label`.
- A link styled as a button stays an `<a>`; an action stays a `<button>`.

### Section heading (`SectionHeading`)
An eyebrow (uppercase, `brand`), then the H2, then an optional lead paragraph in `ink-muted`. A 48 × 4 px `sun` bar sits under the eyebrow. Alignment is centre or left.

### Cards
- `ServiceCard`: icon chip (48 px, `brand-soft` background), H3, two-line description, "Learn more" link. Electrical services use the `leaf` chip.
- `ProjectCard`: 4:3 image, category chip, title, short caption.
- `FeatureItem`: icon + title + one sentence, used in "Why choose us".

### Page header (`PageHeader`)
Inner pages start with a navy band: breadcrumb (`Home / Page`), H1 and one lead sentence. A photo may sit behind it under a ≥ 70 % navy overlay.

### Forms
- React Hook Form + Zod (`lib/schemas.ts`). Labels are always visible above the input; placeholders are hints, never labels.
- Input height is 44 px, `rounded-lg`, `border-line`, focus ring `ring-2 ring-brand`.
- Required fields are marked with `*` and the text "(required)" for screen readers.
- Error text sits under the field in `danger`, linked through `aria-describedby`, and the field gets `aria-invalid`.
- The submit button shows a busy state and is disabled while working.

### Floating contact
A fixed bottom-right stack with *WhatsApp* and *Call*, offset by 16 px on mobile and 24 px on desktop. It must never cover form submit buttons, so the page footer has bottom padding on mobile.

### Header
- A top bar (desktop only) with phone, email and location.
- A sticky main bar with the logo, nav links, a theme toggle and the "Get a quote" CTA.
- On mobile, a menu button opens a full-width panel. The panel traps no focus and closes on route change and on `Escape`.

### Footer
Navy (`hero`) background. Four columns: brand and tagline, quick links, services, and contact (address, phones, email, GSTIN). A bottom line holds the copyright.

---

## 7. Imagery

- Use **only** the client's own project photos (`frontend/src/assets/images/`). No stock photos of people, no government, scheme or politician images.
- Source originals live in `assets-source/`. `npm run images` (in `frontend/`) crops the phone-camera watermark, resizes and exports WebP. Never commit hand-edited copies into `src/assets`.
- Every image has a meaningful `alt` describing what is shown ("Rooftop solar array on an elevated steel structure"). Decorative images use `alt=""`.
- Width and height are always set. Images below the fold use `loading="lazy"` and `decoding="async"`.
- Aspect ratios: hero 16:9 (cover), cards 4:3, gallery 4:3 thumbnails with full image in a lightbox.
- Photos showing third-party brand labels are used as project evidence only, never as if those brands were partners.

---

## 8. Iconography

- `lucide-react` only, stroke width 2, sizes 20 px (inline) and 24 px (chips).
- Icons always pair with text; an icon-only control needs an `aria-label`.

---

## 9. Content and tone

- Voice: confident, simple, local. Short sentences. Use "you" and "we".
- Lead with the benefit, then the detail: "Cut your power bill with rooftop solar. We survey, install and maintain it."
- Numbers on the site must come from the client. Calculator results are always labelled **estimate** and state their assumptions.
- No legal promises, subsidy amounts or prices unless the client has confirmed them in writing (RULES.md §1.7). Open items live in [MEMORY.md](MEMORY.md).
- Phone numbers are shown in `+91 96923 52433` format and linked with `tel:`; emails are linked with `mailto:`.

---

## 10. UX states and accessibility checklist

Every interactive screen covers:
- [ ] Default, hover, focus-visible, active and disabled states
- [ ] Loading (skeleton or busy button), empty, error (with Retry) and success states
- [ ] Keyboard: Tab order follows the visual order, `Escape` closes overlays, focus returns to the trigger
- [ ] A "Skip to content" link as the first focusable element
- [ ] `lang="en"`, a unique `<title>` and meta description per page
- [ ] Light and dark themes both pass contrast
- [ ] Checked at 375 px and 1280 px

---

## 11. Performance budget

| Asset | Budget |
|---|---|
| Initial JS (gzip) | ≤ 120 kB |
| Per-page lazy chunk (gzip) | ≤ 30 kB (forms use `zod/mini` for this reason) |
| Hero image | ≤ 180 kB WebP |
| Card / gallery image | ≤ 80 kB WebP |
| Fonts | Inter variable (latin) + Poppins 600/700 (latin) |

Production builds ship without source maps.
