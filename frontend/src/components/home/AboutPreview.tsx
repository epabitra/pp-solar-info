import { CheckCircle2 } from 'lucide-react';
import { ButtonLink } from '@/components/ui/Button';
import { Section, SectionHeading } from '@/components/ui/Layout';
import { Picture } from '@/components/ui/Picture';
import { photos } from '@/lib/images';
import { company } from '@/lib/siteConfig';
import { routes } from '@/lib/siteLinks';

const highlights = [
  'Complete service: survey, design, installation, commissioning and maintenance',
  'Solar and electrical work handled by one team',
  'Systems sized to your actual load and roof',
  'Residential, commercial and industrial projects',
];

export function AboutPreview() {
  return (
    <Section tone="surface" labelledBy="about-preview-title">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="relative">
          <Picture photo={photos.aerialIndustrial} sizes="(min-width: 1024px) 50vw, 100vw" className="aspect-[4/3] w-full rounded-2xl object-cover shadow-lift" />
          <div className="absolute -bottom-6 right-4 max-w-[240px] rounded-2xl bg-sun p-5 text-sun-ink shadow-lift sm:right-6">
            <p className="font-display text-lg font-bold leading-snug">{company.tagline}</p>
          </div>
        </div>
        <div className="pt-6 lg:pt-0">
          <SectionHeading
            id="about-preview-title"
            align="left"
            eyebrow="About us"
            title="Solar and electrical engineering you can rely on"
            lead={`${company.legalName} is a solar and electrical contractor based in ${company.address.locality}, ${company.address.district}, ${company.address.state}.`}
          />
          <ul className="-mt-4 space-y-3">
            {highlights.map((item) => (
              <li key={item} className="flex gap-3">
                <CheckCircle2 aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-leaf" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <ButtonLink to={routes.about} variant="outline" className="mt-8">
            More about us
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
