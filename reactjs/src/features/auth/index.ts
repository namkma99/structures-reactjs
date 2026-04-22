/**
 * Auth feature barrel export.
 * Import from '@/features/auth' instead of deep paths.
 *
 * Example:
 *   import { LoginForm, useLogin } from '@/features/auth';
 */
export { LoginForm } from './components/LoginForm';
export { useLogin } from './hooks/use-login';
export { useLogout } from './hooks/use-logout';
export type { LoginPayload, AuthResponse } from './api/types';
