import type { ComponentType } from 'react';

/**
 * Code-split page modules (RULES.md §3.10). The router loads a page before it
 * navigates, so the current page stays on screen until the next one is ready.
 */
type PageModule = () => Promise<{ default: ComponentType }>;

export const pageModules = {
  home: () => import('@/pages/HomePage'),
  about: () => import('@/pages/AboutPage'),
  services: () => import('@/pages/ServicesPage'),
  serviceDetail: () => import('@/pages/ServiceDetailPage'),
  projects: () => import('@/pages/ProjectsPage'),
  calculator: () => import('@/pages/CalculatorPage'),
  contact: () => import('@/pages/ContactPage'),
  notFound: () => import('@/pages/NotFoundPage'),
} satisfies Record<string, PageModule>;

/** Adapts a page module to the router's `lazy` route API. */
export function lazyPage(load: PageModule) {
  return async () => ({ Component: (await load()).default });
}

/**
 * Downloads every page chunk once the browser is idle (they are a few kB each),
 * so later navigation is instant. A failed download is not an error here: the
 * router fetches the chunk again on navigation and shows the error page if that also fails.
 */
export function prefetchPagesWhenIdle(): void {
  const prefetch = () => {
    for (const load of Object.values(pageModules)) {
      load().catch(() => undefined);
    }
  };
  if ('requestIdleCallback' in window) window.requestIdleCallback(prefetch, { timeout: 4000 });
  else setTimeout(prefetch, 2000);
}
