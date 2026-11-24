import { faqs } from '@/lib/faqs';
import { services } from '@/lib/services';
import { absoluteUrl, company, siteUrl } from '@/lib/siteConfig';
import { routes } from '@/lib/siteLinks';
import { brandImages } from './brandImages';
import type { PageSeo } from './pageSeo';

/**
 * schema.org JSON-LD (one @graph per page). Only facts from the client are
 * included: no ratings, opening hours, coordinates or service area until confirmed (MEMORY.md).
 */
type JsonLd = Record<string, unknown>;

const ids = {
  business: `${siteUrl}/#business`,
  website: `${siteUrl}/#website`,
  logo: `${siteUrl}/#logo`,
};

function businessNode(): JsonLd {
  return {
    '@type': ['LocalBusiness', 'Electrician'],
    '@id': ids.business,
    name: company.legalName,
    alternateName: company.shortName,
    slogan: company.tagline,
    description: `${company.positioning}. Solar EPC, on-grid, off-grid and hybrid solar installation, solar operation & maintenance, panel cleaning, electrical installation, LT/HT work, lighting, motor & pump repair and wiring.`,
    url: `${siteUrl}/`,
    logo: { '@type': 'ImageObject', '@id': ids.logo, url: absoluteUrl(brandImages.logo.path), width: brandImages.logo.width, height: brandImages.logo.height },
    image: absoluteUrl(brandImages.ogImage.path),
    telephone: company.phones[0].e164,
    email: company.email,
    taxID: company.gstin,
    address: {
      '@type': 'PostalAddress',
      addressLocality: company.address.locality,
      addressRegion: company.address.state,
      postalCode: company.address.postalCode,
      addressCountry: 'IN',
    },
    contactPoint: company.phones.map((phone) => ({
      '@type': 'ContactPoint',
      telephone: phone.e164,
      contactType: 'customer service',
      areaServed: 'IN',
    })),
    employee: { '@type': 'Person', name: company.director.name, jobTitle: company.director.title },
    knowsAbout: ['Solar power', 'Rooftop solar', 'Solar EPC', 'On-grid solar', 'Off-grid solar', 'Hybrid solar', 'Electrical installation', 'LT/HT electrical work'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Solar and electrical services',
      itemListElement: services.map((service) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: service.title, url: absoluteUrl(routes.service(service.slug)) },
      })),
    },
  };
}

function websiteNode(): JsonLd {
  return {
    '@type': 'WebSite',
    '@id': ids.website,
    url: `${siteUrl}/`,
    name: company.shortName,
    alternateName: company.legalName,
    inLanguage: 'en-IN',
    publisher: { '@id': ids.business },
  };
}

function breadcrumbNode(seo: PageSeo): JsonLd {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${absoluteUrl(seo.path)}#breadcrumb`,
    itemListElement: seo.breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

function webPageNode(seo: PageSeo): JsonLd {
  const url = absoluteUrl(seo.path);
  return {
    '@type': seo.pageType,
    '@id': `${url}#webpage`,
    url,
    name: seo.title,
    description: seo.description,
    inLanguage: 'en-IN',
    isPartOf: { '@id': ids.website },
    about: { '@id': ids.business },
    ...(seo.breadcrumbs.length > 1 ? { breadcrumb: { '@id': `${url}#breadcrumb` } } : {}),
    ...(seo.heroPhoto ? { primaryImageOfPage: absoluteUrl(seo.heroPhoto.variants[seo.heroPhoto.variants.length - 1]?.src ?? '') } : {}),
  };
}

function serviceNode(seo: PageSeo): JsonLd | null {
  const service = seo.service;
  if (!service) return null;
  return {
    '@type': 'Service',
    '@id': `${absoluteUrl(seo.path)}#service`,
    name: service.title,
    serviceType: service.title,
    description: [service.summary, ...service.description].join(' '),
    url: absoluteUrl(seo.path),
    provider: { '@id': ids.business },
    audience: { '@type': 'Audience', audienceType: service.idealFor.join(', ') },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${service.title}: what's included`,
      itemListElement: service.includes.map((item) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: item } })),
    },
  };
}

function servicesListNode(seo: PageSeo): JsonLd | null {
  if (seo.path !== routes.services) return null;
  return {
    '@type': 'ItemList',
    '@id': `${absoluteUrl(seo.path)}#services`,
    itemListElement: services.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: service.title,
      url: absoluteUrl(routes.service(service.slug)),
    })),
  };
}

function faqNode(seo: PageSeo): JsonLd | null {
  if (!seo.includeFaq) return null;
  return {
    '@type': 'FAQPage',
    '@id': `${absoluteUrl(seo.path)}#faq`,
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

export function buildStructuredData(seo: PageSeo): JsonLd {
  const nodes: (JsonLd | null)[] = [
    businessNode(),
    websiteNode(),
    webPageNode(seo),
    seo.breadcrumbs.length > 1 ? breadcrumbNode(seo) : null,
    serviceNode(seo),
    servicesListNode(seo),
    faqNode(seo),
  ];
  return { '@context': 'https://schema.org', '@graph': nodes.filter((node): node is JsonLd => node !== null) };
}
