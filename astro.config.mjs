// filepath: astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';

export default defineConfig({
  // Ahora usamos modo servidor porque tienes /api, DB, etc.
  output: 'server',

  adapter: vercel(),

  integrations: [tailwind()],
  outDir: './dist',

  build: {
    format: 'directory',
  },

  vite: {
    ssr: {
      noExternal: ['@astrojs/*'],
    },
  },

  trailingSlash: 'never',

  server: {
    host: true,
  },

  prefetch: {
    prefetchAll: true,
  },

  base: '/',
  srcDir: './src',
  publicDir: './public',
});
