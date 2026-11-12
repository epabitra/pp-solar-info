import type { ReactNode } from 'react';

/** Page-width wrapper with the standard side gutters (STYLE.md §4). */
export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

type SectionTone = 'canvas' | 'surface' | 'hero';

const tones: Record<SectionTone, string> = {
  canvas: 'bg-canvas',
  surface: 'bg-surface',
  hero: 'bg-hero text-white',
};

interface SectionProps {
  children: ReactNode;
  tone?: SectionTone;
  id?: string;
  labelledBy?: string;
  className?: string;
}

/** Vertical rhythm for page sections; alternate tones between neighbours. */
export function Section({ children, tone = 'canvas', id, labelledBy, className = '' }: SectionProps) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`${tones[tone]} py-16 lg:py-24 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

interface SectionHeadingProps {
  id: string;
  eyebrow: string;
  title: string;
  lead?: string;
  align?: 'center' | 'left';
  /** Use on dark (hero-toned) sections. */
  inverted?: boolean;
}

export function SectionHeading({ id, eyebrow, title, lead, align = 'center', inverted = false }: SectionHeadingProps) {
  const centered = align === 'center';
  return (
    <div className={`mb-10 lg:mb-14 ${centered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}`}>
      <p className={`text-[13px] font-semibold uppercase tracking-[0.12em] ${inverted ? 'text-sun' : 'text-brand'}`}>{eyebrow}</p>
      <span aria-hidden="true" className={`mt-3 block h-1 w-12 rounded-full bg-sun ${centered ? 'mx-auto' : ''}`} />
      <h2 id={id} className={`mt-4 text-[26px] font-bold leading-tight sm:text-3xl lg:text-[38px] ${inverted ? 'text-white' : ''}`}>
        {title}
      </h2>
      {lead && <p className={`mt-4 text-lg ${centered ? 'mx-auto' : ''} max-w-prose ${inverted ? 'text-white/80' : 'text-ink-muted'}`}>{lead}</p>}
    </div>
  );
}
