import { Link, useRouteError, isRouteErrorResponse } from 'react-router-dom';

/**
 * NotFound component — used as React Router's errorElement.
 * Handles both 404 route errors and unexpected thrown errors.
 */
export const NotFound = () => {
  const error = useRouteError();

  const is404 = isRouteErrorResponse(error) && error.status === 404;

  return (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
      <div className="max-w-md space-y-6 px-4 text-center">
        <p className="text-8xl font-black text-muted-foreground/20 select-none">
          {is404 ? '404' : '500'}
        </p>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            {is404 ? 'Page not found' : 'Unexpected error'}
          </h1>
          <p className="text-muted-foreground">
            {is404
              ? "The page you're looking for doesn't exist or has been moved."
              : 'Something went wrong. Please try again later.'}
          </p>
        </div>
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};
