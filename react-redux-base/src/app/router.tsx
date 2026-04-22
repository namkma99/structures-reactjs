import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '@/components/shared/Layout';
import { NotFound } from '@/components/shared/NotFound';
import { ProtectedRoute } from '@/components/shared/ProtectedRoute';
import { HomePage } from '@/pages/HomePage';
import { LoginPage } from '@/pages/LoginPage';

/**
 * Application router.
 * Structure:
 *   /login          — standalone auth page (no Layout header)
 *   /               — app shell with Layout header
 *     index         — HomePage (public)
 *     <ProtectedRoute> — authenticated routes below
 *       /dashboard  — example protected page
 *
 * For lazy loading large pages:
 *   const DashboardPage = lazy(() => import('@/pages/DashboardPage'));
 *   element: <Suspense fallback={<PageSpinner />}><DashboardPage /></Suspense>
 */
export const router = createBrowserRouter([
  // ── Auth routes (no Layout wrapper) ───────────────────────────────────────
  {
    path: '/login',
    element: <LoginPage />,
    errorElement: <NotFound />,
  },

  // ── App routes (with Layout) ───────────────────────────────────────────────
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      // Public routes
      { index: true, element: <HomePage /> },

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
