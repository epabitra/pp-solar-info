import { ChevronDown } from 'lucide-react';
import { Section, SectionHeading } from '@/components/ui/Layout';
import { faqs } from '@/lib/faqs';

/** Native <details> keeps the accordion keyboard- and screen-reader-friendly without extra JS. */
export function FaqSection({ tone = 'canvas' }: { tone?: 'canvas' | 'surface' }) {
  return (
    <Section tone={tone} labelledBy="faq-title">
      <SectionHeading id="faq-title" eyebrow="FAQ" title="Questions people often ask" />
      <div className="mx-auto max-w-3xl space-y-3">
        {faqs.map((faq) => (
          <details key={faq.question} className="group rounded-2xl border border-line bg-card shadow-card open:shadow-lift">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-2xl p-5 font-display text-base font-semibold text-ink [&::-webkit-details-marker]:hidden">
              {faq.question}
              <ChevronDown aria-hidden="true" className="h-5 w-5 shrink-0 text-brand transition-transform group-open:rotate-180" />
            </summary>
            <p className="px-5 pb-5 text-ink-muted">{faq.answer}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
