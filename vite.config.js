import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.png', 'logo.png'],
      manifest: {
        name: '0528creatives inc.',
        short_name: '0528creatives',
        description:
          '0528creatives inc. — a curated house of premium menswear, womenswear, and kidswear. Order directly on WhatsApp.',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#faf7f2',
        theme_color: '#2a1437',
        lang: 'en-GB',
        categories: ['shopping', 'lifestyle', 'fashion'],
        icons: [
          { src: '/logo.png',    sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: '/logo.png',    sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: '/logo.png',    sizes: '512x512', type: 'image/png', purpose: 'maskable' },
          { src: '/favicon.png', sizes: '64x64',   type: 'image/png' }
        ],
        shortcuts: [
          { name: 'Women',  short_name: 'Women',  url: '/women'  },
          { name: 'Men',    short_name: 'Men',    url: '/men'    },
          { name: 'Kids',   short_name: 'Kids',   url: '/kids'   },
          { name: 'New In', short_name: 'New In', url: '/new-in' }
        ]
      },
      workbox: {
        navigateFallback: '/index.html',
        globPatterns: ['**/*.{js,css,html,png,svg,ico,webp,woff2}'],
        cleanupOutdatedCaches: true,
        runtimeCaching: [
          {
            // Google Fonts stylesheets — stale-while-revalidate
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'google-fonts-stylesheets' }
          },
          {
            // Google Fonts webfont files — cache-first
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-webfonts',
              cacheableResponse: { statuses: [0, 200] },
              expiration: { maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 * 365 }
            }
          },
          {
            // Unsplash product imagery — cache-first with long TTL
            urlPattern: /^https:\/\/images\.unsplash\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'unsplash-images',
              cacheableResponse: { statuses: [0, 200] },
              expiration: { maxEntries: 400, maxAgeSeconds: 60 * 60 * 24 * 30 }
            }
          }
        ]
      },
      devOptions: {
        enabled: true,
        type: 'module'
      }
    })
  ],
  server: {
    port: 5173,
    open: true
  }
})
