import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'happy-dom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
    include: ['tests/**/*.test.ts'],
    passWithNoTests: true, // Allow empty test files in lint-staged
  },
});
