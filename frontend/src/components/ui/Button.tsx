import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { Link, type LinkProps } from 'react-router';

export type ButtonVariant = 'primary' | 'accent' | 'outline' | 'ghost-light' | 'whatsapp';
export type ButtonSize = 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-[background-color,box-shadow,transform,color] duration-200 ease-out disabled:cursor-not-allowed disabled:opacity-60 active:translate-y-px';

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-brand text-on-brand shadow-card hover:bg-brand-strong hover:shadow-lift',
  accent: 'bg-sun text-sun-ink shadow-card hover:brightness-95 hover:shadow-lift',
  outline: 'border-2 border-brand text-brand hover:bg-brand-soft',
  'ghost-light': 'border-2 border-white/70 text-white hover:bg-white/10',
  whatsapp: 'bg-leaf text-on-brand shadow-card hover:brightness-110 hover:shadow-lift',
};

const sizes: Record<ButtonSize, string> = {
  md: 'h-11 px-5 text-[15px]',
  lg: 'h-12 px-6 text-base',
};

export function buttonClasses(variant: ButtonVariant = 'primary', size: ButtonSize = 'md', extra = ''): string {
  return `${base} ${variants[variant]} ${sizes[size]} ${extra}`.trim();
}

interface StyleProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

export function Button({ variant, size, className, children, type = 'button', ...rest }: StyleProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type={type} className={buttonClasses(variant, size, className)} {...rest}>
      {children}
    </button>
  );
}

/** Internal navigation styled as a button. */
export function ButtonLink({ variant, size, className, children, ...rest }: StyleProps & LinkProps) {
  return (
    <Link className={buttonClasses(variant, size, className)} {...rest}>
      {children}
    </Link>
  );
}

/** External link (tel:, mailto:, WhatsApp) styled as a button. */
export function ButtonAnchor({ variant, size, className, children, ...rest }: StyleProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={buttonClasses(variant, size, className)} {...rest}>
      {children}
    </a>
  );
}
