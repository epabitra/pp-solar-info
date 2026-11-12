import { FileBadge, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router';
import { Container } from '@/components/ui/Layout';
import { mailtoUrl, telUrl } from '@/lib/contactLinks';
import { company, fullAddress, mapsUrl } from '@/lib/siteConfig';
import { mainNav, routes } from '@/lib/siteLinks';
import { services } from '@/lib/services';
import { Logo } from './Logo';

const linkClass = 'rounded text-white/75 transition-colors hover:text-sun';

function FooterHeading({ children }: { children: string }) {
  return <h2 className="font-display text-base font-semibold text-white">{children}</h2>;
}

export function Footer() {
  const year = new Date().getFullYear();
  return (
    // Extra bottom padding on mobile keeps the floating contact buttons off the copyright line.
    <footer className="bg-hero pb-24 text-sm text-white/75 md:pb-0">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr_1.4fr]">
        <div>
          <Logo inverted />
          <p className="mt-5 max-w-xs leading-relaxed">{company.positioning}. Solar EPC, installation, maintenance and electrical work.</p>
          <p className="mt-4 font-display text-base font-semibold text-sun">{company.tagline}</p>
        </div>

        <nav aria-label="Quick links">
          <FooterHeading>Quick links</FooterHeading>
          <ul className="mt-4 space-y-2.5">
            {mainNav.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Services">
          <FooterHeading>Our services</FooterHeading>
          <ul className="mt-4 space-y-2.5">
            {services.map((service) => (
              <li key={service.slug}>
                <Link to={routes.service(service.slug)} className={linkClass}>
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <FooterHeading>Contact us</FooterHeading>
          <address className="mt-4 space-y-3 not-italic">
            <p className="text-white">
              {company.director.name}
              <span className="block text-white/60">{company.director.title}</span>
            </p>
            <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className={`flex gap-3 ${linkClass}`}>
              <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-sun" />
              {fullAddress}
              <span className="sr-only">(opens Google Maps in a new tab)</span>
            </a>
            {company.phones.map((phone) => (
              <a key={phone.e164} href={telUrl(phone)} className={`flex gap-3 ${linkClass}`}>
                <Phone aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-sun" />
                {phone.display}
              </a>
            ))}
            <a href={mailtoUrl(company.email)} className={`flex gap-3 break-all ${linkClass}`}>
              <Mail aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-sun" />
              {company.email}
            </a>
            <p className="flex gap-3">
              <FileBadge aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-sun" />
              GSTIN: {company.gstin}
            </p>
          </address>
        </div>
      </Container>
      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 py-5 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {company.legalName}. All rights reserved.
          </p>
          <p>{company.slogan}</p>
        </Container>
      </div>
    </footer>
  );
}
