import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import node from '@astrojs/node';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  integrations: [tailwind()],
  output: "server",  // Añade esta línea
  adapter: node({ mode: 'standalone' }),
});
