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
        name: "Test Project",
        short_name: "Test",
        theme_color: "#ffffff",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        icons: [
          {
            src: "icon-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icon-512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      //'~bootstrap': `${path.resolve(__dirname, 'node_modules/bootstrap')}/`
      '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
    }
  }
})
