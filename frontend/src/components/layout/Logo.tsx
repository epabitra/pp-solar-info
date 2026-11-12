import { Link } from 'react-router';
import { logo } from '@/lib/images';
import { company } from '@/lib/siteConfig';
import { routes } from '@/lib/siteLinks';

/** Emblem + wordmark. `inverted` is for dark backgrounds (footer). */
export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <Link to={routes.home} className="flex items-center gap-2.5 rounded-lg" aria-label={`${company.legalName}, home`}>
      <img src={logo.src} width={logo.width} height={logo.height} alt="" className="h-11 w-auto shrink-0" />
      <span className="flex flex-col leading-none">
        <span className={`font-display text-lg font-bold tracking-tight sm:text-xl ${inverted ? 'text-white' : 'text-brand-strong'}`}>
          PP Solar Energy
        </span>
        <span className={`mt-1 text-[10px] font-semibold uppercase tracking-[0.14em] sm:text-[11px] ${inverted ? 'text-white/70' : 'text-ink-muted'}`}>
          Engineering Enterprises
        </span>
      </span>
    </Link>
  );
}
