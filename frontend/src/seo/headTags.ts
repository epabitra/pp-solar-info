import { absoluteUrl, company } from '@/lib/siteConfig';
import { brandImages } from './brandImages';
import type { PageSeo } from './pageSeo';
import { buildStructuredData } from './structuredData';

/**
 * Per-page <head> tags as plain descriptors, so the same list is rendered to
 * static HTML at build time and applied to the live document on navigation.
 * Every generated element carries data-seo so it can be replaced cleanly.
 */
type Attributes = Record<string, string>;

export type HeadTag =
  | { kind: 'meta'; attrs: Attributes }
  | { kind: 'link'; attrs: Attributes; serverOnly?: boolean }
  | { kind: 'jsonld'; json: string };

function serializeJsonLd(value: unknown): string {
  // Escape "<" so a value can never close the <script> element.
  return JSON.stringify(value).replace(/</g, '\\u003c');
}

export function buildHeadTags(seo: PageSeo): HeadTag[] {
  const url = absoluteUrl(seo.path);
  const image = absoluteUrl(brandImages.ogImage.path);
  const robots = seo.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

  const tags: HeadTag[] = [
    { kind: 'meta', attrs: { name: 'description', content: seo.description } },
    { kind: 'meta', attrs: { name: 'robots', content: robots } },
    { kind: 'meta', attrs: { property: 'og:type', content: 'website' } },
    { kind: 'meta', attrs: { property: 'og:site_name', content: company.legalName } },
    { kind: 'meta', attrs: { property: 'og:locale', content: 'en_IN' } },
    { kind: 'meta', attrs: { property: 'og:title', content: seo.title } },
    { kind: 'meta', attrs: { property: 'og:description', content: seo.description } },
    { kind: 'meta', attrs: { property: 'og:image', content: image } },
    { kind: 'meta', attrs: { property: 'og:image:width', content: String(brandImages.ogImage.width) } },
    { kind: 'meta', attrs: { property: 'og:image:height', content: String(brandImages.ogImage.height) } },
    { kind: 'meta', attrs: { property: 'og:image:alt', content: brandImages.ogImage.alt } },
    { kind: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
    { kind: 'meta', attrs: { name: 'twitter:title', content: seo.title } },
    { kind: 'meta', attrs: { name: 'twitter:description', content: seo.description } },
    { kind: 'meta', attrs: { name: 'twitter:image', content: image } },
  ];

  if (!seo.noindex) {
    tags.push({ kind: 'link', attrs: { rel: 'canonical', href: url } });
    tags.push({ kind: 'meta', attrs: { property: 'og:url', content: url } });
  }

  if (seo.heroPhoto) {
    const photo = seo.heroPhoto;
    tags.push({
      kind: 'link',
      serverOnly: true,
      attrs: {
        rel: 'preload',
        as: 'image',
        href: photo.variants[photo.variants.length - 1]?.src ?? '',
        imagesrcset: photo.variants.map((variant) => `${variant.src} ${variant.width}w`).join(', '),
        imagesizes: '100vw',
        fetchpriority: 'high',
      },
    });
  }

  if (!seo.noindex) tags.push({ kind: 'jsonld', json: serializeJsonLd(buildStructuredData(seo)) });
  return tags;
}

function escapeAttribute(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function escapeText(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function renderAttributes(attrs: Attributes): string {
  return Object.entries(attrs)
    .map(([name, value]) => `${name}="${escapeAttribute(value)}"`)
    .join(' ');
}

/** Static HTML for the pre-rendered page (build time). */
export function renderHeadHtml(seo: PageSeo): string {
  const lines = [`<title>${escapeText(seo.title)}</title>`];
  for (const tag of buildHeadTags(seo)) {
    if (tag.kind === 'jsonld') lines.push(`<script type="application/ld+json" data-seo>${tag.json}</script>`);
    else lines.push(`<${tag.kind} ${renderAttributes(tag.attrs)} data-seo />`);
  }
  return lines.join('\n    ');
}

/** Replaces the page's SEO tags in the live document after client-side navigation. */
export function applyHeadTags(seo: PageSeo): void {
  document.title = seo.title;
  document.head.querySelectorAll('[data-seo]').forEach((element) => {
    // Keep the pre-rendered image preload; it is harmless and already used.
    if (!(element instanceof HTMLLinkElement && element.rel === 'preload')) element.remove();
  });
  for (const tag of buildHeadTags(seo)) {
    if (tag.kind === 'link' && tag.serverOnly) continue;
    const element = document.createElement(tag.kind === 'jsonld' ? 'script' : tag.kind);
    if (tag.kind === 'jsonld') {
      element.setAttribute('type', 'application/ld+json');
      element.textContent = tag.json;
    } else {
      for (const [name, value] of Object.entries(tag.attrs)) element.setAttribute(name, value);
    }
    element.setAttribute('data-seo', '');
    document.head.appendChild(element);
  }
}
