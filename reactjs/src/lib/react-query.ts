import { QueryClient, type DefaultOptions } from '@tanstack/react-query';

const queryConfig: DefaultOptions = {
  queries: {
    staleTime: 1000 * 60, // 1 minute
    refetchOnWindowFocus: false,
    retry: false,
    // false = query errors are handled at the component level (isError, error),
    // NOT propagated to the nearest ErrorBoundary.
    // Set to true if you want unhandled query errors to bubble to ErrorBoundary.
    throwOnError: false,
  },
  mutations: {
    throwOnError: false,
  },
};

export const queryClient = new QueryClient({ defaultOptions: queryConfig });
