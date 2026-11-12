import { MessageCircle, Phone } from 'lucide-react';
import { telUrl, whatsappUrl } from '@/lib/contactLinks';
import { company, primaryPhone, whatsappGreeting } from '@/lib/siteConfig';

const fabClass =
  'inline-flex h-14 w-14 items-center justify-center rounded-full text-on-brand shadow-lift transition-transform duration-200 ease-out hover:-translate-y-0.5';

/** Fixed WhatsApp + Call shortcuts (STYLE.md §6 Floating contact). */
export function FloatingContact() {
  return (
    <div className="fixed bottom-4 right-4 z-30 flex flex-col gap-3 md:bottom-6 md:right-6">
      <a
        href={whatsappUrl(company.whatsappE164, whatsappGreeting)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp (opens in a new tab)"
        title="WhatsApp us"
        className={`${fabClass} bg-leaf`}
      >
        <MessageCircle aria-hidden="true" className="h-7 w-7" />
      </a>
      <a href={telUrl(primaryPhone)} aria-label={`Call us on ${primaryPhone.display}`} title="Call us" className={`${fabClass} bg-brand`}>
        <Phone aria-hidden="true" className="h-6 w-6" />
      </a>
    </div>
  );
}
