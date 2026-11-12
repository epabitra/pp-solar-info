import type { PhotoKey } from './images';

/**
 * Work gallery built from the client's photos.
 * Captions describe only what is visible; locations and capacities are not claimed unless shown in the photo.
 */
export type ProjectCategory = 'rooftop' | 'commercial' | 'electrical';

export const projectCategories: { id: ProjectCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All work' },
  { id: 'rooftop', label: 'Rooftop solar' },
  { id: 'commercial', label: 'Commercial & industrial' },
  { id: 'electrical', label: 'Inverters & electrical' },
];

export interface ProjectItem {
  id: string;
  title: string;
  caption: string;
  category: ProjectCategory;
  photo: PhotoKey;
}

export const projects: ProjectItem[] = [
  { id: 'industrial-rooftop-plant', title: 'Industrial rooftop solar plant', caption: 'Large rooftop plant on a factory shed with additional arrays on the terrace.', category: 'commercial', photo: 'aerialIndustrial' },
  { id: 'rooftop-blue-sky', title: 'Elevated rooftop array', caption: 'Long rows of modules on a raised structure, tilted for maximum sun.', category: 'rooftop', photo: 'rooftopBlueSky' },
  { id: 'warehouse-rooftop', title: 'Warehouse rooftop solar', caption: 'Full-roof solar coverage on a warehouse shed.', category: 'commercial', photo: 'aerialWarehouse' },
  { id: 'institutional-rooftop', title: 'Rooftop solar on a campus building', caption: 'Elevated array that keeps the roof below usable.', category: 'rooftop', photo: 'institutionalRooftop' },
  { id: 'factory-rooftop', title: 'Factory roof solar', caption: 'Solar plant covering a factory roof, seen from above.', category: 'commercial', photo: 'aerialFactory' },
  { id: 'facade-solar', title: 'Building façade solar', caption: 'Solar modules integrated into the glass façade of a commercial building.', category: 'commercial', photo: 'facade' },
  { id: 'elevated-multistorey', title: 'Elevated structure on a multi-storey roof', caption: 'Raised array on a residential-commercial building.', category: 'rooftop', photo: 'aerialElevated' },
  { id: 'city-array', title: 'Rooftop array in the city', caption: 'Elevated rooftop structure with modules facing south.', category: 'rooftop', photo: 'cityArray' },
  { id: 'elevated-terrace', title: 'Terrace solar structure', caption: 'Raised steel structure covering a rooftop terrace.', category: 'rooftop', photo: 'elevatedStructure' },
  { id: 'mounting-structure', title: 'Mounting structure', caption: 'Galvanised structure erected and ready for modules.', category: 'rooftop', photo: 'mountingStructure' },
  { id: 'inverter-125kw-1', title: '125 kW string inverter', caption: 'Inverter mounted on a steel frame with galvanised cable trays.', category: 'electrical', photo: 'inverterUnit1' },
  { id: 'inverter-125kw-2', title: '125 kW string inverter with combiner box', caption: 'Second inverter of the plant with its DC combiner box.', category: 'electrical', photo: 'inverterUnit2' },
  { id: 'inverter-room', title: 'Industrial inverter room', caption: 'Inverters and combiner boxes laid out for easy maintenance.', category: 'electrical', photo: 'inverterRoom' },
  { id: 'residential-inverter', title: 'Residential grid-tie inverter', caption: 'Inverter with DCDB and ACDB in a weather-protected wall niche.', category: 'electrical', photo: 'residentialInverter' },
  { id: 'on-grid-cabinet', title: 'On-grid inverter cabinet', caption: 'Inverter, DCDB and ACDB with conduit routing inside a cabinet.', category: 'electrical', photo: 'onGridCabinet' },
  { id: 'combiner-box', title: 'DC combiner box', caption: 'Fuses and surge protection with colour-coded wiring.', category: 'electrical', photo: 'combinerWiring' },
  { id: 'battery-bank', title: 'Off-grid battery bank', caption: 'Battery bank on a steel rack with an off-grid inverter.', category: 'electrical', photo: 'batteryBank' },
  { id: 'lt-panel', title: 'LT electrical panel', caption: 'Breakers, busbars and colour-coded power cables.', category: 'electrical', photo: 'ltPanel' },
  { id: 'commercial-inverters', title: 'Commercial inverter installation', caption: 'Inverters in a protective cage with an AC panel and cable trays.', category: 'electrical', photo: 'commercialInverter' },
];

/** Shown on the home page. */
export const featuredProjectIds = [
  'industrial-rooftop-plant',
  'rooftop-blue-sky',
  'facade-solar',
  'warehouse-rooftop',
  'inverter-room',
  'residential-inverter',
];
