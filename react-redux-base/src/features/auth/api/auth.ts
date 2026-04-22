/**
 * Auth API functions.
 * Replace endpoint paths and adjust response shapes to match your backend.
 */
import api from '@/lib/axios';
import type { LoginPayload, AuthResponse } from './types';

export const authApi = {
  login: (payload: LoginPayload): Promise<AuthResponse> =>
    api.post<AuthResponse>('/auth/login', payload),

  logout: (): Promise<void> => api.post<void>('/auth/logout'),

  refreshToken: (refreshToken: string): Promise<AuthResponse> =>
    api.post<AuthResponse>('/auth/refresh', { refreshToken }),

  me: (): Promise<AuthResponse['user']> => api.get<AuthResponse['user']>('/auth/me'),
};
