import { useMutation } from '@tanstack/react-query';
import { useAppStore } from '@/stores/use-app-store';
import { queryClient } from '@/lib/react-query';
import { authTokenStorage } from '@/lib/storage';
import { authApi } from '../api/auth';

/**
 * Logout mutation hook.
 * Clears token, user state, and all cached queries.
 * Uses onSettled (not onSuccess) so cleanup runs even if the API call fails.
 *
 * Usage:
 *   const logout = useLogout();
 *   <Button onClick={() => logout.mutate()}>Logout</Button>
 */
export const useLogout = () => {
  const setUser = useAppStore((state) => state.setUser);

  return useMutation({
    mutationFn: authApi.logout,
    onSettled: () => {
      authTokenStorage.clear();
      setUser(null);
      queryClient.clear(); // invalidate all cached queries on logout
    },
  });
};
