import '@fontsource-variable/inter';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import './styles/index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router/dom';
import { applyTheme, readStoredTheme } from '@/hooks/useTheme';
import { prefetchPagesWhenIdle } from './pageModules';
import { router } from './router';

// Apply a saved theme before the first paint; without one, CSS follows the OS setting.
applyTheme(readStoredTheme());

const container = document.getElementById('root');
if (!container) throw new Error('Root element #root is missing from index.html.');

createRoot(container).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);

prefetchPagesWhenIdle();
