import type { RouteObject } from 'react-router';
import { AppSkeleton } from '@/components/layout/AppSkeleton';
import { SiteLayout } from '@/components/layout/SiteLayout';
import { routes as paths } from '@/lib/siteLinks';
import { RouteErrorPage } from '@/pages/RouteErrorPage';
import { lazyPage, pageModules } from './pageModules';

/**
 * Route table shared by the browser (src/main.tsx) and the build-time
 * pre-renderer (src/entry-server.tsx), so both render the same tree.
 */

/** Vite's base path ("/" on ppsolarenergy.in) without the trailing slash. */
export const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/';

export const routes: RouteObject[] = [
  {
    element: <SiteLayout />,
    errorElement: <RouteErrorPage />,
    hydrateFallbackElement: <AppSkeleton />,
    children: [
      { path: paths.home, lazy: lazyPage(pageModules.home) },
      { path: paths.about, lazy: lazyPage(pageModules.about) },
      { path: paths.services, lazy: lazyPage(pageModules.services) },
      { path: `${paths.services}/:slug`, lazy: lazyPage(pageModules.serviceDetail) },
      { path: paths.projects, lazy: lazyPage(pageModules.projects) },
      { path: paths.calculator, lazy: lazyPage(pageModules.calculator) },
      { path: paths.contact, lazy: lazyPage(pageModules.contact) },
      { path: '*', lazy: lazyPage(pageModules.notFound) },
    ],
  },
];
