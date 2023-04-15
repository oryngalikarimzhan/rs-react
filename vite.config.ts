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
      assets: '/src/assets/index.ts',
      contexts: '/src/contexts/index.tsx',
      'components/layout': '/src/components/layout/index.tsx',
      'components/shared': '/src/components/shared/index.tsx',
      'components/ui': '/src/components/ui/index.tsx',
      data: '/src/data/index.ts',
      hooks: '/src/hooks/index.ts',
      models: '/src/models/index.ts',
      pages: '/src/pages/index.tsx',
      store: '/src/store/index.ts',
      'utils/constants': '/src/utils/constants/index.ts',
      'utils/helpers': '/src/utils/helpers/index.ts',
      'utils/types': '/src/utils/types/index.ts',
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
      exclude: ['**/*.ts', 'index.tsx'],
    },
  },
});
