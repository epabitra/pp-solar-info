import { fileURLToPath, URL } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

/**
 * Site base path. "/" on the custom domain (ppsolarenergy.in); the deploy
 * workflow can override it with BASE_PATH for a <user>.github.io/<repo>/ site.
 */
function basePath(): string {
  const raw = process.env.BASE_PATH?.trim() || '/';
  const withLeading = raw.startsWith('/') ? raw : `/${raw}`;
  return withLeading.endsWith('/') ? withLeading : `${withLeading}/`;
}

// The static pages, 404.html, sitemap, robots.txt and llms*.txt are written
// after the build by scripts/prerender.mjs (see package.json "build").
export default defineConfig({
  base: basePath(),
  plugins: [react()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  build: {
    sourcemap: false,
    assetsInlineLimit: 0,
  },
});
