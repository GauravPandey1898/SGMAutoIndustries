<template>
  <div class="error-boundary">
    <slot v-if="!hasError" />
    
    <!-- Error State -->
    <div v-else class="error-state" :class="[`error-${variant}`, { 'fullscreen': fullscreen }]">
      <div class="error-content">
        <!-- Error Icon -->
        <div class="error-icon">
          <svg v-if="errorType === 'network'" width="48" height="48" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM13 17h-2v-6h2v6zm0-8h-2V7h2v2z" fill="currentColor"/>
          </svg>
          <svg v-else-if="errorType === 'loading'" width="48" height="48" viewBox="0 0 24 24" fill="none">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/>
          </svg>
          <svg v-else width="48" height="48" viewBox="0 0 24 24" fill="none">
            <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" fill="currentColor"/>
          </svg>
        </div>
        
        <!-- Error Title -->
        <h3 class="error-title">{{ errorTitle }}</h3>
        
        <!-- Error Message -->
        <p class="error-message">{{ displayMessage }}</p>
        
        <!-- Error Details (in development) -->
        <details v-if="showDetails && errorDetails" class="error-details">
          <summary>Technical Details</summary>
          <pre class="error-stack">{{ errorDetails }}</pre>
        </details>
        
        <!-- Action Buttons -->
        <div class="error-actions">
          <button 
            v-if="showRetry" 
            @click="handleRetry" 
            class="error-btn error-btn-primary"
            :disabled="retrying"
          >
            <span v-if="!retrying">{{ retryText }}</span>
            <span v-else>Retrying...</span>
          </button>
          
          <button 
            v-if="showReload" 
            @click="handleReload" 
            class="error-btn error-btn-secondary"
          >
            Reload Page
          </button>
          
          <button 
            v-if="showGoBack" 
            @click="handleGoBack" 
            class="error-btn error-btn-secondary"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onErrorCaptured } from 'vue'

const props = defineProps({
  fallbackMessage: {
    type: String,
    default: 'Something went wrong. Please try again.'
  },
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'minimal', 'detailed'].includes(value)
  },
  fullscreen: {
    type: Boolean,
    default: false
  },
  showRetry: {
    type: Boolean,
    default: true
  },
  showReload: {
    type: Boolean,
    default: false
  },
  showGoBack: {
    type: Boolean,
    default: false
  },
  retryText: {
    type: String,
    default: 'Try Again'
  },
  showDetails: {
    type: Boolean,
    default: process.env.NODE_ENV === 'development'
  }
})

const emit = defineEmits(['error', 'retry'])

// Reactive state
const hasError = ref(false)
const error = ref(null)
const retrying = ref(false)

// Computed properties
const errorType = computed(() => {
  if (!error.value) return 'general'
  
  const message = error.value.message?.toLowerCase() || ''
  if (message.includes('network') || message.includes('fetch')) return 'network'
  if (message.includes('loading') || message.includes('timeout')) return 'loading'
  return 'general'
})

const errorTitle = computed(() => {
  switch (errorType.value) {
    case 'network':
      return 'Connection Problem'
    case 'loading':
      return 'Loading Failed'
    default:
      return 'Something Went Wrong'
  }
})

const displayMessage = computed(() => {
  if (!error.value) return props.fallbackMessage
  
  switch (errorType.value) {
    case 'network':
      return 'Please check your internet connection and try again.'
    case 'loading':
      return 'The content failed to load. Please try again.'
    default:
      return error.value.message || props.fallbackMessage
  }
})

const errorDetails = computed(() => {
  if (!error.value) return null
  return error.value.stack || error.value.toString()
})

// Methods
const handleRetry = async () => {
  retrying.value = true
  
  try {
    await new Promise(resolve => setTimeout(resolve, 500)) // Small delay for UX
    hasError.value = false
    error.value = null
    emit('retry')
  } catch (retryError) {
    console.error('Retry failed:', retryError)
  } finally {
    retrying.value = false
  }
}

const handleReload = () => {
  window.location.reload()
}

const handleGoBack = () => {
  if (window.history.length > 1) {
    window.history.back()
  } else {
    window.location.href = '/'
  }
}

const setError = (newError) => {
  error.value = newError
  hasError.value = true
  emit('error', newError)
}

// Error capture
onErrorCaptured((err, instance, info) => {
  console.error('Error captured by ErrorBoundary:', err, info)
  setError(err)
  return false // Prevent error from propagating
})

// Global error handler
if (typeof window !== 'undefined') {
  window.addEventListener('error', (event) => {
    setError(new Error(event.message))
  })
  
  window.addEventListener('unhandledrejection', (event) => {
    setError(new Error(event.reason))
  })
}

// Expose methods for parent components
defineExpose({
  setError,
  clearError: () => {
    hasError.value = false
    error.value = null
  },
  hasError: () => hasError.value
})
</script>

<style scoped>
.error-boundary {
  width: 100%;
  height: 100%;
}

.error-state {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-xl);
  min-height: 200px;
}

.error-state.fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  background-color: var(--color-white);
}

.error-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-lg);
  text-align: center;
  max-width: 500px;
}

/* Error Icon */
.error-icon {
  color: #f44336;
  opacity: 0.8;
}

.error-default .error-icon {
  color: var(--color-primary);
}

.error-minimal .error-icon {
  color: var(--color-medium-gray);
}

/* Error Title */
.error-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-black);
  margin: 0;
}

.error-minimal .error-title {
  font-size: var(--font-size-lg);
}

/* Error Message */
.error-message {
  font-size: var(--font-size-base);
  color: var(--color-dark-gray);
  line-height: var(--line-height-relaxed);
  margin: 0;
}

.error-minimal .error-message {
  font-size: var(--font-size-sm);
}

/* Error Details */
.error-details {
  width: 100%;
  max-width: 400px;
  margin-top: var(--spacing-md);
}

.error-details summary {
  cursor: pointer;
  font-size: var(--font-size-sm);
  color: var(--color-medium-gray);
  margin-bottom: var(--spacing-sm);
}

.error-stack {
  background-color: var(--color-light-gray);
  padding: var(--spacing-sm);
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-xs);
  color: var(--color-dark-gray);
  overflow-x: auto;
  white-space: pre-wrap;
  word-break: break-word;
}

/* Action Buttons */
.error-actions {
  display: flex;
  gap: var(--spacing-md);
  flex-wrap: wrap;
  justify-content: center;
}

.error-btn {
  padding: var(--spacing-sm) var(--spacing-lg);
  border: none;
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: all var(--transition-fast);
  min-height: 44px;
  min-width: 100px;
}

.error-btn-primary {
  background-color: var(--color-primary);
  color: var(--color-white);
}

.error-btn-primary:hover:not(:disabled) {
  background-color: var(--color-secondary);
  transform: translateY(-1px);
}

.error-btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.error-btn-secondary {
  background-color: transparent;
  color: var(--color-primary);
  border: 1px solid var(--color-primary);
}

.error-btn-secondary:hover {
  background-color: var(--color-primary);
  color: var(--color-white);
  transform: translateY(-1px);
}

/* Responsive Design */
@media (max-width: 767px) {
  .error-state {
    padding: var(--spacing-lg);
    min-height: 150px;
  }
  
  .error-content {
    gap: var(--spacing-md);
  }
  
  .error-title {
    font-size: var(--font-size-lg);
  }
  
  .error-message {
    font-size: var(--font-size-sm);
  }
  
  .error-actions {
    flex-direction: column;
    width: 100%;
  }
  
  .error-btn {
    width: 100%;
    max-width: 200px;
  }
}

/* Accessibility */
.error-btn:focus {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .error-btn:hover {
    transform: none;
  }
}

/* High Contrast */
@media (prefers-contrast: high) {
  .error-icon {
    color: var(--color-black);
  }
  
  .error-message {
    color: var(--color-black);
  }
  
  .error-stack {
    background-color: var(--color-white);
    border: 1px solid var(--color-black);
  }
}
</style>