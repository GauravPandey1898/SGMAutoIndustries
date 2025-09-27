<template>
  <div class="lazy-image-container" :class="{ 'loading': isLoading, 'error': hasError }">
    <img
      v-if="!hasError"
      ref="imageRef"
      :src="currentSrc"
      :alt="alt"
      :class="imageClass"
      @load="handleLoad"
      @error="handleError"
      :loading="loading"
    />
    
    <!-- Loading placeholder -->
    <div v-if="isLoading" class="image-placeholder">
      <div class="loading-spinner"></div>
      <span class="loading-text">Loading...</span>
    </div>
    
    <!-- Error placeholder -->
    <div v-if="hasError" class="error-placeholder">
      <div class="error-icon">📷</div>
      <span class="error-text">{{ errorMessage }}</span>
      <button v-if="retryCount < maxRetries" @click="retry" class="retry-btn">
        Retry
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: ''
  },
  fallbackSrc: {
    type: String,
    default: ''
  },
  loading: {
    type: String,
    default: 'lazy',
    validator: (value) => ['lazy', 'eager'].includes(value)
  },
  imageClass: {
    type: String,
    default: ''
  },
  maxRetries: {
    type: Number,
    default: 2
  }
})

const emit = defineEmits(['load', 'error'])

// Reactive state
const imageRef = ref(null)
const isLoading = ref(true)
const hasError = ref(false)
const retryCount = ref(0)
const observer = ref(null)

// Computed properties
const currentSrc = computed(() => {
  if (hasError.value && props.fallbackSrc) {
    return props.fallbackSrc
  }
  return props.src
})

const errorMessage = computed(() => {
  if (retryCount.value >= props.maxRetries) {
    return 'Image failed to load'
  }
  return 'Loading failed, retrying...'
})

// Methods
const handleLoad = () => {
  isLoading.value = false
  hasError.value = false
  emit('load')
}

const handleError = () => {
  isLoading.value = false
  
  if (retryCount.value < props.maxRetries) {
    // Try fallback image if available
    if (props.fallbackSrc && currentSrc.value !== props.fallbackSrc) {
      hasError.value = false
      isLoading.value = true
      return
    }
    
    // Retry with delay
    setTimeout(() => {
      retry()
    }, 1000 * (retryCount.value + 1))
  } else {
    hasError.value = true
    emit('error')
  }
}

const retry = () => {
  if (retryCount.value < props.maxRetries) {
    retryCount.value++
    isLoading.value = true
    hasError.value = false
    
    // Force image reload by adding timestamp
    const img = imageRef.value
    if (img) {
      const separator = props.src.includes('?') ? '&' : '?'
      img.src = `${props.src}${separator}retry=${Date.now()}`
    }
  }
}

const setupIntersectionObserver = () => {
  if (!('IntersectionObserver' in window)) {
    // Fallback for browsers without IntersectionObserver
    isLoading.value = false
    return
  }

  observer.value = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isLoading.value = false
          observer.value?.unobserve(entry.target)
        }
      })
    },
    {
      rootMargin: '50px'
    }
  )

  if (imageRef.value) {
    observer.value.observe(imageRef.value)
  }
}

// Lifecycle
onMounted(() => {
  if (props.loading === 'lazy') {
    setupIntersectionObserver()
  } else {
    isLoading.value = false
  }
})

onUnmounted(() => {
  if (observer.value) {
    observer.value.disconnect()
  }
})
</script>

<style scoped>
.lazy-image-container {
  position: relative;
  display: inline-block;
  width: 100%;
  height: 100%;
  background-color: var(--color-light-gray);
  border-radius: var(--border-radius-md);
  overflow: hidden;
}

.lazy-image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity var(--transition-normal);
}

.lazy-image-container.loading img {
  opacity: 0;
}

.image-placeholder,
.error-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--color-light-gray);
  color: var(--color-medium-gray);
}

.loading-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid var(--color-light-gray);
  border-top: 3px solid var(--color-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: var(--spacing-sm);
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-text,
.error-text {
  font-size: var(--font-size-sm);
  text-align: center;
}

.error-icon {
  font-size: 2rem;
  margin-bottom: var(--spacing-sm);
}

.retry-btn {
  margin-top: var(--spacing-sm);
  padding: var(--spacing-xs) var(--spacing-sm);
  background-color: var(--color-primary);
  color: var(--color-white);
  border: none;
  border-radius: var(--border-radius-sm);
  font-size: var(--font-size-xs);
  cursor: pointer;
  transition: background-color var(--transition-fast);
}

.retry-btn:hover {
  background-color: var(--color-secondary);
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .loading-spinner {
    animation: none;
  }
  
  .lazy-image-container img {
    transition: none;
  }
}
</style>