import { CtaBanner } from '@/components/sections/CtaBanner';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { ServiceCard } from '@/components/sections/ServiceCard';
import { PageHeader } from '@/components/ui/PageHeader';
import { Section, SectionHeading } from '@/components/ui/Layout';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import { photos } from '@/lib/images';
import { serviceGroups, servicesByGroup, type ServiceGroup } from '@/lib/services';

const groups: { id: ServiceGroup; tone: 'canvas' | 'surface' }[] = [
  { id: 'solar', tone: 'canvas' },
  { id: 'electrical', tone: 'surface' },
];

export default function ServicesPage() {
  useDocumentMeta(
    'Our services',
    'Solar EPC, on-grid, off-grid and hybrid solar installation, O&M, panel cleaning, electrical installation, LT/HT work, lighting, motor & pump repair and wiring.',
  );

  return (
    <>
      <PageHeader
        title="Our services"
        lead="Solar power systems and electrical work for homes, businesses and industries."
        crumbs={[{ label: 'Services' }]}
        photo={photos.cityArray}
      />
      {groups.map(({ id, tone }) => (
        <Section key={id} tone={tone} labelledBy={`${id}-services-title`}>
          <SectionHeading id={`${id}-services-title`} align="left" eyebrow={id === 'solar' ? 'Solar' : 'Electrical'} title={serviceGroups[id].title} lead={serviceGroups[id].lead} />
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {servicesByGroup(id).map((service) => (
              <li key={service.slug}>
                <ServiceCard service={service} />
              </li>
            ))}
          </ul>
        </Section>
      ))}
      <ProcessSection tone="canvas" />
      <CtaBanner />
    </>
  );
}
