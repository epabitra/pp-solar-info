import { createBrowserRouter } from 'react-router';
import { AppSkeleton } from '@/components/layout/AppSkeleton';
import { SiteLayout } from '@/components/layout/SiteLayout';
import { routes } from '@/lib/siteLinks';
import { RouteErrorPage } from '@/pages/RouteErrorPage';
import { lazyPage, pageModules } from './pageModules';

/** Vite's base path ("/" locally, "/<repo>/" on GitHub Pages) without the trailing slash. */
export const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/';

export const router = createBrowserRouter(
  [
    {
      element: <SiteLayout />,
      errorElement: <RouteErrorPage />,
      hydrateFallbackElement: <AppSkeleton />,
      children: [
        { path: routes.home, lazy: lazyPage(pageModules.home) },
        { path: routes.about, lazy: lazyPage(pageModules.about) },
        { path: routes.services, lazy: lazyPage(pageModules.services) },
        { path: `${routes.services}/:slug`, lazy: lazyPage(pageModules.serviceDetail) },
        { path: routes.projects, lazy: lazyPage(pageModules.projects) },
        { path: routes.calculator, lazy: lazyPage(pageModules.calculator) },
        { path: routes.contact, lazy: lazyPage(pageModules.contact) },
        { path: '*', lazy: lazyPage(pageModules.notFound) },
      ],
    },
  ],
  { basename },
);
