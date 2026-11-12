import { useEffect, useState } from 'react';
import { useNavigation } from 'react-router';

/** Wait this long before showing the bar, so fast navigations never flash it. */
const SHOW_DELAY_MS = 150;

/**
 * Thin top loading bar shown while the next page is loading. The current page
 * stays visible underneath, so the visitor never sees a blank screen.
 */
export function NavigationProgress() {
  const navigation = useNavigation();
  const loading = navigation.state !== 'idle';
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!loading) {
      setVisible(false);
      return;
    }
    const timer = window.setTimeout(() => setVisible(true), SHOW_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [loading]);

  if (!visible) return null;

  return (
    <div role="progressbar" aria-label="Loading page" aria-busy="true" className="fixed inset-x-0 top-0 z-50 h-1 overflow-hidden bg-sun/25">
      <div className="h-full w-2/5 animate-progress-slide rounded-full bg-sun" />
    </div>
  );
}
