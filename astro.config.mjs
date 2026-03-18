import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://kanaftchian.com',
  integrations: [
    tailwind(),
    react(),
  ],
  image: {
    // Optimisation automatique des images
    service: { entrypoint: 'astro/assets/services/sharp' },
  },
  vite: {
    ssr: {
      noExternal: [],
    },
  },
});
