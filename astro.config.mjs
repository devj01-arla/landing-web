// filepath: /C:/Users/Sting/Jobs/Arla-Projects/web-principal-arla/arla-web-landing-page/astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  output: 'static', // Configuración para hosting estático
  integrations: [tailwind()],
  outDir: './dist',
  build: {
    format: 'directory'
  },
  vite: {
    ssr: {
      noExternal: ['@astrojs/*']
    }
  },
  trailingSlash: 'never',
  server: {
    host: true
  },
  prefetch: {
    prefetchAll: true
  },
  base: '/',
  srcDir: './src',
  publicDir: './public'
});