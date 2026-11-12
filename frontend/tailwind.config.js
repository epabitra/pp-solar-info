/** Design tokens are CSS variables defined in src/styles/index.css (see STYLE.md §2). */
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: token('brand'), strong: token('brand-strong'), soft: token('brand-soft') },
        sun: { DEFAULT: token('sun'), ink: token('sun-ink') },
        leaf: { DEFAULT: token('leaf'), soft: token('leaf-soft') },
        danger: token('danger'),
        canvas: token('canvas'),
        surface: token('surface'),
        card: token('card'),
        ink: { DEFAULT: token('ink'), muted: token('ink-muted') },
        line: token('line'),
        hero: token('hero'),
      },
      fontFamily: {
        sans: ['"Inter Variable"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', '"Inter Variable"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgb(15 23 42 / 0.06), 0 1px 3px rgb(15 23 42 / 0.08)',
        lift: '0 4px 6px -2px rgb(15 23 42 / 0.08), 0 12px 24px -6px rgb(15 23 42 / 0.16)',
      },
      maxWidth: { prose: '70ch' },
      keyframes: {
        'page-enter': {
          from: { opacity: '0', transform: 'translateY(6px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'progress-slide': {
          from: { transform: 'translateX(-100%)' },
          to: { transform: 'translateX(250%)' },
        },
      },
      animation: {
        // `backwards`, not `both`: no transform is left behind once the fade ends.
        'page-enter': 'page-enter 220ms ease-out backwards',
        'progress-slide': 'progress-slide 1.1s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
