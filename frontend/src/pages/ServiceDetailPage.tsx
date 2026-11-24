import { CheckCircle2, MessageCircle, Phone, Users } from 'lucide-react';
import { useParams } from 'react-router';
import { CtaBanner } from '@/components/sections/CtaBanner';
import { ServiceCard } from '@/components/sections/ServiceCard';
import { ButtonAnchor, ButtonLink } from '@/components/ui/Button';
import { PageHeader } from '@/components/ui/PageHeader';
import { Section, SectionHeading } from '@/components/ui/Layout';
import { Picture } from '@/components/ui/Picture';
import { telUrl, whatsappUrl } from '@/lib/contactLinks';
import { photos } from '@/lib/images';
import { findService, services, type Service } from '@/lib/services';
import { company, primaryPhone } from '@/lib/siteConfig';
import { routes } from '@/lib/siteLinks';
import NotFoundPage from './NotFoundPage';

function ContactCard({ service }: { service: Service }) {
  const message = `Hello ${company.shortName}, I would like to know more about ${service.title}.`;
  return (
    <aside aria-labelledby="service-contact-title" className="rounded-2xl bg-hero p-6 text-white shadow-lift lg:sticky lg:top-28">
      <h2 id="service-contact-title" className="text-xl font-semibold text-white">
        Interested in {service.title}?
      </h2>
      <p className="mt-2 text-white/80">Tell us about your site and we will get back to you.</p>
      <div className="mt-6 flex flex-col gap-3">
        <ButtonLink to={`${routes.contact}?service=${encodeURIComponent(service.title)}`} variant="accent">
          Get a quote
        </ButtonLink>
        <ButtonAnchor href={whatsappUrl(company.whatsappE164, message)} target="_blank" rel="noopener noreferrer" variant="ghost-light">
          <MessageCircle aria-hidden="true" className="h-5 w-5" />
          WhatsApp us
        </ButtonAnchor>
        <ButtonAnchor href={telUrl(primaryPhone)} variant="ghost-light">
          <Phone aria-hidden="true" className="h-5 w-5" />
          {primaryPhone.display}
        </ButtonAnchor>
      </div>
    </aside>
  );
}

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const service = findService(slug);

  if (!service) return <NotFoundPage />;

  const Icon = service.icon;
  const related = services.filter((other) => other.group === service.group && other.slug !== service.slug).slice(0, 3);

  return (
    <>
      <PageHeader
        title={service.title}
        lead={service.summary}
        crumbs={[{ label: 'Services', to: routes.services }, { label: service.title }]}
        photo={service.photo ? photos[service.photo] : undefined}
      />

      <Section labelledBy="service-overview-title">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:gap-12">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-3 py-1.5 text-sm font-semibold text-brand">
              <Icon aria-hidden="true" className="h-4 w-4" />
              {service.scope}
            </p>
            <h2 id="service-overview-title" className="mt-5 text-2xl font-bold sm:text-3xl">
              Overview
            </h2>
            <div className="mt-4 max-w-prose space-y-4 text-lg text-ink-muted">
              {service.description.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            {service.photo && (
              <Picture photo={photos[service.photo]} sizes="(min-width: 1024px) 66vw, 100vw" className="mt-8 aspect-[16/9] w-full rounded-2xl object-cover shadow-card" />
            )}

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-line bg-card p-6 shadow-card">
                <h3 className="text-lg font-semibold">What's included</h3>
                <ul className="mt-4 space-y-3">
                  {service.includes.map((item) => (
                    <li key={item} className="flex gap-3">
                      <CheckCircle2 aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-leaf" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-line bg-card p-6 shadow-card">
                <h3 className="text-lg font-semibold">Ideal for</h3>
                <ul className="mt-4 space-y-3">
                  {service.idealFor.map((item) => (
                    <li key={item} className="flex gap-3">
                      <Users aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <ContactCard service={service} />
        </div>
      </Section>

      {related.length > 0 && (
        <Section tone="surface" labelledBy="related-title">
          <SectionHeading id="related-title" eyebrow="Related" title="Other services you may need" />
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((other) => (
              <li key={other.slug}>
                <ServiceCard service={other} />
              </li>
            ))}
          </ul>
        </Section>
      )}

      <CtaBanner />
    </>
  );
}
