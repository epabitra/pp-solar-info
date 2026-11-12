import { ServiceCard } from '@/components/sections/ServiceCard';
import { ButtonLink } from '@/components/ui/Button';
import { Section, SectionHeading } from '@/components/ui/Layout';
import { serviceGroups, servicesByGroup, type ServiceGroup } from '@/lib/services';
import { routes } from '@/lib/siteLinks';

const groups: ServiceGroup[] = ['solar', 'electrical'];

export function ServicesOverview() {
  return (
    <Section labelledBy="services-title">
      <SectionHeading id="services-title" eyebrow="Our services" title="Everything solar and electrical, under one roof" lead="Pick a service to see what is included." />
      <div className="space-y-12">
        {groups.map((group) => (
          <div key={group}>
            <h3 className="mb-5 flex items-center gap-3 text-xl font-semibold">
              <span aria-hidden="true" className={`h-6 w-1.5 rounded-full ${group === 'solar' ? 'bg-brand' : 'bg-leaf'}`} />
              {serviceGroups[group].title}
            </h3>
            <ul className={`grid gap-6 sm:grid-cols-2 ${group === 'solar' ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}`}>
              {servicesByGroup(group).map((service) => (
                <li key={service.slug}>
                  <ServiceCard service={service} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-12 text-center">
        <ButtonLink to={routes.services} variant="outline">
          View all services
        </ButtonLink>
      </div>
    </Section>
  );
}
