import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base = caminho onde o app é publicado (GitHub Pages).
export default defineConfig({
  base: '/player-music/',
  plugins: [react()],
});