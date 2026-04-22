/**
 * Centralized environment variable access with validation.
 * Import `env` instead of accessing `import.meta.env` directly.
 */

const getEnvVar = (key: string, fallback?: string): string => {
  const value = (import.meta.env as Record<string, string | undefined>)[key] ?? fallback;
  if (value === undefined) {
    throw new Error(`[config/env] Missing environment variable: ${key}`);
  }
  return value;
};

export const env = {
  API_URL: getEnvVar('VITE_API_URL', 'https://jsonplaceholder.typicode.com'),
  MODE: import.meta.env.MODE as 'development' | 'production' | 'test',
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
} as const;
