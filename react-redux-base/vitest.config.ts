import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

/**
 * Vitest configuration (separate from vite.config.ts for clarity).
 * Run tests: pnpm test
 * Run with UI: pnpm test:ui
 * Coverage: pnpm test:coverage
 */
export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        '**/*.config.*',
        'src/components/ui/', // shadcn ui — not our code
        'src/main.tsx',
      ],
    },
  },
});
