import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import type { Service } from '@/lib/services';
import { routes } from '@/lib/siteLinks';

/** Icon chip + title + summary; the whole card is one link. Electrical services use the green chip. */
export function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;
  const chip = service.group === 'electrical' ? 'bg-leaf-soft text-leaf' : 'bg-brand-soft text-brand';
  return (
    <Link
      to={routes.service(service.slug)}
      className="group flex h-full flex-col rounded-2xl border border-line bg-card p-6 shadow-card transition-[box-shadow,transform] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lift"
    >
      <span className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${chip}`}>
        <Icon aria-hidden="true" className="h-6 w-6" />
      </span>
      <h3 className="mt-5 text-lg font-semibold leading-snug lg:text-xl">{service.title}</h3>
      <p className="mt-1 text-sm font-medium text-ink-muted">{service.scope}</p>
      <p className="mt-3 flex-1 text-ink-muted">{service.summary}</p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
        Learn more
        <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
