# PP Solar Energy Engineering Enterprises: website

Marketing website for PP Solar Energy Engineering Enterprises (Digapahandi, Ganjam, Odisha). Frontend only for now.

- [STYLE.md](STYLE.md): design system and UI/UX standards
- [RULES.md](RULES.md): engineering rules (frontend section applies)
- [MEMORY.md](MEMORY.md): decisions, open client questions and known gaps

## Requirements
- Node.js 20+ (tested on 22) and npm 10+

## Run locally
```bash
cd frontend
npm install
npm run dev        # http://localhost:5173
```

## Build
```bash
npm run build      # type-check + production build into frontend/dist
npm run preview    # serve the build at http://localhost:4173
```
To test a GitHub Pages project-site build locally: `BASE_PATH=/<repo-name>/ npm run build`.

## Deploy (GitHub Pages)
1. Push this folder to a GitHub repository with `main` as the default branch.
2. In the repository, open **Settings → Pages** and set **Source** to **GitHub Actions**.
3. Every push to `main` runs [.github/workflows/deploy-pages.yml](.github/workflows/deploy-pages.yml): install, `npm audit`, build, deploy. You can also run it by hand from the **Actions** tab.

The site is published at `https://<user>.github.io/<repo>/`. The base path is detected automatically, and it also works with a custom domain (set it under Settings → Pages). Deep links such as `/services/solar-epc` work through a generated `404.html`.

## Images
Client photos live in `assets-source/` (originals, renamed). To regenerate the web images after adding or changing a photo:
```bash
cd frontend
npm run images
```
Then register the photo in `src/lib/images.ts`. Never use government, scheme or politician images.

## Project structure
```
assets-source/          original client photos and the profile card
frontend/
  scripts/              image pipeline
  src/
    assets/images/      generated WebP (do not edit by hand)
    components/
      ui/               Button, Section, PageHeader, form fields, Picture
      layout/           header, footer, floating contact, site layout
      sections/         shared page sections (process, FAQ, CTA, …)
      home/             home-page sections
    features/           contact form, savings calculator, project gallery
    hooks/              theme, document meta
    lib/                company facts, routes, services, projects, schemas, formatting
    pages/              one lazy-loaded component per route
    styles/index.css    design tokens (light + dark)
```

Company facts (phones, email, GSTIN, address) are edited in `frontend/src/lib/siteConfig.ts` only.
