import { useEffect } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from 'react-router-dom';
import { ErrorBoundary } from '@/components/shared/ErrorBoundary';
import { queryClient } from '@/lib/react-query';
import { useAppStore } from '@/stores/use-app-store';
import { router } from './router';

/**
 * Syncs theme state to <html> element globally.
 * Placed here (outside RouterProvider) so dark mode works on ALL pages,
 * including /login and any portal-rendered content (modals, toasts, etc).
 */
const ThemeSyncer = () => {
  const theme = useAppStore((state) => state.theme);
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);
  return null;
};

export const AppProvider = () => {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeSyncer />
        {import.meta.env.DEV && <ReactQueryDevtools />}
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ErrorBoundary>
  );
};
