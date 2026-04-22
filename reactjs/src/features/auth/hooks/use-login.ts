import { useMutation } from '@tanstack/react-query';
import { useAppStore } from '@/stores/use-app-store';
import { authApi } from '../api/auth';
import type { LoginPayload } from '../api/types';

/**
 * Login mutation hook.
 * Handles token storage and user state on success.
 * Redirect is intentionally left to the calling component via onSuccess callback.
 *
 * Usage:
 *   const login = useLogin();
 *   login.mutate(payload, { onSuccess: () => navigate('/') });
 */
export const useLogin = () => {
  const setUser = useAppStore((state) => state.setUser);

  return useMutation({
    mutationFn: (payload: LoginPayload) => authApi.login(payload),
    onSuccess: ({ user, token }) => {
      localStorage.setItem('token', token);
      setUser(user);
    },
  });
};
