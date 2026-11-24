import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Layout';
import { routes } from '@/lib/siteLinks';

export default function NotFoundPage() {
  return (
    <section className="bg-surface py-24">
      <Container className="max-w-xl text-center">
        <p className="font-display text-6xl font-bold text-brand">404</p>
        <h1 className="mt-4 text-3xl font-bold">We couldn't find that page</h1>
        <p className="mt-4 text-ink-muted">The link may be old or mistyped. Try one of these instead.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink to={routes.home}>Go to home page</ButtonLink>
          <ButtonLink to={routes.services} variant="outline">
            View services
          </ButtonLink>
          <ButtonLink to={routes.contact} variant="outline">
            Contact us
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
