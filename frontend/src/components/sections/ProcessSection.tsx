import { ClipboardCheck, Hammer, LineChart, MapPinned } from 'lucide-react';
import { Section, SectionHeading } from '@/components/ui/Layout';
import { processSteps } from '@/lib/process';

const stepIcons = [MapPinned, ClipboardCheck, Hammer, LineChart];

export function ProcessSection({ tone = 'canvas' }: { tone?: 'canvas' | 'surface' }) {
  return (
    <Section tone={tone} labelledBy="process-title">
      <SectionHeading id="process-title" eyebrow="How we work" title="From first visit to long-term care" lead="A simple four-step process, handled by one team." />
      <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {processSteps.map((step, index) => {
          const Icon = stepIcons[index] ?? MapPinned;
          return (
            <li key={step.title} className="relative rounded-2xl border border-line bg-card p-6 shadow-card">
              <span aria-hidden="true" className="absolute right-5 top-4 font-display text-4xl font-bold text-brand/15">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-sun text-sun-ink">
                <Icon aria-hidden="true" className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-lg font-semibold">
                <span className="sr-only">Step {index + 1}: </span>
                {step.title}
              </h3>
              <p className="mt-2 text-ink-muted">{step.text}</p>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
