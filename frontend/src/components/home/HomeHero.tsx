import { BadgeCheck, Clock, Handshake, MessageCircle } from 'lucide-react';
import { ButtonAnchor, ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Layout';
import { Picture } from '@/components/ui/Picture';
import { whatsappUrl } from '@/lib/contactLinks';
import { photos } from '@/lib/images';
import { company, whatsappGreeting } from '@/lib/siteConfig';
import { routes } from '@/lib/siteLinks';

const promiseIcons = [BadgeCheck, Clock, Handshake];

export function HomeHero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-hero text-white">
      <Picture photo={photos.rooftopBlueSky} sizes="100vw" priority alt="" className="absolute inset-0 -z-20 h-full w-full object-cover" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-hero via-hero/85 to-hero/40" />
      <Container className="py-20 sm:py-24 lg:py-32">
        <div className="max-w-2xl">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-sun">
            Solar & electrical · {company.address.district}, {company.address.state}
          </p>
          <h1 id="hero-title" className="mt-5 text-[32px] font-bold leading-[1.15] text-white sm:text-[44px] lg:text-[52px]">
            Your trusted partner in <span className="text-sun">solar & electrical</span> solutions
          </h1>
          <p className="mt-5 max-w-xl text-lg text-white/85">
            We design, install and maintain on-grid, off-grid and hybrid solar systems, and take care of the electrical work for homes, businesses and industries.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink to={routes.contact} variant="accent" size="lg">
              Get a quote
            </ButtonLink>
            <ButtonAnchor href={whatsappUrl(company.whatsappE164, whatsappGreeting)} target="_blank" rel="noopener noreferrer" variant="ghost-light" size="lg">
              <MessageCircle aria-hidden="true" className="h-5 w-5" />
              WhatsApp us
            </ButtonAnchor>
          </div>
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-white/90">
            {company.promises.map((promise, index) => {
              const Icon = promiseIcons[index] ?? BadgeCheck;
              return (
                <li key={promise} className="flex items-center gap-2">
                  <Icon aria-hidden="true" className="h-5 w-5 text-sun" />
                  {promise}
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}
