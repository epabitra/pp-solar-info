import { MessageCircle, Phone } from 'lucide-react';
import { ButtonAnchor, ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Layout';
import { telUrl, whatsappUrl } from '@/lib/contactLinks';
import { company, primaryPhone, whatsappGreeting } from '@/lib/siteConfig';
import { routes } from '@/lib/siteLinks';

interface CtaBannerProps {
  title?: string;
  text?: string;
}

/** Closing call to action used at the bottom of most pages. */
export function CtaBanner({
  title = 'Ready to switch to solar?',
  text = 'Tell us about your home or business. We will visit, study your needs and suggest the right system.',
}: CtaBannerProps) {
  return (
    <section aria-labelledby="cta-title" className="bg-canvas py-16 lg:py-20">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-hero px-6 py-12 text-center sm:px-12 lg:py-16">
          <div aria-hidden="true" className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-sun/20" />
          <div aria-hidden="true" className="absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-brand/30" />
          <div className="relative">
            <h2 id="cta-title" className="text-[26px] font-bold text-white sm:text-3xl lg:text-4xl">
              {title}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">{text}</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <ButtonLink to={routes.contact} variant="accent" size="lg">
                Get a quote
              </ButtonLink>
              <ButtonAnchor href={telUrl(primaryPhone)} variant="ghost-light" size="lg">
                <Phone aria-hidden="true" className="h-5 w-5" />
                Call {primaryPhone.display}
              </ButtonAnchor>
              <ButtonAnchor
                href={whatsappUrl(company.whatsappE164, whatsappGreeting)}
                target="_blank"
                rel="noopener noreferrer"
                variant="ghost-light"
                size="lg"
              >
                <MessageCircle aria-hidden="true" className="h-5 w-5" />
                WhatsApp us
              </ButtonAnchor>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
