import { QueryClient, type DefaultOptions } from "@tanstack/react-query";

const queryConfig: DefaultOptions = {
  queries: {
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 60_000,
    throwOnError: false,
  },
  mutations: {
    throwOnError: false,
  },
};

export function createQueryClient() {
  return new QueryClient({ defaultOptions: queryConfig });
}
