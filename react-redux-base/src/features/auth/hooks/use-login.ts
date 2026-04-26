import { useMutation } from '@tanstack/react-query';
import { useAppDispatch } from '@/app/hooks';
import { authTokenStorage } from '@/lib/storage';
import { setCredentials } from '../authSlice';
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
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (payload: LoginPayload) => authApi.login(payload),
    onSuccess: ({ user, token }) => {
      authTokenStorage.set(token);
      dispatch(setCredentials(user));
    },
  });
};
