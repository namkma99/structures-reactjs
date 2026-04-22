import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';
import { env } from '@/config/env';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: env.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ─── Request Interceptor ────────────────────────────────────────────────────

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ─── Response Interceptor ───────────────────────────────────────────────────

axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      // TODO: handle token refresh or redirect to /login
      localStorage.removeItem('token');
    }
    // Normalize error shape for consistent catch blocks
    return Promise.reject(error.response?.data ?? error);
  }
);

/**
 * Typed API client.
 * The generic `<T>` represents the expected response.data type.
 * Uses `axiosInstance.get<T, T>` to work around the interceptor's response.data unwrapping.
 *
 * Usage:
 *   const todos = await api.get<Todo[]>('/todos');
 */
const api = {
  get: <T>(url: string, config?: AxiosRequestConfig) => axiosInstance.get<T, T>(url, config),

  post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    axiosInstance.post<T, T>(url, data, config),

  put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    axiosInstance.put<T, T>(url, data, config),

  patch: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    axiosInstance.patch<T, T>(url, data, config),

  delete: <T>(url: string, config?: AxiosRequestConfig) => axiosInstance.delete<T, T>(url, config),
};

export default api;
