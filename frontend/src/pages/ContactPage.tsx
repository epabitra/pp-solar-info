import type { LucideIcon } from 'lucide-react';
import { FileBadge, Mail, MapPin, MessageCircle, Phone, UserRound } from 'lucide-react';
import type { ReactNode } from 'react';
import { useSearchParams } from 'react-router';
import { PageHeader } from '@/components/ui/PageHeader';
import { Section } from '@/components/ui/Layout';
import { EnquiryForm } from '@/features/contact/EnquiryForm';
import { mailtoUrl, telUrl, whatsappUrl } from '@/lib/contactLinks';
import { company, fullAddress, mapsUrl, whatsappGreeting } from '@/lib/siteConfig';

function ContactItem({ icon: Icon, title, children }: { icon: LucideIcon; title: string; children: ReactNode }) {
  return (
    <li className="flex gap-4">
      <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
        <Icon aria-hidden="true" className="h-5 w-5" />
      </span>
      <div className="min-w-0">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-muted">{title}</h3>
        <div className="mt-1 text-ink">{children}</div>
      </div>
    </li>
  );
}

const linkClass = 'rounded font-medium text-brand underline-offset-4 hover:underline';

export default function ContactPage() {
  const [searchParams] = useSearchParams();
  const requestedService = searchParams.get('service') ?? undefined;

  return (
    <>
      <PageHeader title="Contact us" lead="Tell us what you need. We are happy to visit your site and suggest the right solution." crumbs={[{ label: 'Contact' }]} />
      <Section labelledBy="contact-form-title">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-14">
          <div>
            <h2 className="text-2xl font-bold">Get in touch</h2>
            <p className="mt-2 text-ink-muted">Call or WhatsApp us directly, or send the enquiry form.</p>
            <ul className="mt-8 space-y-6">
              <ContactItem icon={Phone} title="Phone">
                <ul className="space-y-1">
                  {company.phones.map((phone) => (
                    <li key={phone.e164}>
                      <a href={telUrl(phone)} className={linkClass}>
                        {phone.display}
                      </a>
                    </li>
                  ))}
                </ul>
              </ContactItem>
              <ContactItem icon={MessageCircle} title="WhatsApp">
                <a href={whatsappUrl(company.whatsappE164, whatsappGreeting)} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  Chat with us on WhatsApp
                </a>
              </ContactItem>
              <ContactItem icon={Mail} title="Email">
                <a href={mailtoUrl(company.email)} className={`${linkClass} break-all`}>
                  {company.email}
                </a>
              </ContactItem>
              <ContactItem icon={MapPin} title="Address">
                <address className="not-italic">{fullAddress}</address>
                <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className={`${linkClass} mt-1 inline-block text-sm`}>
                  Open in Google Maps<span className="sr-only"> (opens in a new tab)</span>
                </a>
              </ContactItem>
              <ContactItem icon={UserRound} title={company.director.title}>
                {company.director.name}
              </ContactItem>
              <ContactItem icon={FileBadge} title="GSTIN">
                {company.gstin}
              </ContactItem>
            </ul>
          </div>
          <div>
            <h2 id="contact-form-title" className="text-2xl font-bold">
              Send an enquiry
            </h2>
            <p className="mb-6 mt-2 text-ink-muted">Fields marked * are required.</p>
            <EnquiryForm defaultService={requestedService} />
          </div>
        </div>
      </Section>
    </>
  );
}
