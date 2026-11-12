import { RefreshCw } from 'lucide-react';
import { isRouteErrorResponse, useRouteError } from 'react-router';
import { Button, ButtonAnchor } from '@/components/ui/Button';
import { Container } from '@/components/ui/Layout';
import { telUrl } from '@/lib/contactLinks';
import { primaryPhone } from '@/lib/siteConfig';

/**
 * Shown when a page fails to render or its code chunk cannot be downloaded
 * (most often after a new deployment or a dropped connection).
 */
export function RouteErrorPage() {
  const error = useRouteError();
  const notFound = isRouteErrorResponse(error) && error.status === 404;

  return (
    <main className="flex min-h-screen items-center bg-surface py-16">
      <Container className="max-w-xl text-center">
        <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-brand">{notFound ? 'Page not found' : 'Something went wrong'}</p>
        <h1 className="mt-3 text-3xl font-bold">{notFound ? "We couldn't find that page" : "This page didn't load"}</h1>
        <p className="mt-4 text-ink-muted">
          {notFound
            ? 'The link may be old or mistyped. Go back to the home page to continue.'
            : 'Please check your internet connection and try again. If it keeps happening, call us and we will help you directly.'}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {!notFound && (
            <Button onClick={() => window.location.reload()}>
              <RefreshCw aria-hidden="true" className="h-4 w-4" />
              Retry
            </Button>
          )}
          <ButtonAnchor href={import.meta.env.BASE_URL} variant="outline">
            Go to home page
          </ButtonAnchor>
          {!notFound && (
            <ButtonAnchor href={telUrl(primaryPhone)} variant="outline">
              Call {primaryPhone.display}
            </ButtonAnchor>
          )}
        </div>
      </Container>
    </main>
  );
}
