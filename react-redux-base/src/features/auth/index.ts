/**
 * Auth feature compatibility barrel.
 * Prefer direct imports in app code to keep route chunks smaller.
 *
 * Example:
 *   import { LoginForm } from '@/features/auth/components/LoginForm';
 */
export { LoginForm } from './components/LoginForm';
export { useLogin } from './hooks/use-login';
export { useLogout } from './hooks/use-logout';
export * from './authSlice';
export type { LoginPayload, AuthResponse } from './api/types';
