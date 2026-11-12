import { Building2, Factory, Home, Tractor } from 'lucide-react';
import { Container } from '@/components/ui/Layout';

const audiences = [
  { icon: Home, title: 'Solar for homes', text: 'Lower your monthly bill with a rooftop system sized for your family.' },
  { icon: Building2, title: 'Solar for business', text: 'Cut running costs for shops, offices and schools.' },
  { icon: Factory, title: 'Industrial solar', text: 'Large rooftop solar plants with LT/HT electrical work.' },
  { icon: Tractor, title: 'Farms & pumps', text: 'Motor and pump installation and repair to keep water flowing.' },
];

/** Overlaps the hero bottom edge on large screens. */
export function AudienceStrip() {
  return (
    <section aria-label="Who we work with" className="bg-surface pb-4 pt-10 lg:pt-0">
      <Container>
        <ul className="grid gap-4 sm:grid-cols-2 lg:-mt-14 lg:grid-cols-4">
          {audiences.map((audience) => {
            const Icon = audience.icon;
            return (
              <li key={audience.title} className="relative rounded-2xl border border-line bg-card p-6 shadow-lift">
                <Icon aria-hidden="true" className="h-8 w-8 text-brand" />
                <h2 className="mt-4 text-lg font-semibold">{audience.title}</h2>
                <p className="mt-2 text-sm text-ink-muted">{audience.text}</p>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
