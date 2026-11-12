import { useCallback, useEffect, useState } from 'react';

/**
 * Light/dark theme. Defaults to the OS preference; an explicit choice is stored
 * in localStorage (a UI preference, allowed by RULES.md §3.8).
 */
export type ThemeChoice = 'light' | 'dark';

const STORAGE_KEY = 'pp-solar-theme';
const darkQuery = '(prefers-color-scheme: dark)';

export function readStoredTheme(): ThemeChoice | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === 'light' || value === 'dark' ? value : null;
  } catch {
    // Storage can be blocked (private mode, strict settings); fall back to the OS preference.
    return null;
  }
}

export function applyTheme(choice: ThemeChoice | null): void {
  if (choice) document.documentElement.setAttribute('data-theme', choice);
  else document.documentElement.removeAttribute('data-theme');
}

function storeTheme(choice: ThemeChoice): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, choice);
  } catch {
    // Storage unavailable: the choice still applies for this visit.
  }
}

function systemTheme(): ThemeChoice {
  return window.matchMedia(darkQuery).matches ? 'dark' : 'light';
}

export function useTheme() {
  const [stored, setStored] = useState<ThemeChoice | null>(() => readStoredTheme());
  const [system, setSystem] = useState<ThemeChoice>(() => systemTheme());

  useEffect(() => {
    const media = window.matchMedia(darkQuery);
    const onChange = () => setSystem(media.matches ? 'dark' : 'light');
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  const theme = stored ?? system;

  const toggle = useCallback(() => {
    const next: ThemeChoice = theme === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    storeTheme(next);
    setStored(next);
  }, [theme]);

  return { theme, toggle };
}
