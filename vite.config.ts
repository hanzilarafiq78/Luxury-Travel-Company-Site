import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
      '@components': path.resolve(import.meta.dirname, './src/components'),
      '@sections': path.resolve(import.meta.dirname, './src/sections'),
      '@three': path.resolve(import.meta.dirname, './src/three'),
      '@animations': path.resolve(import.meta.dirname, './src/animations'),
      '@hooks': path.resolve(import.meta.dirname, './src/hooks'),
      '@styles': path.resolve(import.meta.dirname, './src/styles'),
      '@assets': path.resolve(import.meta.dirname, './src/assets'),
      '@utils': path.resolve(import.meta.dirname, './src/utils'),
    },
  },
  assetsInclude: ['**/*.glb', '**/*.gltf', '**/*.hdr', '**/*.exr'],
  build: {
    target: 'esnext',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/three')) {
            return 'three-core';
          }
          if (id.includes('node_modules/@react-three')) {
            return 'three-fiber';
          }
          if (id.includes('node_modules/gsap')) {
            return 'gsap-core';
          }
        },
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
