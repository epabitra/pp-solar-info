import { copyFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath, URL } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig, type Plugin } from 'vite';

/**
 * Site base path. "/" locally and on a custom domain; "/<repo>/" for a GitHub
 * Pages project site. The deploy workflow sets BASE_PATH from actions/configure-pages.
 */
function basePath(): string {
  const raw = process.env.BASE_PATH?.trim() || '/';
  const withLeading = raw.startsWith('/') ? raw : `/${raw}`;
  return withLeading.endsWith('/') ? withLeading : `${withLeading}/`;
}

/**
 * GitHub Pages has no SPA rewrites: a deep link such as /services/solar-epc would 404.
 * Pages serves 404.html for unknown paths, so a copy of index.html lets the app boot
 * and the router render the right page.
 */
function githubPagesSpaFallback(): Plugin {
  let outDir = 'dist';
  return {
    name: 'github-pages-spa-fallback',
    apply: 'build',
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir);
    },
    async closeBundle() {
      await copyFile(resolve(outDir, 'index.html'), resolve(outDir, '404.html'));
    },
  };
}

export default defineConfig({
  base: basePath(),
  plugins: [react(), githubPagesSpaFallback()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  build: {
    sourcemap: false,
    assetsInlineLimit: 0,
  },
});
