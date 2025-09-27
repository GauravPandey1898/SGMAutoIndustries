<script setup>
import { onMounted, onUnmounted } from 'vue';
import {
  Header,
  Hero,
  VehicleShowcase,
  Services,
  About,
  Contact,
  Footer,
  ErrorBoundary
} from './components';
import { 
  measureCoreWebVitals, 
  addResourceHints, 
  shouldLoadHighQualityImages,
  preloadImages 
} from './utils/performance.js';

// Performance monitoring and cleanup
let performanceObserver = null;
let cleanupTasks = [];

// Enhanced smooth scrolling and mobile optimizations
onMounted(async () => {
  // Ensure smooth scrolling works across all browsers
  if ('scrollBehavior' in document.documentElement.style) {
    document.documentElement.style.scrollBehavior = 'smooth';
  }
  
  // Add viewport meta tag if not present (for mobile optimization)
  if (!document.querySelector('meta[name="viewport"]')) {
    const viewport = document.createElement('meta');
    viewport.name = 'viewport';
    viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes';
    document.head.appendChild(viewport);
  }
  
  // Optimize touch scrolling on iOS
  document.body.style.webkitOverflowScrolling = 'touch';
  
  // Add touch-action for better touch handling
  document.body.style.touchAction = 'manipulation';
  
  // Performance optimizations
  try {
    // Measure Core Web Vitals
    measureCoreWebVitals();
    
    // Add resource hints for critical resources
    const criticalResources = [
      { url: '/favicon.ico', type: 'preload', as: 'image' }
    ];
    addResourceHints(criticalResources);
    
    // Preload critical images based on connection quality
    if (shouldLoadHighQualityImages()) {
      const criticalImages = [
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop&crop=center'
      ];
      
      try {
        await preloadImages(criticalImages);
        console.log('Critical images preloaded successfully');
      } catch (error) {
        console.warn('Some critical images failed to preload:', error);
      }
    }
    
    // Set up error handling for unhandled promise rejections
    const handleUnhandledRejection = (event) => {
      console.error('Unhandled promise rejection:', event.reason);
      // You could send this to an error reporting service
    };
    
    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    cleanupTasks.push(() => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    });
    
  } catch (error) {
    console.warn('Performance optimization setup failed:', error);
  }
});

onUnmounted(() => {
  // Cleanup performance observers and event listeners
  cleanupTasks.forEach(cleanup => {
    try {
      cleanup();
    } catch (error) {
      console.warn('Cleanup failed:', error);
    }
  });
});
</script>

<template>
  <ErrorBoundary>
    <div id="app">
      <Header />
      <main>
        <Hero />
        <VehicleShowcase />
        <Services />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  </ErrorBoundary>
</template>

<style>
/* Import base styles */
@import './styles/base.css';

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
}

main {
  flex: 1;
}

/* Mobile-specific app optimizations */
@media (max-width: 767px) {
  #app {
    /* Prevent horizontal scrolling on mobile */
    overflow-x: hidden;
    width: 100%;
  }
  
  /* Optimize for mobile browsers */
  body {
    /* Prevent pull-to-refresh on mobile browsers */
    overscroll-behavior-y: contain;
    /* Improve scrolling performance */
    -webkit-overflow-scrolling: touch;
    /* Better text rendering on mobile */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}

/* Landscape mobile optimization */
@media (max-height: 500px) and (orientation: landscape) {
  #app {
    min-height: 100vh;
  }
}

/* High DPI displays */
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  #app {
    /* Optimize for retina displays */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}
</style>
