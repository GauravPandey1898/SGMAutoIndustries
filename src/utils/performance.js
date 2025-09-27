/**
 * Performance Utilities
 * Collection of utilities for optimizing performance and user experience
 */

/**
 * Debounce function to limit the rate of function execution
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @param {boolean} immediate - Execute immediately on first call
 * @returns {Function} Debounced function
 */
export function debounce(func, wait, immediate = false) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      timeout = null
      if (!immediate) func(...args)
    }
    const callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func(...args)
  }
}

/**
 * Throttle function to limit function execution frequency
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
export function throttle(func, limit) {
  let inThrottle
  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

/**
 * Lazy load images with intersection observer
 * @param {string} selector - CSS selector for images to lazy load
 * @param {Object} options - Intersection observer options
 */
export function lazyLoadImages(selector = 'img[data-src]', options = {}) {
  const defaultOptions = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1
  }
  
  const observerOptions = { ...defaultOptions, ...options }
  
  if (!('IntersectionObserver' in window)) {
    // Fallback for browsers without IntersectionObserver
    const images = document.querySelectorAll(selector)
    images.forEach(img => {
      if (img.dataset.src) {
        img.src = img.dataset.src
        img.removeAttribute('data-src')
      }
    })
    return
  }
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target
        if (img.dataset.src) {
          img.src = img.dataset.src
          img.removeAttribute('data-src')
          img.classList.remove('lazy')
          observer.unobserve(img)
        }
      }
    })
  }, observerOptions)
  
  const images = document.querySelectorAll(selector)
  images.forEach(img => imageObserver.observe(img))
  
  return imageObserver
}

/**
 * Preload critical images
 * @param {Array<string>} imageUrls - Array of image URLs to preload
 * @returns {Promise<Array>} Promise that resolves when all images are loaded
 */
export function preloadImages(imageUrls) {
  const promises = imageUrls.map(url => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => resolve(url)
      img.onerror = () => reject(new Error(`Failed to load image: ${url}`))
      img.src = url
    })
  })
  
  return Promise.allSettled(promises)
}

/**
 * Optimize image loading with retry mechanism
 * @param {string} src - Image source URL
 * @param {Object} options - Loading options
 * @returns {Promise<HTMLImageElement>} Promise that resolves with loaded image
 */
export function loadImageWithRetry(src, options = {}) {
  const { maxRetries = 3, retryDelay = 1000, timeout = 10000 } = options
  
  return new Promise((resolve, reject) => {
    let attempts = 0
    
    function attemptLoad() {
      attempts++
      const img = new Image()
      
      // Set up timeout
      const timeoutId = setTimeout(() => {
        img.onload = null
        img.onerror = null
        reject(new Error(`Image load timeout: ${src}`))
      }, timeout)
      
      img.onload = () => {
        clearTimeout(timeoutId)
        resolve(img)
      }
      
      img.onerror = () => {
        clearTimeout(timeoutId)
        
        if (attempts < maxRetries) {
          setTimeout(attemptLoad, retryDelay * attempts)
        } else {
          reject(new Error(`Failed to load image after ${maxRetries} attempts: ${src}`))
        }
      }
      
      img.src = src
    }
    
    attemptLoad()
  })
}

/**
 * Check if user prefers reduced motion
 * @returns {boolean} True if user prefers reduced motion
 */
export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Get connection information for adaptive loading
 * @returns {Object} Connection information
 */
export function getConnectionInfo() {
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection
  
  if (!connection) {
    return {
      effectiveType: 'unknown',
      downlink: null,
      saveData: false
    }
  }
  
  return {
    effectiveType: connection.effectiveType || 'unknown',
    downlink: connection.downlink || null,
    saveData: connection.saveData || false
  }
}

/**
 * Determine if we should load high quality images based on connection
 * @returns {boolean} True if high quality images should be loaded
 */
export function shouldLoadHighQualityImages() {
  const connection = getConnectionInfo()
  
  // Don't load high quality if user has save data enabled
  if (connection.saveData) return false
  
  // Load high quality for fast connections
  if (connection.effectiveType === '4g' && connection.downlink > 1.5) return true
  
  // Default to lower quality for slower connections
  return connection.effectiveType === '4g'
}

/**
 * Create a performance observer for monitoring metrics
 * @param {Function} callback - Callback function for performance entries
 * @param {Array<string>} entryTypes - Types of entries to observe
 */
export function createPerformanceObserver(callback, entryTypes = ['navigation', 'paint', 'largest-contentful-paint']) {
  if (!('PerformanceObserver' in window)) {
    console.warn('PerformanceObserver not supported')
    return null
  }
  
  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      callback(entries)
    })
    
    entryTypes.forEach(type => {
      try {
        observer.observe({ entryTypes: [type] })
      } catch (e) {
        console.warn(`Performance observer type '${type}' not supported`)
      }
    })
    
    return observer
  } catch (e) {
    console.warn('Failed to create performance observer:', e)
    return null
  }
}

/**
 * Measure and log Core Web Vitals
 */
export function measureCoreWebVitals() {
  // Largest Contentful Paint (LCP)
  createPerformanceObserver((entries) => {
    const lcpEntry = entries[entries.length - 1]
    console.log('LCP:', lcpEntry.startTime)
  }, ['largest-contentful-paint'])
  
  // First Input Delay (FID)
  createPerformanceObserver((entries) => {
    entries.forEach(entry => {
      console.log('FID:', entry.processingStart - entry.startTime)
    })
  }, ['first-input'])
  
  // Cumulative Layout Shift (CLS)
  let clsValue = 0
  createPerformanceObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.hadRecentInput) {
        clsValue += entry.value
      }
    })
    console.log('CLS:', clsValue)
  }, ['layout-shift'])
}

/**
 * Optimize bundle loading with dynamic imports
 * @param {Function} importFunction - Dynamic import function
 * @param {string} componentName - Name of component for error reporting
 * @returns {Promise} Promise that resolves with the imported module
 */
export async function loadComponentAsync(importFunction, componentName = 'Component') {
  try {
    const module = await importFunction()
    return module
  } catch (error) {
    console.error(`Failed to load ${componentName}:`, error)
    throw new Error(`Failed to load ${componentName}`)
  }
}

/**
 * Create a resource hints for preloading
 * @param {Array<Object>} resources - Array of resource objects with url and type
 */
export function addResourceHints(resources) {
  const head = document.head
  
  resources.forEach(({ url, type, as }) => {
    const link = document.createElement('link')
    link.rel = type || 'preload'
    link.href = url
    if (as) link.as = as
    head.appendChild(link)
  })
}

/**
 * Cleanup function for removing event listeners and observers
 * @param {Array} cleanupTasks - Array of cleanup functions
 */
export function cleanup(cleanupTasks) {
  cleanupTasks.forEach(task => {
    try {
      if (typeof task === 'function') {
        task()
      } else if (task && typeof task.disconnect === 'function') {
        task.disconnect()
      } else if (task && typeof task.unobserve === 'function') {
        task.unobserve()
      }
    } catch (error) {
      console.warn('Cleanup task failed:', error)
    }
  })
}