import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router';
import type { Photo } from '@/lib/images';
import { routes } from '@/lib/siteLinks';
import { Container } from './Layout';
import { Picture } from './Picture';

interface Crumb {
  label: string;
  to?: string;
}

interface PageHeaderProps {
  title: string;
  lead: string;
  crumbs: Crumb[];
  photo?: Photo;
}

/** Navy band at the top of every inner page: breadcrumb, H1 and one lead sentence. */
export function PageHeader({ title, lead, crumbs, photo }: PageHeaderProps) {
  const trail: Crumb[] = [{ label: 'Home', to: routes.home }, ...crumbs];
  return (
    <header className="relative isolate overflow-hidden bg-hero py-14 text-white lg:py-20">
      {photo && (
        <>
          <Picture photo={photo} sizes="100vw" priority alt="" className="absolute inset-0 -z-20 h-full w-full object-cover" />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-hero via-hero/90 to-hero/75" />
        </>
      )}
      <Container>
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1 text-sm text-white/75">
            {trail.map((crumb, index) => {
              const last = index === trail.length - 1;
              return (
                <li key={crumb.label} className="flex items-center gap-1">
                  {crumb.to && !last ? (
                    <Link to={crumb.to} className="rounded hover:text-sun">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span aria-current={last ? 'page' : undefined} className={last ? 'text-white' : ''}>
                      {crumb.label}
                    </span>
                  )}
                  {!last && <ChevronRight aria-hidden="true" className="h-4 w-4" />}
                </li>
              );
            })}
          </ol>
        </nav>
        <h1 className="mt-4 max-w-3xl text-[32px] font-bold leading-tight text-white sm:text-4xl lg:text-5xl">{title}</h1>
        <span aria-hidden="true" className="mt-5 block h-1 w-16 rounded-full bg-sun" />
        <p className="mt-5 max-w-2xl text-lg text-white/85">{lead}</p>
      </Container>
    </header>
  );
}
