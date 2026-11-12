import type { PhoneNumber } from './siteConfig';

/** Builders for the external contact channels the site uses (no backend yet). */

export function telUrl(phone: PhoneNumber): string {
  return `tel:${phone.e164}`;
}

export function mailtoUrl(email: string, subject?: string, body?: string): string {
  const params = new URLSearchParams();
  if (subject) params.set('subject', subject);
  if (body) params.set('body', body);
  const query = params.toString().replace(/\+/g, '%20');
  return query ? `mailto:${email}?${query}` : `mailto:${email}`;
}

export function whatsappUrl(e164: string, message?: string): string {
  const digits = e164.replace(/\D/g, '');
  return message ? `https://wa.me/${digits}?text=${encodeURIComponent(message)}` : `https://wa.me/${digits}`;
}
