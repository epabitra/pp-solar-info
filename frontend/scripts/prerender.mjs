/**
 * Pre-renders every route into static HTML after `vite build`.
 *
 * Why: GitHub Pages has no server. Without this, inner pages were served via
 * 404.html (HTTP 404, so Google would not index them) and the HTML held no
 * content for crawlers that do not run JavaScript (most AI assistants).
 *
 * Output (in dist/): index.html, about.html, services/solar-epc.html, …
 * (GitHub Pages serves /about from about.html), 404.html, sitemap.xml,
 * robots.txt, llms.txt and llms-full.txt.
 *
 * Usage: runs as part of `npm run build`.
 */
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

process.env.NODE_ENV = 'production';

const here = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(here, '../dist');
const serverDir = resolve(here, '../dist-ssr');

const SEO_REGION = /<!-- seo:start[\s\S]*?<!-- seo:end -->/;
const APP_MARKER = '<!--app-html-->';

function outputFile(path) {
  return path === '/' ? 'index.html' : `${path.replace(/^\//, '')}.html`;
}

function fillTemplate(template, headHtml, appHtml) {
  if (!SEO_REGION.test(template) || !template.includes(APP_MARKER)) {
    throw new Error('dist/index.html is missing the seo:start/seo:end comments or the <!--app-html--> marker.');
  }
  return template.replace(SEO_REGION, headHtml).replace(APP_MARKER, appHtml);
}

async function writeOutput(relativePath, content) {
  const target = join(distDir, relativePath);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, content, 'utf8');
}

async function main() {
  const template = await readFile(join(distDir, 'index.html'), 'utf8');
  const server = await import(pathToFileURL(join(serverDir, 'entry-server.js')).href);

  const paths = server.prerenderPaths();
  for (const path of paths) {
    const { appHtml, headHtml } = await server.renderPage(path);
    if (!appHtml.includes('<h1')) throw new Error(`Pre-rendered ${path} has no <h1>; the page did not render.`);
    await writeOutput(outputFile(path), fillTemplate(template, headHtml, appHtml));
  }

  // Unknown URLs: empty root, noindex. The browser app renders the not-found page.
  await writeOutput('404.html', fillTemplate(template, server.notFoundHeadHtml(), ''));

  const today = new Date().toISOString().slice(0, 10);
  for (const [name, content] of Object.entries(server.crawlerFiles(today))) {
    await writeOutput(name, content);
  }

  await rm(serverDir, { recursive: true, force: true });
  console.log(`Pre-rendered ${paths.length} pages, 404.html and ${Object.keys(server.crawlerFiles(today)).join(', ')}.`);
}

main().catch((error) => {
  console.error(`Pre-rendering failed: ${error.message}`);
  process.exitCode = 1;
});
