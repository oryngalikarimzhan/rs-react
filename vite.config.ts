/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './test.setup.ts',
    css: true,
    coverage: {
      all: true,
      src: ['src'],
      reporter: ['text', 'html'],
      exclude: ['**/*.ts'],
    },
  },
});
