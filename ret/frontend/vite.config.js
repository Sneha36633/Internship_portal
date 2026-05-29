import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // ensures paths work correctly on root deployment
  build: {
    outDir: 'dist', // default is 'dist', optional if you want a custom folder
  },
});
