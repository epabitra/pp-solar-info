import '@fontsource-variable/inter';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import './styles/index.css';
import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { createBrowserRouter, matchRoutes, type HydrationState, type RouteObject } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import { applyTheme, readStoredTheme } from '@/hooks/useTheme';
import { prefetchPagesWhenIdle } from './pageModules';
import { basename, routes } from './routes';

declare global {
  interface Window {
    /** Written by StaticRouterProvider into every pre-rendered page. */
    __staticRouterHydrationData?: HydrationState;
  }
}

// Apply a saved theme before the first paint; without one, CSS follows the OS setting.
applyTheme(readStoredTheme());

/**
 * Pre-rendered pages must hydrate with the same tree the server produced, so the
 * lazy page module for the current URL is loaded before React takes over.
 */
async function resolveLazyRoutesForCurrentUrl(routeTable: RouteObject[]): Promise<void> {
  const matches = matchRoutes(routeTable, window.location, basename) ?? [];
  await Promise.all(
    matches.map(async ({ route }) => {
      if (typeof route.lazy !== 'function') return;
      const resolved = await route.lazy();
      Object.assign(route, resolved, { lazy: undefined });
    }),
  );
}

async function start(container: HTMLElement): Promise<void> {
  const app = (router: ReturnType<typeof createBrowserRouter>) => (
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );

  // 404.html ships an empty root; every other page is pre-rendered HTML.
  if (container.hasChildNodes()) {
    await resolveLazyRoutesForCurrentUrl(routes);
    const router = createBrowserRouter(routes, { basename, hydrationData: window.__staticRouterHydrationData });
    hydrateRoot(container, app(router));
  } else {
    createRoot(container).render(app(createBrowserRouter(routes, { basename })));
  }
  prefetchPagesWhenIdle();
}

const container = document.getElementById('root');
if (!container) throw new Error('Root element #root is missing from index.html.');

start(container).catch((error: unknown) => {
  // The page code failed to download (offline or a stale deployment). The
  // pre-rendered HTML stays readable; reloading fetches the current version.
  console.error('The page could not start. Reload to try again.', error);
});
