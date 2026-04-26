const getEnvVar = (key: string, fallback?: string): string => {
  const value = process.env[key] ?? fallback;

  if (value === undefined) {
    throw new Error(`[config/env] Missing environment variable: ${key}`);
  }

  return value;
};

export const env = {
  APP_URL: getEnvVar("NEXT_PUBLIC_APP_URL", "http://localhost:3000"),
  isDev: process.env.NODE_ENV === "development",
  isProd: process.env.NODE_ENV === "production",
  isTest: process.env.NODE_ENV === "test",
} as const;
