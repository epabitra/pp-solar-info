import { BadgeCheck, Clock, Handshake, PlugZap } from 'lucide-react';
import { Section, SectionHeading } from '@/components/ui/Layout';

/** The three promises from the profile card, plus the solar + electrical combination. */
const reasons = [
  { icon: BadgeCheck, title: 'Quality work', text: 'Neat installations with proper earthing, protection and cable management.' },
  { icon: Clock, title: 'On time', text: 'We plan the work carefully and finish when we say we will.' },
  { icon: Handshake, title: 'Customer satisfaction', text: 'Clear advice, honest sizing and support after installation.' },
  { icon: PlugZap, title: 'Solar and electrical together', text: 'One team for your solar plant and the electrical work around it.' },
];

export function WhyChooseUs({ tone = 'surface' }: { tone?: 'canvas' | 'surface' }) {
  return (
    <Section tone={tone} labelledBy="why-title">
      <SectionHeading id="why-title" eyebrow="Why choose us" title="Clean energy, safe future" lead="What you can expect when you work with PP Solar Energy." />
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {reasons.map((reason) => {
          const Icon = reason.icon;
          return (
            <li key={reason.title} className="flex flex-col items-center rounded-2xl bg-card p-6 text-center shadow-card">
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand text-on-brand">
                <Icon aria-hidden="true" className="h-7 w-7" />
              </span>
              <h3 className="mt-5 text-lg font-semibold">{reason.title}</h3>
              <p className="mt-2 text-ink-muted">{reason.text}</p>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
