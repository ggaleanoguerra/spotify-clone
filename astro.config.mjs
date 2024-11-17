import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import node from '@astrojs/node';
import dotenv from 'dotenv';

import react from '@astrojs/react';

dotenv.config();

export default defineConfig({
  integrations: [tailwind(), react()],
  output: "server",  
  adapter: node({ mode: 'standalone' }),
  vite: {
    define: {
        'process.env.SPOTIFY_CLIENT_ID': JSON.stringify(process.env.SPOTIFY_CLIENT_ID),
        'process.env.SPOTIFY_CLIENT_SECRET': JSON.stringify(process.env.SPOTIFY_CLIENT_SECRET),
        'process.env.SPOTIFY_REDIRECT_URI': JSON.stringify(process.env.SPOTIFY_REDIRECT_URI)
    }
}
});