import { fileURLToPath, URL } from 'node:url'
import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      injectRegister: 'auto',
      registerType: 'autoUpdate',
      workbox: {
        sourcemap: true,
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      },
      devOptions: {
        enabled: true
      },
      manifest: {
        name: 'System Project',
        short_name: 'Z&Z',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        start_url: '/',
        display: 'standalone',
        lang: 'es-Es',
        orientation: 'portrait',
        prefer_related_application: false,
        display_override: ['standalone', 'fullscreen'],
        icons: [
          {
            src: 'img/icons/icons/ios/16.png',
            type: 'image/png',
            sizes: '16x16'
          },
          {
            src: 'img/icons/icons/ios/20.png',
            type: 'image/png',
            sizes: '20x20'
          },
          {
            src: 'img/icons/icons/ios/29.png',
            type: 'image/png',
            sizes: '29x29'
          },
          {
            src: 'img/icons/icons/ios/32.png',
            type: 'image/png',
            sizes: '32x32'
          },
          {
            src: 'img/icons/icons/ios/40.png',
            type: 'image/png',
            sizes: '40x40'
          },
          {
            src: 'img/icons/icons/ios/50.png',
            type: 'image/png',
            sizes: '50x50'
          },
          {
            src: 'img/icons/icons/ios/57.png',
            type: 'image/png',
            sizes: '57x57'
          },
          {
            src: 'img/icons/icons/ios/58.png',
            type: 'image/png',
            sizes: '58x58'
          },
          {
            src: 'img/icons/icons/ios/60.png',
            type: 'image/png',
            sizes: '60x60'
          },
          {
            src: 'img/icons/icons/ios/64.png',
            type: 'image/png',
            sizes: '64x64'
          },
          {
            src: 'img/icons/icons/ios/72.png',
            type: 'image/png',
            sizes: '72x72'
          },
          {
            src: 'img/icons/icons/ios/76.png',
            type: 'image/png',
            sizes: '76x76'
          },
          {
            src: 'img/icons/icons/ios/80.png',
            type: 'image/png',
            sizes: '80x80'
          },
          {
            src: 'img/icons/icons/ios/87.png',
            type: 'image/png',
            sizes: '87x87'
          },
          {
            src: 'img/icons/icons/ios/100.png',
            type: 'image/png',
            sizes: '100x100'
          },
          {
            src: 'img/icons/icons/ios/114.png',
            type: 'image/png',
            sizes: '114x114'
          },
          {
            src: 'img/icons/icons/ios/120.png',
            type: 'image/png',
            sizes: '120x120'
          },
          {
            src: 'img/icons/icons/ios/128.png',
            type: 'image/png',
            sizes: '128x128'
          },
          {
            src: 'img/icons/icons/ios/144.png',
            type: 'image/png',
            sizes: '144x144'
          },
          {
            src: 'img/icons/icons/ios/152.png',
            type: 'image/png',
            sizes: '152x152'
          },
          {
            src: 'img/icons/icons/ios/167.png',
            type: 'image/png',
            sizes: '167x167'
          },
          {
            src: 'img/icons/icons/ios/180.png',
            type: 'image/png',
            sizes: '180x180'
          },
          {
            src: 'img/icons/icons/ios/192.png',
            type: 'image/png',
            sizes: '192x192'
          },
          {
            src: 'img/icons/icons/ios/192.png',
            type: 'image/png',
            sizes: '192x192',
            purpose: 'any maskable'
          },
          {
            src: 'img/icons/icons/ios/256.png',
            type: 'image/png',
            sizes: '256x256'
          },
          {
            src: 'img/icons/icons/ios/512.png',
            type: 'image/png',
            sizes: '512x512'
          },
          {
            src: 'img/icons/icons/ios/1024.png',
            type: 'image/png',
            sizes: '1024x1024'
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      // '~bootstrap': `${path.resolve(__dirname, 'node_modules/bootstrap')}/`
      '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap')
    }
  }
})
