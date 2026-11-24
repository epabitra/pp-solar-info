import { CheckCircle2, ShieldCheck, Target, UserRound } from 'lucide-react';
import { CtaBanner } from '@/components/sections/CtaBanner';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { WhyChooseUs } from '@/components/sections/WhyChooseUs';
import { PageHeader } from '@/components/ui/PageHeader';
import { Section, SectionHeading } from '@/components/ui/Layout';
import { Picture } from '@/components/ui/Picture';
import { photos } from '@/lib/images';
import { serviceGroups, servicesByGroup } from '@/lib/services';
import { company } from '@/lib/siteConfig';

const values = [
  { icon: ShieldCheck, title: 'Safety first', text: 'Proper earthing, protection devices and clean cable routing on every job.' },
  { icon: Target, title: 'Right-sized systems', text: 'We size each system to your real load and roof, not to a standard package.' },
  { icon: CheckCircle2, title: 'Complete service', text: 'One team from the first site visit to long-term maintenance.' },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About PP Solar Energy"
        lead="Solar and electrical engineering for homes, businesses and industries in Odisha."
        crumbs={[{ label: 'About us' }]}
        photo={photos.institutionalRooftop}
      />

      <Section labelledBy="story-title">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading id="story-title" align="left" eyebrow="Who we are" title="Clean energy, safe future" />
            <div className="-mt-4 space-y-4 text-lg text-ink-muted">
              <p>
                {company.legalName} is a solar and electrical contractor based in {company.address.locality}, {company.address.district} district,{' '}
                {company.address.state}.
              </p>
              <p>
                We build solar power systems and carry out the electrical work around them: from rooftop systems for homes to larger plants for commercial and
                industrial sites, along with wiring, panels, lighting and motor and pump work.
              </p>
              <p>Our promise is simple: quality work, finished on time, with customers who are happy to recommend us.</p>
            </div>
            <div className="mt-8 flex items-center gap-4 rounded-2xl border border-line bg-card p-5 shadow-card">
              <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand">
                <UserRound aria-hidden="true" className="h-7 w-7" />
              </span>
              <div>
                <p className="font-display text-lg font-semibold">{company.director.name}</p>
                <p className="text-ink-muted">
                  {company.director.title}, {company.shortName}
                </p>
              </div>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Picture photo={photos.aerialWarehouse} sizes="(min-width: 1024px) 25vw, 50vw" className="aspect-[4/3] h-full w-full rounded-2xl object-cover sm:col-span-2" />
            <Picture photo={photos.inverterUnit1} sizes="(min-width: 1024px) 25vw, 50vw" className="aspect-[4/3] w-full rounded-2xl object-cover" />
            <Picture photo={photos.ltPanel} sizes="(min-width: 1024px) 25vw, 50vw" className="aspect-[4/3] w-full rounded-2xl object-cover" />
          </div>
        </div>
      </Section>

      <Section tone="surface" labelledBy="values-title">
        <SectionHeading id="values-title" eyebrow="How we work" title="What we stand for" />
        <ul className="grid gap-6 md:grid-cols-3">
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <li key={value.title} className="rounded-2xl bg-card p-6 shadow-card">
                <Icon aria-hidden="true" className="h-8 w-8 text-brand" />
                <h3 className="mt-4 text-lg font-semibold">{value.title}</h3>
                <p className="mt-2 text-ink-muted">{value.text}</p>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section labelledBy="expertise-title">
        <SectionHeading id="expertise-title" eyebrow="Our expertise" title="Solar and electrical, one team" />
        <div className="grid gap-6 md:grid-cols-2">
          {(['solar', 'electrical'] as const).map((group) => (
            <div key={group} className="rounded-2xl border border-line bg-card p-6 shadow-card sm:p-8">
              <h3 className="text-xl font-semibold">{serviceGroups[group].title}</h3>
              <p className="mt-2 text-ink-muted">{serviceGroups[group].lead}</p>
              <ul className="mt-5 space-y-3">
                {servicesByGroup(group).map((service) => (
                  <li key={service.slug} className="flex gap-3">
                    <CheckCircle2 aria-hidden="true" className={`mt-0.5 h-5 w-5 shrink-0 ${group === 'solar' ? 'text-brand' : 'text-leaf'}`} />
                    <span>
                      <span className="font-semibold">{service.title}</span>
                      <span className="text-ink-muted"> ({service.scope})</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <WhyChooseUs tone="surface" />
      <ProcessSection tone="canvas" />
      <CtaBanner title="Let's talk about your project" />
    </>
  );
}
