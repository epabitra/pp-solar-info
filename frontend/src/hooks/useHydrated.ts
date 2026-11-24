import { useEffect, useState } from 'react';

/**
 * False during the build-time render and the first browser render, true after.
 * Use it for UI that depends on browser-only state (such as the URL query string),
 * which the pre-rendered HTML cannot know, so hydration stays mismatch-free.
 */
export function useHydrated(): boolean {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}
