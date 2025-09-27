<template>
  <div class="loading-state" :class="[`loading-${variant}`, { 'fullscreen': fullscreen }]">
    <div class="loading-content">
      <!-- Spinner -->
      <div v-if="showSpinner" class="loading-spinner" :class="`spinner-${size}`">
        <div class="spinner"></div>
      </div>
      
      <!-- Message -->
      <div v-if="message" class="loading-message">
        {{ message }}
      </div>
      
      <!-- Progress bar (optional) -->
      <div v-if="showProgress && progress !== null" class="progress-container">
        <div class="progress-bar">
          <div 
            class="progress-fill" 
            :style="{ width: `${Math.min(100, Math.max(0, progress))}%` }"
          ></div>
        </div>
        <span class="progress-text">{{ Math.round(progress) }}%</span>
      </div>
      
      <!-- Cancel button (optional) -->
      <button 
        v-if="showCancel" 
        @click="$emit('cancel')" 
        class="cancel-btn"
        :disabled="!cancelable"
      >
        Cancel
      </button>
    </div>
    
    <!-- Overlay for fullscreen mode -->
    <div v-if="fullscreen" class="loading-overlay"></div>
  </div>
</template>

<script setup>
defineProps({
  message: {
    type: String,
    default: 'Loading...'
  },
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'primary', 'secondary', 'minimal'].includes(value)
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  },
  fullscreen: {
    type: Boolean,
    default: false
  },
  showSpinner: {
    type: Boolean,
    default: true
  },
  showProgress: {
    type: Boolean,
    default: false
  },
  progress: {
    type: Number,
    default: null
  },
  showCancel: {
    type: Boolean,
    default: false
  },
  cancelable: {
    type: Boolean,
    default: true
  }
})

defineEmits(['cancel'])
</script>

<style scoped>
.loading-state {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-lg);
}

.loading-state.fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(2px);
}

.loading-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-md);
  text-align: center;
  position: relative;
  z-index: 10000;
}

/* Spinner Styles */
.loading-spinner {
  display: flex;
  align-items: center;
  justify-content: center;
}

.spinner {
  border-radius: 50%;
  border-style: solid;
  animation: spin 1s linear infinite;
}

.spinner-small .spinner {
  width: 20px;
  height: 20px;
  border-width: 2px;
}

.spinner-medium .spinner {
  width: 32px;
  height: 32px;
  border-width: 3px;
}

.spinner-large .spinner {
  width: 48px;
  height: 48px;
  border-width: 4px;
}

/* Variant Styles */
.loading-default .spinner {
  border-color: var(--color-light-gray);
  border-top-color: var(--color-primary);
}

.loading-primary .spinner {
  border-color: rgba(220, 38, 127, 0.2);
  border-top-color: var(--color-primary);
}

.loading-secondary .spinner {
  border-color: rgba(33, 150, 243, 0.2);
  border-top-color: var(--color-secondary);
}

.loading-minimal .spinner {
  border-color: var(--color-medium-gray);
  border-top-color: var(--color-dark-gray);
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Message Styles */
.loading-message {
  font-size: var(--font-size-base);
  color: var(--color-dark-gray);
  font-weight: var(--font-weight-medium);
  max-width: 300px;
}

.loading-primary .loading-message {
  color: var(--color-primary);
}

.loading-secondary .loading-message {
  color: var(--color-secondary);
}

/* Progress Bar Styles */
.progress-container {
  width: 200px;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.progress-bar {
  width: 100%;
  height: 6px;
  background-color: var(--color-light-gray);
  border-radius: var(--border-radius-sm);
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: var(--color-primary);
  transition: width var(--transition-normal);
  border-radius: var(--border-radius-sm);
}

.loading-secondary .progress-fill {
  background-color: var(--color-secondary);
}

.progress-text {
  font-size: var(--font-size-sm);
  color: var(--color-medium-gray);
  text-align: center;
}

/* Cancel Button */
.cancel-btn {
  padding: var(--spacing-sm) var(--spacing-md);
  background-color: transparent;
  color: var(--color-medium-gray);
  border: 1px solid var(--color-medium-gray);
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-sm);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.cancel-btn:hover:not(:disabled) {
  background-color: var(--color-medium-gray);
  color: var(--color-white);
}

.cancel-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Overlay */
.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 9999;
}

/* Mobile Optimization */
@media (max-width: 767px) {
  .loading-content {
    gap: var(--spacing-sm);
  }
  
  .loading-message {
    font-size: var(--font-size-sm);
    max-width: 250px;
  }
  
  .progress-container {
    width: 150px;
  }
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .spinner {
    animation: none;
  }
  
  .progress-fill {
    transition: none;
  }
}

/* High Contrast Mode */
@media (prefers-contrast: high) {
  .loading-state.fullscreen {
    background-color: rgba(0, 0, 0, 0.8);
  }
  
  .loading-message {
    color: var(--color-black);
  }
  
  .spinner {
    border-color: var(--color-black);
    border-top-color: var(--color-primary);
  }
}
</style>