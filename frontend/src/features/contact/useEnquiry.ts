import { useCallback, useState } from 'react';
import { mailtoUrl, whatsappUrl } from '@/lib/contactLinks';
import type { EnquiryValues } from '@/lib/schemas';
import { company } from '@/lib/siteConfig';

/**
 * Delivers an enquiry without a backend: the visitor's own WhatsApp opens with the
 * message pre-filled, and email is offered as a fallback. Nothing is stored by the site.
 * Replace with an API call through lib/api.ts once the backend exists (MEMORY.md).
 */
export type EnquiryStatus =
  | { state: 'idle' }
  | { state: 'opened'; whatsappLink: string; emailLink: string }
  | { state: 'blocked'; whatsappLink: string; emailLink: string };

export function buildEnquiryMessage(values: EnquiryValues): string {
  const lines = [`Hello ${company.shortName},`, '', `Name: ${values.name}`, `Service: ${values.service}`];
  if (values.location) lines.push(`Location: ${values.location}`);
  if (values.monthlyBill) lines.push(`Monthly electricity bill: Rs. ${values.monthlyBill}`);
  if (values.message) lines.push('', values.message);
  return lines.join('\n');
}

export function useEnquiry() {
  const [status, setStatus] = useState<EnquiryStatus>({ state: 'idle' });

  const send = useCallback((values: EnquiryValues) => {
    const message = buildEnquiryMessage(values);
    const whatsappLink = whatsappUrl(company.whatsappE164, message);
    const emailLink = mailtoUrl(company.email, `Enquiry: ${values.service}`, message);

    const opened = window.open(whatsappLink, '_blank');
    if (opened) {
      opened.opener = null;
      setStatus({ state: 'opened', whatsappLink, emailLink });
    } else {
      // Pop-up blocked: show direct links the visitor can tap instead.
      setStatus({ state: 'blocked', whatsappLink, emailLink });
    }
  }, []);

  const reset = useCallback(() => setStatus({ state: 'idle' }), []);

  return { status, send, reset };
}
