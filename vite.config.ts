import path from 'path';
import { defineConfig } from 'vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import babel from '@rolldown/plugin-babel';

export default defineConfig({
  plugins: [
    react(),
    babel({
      presets: ['@babel/preset-typescript', reactCompilerPreset()],
    }),
    tailwindcss(),
  ],
  server: {
    watch: {
      ignored: [path.resolve(__dirname, './json-server/**')],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
