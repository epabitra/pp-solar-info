import { photos, type Photo } from '@/lib/images';
import { findService, services, type Service } from '@/lib/services';
import { company, primaryPhone } from '@/lib/siteConfig';
import { routes } from '@/lib/siteLinks';

/**
 * Search metadata for every route: one source used by the build-time
 * pre-renderer (static <head>, sitemap) and by the browser on navigation.
 * Copy follows RULES.md §1.7: no prices, subsidies or unconfirmed claims.
 */
export type WebPageType = 'WebPage' | 'AboutPage' | 'ContactPage' | 'CollectionPage';

export interface Breadcrumb {
  name: string;
  path: string;
}

export interface PageSeo {
  /** Canonical path without trailing slash ("/" for home). */
  path: string;
  title: string;
  description: string;
  pageType: WebPageType;
  breadcrumbs: Breadcrumb[];
  noindex?: boolean;
  /** The page's largest above-the-fold image, preloaded to speed up Largest Contentful Paint. */
  heroPhoto?: Photo;
  /** Images listed for this URL in the image sitemap. */
  images: Photo[];
  service?: Service;
  includeFaq?: boolean;
  sitemap?: { priority: number; changefreq: 'weekly' | 'monthly' | 'yearly' };
}

const brand = company.shortName;
const location = `${company.address.district}, ${company.address.state}`;
const home: Breadcrumb = { name: 'Home', path: routes.home };

function pageTitle(title: string): string {
  return `${title} | ${brand}`;
}

export function normalizePath(pathname: string): string {
  const trimmed = pathname.replace(/\/+$/, '');
  return trimmed === '' ? '/' : trimmed;
}

function servicePage(service: Service): PageSeo {
  return {
    path: routes.service(service.slug),
    title: pageTitle(`${service.title} in ${location}`),
    description: `${service.summary} ${brand}, ${company.address.locality}, ${location}. Call ${primaryPhone.display}.`,
    pageType: 'WebPage',
    breadcrumbs: [home, { name: 'Services', path: routes.services }, { name: service.title, path: routes.service(service.slug) }],
    heroPhoto: service.photo ? photos[service.photo] : undefined,
    images: service.photo ? [photos[service.photo]] : [],
    service,
    sitemap: { priority: 0.8, changefreq: 'monthly' },
  };
}

const staticPages: Record<string, PageSeo> = {
  [routes.home]: {
    path: routes.home,
    title: `${brand} | Solar Panel Installation & Electrical Contractor in ${location}`,
    description: `Solar EPC, rooftop solar installation (on-grid, off-grid, hybrid), solar O&M, panel cleaning and electrical work for homes, businesses and industries in ${location}. Call ${primaryPhone.display}.`,
    pageType: 'WebPage',
    breadcrumbs: [home],
    heroPhoto: photos.rooftopBlueSky,
    images: [photos.rooftopBlueSky, photos.aerialIndustrial, photos.facade, photos.aerialWarehouse],
    includeFaq: true,
    sitemap: { priority: 1, changefreq: 'weekly' },
  },
  [routes.about]: {
    path: routes.about,
    title: pageTitle(`About Us: Solar & Electrical Contractor in ${company.address.locality}, ${company.address.district}`),
    description: `${company.legalName} is a solar and electrical contractor in ${company.address.locality}, ${location}, led by Director ${company.director.name}. Quality work, on time.`,
    pageType: 'AboutPage',
    breadcrumbs: [home, { name: 'About us', path: routes.about }],
    heroPhoto: photos.institutionalRooftop,
    images: [photos.institutionalRooftop, photos.aerialWarehouse, photos.inverterUnit1, photos.ltPanel],
    sitemap: { priority: 0.7, changefreq: 'monthly' },
  },
  [routes.services]: {
    path: routes.services,
    title: pageTitle(`Solar & Electrical Services in ${location}`),
    description: `Solar EPC, on-grid, off-grid and hybrid solar installation, O&M, panel cleaning, electrical installation, LT/HT work, lighting, motor & pump repair and wiring in ${location}.`,
    pageType: 'CollectionPage',
    breadcrumbs: [home, { name: 'Services', path: routes.services }],
    heroPhoto: photos.cityArray,
    images: [photos.cityArray],
    sitemap: { priority: 0.9, changefreq: 'monthly' },
  },
  [routes.projects]: {
    path: routes.projects,
    title: pageTitle('Our Work: Rooftop Solar & Electrical Projects'),
    description: `Photos of rooftop solar plants, industrial solar installations, inverters, DCDB/ACDB and LT panels installed by ${brand}, ${location}.`,
    pageType: 'CollectionPage',
    breadcrumbs: [home, { name: 'Our work', path: routes.projects }],
    heroPhoto: photos.aerialIndustrial,
    images: Object.values(photos),
    sitemap: { priority: 0.7, changefreq: 'monthly' },
  },
  [routes.calculator]: {
    path: routes.calculator,
    title: pageTitle('Solar Savings Calculator: Estimate System Size & Savings'),
    description: 'Enter your monthly electricity bill to estimate the rooftop solar system size, yearly generation, savings and roof area you need.',
    pageType: 'WebPage',
    breadcrumbs: [home, { name: 'Savings calculator', path: routes.calculator }],
    heroPhoto: photos.rooftopBlueSky,
    images: [],
    sitemap: { priority: 0.6, changefreq: 'yearly' },
  },
  [routes.contact]: {
    path: routes.contact,
    title: pageTitle(`Contact Us: ${company.address.locality}, ${location}`),
    description: `Call ${company.phones.map((phone) => phone.display).join(' or ')}, WhatsApp or email ${company.email}. ${company.legalName}, ${company.address.locality}, ${location} - ${company.address.postalCode}.`,
    pageType: 'ContactPage',
    breadcrumbs: [home, { name: 'Contact', path: routes.contact }],
    images: [],
    sitemap: { priority: 0.8, changefreq: 'yearly' },
  },
};

export const notFoundSeo: PageSeo = {
  path: '/404',
  title: pageTitle('Page not found'),
  description: 'The page you are looking for does not exist.',
  pageType: 'WebPage',
  breadcrumbs: [home],
  noindex: true,
  images: [],
};

export function getPageSeo(pathname: string): PageSeo {
  const path = normalizePath(pathname);
  const staticPage = staticPages[path];
  if (staticPage) return staticPage;
  const servicePrefix = `${routes.services}/`;
  if (path.startsWith(servicePrefix)) {
    const service = findService(path.slice(servicePrefix.length));
    if (service) return servicePage(service);
  }
  return notFoundSeo;
}

/** Every indexable URL, in sitemap order. */
export function indexablePages(): PageSeo[] {
  return [...Object.values(staticPages), ...services.map(servicePage)];
}
