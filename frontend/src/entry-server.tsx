import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { createStaticHandler, createStaticRouter, StaticRouterProvider } from 'react-router';
import { siteUrl } from '@/lib/siteConfig';
import { buildLlmsFullTxt, buildLlmsTxt, buildRobotsTxt, buildSitemapXml } from '@/seo/crawlerFiles';
import { renderHeadHtml } from '@/seo/headTags';
import { getPageSeo, indexablePages, notFoundSeo } from '@/seo/pageSeo';
import { basename, routes } from './routes';

/**
 * Build-time renderer used by scripts/prerender.mjs. Each route is rendered to
 * static HTML so search engines and AI crawlers (most of which do not run
 * JavaScript) receive full content, metadata and an HTTP 200 on GitHub Pages.
 */
export interface RenderedPage {
  appHtml: string;
  headHtml: string;
}

export async function renderPage(path: string): Promise<RenderedPage> {
  const handler = createStaticHandler(routes, { basename });
  const context = await handler.query(new Request(new URL(path, siteUrl)));
  if (context instanceof Response) {
    throw new Error(`Route ${path} returned a redirect (${context.status}); pre-rendered routes must render directly.`);
  }
  const router = createStaticRouter(handler.dataRoutes, context);
  const appHtml = renderToString(
    <StrictMode>
      <StaticRouterProvider router={router} context={context} />
    </StrictMode>,
  );
  return { appHtml, headHtml: renderHeadHtml(getPageSeo(path)) };
}

export function prerenderPaths(): string[] {
  return indexablePages().map((page) => page.path);
}

export function notFoundHeadHtml(): string {
  return renderHeadHtml(notFoundSeo);
}

export function crawlerFiles(lastModified: string): Record<string, string> {
  return {
    'sitemap.xml': buildSitemapXml(lastModified),
    'robots.txt': buildRobotsTxt(),
    'llms.txt': buildLlmsTxt(),
    'llms-full.txt': buildLlmsFullTxt(),
  };
}
