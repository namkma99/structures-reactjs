import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": new URL("./src", import.meta.url).pathname,
    },
  },
  test: {
    coverage: {
      exclude: [
        "node_modules/",
        "src/test/",
        "**/*.d.ts",
        "src/app/",
        "src/components/ui/",
      ],
      provider: "v8",
      reporter: ["text", "lcov", "html"],
    },
    environment: "jsdom",
    globals: true,
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    setupFiles: ["./src/test/setup.ts"],
  },
});
