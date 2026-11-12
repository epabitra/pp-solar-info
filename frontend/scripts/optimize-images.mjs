/**
 * Builds web-ready images from the client's originals in ../assets-source.
 *
 * Why: the originals are phone photos (some with a camera watermark in the
 * bottom-right corner, one is a two-photo collage). This script crops them,
 * resizes to the slots used on the site and exports WebP, so the result is
 * reproducible and nobody hand-edits files in src/assets.
 *
 * Usage: npm run images
 */
import { mkdir } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const here = dirname(fileURLToPath(import.meta.url));
const sourceRoot = resolve(here, '../../assets-source');
const outputRoot = resolve(here, '../src/assets/images');

/** Widths generated for every photo: small for cards/thumbnails, large for hero/lightbox. */
const PHOTO_WIDTHS = { sm: 640, lg: 1280 };
const HERO_WIDTH = 1600;
const WEBP_QUALITY = 72;

/**
 * crop: area to keep, in source pixels (removes camera watermark or splits the collage).
 * hero: also export a 1600 px variant for full-width banners.
 */
const photos = [
  { src: 'rooftop-solar-array-blue-sky.jpeg', out: 'rooftop-solar-array-blue-sky', hero: true },
  { src: 'aerial-industrial-rooftop-plant.jpeg', out: 'aerial-industrial-rooftop-plant' },
  { src: 'aerial-factory-rooftop-solar.jpeg', out: 'aerial-factory-rooftop-solar' },
  { src: 'aerial-warehouse-rooftop-solar.jpeg', out: 'aerial-warehouse-rooftop-solar' },
  { src: 'aerial-elevated-rooftop-solar.jpeg', out: 'aerial-elevated-rooftop-solar' },
  { src: 'elevated-rooftop-solar-structure.jpeg', out: 'elevated-rooftop-solar-structure' },
  { src: 'rooftop-solar-institutional-building.jpeg', out: 'rooftop-solar-institutional-building', hero: true },
  { src: 'elevated-mounting-structure.jpeg', out: 'elevated-mounting-structure' },
  { src: 'facade-solar-commercial-building.jpeg', out: 'facade-solar-commercial-building', crop: { left: 0, top: 0, width: 900, height: 1480 } },
  { src: 'inverter-panel-and-rooftop-array-collage.jpeg', out: 'on-grid-inverter-acdb-dcdb', crop: { left: 40, top: 75, width: 1135, height: 695 } },
  { src: 'inverter-panel-and-rooftop-array-collage.jpeg', out: 'rooftop-array-elevated-city', crop: { left: 40, top: 815, width: 1135, height: 775 } },
  { src: 'on-grid-inverter-cabinet.jpeg', out: 'on-grid-inverter-cabinet' },
  { src: 'residential-grid-tie-inverter-acdb-dcdb.jpeg', out: 'residential-grid-tie-inverter', crop: { left: 0, top: 0, width: 1536, height: 1385 } },
  { src: 'string-inverter-125kw-unit-1.jpeg', out: 'string-inverter-125kw-unit-1', crop: { left: 0, top: 0, width: 1280, height: 645 } },
  { src: 'string-inverter-125kw-unit-2.jpeg', out: 'string-inverter-125kw-unit-2', crop: { left: 0, top: 0, width: 1280, height: 645 } },
  { src: 'inverter-room-industrial.jpeg', out: 'inverter-room-industrial', crop: { left: 0, top: 0, width: 1600, height: 605 } },
  { src: 'dc-combiner-box-wiring.jpeg', out: 'dc-combiner-box-wiring', crop: { left: 0, top: 0, width: 1280, height: 645 } },
  { src: 'dc-combiner-box-surge-protection.jpeg', out: 'dc-combiner-box-surge-protection', crop: { left: 0, top: 0, width: 1280, height: 645 } },
  { src: 'battery-bank-off-grid-inverter.jpeg', out: 'battery-bank-off-grid-inverter', crop: { left: 0, top: 0, width: 1600, height: 805 } },
  { src: 'lt-electrical-panel.jpeg', out: 'lt-electrical-panel' },
  { src: 'commercial-inverter-installation.jpeg', out: 'commercial-inverter-installation' },
];

/** Circular emblem cut from the company profile card until the client supplies a vector logo. */
const logo = {
  src: 'brand/company-profile-card.jpeg',
  crop: { left: 255, top: 6, width: 256, height: 214 },
  mask: '<svg width="256" height="214"><circle cx="128" cy="108" r="112" fill="#fff"/></svg>',
};

function load(path, crop) {
  const image = sharp(path).rotate();
  return crop ? image.extract(crop) : image;
}

async function writeVariant(path, crop, width, target) {
  const info = await load(path, crop)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: WEBP_QUALITY })
    .toFile(target);
  return `${target.replace(outputRoot, 'src/assets/images')} ${info.width}x${info.height} ${Math.round(info.size / 1024)} kB`;
}

async function buildPhotos() {
  const dir = join(outputRoot, 'photos');
  await mkdir(dir, { recursive: true });
  for (const photo of photos) {
    const path = join(sourceRoot, 'photos', photo.src);
    for (const [suffix, width] of Object.entries(PHOTO_WIDTHS)) {
      console.log(await writeVariant(path, photo.crop, width, join(dir, `${photo.out}-${suffix}.webp`)));
    }
    if (photo.hero) {
      console.log(await writeVariant(path, photo.crop, HERO_WIDTH, join(dir, `${photo.out}-xl.webp`)));
    }
  }
}

async function buildLogo() {
  const brandDir = join(outputRoot, 'brand');
  const publicDir = resolve(here, '../public');
  await mkdir(brandDir, { recursive: true });
  const emblem = await load(join(sourceRoot, logo.src), logo.crop)
    .composite([{ input: Buffer.from(logo.mask), blend: 'dest-in' }])
    .png()
    .toBuffer();
  await sharp(emblem).resize({ width: 128 }).webp({ quality: 90 }).toFile(join(brandDir, 'logo-mark.webp'));
  await sharp(emblem).resize({ width: 64 }).png().toFile(join(publicDir, 'favicon.png'));
  await sharp(emblem).resize({ width: 180 }).flatten({ background: '#ffffff' }).png().toFile(join(publicDir, 'apple-touch-icon.png'));
  console.log('logo-mark.webp, favicon.png, apple-touch-icon.png');
}

try {
  await buildPhotos();
  await buildLogo();
} catch (error) {
  console.error(`Image build failed: ${error.message}. Check that ../assets-source contains the original files.`);
  process.exitCode = 1;
}
