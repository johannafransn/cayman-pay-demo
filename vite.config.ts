import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// Project is served from https://johannafransn.github.io/cayman-pay-demo/
export default defineConfig(({ command }) => {
  const base = command === 'build' ? '/cayman-pay-demo/' : '/';
  return {
    base,
    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        injectRegister: 'auto',
        includeAssets: ['favicon.svg', 'apple-touch-icon.png'],
        manifest: {
          name: 'Par — Get paid, send money home',
          short_name: 'Par',
          description: 'Cayman employers pay workers instantly; workers receive pay and send money abroad, cheaper than Western Union.',
          theme_color: '#0096C7',
          background_color: '#0096C7',
          display: 'standalone',
          orientation: 'portrait',
          scope: base,
          start_url: base,
          icons: [
            { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
            { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
            { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
          ],
        },
      }),
    ],
  };
});
