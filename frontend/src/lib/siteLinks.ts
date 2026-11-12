/** Route paths and navigation, kept in one place so links never drift. */
export const routes = {
  home: '/',
  about: '/about',
  services: '/services',
  service: (slug: string) => `/services/${slug}`,
  projects: '/projects',
  calculator: '/savings-calculator',
  contact: '/contact',
} as const;

export interface NavLinkItem {
  label: string;
  to: string;
}

export const mainNav: NavLinkItem[] = [
  { label: 'Home', to: routes.home },
  { label: 'About', to: routes.about },
  { label: 'Services', to: routes.services },
  { label: 'Projects', to: routes.projects },
  { label: 'Savings calculator', to: routes.calculator },
  { label: 'Contact', to: routes.contact },
];
