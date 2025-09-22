import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: [
      {
        find: /^@\//,
        replacement: fileURLToPath(new URL('./src/', import.meta.url)),
      },
      {
        find: /^@\/styles\//,
        replacement: fileURLToPath(new URL('./src/styles/', import.meta.url)),
      },
      {
        find: /^@\/_components\//,
        replacement: fileURLToPath(new URL('./src/app/_components/', import.meta.url)),
      },
      {
        find: /^@\/i18n\//,
        replacement: fileURLToPath(new URL('./src/app/i18n/', import.meta.url)),
      },
      {
        find: /^@\/_types\//,
        replacement: fileURLToPath(new URL('./src/app/_types/', import.meta.url)),
      },
      {
        find: /^@\/context\//,
        replacement: fileURLToPath(new URL('./src/app/_context/', import.meta.url)),
      },
      {
        find: /^app\//,
        replacement: fileURLToPath(new URL('./src/app/', import.meta.url)),
      },
      {
        find: /^i18n\//,
        replacement: fileURLToPath(new URL('./src/i18n/', import.meta.url)),
      },
      {
        find: /^next\/navigation$/,
        replacement: 'next/navigation.js',
      },
    ],
  },

  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./setupTests.ts'],

    include: ['**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}'],

    coverage: {
      reporter: ['text', 'lcov', 'html'],
      include: ['src/**/*.{js,jsx,ts,tsx}'],
      all: false,
      thresholds: {
        statements: 80,
        branches: 50,
        functions: 50,
        lines: 50,
      },
    },

    isolate: true,
    passWithNoTests: true,
  },

  optimizeDeps: {
    exclude: ['next-intl', 'next/navigation', 'next/router'],
  },
});
