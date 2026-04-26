import { lazy, Suspense, type ComponentType, type ReactNode } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '@/components/shared/Layout';
import { NotFound } from '@/components/shared/NotFound';
import { ProtectedRoute } from '@/components/shared/ProtectedRoute';
import { PageSpinner } from '@/components/shared/Spinner';

const withRouteSuspense = (children: ReactNode) => (
  <Suspense fallback={<PageSpinner />}>{children}</Suspense>
);

const lazyRouteElement = <T extends Record<K, ComponentType>, K extends keyof T>(
  load: () => Promise<T>,
  exportName: K
) => {
  const RouteComponent = lazy(() =>
    load().then((module) => ({ default: module[exportName] as ComponentType }))
  );
  return withRouteSuspense(<RouteComponent />);
};

/**
 * Application router.
 * Structure:
 *   /login          — standalone auth page (no Layout header)
 *   /               — app shell with Layout header
 *     index         — HomePage (public)
 *     <ProtectedRoute> — authenticated routes below
 *       /dashboard  — example protected page
 *
 * Pages are lazy-loaded so new routes become separate chunks by default.
 */
export const router = createBrowserRouter([
  // ── Auth routes (no Layout wrapper) ───────────────────────────────────────
  {
    path: '/login',
    element: lazyRouteElement(() => import('@/pages/LoginPage'), 'LoginPage'),
    errorElement: <NotFound />,
  },

  // ── App routes (with Layout) ───────────────────────────────────────────────
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      // Public routes
      { index: true, element: lazyRouteElement(() => import('@/pages/HomePage'), 'HomePage') },

      // Protected routes — add authenticated pages inside here
      {
        element: <ProtectedRoute />,
        children: [
          // { path: 'dashboard', element: <DashboardPage /> },
          // { path: 'profile', element: <ProfilePage /> },
        ],
      },
    ],
  },
]);
