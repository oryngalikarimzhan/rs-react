/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
  resolve: {
    alias: {
      assets: '/src/assets',
      'components/ui': '/src/components/ui',
      'components/shared': '/src/components/shared',
      'components/layout': '/src/components/layout',
      contexts: '/src/contexts',
      data: '/src/data',
      hooks: '/src/hooks',
      models: '/src/models',
      pages: '/src/pages',
      utils: '/src/utils',
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/setupTest.ts',
    css: true,
    coverage: {
      all: true,
      src: ['src'],
      reporter: ['text', 'html'],
      exclude: ['**/*.ts'],
    },
  },
});
