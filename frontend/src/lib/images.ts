/**
 * Every photo on the site, with its generated WebP variants (see scripts/optimize-images.mjs).
 * Only the client's own installation photos are used: no stock or government imagery (STYLE.md §7).
 */
import logoMark from '@/assets/images/brand/logo-mark.webp';
import aerialElevatedLg from '@/assets/images/photos/aerial-elevated-rooftop-solar-lg.webp';
import aerialElevatedSm from '@/assets/images/photos/aerial-elevated-rooftop-solar-sm.webp';
import aerialFactoryLg from '@/assets/images/photos/aerial-factory-rooftop-solar-lg.webp';
import aerialIndustrialLg from '@/assets/images/photos/aerial-industrial-rooftop-plant-lg.webp';
import aerialIndustrialSm from '@/assets/images/photos/aerial-industrial-rooftop-plant-sm.webp';
import aerialWarehouseLg from '@/assets/images/photos/aerial-warehouse-rooftop-solar-lg.webp';
import batteryBankLg from '@/assets/images/photos/battery-bank-off-grid-inverter-lg.webp';
import batteryBankSm from '@/assets/images/photos/battery-bank-off-grid-inverter-sm.webp';
import commercialInverterLg from '@/assets/images/photos/commercial-inverter-installation-lg.webp';
import commercialInverterSm from '@/assets/images/photos/commercial-inverter-installation-sm.webp';
import combinerSurgeLg from '@/assets/images/photos/dc-combiner-box-surge-protection-lg.webp';
import combinerSurgeSm from '@/assets/images/photos/dc-combiner-box-surge-protection-sm.webp';
import combinerWiringLg from '@/assets/images/photos/dc-combiner-box-wiring-lg.webp';
import combinerWiringSm from '@/assets/images/photos/dc-combiner-box-wiring-sm.webp';
import mountingStructureLg from '@/assets/images/photos/elevated-mounting-structure-lg.webp';
import mountingStructureSm from '@/assets/images/photos/elevated-mounting-structure-sm.webp';
import elevatedStructureLg from '@/assets/images/photos/elevated-rooftop-solar-structure-lg.webp';
import elevatedStructureSm from '@/assets/images/photos/elevated-rooftop-solar-structure-sm.webp';
import facadeLg from '@/assets/images/photos/facade-solar-commercial-building-lg.webp';
import facadeSm from '@/assets/images/photos/facade-solar-commercial-building-sm.webp';
import inverterRoomLg from '@/assets/images/photos/inverter-room-industrial-lg.webp';
import inverterRoomSm from '@/assets/images/photos/inverter-room-industrial-sm.webp';
import ltPanelLg from '@/assets/images/photos/lt-electrical-panel-lg.webp';
import ltPanelSm from '@/assets/images/photos/lt-electrical-panel-sm.webp';
import onGridBoardLg from '@/assets/images/photos/on-grid-inverter-acdb-dcdb-lg.webp';
import onGridBoardSm from '@/assets/images/photos/on-grid-inverter-acdb-dcdb-sm.webp';
import onGridCabinetLg from '@/assets/images/photos/on-grid-inverter-cabinet-lg.webp';
import onGridCabinetSm from '@/assets/images/photos/on-grid-inverter-cabinet-sm.webp';
import residentialInverterLg from '@/assets/images/photos/residential-grid-tie-inverter-lg.webp';
import residentialInverterSm from '@/assets/images/photos/residential-grid-tie-inverter-sm.webp';
import cityArrayLg from '@/assets/images/photos/rooftop-array-elevated-city-lg.webp';
import cityArraySm from '@/assets/images/photos/rooftop-array-elevated-city-sm.webp';
import blueSkyLg from '@/assets/images/photos/rooftop-solar-array-blue-sky-lg.webp';
import blueSkySm from '@/assets/images/photos/rooftop-solar-array-blue-sky-sm.webp';
import blueSkyXl from '@/assets/images/photos/rooftop-solar-array-blue-sky-xl.webp';
import institutionalLg from '@/assets/images/photos/rooftop-solar-institutional-building-lg.webp';
import institutionalSm from '@/assets/images/photos/rooftop-solar-institutional-building-sm.webp';
import institutionalXl from '@/assets/images/photos/rooftop-solar-institutional-building-xl.webp';
import inverter1Lg from '@/assets/images/photos/string-inverter-125kw-unit-1-lg.webp';
import inverter1Sm from '@/assets/images/photos/string-inverter-125kw-unit-1-sm.webp';
import inverter2Lg from '@/assets/images/photos/string-inverter-125kw-unit-2-lg.webp';
import inverter2Sm from '@/assets/images/photos/string-inverter-125kw-unit-2-sm.webp';

export interface ImageVariant {
  src: string;
  width: number;
}

export interface Photo {
  /** Variants from smallest to largest. */
  variants: ImageVariant[];
  /** Intrinsic size of the largest variant, used for width/height attributes. */
  width: number;
  height: number;
  alt: string;
}

function photo(alt: string, height: number, ...variants: ImageVariant[]): Photo {
  const largest = variants[variants.length - 1];
  if (!largest) throw new Error(`Photo "${alt}" needs at least one variant.`);
  return { alt, variants, width: largest.width, height };
}

export const logo = { src: logoMark, width: 128, height: 107 };

export const photos = {
  rooftopBlueSky: photo(
    'Rows of solar panels on an elevated rooftop structure under a clear sky',
    720,
    { src: blueSkySm, width: 640 },
    { src: blueSkyLg, width: 1280 },
    { src: blueSkyXl, width: 1600 },
  ),
  institutionalRooftop: photo(
    'Solar array installed across the roof of a building surrounded by trees',
    720,
    { src: institutionalSm, width: 640 },
    { src: institutionalLg, width: 1280 },
    { src: institutionalXl, width: 1600 },
  ),
  aerialIndustrial: photo(
    'Aerial view of an industrial rooftop solar plant on a factory shed',
    703,
    { src: aerialIndustrialSm, width: 640 },
    { src: aerialIndustrialLg, width: 837 },
  ),
  aerialFactory: photo('Aerial view of solar panels covering a factory roof', 325, { src: aerialFactoryLg, width: 494 }),
  aerialWarehouse: photo('Aerial view of a warehouse roof fully covered with solar panels', 360, { src: aerialWarehouseLg, width: 506 }),
  aerialElevated: photo(
    'Aerial view of an elevated solar structure on a multi-storey rooftop',
    302,
    { src: aerialElevatedSm, width: 640 },
    { src: aerialElevatedLg, width: 816 },
  ),
  elevatedStructure: photo(
    'Solar panels on a raised steel structure covering a rooftop terrace',
    393,
    { src: elevatedStructureSm, width: 640 },
    { src: elevatedStructureLg, width: 722 },
  ),
  cityArray: photo(
    'Rooftop solar array on an elevated structure overlooking the city',
    775,
    { src: cityArraySm, width: 640 },
    { src: cityArrayLg, width: 1135 },
  ),
  facade: photo(
    'Solar panels mounted on the glass façade of a commercial building',
    1480,
    { src: facadeSm, width: 640 },
    { src: facadeLg, width: 900 },
  ),
  mountingStructure: photo(
    'Galvanised elevated mounting structure on a rooftop, ready for solar modules',
    960,
    { src: mountingStructureSm, width: 640 },
    { src: mountingStructureLg, width: 1280 },
  ),
  inverterUnit1: photo(
    '125 kW string inverter mounted on a steel frame with cable trays',
    645,
    { src: inverter1Sm, width: 640 },
    { src: inverter1Lg, width: 1280 },
  ),
  inverterUnit2: photo(
    'Second 125 kW string inverter next to its DC combiner box',
    645,
    { src: inverter2Sm, width: 640 },
    { src: inverter2Lg, width: 1280 },
  ),
  inverterRoom: photo(
    'Industrial inverter room with string inverters, combiner boxes and cable trays',
    484,
    { src: inverterRoomSm, width: 640 },
    { src: inverterRoomLg, width: 1280 },
  ),
  onGridBoard: photo(
    'On-grid inverter with DCDB and ACDB, neatly routed through conduits',
    695,
    { src: onGridBoardSm, width: 640 },
    { src: onGridBoardLg, width: 1135 },
  ),
  onGridCabinet: photo(
    'On-grid inverter with DC and AC distribution boxes inside a protective cabinet',
    576,
    { src: onGridCabinetSm, width: 640 },
    { src: onGridCabinetLg, width: 1280 },
  ),
  residentialInverter: photo(
    'Residential grid-tie inverter with DCDB and ACDB installed on a rooftop wall',
    1154,
    { src: residentialInverterSm, width: 640 },
    { src: residentialInverterLg, width: 1280 },
  ),
  combinerWiring: photo(
    'DC combiner box with fuses, surge protection devices and colour-coded wiring',
    645,
    { src: combinerWiringSm, width: 640 },
    { src: combinerWiringLg, width: 1280 },
  ),
  combinerSurge: photo(
    'Close-up of surge protection devices and terminals inside a DC combiner box',
    645,
    { src: combinerSurgeSm, width: 640 },
    { src: combinerSurgeLg, width: 1280 },
  ),
  batteryBank: photo(
    'Battery bank on a steel rack connected to an off-grid solar inverter',
    644,
    { src: batteryBankSm, width: 640 },
    { src: batteryBankLg, width: 1280 },
  ),
  ltPanel: photo(
    'LT electrical panel with breakers, busbars and colour-coded power cables',
    576,
    { src: ltPanelSm, width: 640 },
    { src: ltPanelLg, width: 1280 },
  ),
  commercialInverter: photo(
    'Commercial inverters in a protective cage with an AC distribution panel and cable trays',
    576,
    { src: commercialInverterSm, width: 640 },
    { src: commercialInverterLg, width: 1280 },
  ),
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;
