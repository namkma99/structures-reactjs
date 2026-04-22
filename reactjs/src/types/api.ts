/**
 * Global API response type contracts.
 * Use these to type API responses consistently across all features.
 */

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export type ApiError = {
  message: string;
  status: number;
  code?: string;
};
