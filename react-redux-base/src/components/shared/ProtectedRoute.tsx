import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '@/app/hooks';
import { selectCurrentUser } from '@/features/auth/authSlice';

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
  const user = useAppSelector(selectCurrentUser);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};
