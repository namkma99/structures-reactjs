import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppStore } from '@/stores/use-app-store';

/**
 * Protects routes that require authentication.
 * Redirects unauthenticated users to /login,
 * preserving the intended destination in location state.
 *
 * Usage in router.tsx:
 *   {
 *     element: <ProtectedRoute />,
 *     children: [
 *       { path: 'dashboard', element: <DashboardPage /> },
 *     ],
 *   }
 *
 * After login, navigate to `location.state?.from` to restore the original path.
 */
export const ProtectedRoute = () => {
  const user = useAppStore((state) => state.user);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};
