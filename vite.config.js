import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    // Bundle optimization
    rollupOptions: {
      output: {
        // Manual chunk splitting for better caching
        manualChunks: {
          // Vendor chunk for third-party libraries
          vendor: ['vue'],
          // Utility chunk for performance utilities
          utils: ['./src/utils/performance.js'],
          // Components chunk for reusable components
          components: [
            './src/components/LazyImage.vue',
            './src/components/LoadingState.vue',
            './src/components/ErrorBoundary.vue'
          ]
        },
        // Optimize chunk file names for caching
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId
          if (facadeModuleId) {
            const name = facadeModuleId.split('/').pop().replace('.vue', '').replace('.js', '')
            return `js/${name}-[hash].js`
          }
          return 'js/[name]-[hash].js'
        },
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.')
          const ext = info[info.length - 1]
          if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(assetInfo.name)) {
            return `images/[name]-[hash].${ext}`
          }
          if (/\.(css)$/i.test(assetInfo.name)) {
            return `css/[name]-[hash].${ext}`
          }
          return `assets/[name]-[hash].${ext}`
        }
      }
    },
    // Optimize build size
    minify: 'esbuild', // Use esbuild for faster builds
    target: 'es2015', // Support older browsers
    // Enable source maps for debugging (disable in production if needed)
    sourcemap: false,
    // Set chunk size warning limit
    chunkSizeWarningLimit: 1000,
    // Enable CSS code splitting
    cssCodeSplit: true
  },
  // Performance optimizations
  optimizeDeps: {
    include: ['vue'],
    exclude: []
  },
  // Server configuration for development
  server: {
    // Enable compression
    compress: true,
    // Optimize for development
    hmr: {
      overlay: false
    }
  },
  // Preview server configuration
  preview: {
    // Enable compression for preview
    compress: true
  }
})
