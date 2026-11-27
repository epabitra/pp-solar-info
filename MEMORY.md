# Project memory

Decisions, open questions and known gaps for the PP Solar Energy website. Update this file whenever one of these changes (RULES.md §8.2).

## Scope (2026-11-13)
- Frontend only (React + TypeScript + Vite in `frontend/`). No backend yet.
- Content and structure are modelled on birkansolar.com (home, about, services, projects, savings calculator, contact), using only facts from the client's profile card.
- Client requirement: **no government, scheme or politician images**. No subsidy scheme (e.g. PM Surya Ghar) is mentioned on the site.

## Confirmed by the client (2026-11-13)
- WhatsApp number: +91 96923 52433.
- Town spelling: "Digapahandi".
- Photos with third-party labels or taken outside Odisha: keep them for now.
- The client will send: a logo file, real testimonials, the areas served, and figures to show (years in business, projects completed).

## To confirm with the client
| Item | Current value | Where |
|---|---|---|
| Logo file | Emblem cropped from the profile card (client will send) | `scripts/optimize-images.mjs` |
| Service area (districts/states served) | Not stated on the site (client will send) | Home, About |
| Years in business, project count, capacity installed | Not shown (client will send) | About |
| Testimonials | None shown (client will send) | Home |
| Free site visit / consultation? | Not promised; CTAs say "Get a quote" | CTAs |
| Calculator assumptions: 4 units/kW/day, 100 sq ft/kW, 0.71 kg CO₂/kWh, default ₹6/unit | Planning estimates, labelled on the page | `frontend/src/lib/calculator.ts` |
| Project locations and capacities | Only "125 kW" (visible on an inverter label) is stated | `frontend/src/lib/projects.ts` |
| Privacy policy / terms pages | Not created (legal text must come from the client) | — |
| Director name format | "Saroj Kumar, Jagannath" (with a comma, as edited in siteConfig.ts); also used in structured data and llms.txt | `frontend/src/lib/siteConfig.ts` |
| Opening hours, map pin (latitude/longitude), social media profiles | Left out of structured data until provided; all three help local ranking | `frontend/src/seo/structuredData.ts` |

## Decisions
- **Images:** originals renamed and moved to `assets-source/`; `npm run images` crops the phone-camera watermark, splits the one collage into two photos, and writes WebP (640/1280/1600 px) to `frontend/src/assets/images/`.
- Several photos show third-party labels (inverter/ACDB brands, and puja markings on the two 125 kW inverters). They appear in the gallery but not as home-page highlights.
- **Enquiry form without a backend:** opens WhatsApp with the message pre-filled, with email as a fallback. Only name, service, location, bill and message go into the `wa.me` link (no phone or email, because WhatsApp already identifies the sender). This deliberately deviates from RULES.md §3.8 (personal data in URLs) until an API exists; then replace it with `lib/api.ts` + `features/contact` hook.
- **Theme:** follows the OS setting; an explicit choice is stored in `localStorage` (UI preference only).
- **Page navigation:** pages use the router's `lazy` routes (not `React.lazy` + Suspense), so the old page stays visible while the next loads; see STYLE.md §5. Gotcha: `scroll-behavior: smooth` or `scroll-padding-top` on `html` broke this (animated scroll to top; wrong position restored on Back).
- **Hosting: GitHub Pages** via `.github/workflows/deploy-pages.yml`, on the custom domain **ppsolarenergy.in** (DNS at GoDaddy). Base path is fixed to `/` (repository variable `SITE_BASE_PATH` overrides it). Gotcha (2026-11-14): deriving it from `actions/configure-pages` built `/pp-solar-info/` before the domain was attached, so every asset returned 404 and the page was blank. Second gotcha: GoDaddy kept two parking A records (`3.33.130.190`, `15.197.148.33`) next to GitHub's four, which sent some visitors to a blank parking page and blocked the HTTPS certificate. Only GitHub's four A records may exist for `@`. `public/.nojekyll` stops Jekyll processing.
- **SEO: build-time pre-rendering (2026-11-24).** `npm run build` renders every route with React Router's static handler (`src/entry-server.tsx`), and `scripts/prerender.mjs` writes `about.html`, `services/<slug>.html` etc. GitHub Pages serves `/about` from `about.html` with HTTP 200, so every page is indexable and readable by crawlers that do not run JavaScript (most AI bots). The browser hydrates that HTML (`src/main.tsx` loads the current page's lazy module first). Unknown URLs get `404.html` (empty root, `noindex`, real 404 status).
- Titles, descriptions, canonical URLs, Open Graph and JSON-LD come from one place, `src/seo/pageSeo.ts`. `sitemap.xml`, `robots.txt`, `llms.txt` and `llms-full.txt` are generated from the same data (`src/seo/crawlerFiles.ts`): never hand-edit them in `public/`. Gotcha: anything that reads browser-only state during render (localStorage, the query string, matchMedia) must wait for hydration (`useHydrated`, or read it in an effect), or React reports a hydration mismatch.
- **React Router 7** (library mode) and **Zod 4 mini** were chosen because older router versions have open advisories and full Zod pushed the form chunk over budget.

## Known gaps
- No Content-Security-Policy or security headers: GitHub Pages cannot set response headers (RULES.md §5.2, §22). A `<meta http-equiv="Content-Security-Policy">` can cover CSP partly; `frame-ancestors` and HSTS need a different host or a CDN in front.
- **Not on Google yet (checked 2026-11-27):** a search for the exact domain finds only the GitHub repository. Technical SEO is fine (HTTPS, www→apex redirect, indexable, canonical). The cause is discovery: new domain (parked until 2026-11-14), no inbound links, not submitted to Search Console. IndexNow runs after every deploy for Bing; Google needs Search Console (README "SEO").
- Off-site SEO is not done yet: Google Business Profile, Google Search Console, Bing Webmaster Tools and local directory listings need the client's accounts (see README "SEO").
- Dependency scan runs only in the deploy workflow (`npm audit --omit=dev`), not on pull requests yet.
