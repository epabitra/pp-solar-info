import { useEffect, useRef } from 'react';
import { Outlet, ScrollRestoration, useLocation } from 'react-router';
import { FloatingContact } from './FloatingContact';
import { Footer } from './Footer';
import { Header } from './Header';
import { NavigationProgress } from './NavigationProgress';

/**
 * Page changes: the router keeps the current page until the next one is loaded,
 * ScrollRestoration jumps to the top instantly (or back to the saved position on
 * Back/Forward), and the new page fades in.
 */
export function SiteLayout() {
  const { pathname } = useLocation();
  const mainRef = useRef<HTMLElement>(null);
  const firstRender = useRef(true);

  // Tell screen-reader and keyboard users that the page changed by moving focus to the content.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    mainRef.current?.focus({ preventScroll: true });
  }, [pathname]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2 focus:text-on-brand"
      >
        Skip to content
      </a>
      <NavigationProgress />
      <Header />
      <main ref={mainRef} id="main" tabIndex={-1} className="focus:outline-none">
        <div key={pathname} className="animate-page-enter">
          <Outlet />
        </div>
      </main>
      <Footer />
      <FloatingContact />
      <ScrollRestoration />
    </>
  );
}
