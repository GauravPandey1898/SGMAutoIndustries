/**
 * Performance Monitoring Utilities
 * Track and report performance metrics for optimization
 */

/**
 * Performance metrics collector
 */
class PerformanceMonitor {
  constructor() {
    this.metrics = new Map()
    this.observers = new Map()
    this.isEnabled = typeof window !== 'undefined' && 'performance' in window
  }

  /**
   * Start timing a specific operation
   * @param {string} name - Name of the operation
   */
  startTiming(name) {
    if (!this.isEnabled) return

    this.metrics.set(name, {
      startTime: performance.now(),
      endTime: null,
      duration: null
    })
  }

  /**
   * End timing for a specific operation
   * @param {string} name - Name of the operation
   * @returns {number} Duration in milliseconds
   */
  endTiming(name) {
    if (!this.isEnabled || !this.metrics.has(name)) return 0

    const metric = this.metrics.get(name)
    metric.endTime = performance.now()
    metric.duration = metric.endTime - metric.startTime

    console.log(`Performance: ${name} took ${metric.duration.toFixed(2)}ms`)
    return metric.duration
  }

  /**
   * Measure function execution time
   * @param {string} name - Name of the operation
   * @param {Function} fn - Function to measure
   * @returns {Promise|any} Result of the function
   */
  async measure(name, fn) {
    this.startTiming(name)
    try {
      const result = await fn()
      return result
    } finally {
      this.endTiming(name)
    }
  }

  /**
   * Track Core Web Vitals
   */
  trackCoreWebVitals() {
    if (!this.isEnabled) return

    // Largest Contentful Paint (LCP)
    this.observePerformanceEntries('largest-contentful-paint', (entries) => {
      const lcp = entries[entries.length - 1]
      this.reportMetric('LCP', lcp.startTime, 'ms')
    })

    // First Input Delay (FID)
    this.observePerformanceEntries('first-input', (entries) => {
      entries.forEach(entry => {
        const fid = entry.processingStart - entry.startTime
        this.reportMetric('FID', fid, 'ms')
      })
    })

    // Cumulative Layout Shift (CLS)
    let clsValue = 0
    this.observePerformanceEntries('layout-shift', (entries) => {
      entries.forEach(entry => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value
        }
      })
      this.reportMetric('CLS', clsValue, 'score')
    })

    // Time to First Byte (TTFB)
    this.observePerformanceEntries('navigation', (entries) => {
      entries.forEach(entry => {
        const ttfb = entry.responseStart - entry.requestStart
        this.reportMetric('TTFB', ttfb, 'ms')
      })
    })
  }

  /**
   * Observe performance entries
   * @param {string} entryType - Type of performance entry
   * @param {Function} callback - Callback function
   */
  observePerformanceEntries(entryType, callback) {
    if (!('PerformanceObserver' in window)) return

    try {
      const observer = new PerformanceObserver((list) => {
        callback(list.getEntries())
      })

      observer.observe({ entryTypes: [entryType] })
      this.observers.set(entryType, observer)
    } catch (error) {
      console.warn(`Failed to observe ${entryType}:`, error)
    }
  }

  /**
   * Report a performance metric
   * @param {string} name - Metric name
   * @param {number} value - Metric value
   * @param {string} unit - Unit of measurement
   */
  reportMetric(name, value, unit = 'ms') {
    const formattedValue = typeof value === 'number' ? value.toFixed(2) : value
    console.log(`Performance Metric: ${name} = ${formattedValue}${unit}`)

    // Store metric for potential reporting
    this.metrics.set(name, {
      value: formattedValue,
      unit,
      timestamp: Date.now()
    })

    // You could send this to an analytics service
    this.sendToAnalytics(name, formattedValue, unit)
  }

  /**
   * Send metrics to analytics service (placeholder)
   * @param {string} name - Metric name
   * @param {string} value - Metric value
   * @param {string} unit - Unit of measurement
   */
  sendToAnalytics(name, value, unit) {
    // Placeholder for analytics integration
    // Example: Google Analytics, custom analytics endpoint, etc.
    if (typeof gtag !== 'undefined') {
      gtag('event', 'performance_metric', {
        metric_name: name,
        metric_value: value,
        metric_unit: unit
      })
    }
  }

  /**
   * Track resource loading performance
   */
  trackResourceLoading() {
    if (!this.isEnabled) return

    this.observePerformanceEntries('resource', (entries) => {
      entries.forEach(entry => {
        const duration = entry.responseEnd - entry.startTime
        const resourceType = this.getResourceType(entry.name)
        
        if (duration > 1000) { // Log slow resources (>1s)
          console.warn(`Slow resource loading: ${entry.name} took ${duration.toFixed(2)}ms`)
        }

        this.reportMetric(`Resource_${resourceType}`, duration, 'ms')
      })
    })
  }

  /**
   * Get resource type from URL
   * @param {string} url - Resource URL
   * @returns {string} Resource type
   */
  getResourceType(url) {
    if (url.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)) return 'image'
    if (url.match(/\.(css)$/i)) return 'stylesheet'
    if (url.match(/\.(js)$/i)) return 'script'
    if (url.match(/\.(woff|woff2|ttf|eot)$/i)) return 'font'
    return 'other'
  }

  /**
   * Track user interactions
   */
  trackUserInteractions() {
    if (!this.isEnabled) return

    // Track click interactions
    document.addEventListener('click', (event) => {
      const target = event.target
      const tagName = target.tagName.toLowerCase()
      const className = target.className
      
      this.reportMetric('User_Interaction', 1, 'count')
      
      // Track specific interactions
      if (tagName === 'button' || target.closest('button')) {
        this.reportMetric('Button_Click', 1, 'count')
      }
      
      if (tagName === 'a' || target.closest('a')) {
        this.reportMetric('Link_Click', 1, 'count')
      }
    })

    // Track form interactions
    document.addEventListener('submit', (event) => {
      this.reportMetric('Form_Submit', 1, 'count')
    })
  }

  /**
   * Track page visibility changes
   */
  trackPageVisibility() {
    if (!('visibilityState' in document)) return

    let visibilityStart = Date.now()

    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        visibilityStart = Date.now()
      } else {
        const visibilityDuration = Date.now() - visibilityStart
        this.reportMetric('Page_Visibility_Duration', visibilityDuration, 'ms')
      }
    })
  }

  /**
   * Get all collected metrics
   * @returns {Object} All metrics
   */
  getMetrics() {
    return Object.fromEntries(this.metrics)
  }

  /**
   * Clear all metrics
   */
  clearMetrics() {
    this.metrics.clear()
  }

  /**
   * Disconnect all observers
   */
  disconnect() {
    this.observers.forEach(observer => {
      try {
        observer.disconnect()
      } catch (error) {
        console.warn('Failed to disconnect observer:', error)
      }
    })
    this.observers.clear()
  }
}

// Create global performance monitor instance
export const performanceMonitor = new PerformanceMonitor()

/**
 * Initialize performance monitoring
 */
export function initializePerformanceMonitoring() {
  if (typeof window === 'undefined') return

  try {
    performanceMonitor.trackCoreWebVitals()
    performanceMonitor.trackResourceLoading()
    performanceMonitor.trackUserInteractions()
    performanceMonitor.trackPageVisibility()

    console.log('Performance monitoring initialized')
  } catch (error) {
    console.warn('Failed to initialize performance monitoring:', error)
  }
}

/**
 * Track component loading time
 * @param {string} componentName - Name of the component
 * @param {Function} loadFunction - Function that loads the component
 * @returns {Promise} Promise that resolves with the loaded component
 */
export async function trackComponentLoad(componentName, loadFunction) {
  return performanceMonitor.measure(`Component_${componentName}_Load`, loadFunction)
}

/**
 * Track API call performance
 * @param {string} apiName - Name of the API
 * @param {Function} apiCall - Function that makes the API call
 * @returns {Promise} Promise that resolves with the API response
 */
export async function trackApiCall(apiName, apiCall) {
  return performanceMonitor.measure(`API_${apiName}`, apiCall)
}

/**
 * Report custom metric
 * @param {string} name - Metric name
 * @param {number} value - Metric value
 * @param {string} unit - Unit of measurement
 */
export function reportCustomMetric(name, value, unit = 'ms') {
  performanceMonitor.reportMetric(name, value, unit)
}

// Cleanup function for when the app unmounts
export function cleanupPerformanceMonitoring() {
  performanceMonitor.disconnect()
}