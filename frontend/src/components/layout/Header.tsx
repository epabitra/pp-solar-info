import { Mail, MapPin, Menu, Phone, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router';
import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Layout';
import { mailtoUrl, telUrl } from '@/lib/contactLinks';
import { company, primaryPhone } from '@/lib/siteConfig';
import { mainNav, routes } from '@/lib/siteLinks';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';

function TopBar() {
  return (
    <div className="hidden bg-hero text-sm text-white/85 md:block">
      <Container className="flex h-10 items-center justify-between gap-6">
        <p className="flex items-center gap-2">
          <MapPin aria-hidden="true" className="h-4 w-4 text-sun" />
          {company.address.locality}, {company.address.district}, {company.address.state}
        </p>
        <div className="flex items-center gap-6">
          <a href={telUrl(primaryPhone)} className="flex items-center gap-2 rounded hover:text-sun">
            <Phone aria-hidden="true" className="h-4 w-4 text-sun" />
            {primaryPhone.display}
          </a>
          <a href={mailtoUrl(company.email)} className="flex items-center gap-2 rounded hover:text-sun">
            <Mail aria-hidden="true" className="h-4 w-4 text-sun" />
            {company.email}
          </a>
        </div>
      </Container>
    </div>
  );
}

const desktopLinkClass = ({ isActive }: { isActive: boolean }) =>
  `relative rounded-lg px-3 py-2 text-[15px] font-medium transition-colors hover:text-brand ${
    isActive ? 'text-brand after:absolute after:inset-x-3 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-sun' : 'text-ink'
  }`;

const mobileLinkClass = ({ isActive }: { isActive: boolean }) =>
  `block rounded-xl px-4 py-3 text-base font-medium ${isActive ? 'bg-brand-soft text-brand' : 'text-ink hover:bg-surface'}`;

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Close the mobile menu after navigation.
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-40">
      <TopBar />
      <div className="border-b border-line bg-canvas shadow-card">
        <Container className="flex h-[72px] items-center justify-between gap-4">
          <Logo />
          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {mainNav.map((item) => (
                <li key={item.to}>
                  <NavLink to={item.to} end={item.to === routes.home} className={desktopLinkClass}>
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-1 sm:gap-2">
            <ThemeToggle />
            <ButtonLink to={routes.contact} className="hidden sm:inline-flex">
              Get a quote
            </ButtonLink>
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-ink hover:bg-brand-soft lg:hidden"
            >
              {menuOpen ? <X aria-hidden="true" className="h-6 w-6" /> : <Menu aria-hidden="true" className="h-6 w-6" />}
            </button>
          </div>
        </Container>
        {menuOpen && (
          <nav id="mobile-menu" aria-label="Main" className="border-t border-line bg-canvas lg:hidden">
            <Container className="py-3">
              <ul className="space-y-1">
                {mainNav.map((item) => (
                  <li key={item.to}>
                    <NavLink to={item.to} end={item.to === routes.home} className={mobileLinkClass}>
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
              <ButtonLink to={routes.contact} size="lg" className="mt-3 w-full sm:hidden">
                Get a quote
              </ButtonLink>
            </Container>
          </nav>
        )}
      </div>
    </header>
  );
}
