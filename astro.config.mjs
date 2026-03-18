import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://kanaftc.github.io',
  base: '/kanaftchian-astro',
  integrations: [
    react(),
  ],
});
