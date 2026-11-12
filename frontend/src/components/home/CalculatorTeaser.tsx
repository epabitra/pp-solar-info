import { Calculator } from 'lucide-react';
import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Layout';
import { routes } from '@/lib/siteLinks';

export function CalculatorTeaser() {
  return (
    <section aria-labelledby="calc-teaser-title" className="bg-brand py-12">
      <Container className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-4">
          <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-sun text-sun-ink">
            <Calculator aria-hidden="true" className="h-7 w-7" />
          </span>
          <div>
            <h2 id="calc-teaser-title" className="text-2xl font-bold text-on-brand">
              How much could you save?
            </h2>
            <p className="mt-1 text-on-brand opacity-90">Enter your monthly bill and get an estimated system size and yearly savings in seconds.</p>
          </div>
        </div>
        <ButtonLink to={routes.calculator} variant="accent" size="lg" className="shrink-0">
          Try the savings calculator
        </ButtonLink>
      </Container>
    </section>
  );
}
