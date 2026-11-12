import type { LucideIcon } from 'lucide-react';
import {
  Cable,
  Droplets,
  Factory,
  Lightbulb,
  PanelsTopLeft,
  Settings2,
  SunMedium,
  Wrench,
  Zap,
} from 'lucide-react';
import type { PhotoKey } from './images';

/** The nine services listed on the client's profile card. */
export type ServiceGroup = 'solar' | 'electrical';

export interface Service {
  slug: string;
  group: ServiceGroup;
  title: string;
  /** Scope line exactly as printed on the profile card. */
  scope: string;
  summary: string;
  description: string[];
  includes: string[];
  idealFor: string[];
  icon: LucideIcon;
  photo?: PhotoKey;
}

export const serviceGroups: Record<ServiceGroup, { title: string; lead: string }> = {
  solar: {
    title: 'Solar services',
    lead: 'From design to long-term care, everything your solar plant needs.',
  },
  electrical: {
    title: 'Electrical services',
    lead: 'Safe, neat electrical work for homes, offices and industry.',
  },
};

export const services: Service[] = [
  {
    slug: 'solar-epc',
    group: 'solar',
    title: 'Solar EPC',
    scope: 'Residential, Commercial & Industrial',
    summary: 'Complete engineering, procurement and construction of solar power plants, handled by one team.',
    description: [
      'With an EPC contract you deal with one team for the whole project. We study your site and load, design the plant, source the panels, inverters and balance-of-system, build it and hand it over ready to generate.',
      'We take on solar projects for homes, shops, offices, institutions and factories.',
    ],
    includes: [
      'Site survey and shadow analysis',
      'Load study and system sizing',
      'Plant design and layout',
      'Procurement of panels, inverters, structures and cables',
      'Mounting structure, installation and wiring',
      'Testing, commissioning and handover',
    ],
    idealFor: ['Homes', 'Commercial buildings', 'Factories and warehouses', 'Institutions'],
    icon: Factory,
    photo: 'aerialIndustrial',
  },
  {
    slug: 'solar-installation',
    group: 'solar',
    title: 'Solar installation',
    scope: 'On Grid / Off Grid / Hybrid',
    summary: 'On-grid, off-grid and hybrid solar systems, installed neatly and safely.',
    description: [
      'An on-grid system works with the electricity grid and cuts your monthly bill. An off-grid system runs on batteries where the grid is weak or missing. A hybrid system gives you both: lower bills plus battery backup during power cuts.',
      'We help you choose the right type for your needs and install it with proper earthing, protection and cable management.',
    ],
    includes: [
      'On-grid (grid-tied) systems',
      'Off-grid systems with battery bank',
      'Hybrid systems with battery backup',
      'Rooftop and elevated mounting structures',
      'DCDB, ACDB, earthing and lightning protection',
      'Inverter set-up and monitoring configuration',
    ],
    idealFor: ['Homes', 'Shops and offices', 'Schools and institutions', 'Areas with frequent power cuts'],
    icon: SunMedium,
    photo: 'cityArray',
  },
  {
    slug: 'solar-operation-maintenance',
    group: 'solar',
    title: 'Solar O&M',
    scope: 'Operation & Maintenance',
    summary: 'Keep your plant generating at its best with planned operation and maintenance.',
    description: [
      'A solar plant needs regular care to keep producing what it should. We check inverters, protection devices, cables and structures, find faults early and fix them before they cost you generation.',
      'O&M is available for plants we built and for plants installed by others.',
    ],
    includes: [
      'Preventive maintenance visits',
      'Inverter and string performance checks',
      'Fault finding and breakdown repair',
      'Checks of DCDB, ACDB, earthing and connections',
      'Generation review and service report',
    ],
    idealFor: ['Rooftop plants', 'Commercial and industrial plants', 'Plants with falling output'],
    icon: Settings2,
    photo: 'inverterRoom',
  },
  {
    slug: 'solar-panel-cleaning-inspection',
    group: 'solar',
    title: 'Solar panel cleaning & inspection',
    scope: 'Cleaning & Inspection',
    summary: 'Dust and bird droppings reduce output. Regular cleaning and inspection bring it back.',
    description: [
      'Dirty panels produce less power. We clean modules safely without scratching the glass, and inspect them for cracks, hot spots, loose clamps and damaged cables.',
      'You get a short report of what we found and what needs attention.',
    ],
    includes: [
      'Safe module cleaning',
      'Visual inspection of panels and structure',
      'Check of connectors, clamps and cables',
      'Report with photos and recommendations',
    ],
    idealFor: ['Homes', 'Commercial rooftops', 'Industrial plants'],
    icon: Droplets,
    photo: 'elevatedStructure',
  },
  {
    slug: 'electrical-installation',
    group: 'electrical',
    title: 'Electrical installation',
    scope: 'Residential, Commercial & Industrial',
    summary: 'Complete electrical installation for new buildings, extensions and upgrades.',
    description: [
      'We plan and carry out electrical installations that are safe, tidy and easy to maintain, from a single house to a commercial or industrial building.',
    ],
    includes: [
      'Distribution boards and protection devices',
      'Power and lighting circuits',
      'Earthing systems',
      'Panel and equipment connections',
      'Testing before handover',
    ],
    idealFor: ['New homes', 'Shops and offices', 'Factories and workshops'],
    icon: Zap,
    photo: 'commercialInverter',
  },
  {
    slug: 'lt-ht-work',
    group: 'electrical',
    title: 'LT/HT work',
    scope: 'Erection & Commissioning',
    summary: 'Erection and commissioning of low-tension and high-tension electrical systems.',
    description: [
      'We erect and commission LT and HT electrical systems for commercial and industrial sites, including the panels and cabling that connect solar plants to your supply.',
    ],
    includes: [
      'LT panel erection and wiring',
      'HT system erection',
      'Cable laying and termination',
      'Testing and commissioning',
    ],
    idealFor: ['Industries', 'Commercial complexes', 'Large solar plants'],
    icon: PanelsTopLeft,
    photo: 'ltPanel',
  },
  {
    slug: 'lighting-solutions',
    group: 'electrical',
    title: 'Lighting solutions',
    scope: 'Indoor & Outdoor',
    summary: 'Energy-efficient indoor and outdoor lighting for homes, campuses and workplaces.',
    description: [
      'Good lighting makes spaces safer and more useful. We plan and install efficient indoor and outdoor lighting suited to how the space is used.',
    ],
    includes: [
      'Indoor lighting for homes, offices and shops',
      'Outdoor, compound and street lighting',
      'Energy-efficient LED fittings',
      'Wiring and control set-up',
    ],
    idealFor: ['Homes', 'Offices and shops', 'Campuses and compounds'],
    icon: Lightbulb,
  },
  {
    slug: 'motor-pump-installation-repair',
    group: 'electrical',
    title: 'Motor & pump installation & repair',
    scope: 'Installation & Repair',
    summary: 'Installation, servicing and repair of electric motors and water pumps.',
    description: [
      'We install motors and pumps correctly, with the right cables, starters and protection, and repair them when they fail so your water supply and machines keep running.',
    ],
    includes: [
      'Motor and pump installation',
      'Starter and protection wiring',
      'Fault diagnosis and repair',
      'Preventive servicing',
    ],
    idealFor: ['Homes and apartments', 'Farms', 'Industries and workshops'],
    icon: Wrench,
  },
  {
    slug: 'wiring-cabling',
    group: 'electrical',
    title: 'Wiring & cabling',
    scope: 'House / Office / Industry',
    summary: 'New wiring, rewiring and cabling with proper routing, protection and labelling.',
    description: [
      'Poor wiring causes outages and safety risks. We lay new wiring and cables, or replace old ones, routed neatly through conduits and trays and correctly protected.',
    ],
    includes: [
      'House wiring and rewiring',
      'Office and commercial wiring',
      'Industrial power cabling',
      'Conduits, trays and labelling',
    ],
    idealFor: ['Houses', 'Offices', 'Industries'],
    icon: Cable,
    photo: 'combinerWiring',
  },
];

export function findService(slug: string | undefined): Service | undefined {
  return slug ? services.find((service) => service.slug === slug) : undefined;
}

export function servicesByGroup(group: ServiceGroup): Service[] {
  return services.filter((service) => service.group === group);
}
