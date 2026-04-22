/**
 * Common utility types shared across the application.
 */

export type ID = string | number;

export type Nullable<T> = T | null;

export type Optional<T> = T | undefined;

export type WithId<T> = T & { id: ID };

export type Status = 'idle' | 'loading' | 'success' | 'error';

export type ThemeMode = 'light' | 'dark';

export type ValueOf<T> = T[keyof T];

/** Make specific keys of T optional */
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/** Make specific keys of T required */
export type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

/** Authenticated user shape — update to match your actual API auth response */
export type User = {
  name: string;
  email: string;
};
