import { Link, Outlet } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/stores/use-app-store';
import { useLogout } from '@/features/auth';

/**
 * Root layout — wraps all authenticated app pages.
 * Provides the global header and main container.
 * Add persistent UI elements (nav, footer, sidebar) here.
 *
 * Dark mode is synced globally in AppProvider (ThemeSyncer), not here.
 * Uses Zustand selectors to avoid unnecessary re-renders.
 */
export const Layout = () => {
  const theme = useAppStore((state) => state.theme);
  const toggleTheme = useAppStore((state) => state.toggleTheme);
  const user = useAppStore((state) => state.user);
  const logout = useLogout();

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Global Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link
            to="/"
            className="text-xl font-bold tracking-tight transition-opacity hover:opacity-80"
          >
            Workspace
          </Link>

          <nav className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </Button>

            {user ? (
              <Button
                variant="outline"
                size="sm"
                disabled={logout.isPending}
                onClick={() => logout.mutate()}
              >
                Logout
              </Button>
            ) : (
              <Link to="/login">
                <Button size="sm">Sign in</Button>
              </Link>
            )}
          </nav>
        </div>
      </header>

      {/* Page content */}
      <main className="container mx-auto px-4 py-10">
        <Outlet />
      </main>
    </div>
  );
};
