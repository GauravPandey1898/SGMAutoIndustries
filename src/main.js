import { createApp } from 'vue'
import App from './App.vue'
import { initializePerformanceMonitoring } from './utils/monitoring.js'

// Initialize performance monitoring
initializePerformanceMonitoring()

// Create and mount the Vue app
const app = createApp(App)
app.mount('#app')

// Register service worker for performance optimization and offline support
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      })
      
      console.log('Service Worker registered successfully:', registration.scope)
      
      // Handle service worker updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing
        
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New service worker is available
              console.log('New service worker available')
              
              // Optionally show update notification to user
              if (confirm('A new version is available. Reload to update?')) {
                window.location.reload()
              }
            }
          })
        }
      })
      
    } catch (error) {
      console.warn('Service Worker registration failed:', error)
    }
  })
}

// Global error handling for better user experience
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error)
  // You could send this to an error reporting service
})

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason)
  // You could send this to an error reporting service
})
