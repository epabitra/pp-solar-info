import { calculatorAssumptions } from '@/lib/calculator';
import { faqs } from '@/lib/faqs';
import { processSteps } from '@/lib/process';
import { projects } from '@/lib/projects';
import { serviceGroups, servicesByGroup, type ServiceGroup } from '@/lib/services';
import { absoluteUrl, company, fullAddress, siteUrl } from '@/lib/siteConfig';
import { routes } from '@/lib/siteLinks';
import { indexablePages } from './pageSeo';

/**
 * Text files for search engines and AI assistants, generated from the same data
 * as the pages so they never drift: sitemap.xml, robots.txt, llms.txt, llms-full.txt.
 */

function escapeXml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

export function buildSitemapXml(lastModified: string): string {
  const urls = indexablePages().map((page) => {
    const images = page.images
      .map((photo) => {
        const src = photo.variants[photo.variants.length - 1]?.src;
        return src ? `\n    <image:image><image:loc>${escapeXml(absoluteUrl(src))}</image:loc></image:image>` : '';
      })
      .join('');
    const sitemap = page.sitemap ?? { priority: 0.5, changefreq: 'monthly' };
    return `  <url>
    <loc>${escapeXml(absoluteUrl(page.path))}</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>${sitemap.changefreq}</changefreq>
    <priority>${sitemap.priority.toFixed(1)}</priority>${images}
  </url>`;
  });
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.join('\n')}
</urlset>
`;
}

/** Search engines and AI assistants are all welcome: the goal is maximum visibility. */
const aiCrawlers = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'Bingbot',
  'CCBot',
  'meta-externalagent',
  'DuckAssistBot',
];

export function buildRobotsTxt(): string {
  const aiRules = aiCrawlers.map((agent) => `User-agent: ${agent}\nAllow: /`).join('\n\n');
  return `# ${company.legalName}: ${siteUrl}
User-agent: *
Allow: /

# AI search engines and assistants are welcome to read and cite this site.
${aiRules}

Sitemap: ${siteUrl}/sitemap.xml
`;
}

const groups: ServiceGroup[] = ['solar', 'electrical'];

function contactLines(): string[] {
  return [
    `- Business name: ${company.legalName} (also "${company.shortName}")`,
    `- Address: ${fullAddress}, India`,
    `- Phone: ${company.phones.map((phone) => phone.display).join(', ')}`,
    `- WhatsApp: ${company.phones[0].display}`,
    `- Email: ${company.email}`,
    `- Director: ${company.director.name}`,
    `- GSTIN: ${company.gstin}`,
    `- Website: ${siteUrl}`,
  ];
}

/** llms.txt (https://llmstxt.org): a short, link-rich summary for AI assistants. */
export function buildLlmsTxt(): string {
  const serviceSections = groups.map((group) => {
    const lines = servicesByGroup(group).map(
      (service) => `- [${service.title}](${absoluteUrl(routes.service(service.slug))}): ${service.scope}. ${service.summary}`,
    );
    return `## ${serviceGroups[group].title}\n\n${lines.join('\n')}`;
  });

  return `# ${company.legalName}

> ${company.shortName} is a solar and electrical contractor based in ${company.address.locality}, ${company.address.district} district, ${company.address.state}, India. It provides solar EPC, on-grid, off-grid and hybrid solar installation, solar operation and maintenance, panel cleaning, and electrical installation, LT/HT, lighting, motor & pump and wiring work for homes, businesses and industries. Tagline: "${company.tagline}".

## Contact

${contactLines().join('\n')}

## Pages

- [Home](${absoluteUrl(routes.home)}): Overview of solar and electrical services, how we work and FAQs
- [About us](${absoluteUrl(routes.about)}): Who we are, what we stand for and our expertise
- [Services](${absoluteUrl(routes.services)}): All solar and electrical services
- [Our work](${absoluteUrl(routes.projects)}): Photos of rooftop solar plants, industrial installations, inverters and electrical panels
- [Solar savings calculator](${absoluteUrl(routes.calculator)}): Estimate system size, generation and savings from a monthly electricity bill
- [Contact](${absoluteUrl(routes.contact)}): Phone, WhatsApp, email, address and enquiry form

${serviceSections.join('\n\n')}

## Optional

- [Full site content for AI assistants](${siteUrl}/llms-full.txt): Every service in detail, FAQs and calculator assumptions in one file
- [Sitemap](${siteUrl}/sitemap.xml)
`;
}

/** llms-full.txt: the complete site content as plain Markdown. */
export function buildLlmsFullTxt(): string {
  const a = calculatorAssumptions;
  const serviceSections = groups.flatMap((group) =>
    servicesByGroup(group).map(
      (service) => `### ${service.title} (${service.scope})

URL: ${absoluteUrl(routes.service(service.slug))}

${service.summary}

${service.description.join('\n\n')}

What's included:
${service.includes.map((item) => `- ${item}`).join('\n')}

Ideal for: ${service.idealFor.join(', ')}.`,
    ),
  );

  return `# ${company.legalName}: full site content

> Solar and electrical contractor in ${fullAddress}, India. ${company.positioning}. Tagline: "${company.tagline}". Slogan: "${company.slogan}".

Source: ${siteUrl}. This file mirrors the website content for AI assistants and search engines.

## Contact details

${contactLines().join('\n')}

To enquire, call or WhatsApp ${company.phones[0].display}, or use the form at ${absoluteUrl(routes.contact)}.

## About

${company.legalName} is a solar and electrical contractor based in ${company.address.locality}, ${company.address.district} district, ${company.address.state}. It builds solar power systems and carries out the electrical work around them: from rooftop systems for homes to larger plants for commercial and industrial sites, along with wiring, panels, lighting and motor and pump work.

Promises: ${company.promises.join(', ')}.

## How we work

${processSteps.map((step, index) => `${index + 1}. ${step.title}: ${step.text}`).join('\n')}

## Services

${serviceSections.join('\n\n')}

## Frequently asked questions

${faqs.map((faq) => `### ${faq.question}\n\n${faq.answer}`).join('\n\n')}

## Solar savings calculator

URL: ${absoluteUrl(routes.calculator)}

The calculator gives an estimate, not a quote. Assumptions: about ${a.unitsPerKwPerDay} units (kWh) per day per 1 kW of panels, about ${a.roofSqFtPerKw} sq ft of shadow-free roof per kW, and about ${a.co2KgPerKwh} kg CO2 per unit of grid electricity. System size is rounded up to the nearest ${a.sizeStepKw} kW (minimum ${a.minimumSizeKw} kW). Savings use only the energy charge per unit.

## Our work (project photos)

URL: ${absoluteUrl(routes.projects)}

${projects.map((project) => `- ${project.title}: ${project.caption}`).join('\n')}
`;
}
