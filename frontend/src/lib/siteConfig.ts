/**
 * Company facts, taken only from the client's profile card.
 * Do not add numbers, prices, years or claims here unless the client confirms them (RULES.md §1.7).
 * Open questions are tracked in MEMORY.md.
 */
export interface PhoneNumber {
  display: string;
  /** E.164 format, used for tel: links. */
  e164: string;
}

export const company = {
  legalName: 'PP Solar Energy Engineering Enterprises',
  shortName: 'PP Solar Energy',
  tagline: 'Clean Energy | Safe Future',
  slogan: 'Powering Tomorrow',
  positioning: 'Your trusted partner in solar & electrical solutions',
  director: { name: 'Saroj Kumar, Jagannath', title: 'Director' },
  phones: [
    { display: '+91 96923 52433', e164: '+919692352433' },
    { display: '+91 73777 52602', e164: '+917377752602' },
  ],
  /** WhatsApp number, confirmed by the client. */
  whatsappE164: '+919692352433',
  email: 'ppsolarenergy26@gmail.com',
  gstin: '21CJBPJ8245A1ZT',
  address: {
    locality: 'Digapahandi',
    district: 'Ganjam',
    state: 'Odisha',
    postalCode: '761012',
  },
  promises: ['Quality work', 'On time', 'Customer satisfaction'],
} as const;

export const primaryPhone: PhoneNumber = company.phones[0];

/** Production origin, used for canonical URLs, the sitemap, structured data and llms.txt. */
export const siteUrl = 'https://ppsolarenergy.in';

export function absoluteUrl(path: string): string {
  return `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`;
}

export const fullAddress = `${company.address.locality}, ${company.address.district}, ${company.address.state} - ${company.address.postalCode}`;

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${company.address.locality} ${company.address.district} ${company.address.state} ${company.address.postalCode}`,
)}`;

/** Default WhatsApp greeting used by the floating button and CTA links. */
export const whatsappGreeting = 'Hello PP Solar Energy, I would like to know more about your solar and electrical services.';
