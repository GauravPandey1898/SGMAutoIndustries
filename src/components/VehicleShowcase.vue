<template>
  <section class="vehicle-showcase" id="vehicles">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Featured Vehicles</h2>
        <p class="section-subtitle">Discover our premium TVS three-wheeler collection</p>
      </div>

      <div class="vehicle-card" v-for="vehicle in vehicles" :key="vehicle.id">
        <div class="vehicle-content">
          <!-- Image Gallery -->
          <div class="vehicle-gallery">
            <div class="main-image">
              <LazyImage
                :src="getCurrentImage(vehicle)"
                :alt="`${vehicle.name} - ${vehicle.model}`"
                :fallback-src="getDefaultVehicleImage()"
                image-class="vehicle-image"
                :max-retries="3"
                @load="handleImageLoad(vehicle.id)"
                @error="handleImageError(vehicle.id, vehicle)"
              />
            </div>
            
            <!-- Thumbnail Navigation -->
            <div class="thumbnail-nav" v-if="vehicle.images.length > 1">
              <button 
                v-for="(image, index) in vehicle.images" 
                :key="index"
                class="thumbnail-btn"
                :class="{ 'active': currentImages[vehicle.id] === image }"
                @click="selectImage(vehicle.id, image)"
                :aria-label="`View ${vehicle.name} image ${index + 1}`"
              >
                <LazyImage
                  :src="image"
                  :alt="`${vehicle.name} thumbnail ${index + 1}`"
                  :fallback-src="getDefaultVehicleImage()"
                  loading="lazy"
                  image-class="thumbnail-image"
                />
              </button>
            </div>
          </div>

          <!-- Vehicle Information -->
          <div class="vehicle-info">
            <div class="vehicle-header">
              <h3 class="vehicle-name">{{ vehicle.name }}</h3>
              <span class="vehicle-model">{{ vehicle.model }}</span>
            </div>

            <!-- Specifications -->
            <div class="specifications" v-if="vehicle.hasSpecifications()">
              <h4 class="spec-title">Key Specifications</h4>
              <div class="spec-grid">
                <div 
                  v-for="(value, key) in vehicle.specifications" 
                  :key="key" 
                  class="spec-item"
                >
                  <span class="spec-label">{{ formatSpecLabel(key) }}</span>
                  <span class="spec-value">{{ value }}</span>
                </div>
              </div>
            </div>

            <!-- Features -->
            <div class="features" v-if="vehicle.features.length > 0">
              <h4 class="features-title">Key Features</h4>
              <ul class="features-list">
                <li v-for="feature in vehicle.features" :key="feature" class="feature-item">
                  <span class="feature-icon">✓</span>
                  {{ feature }}
                </li>
              </ul>
            </div>

            <!-- Pricing and Actions -->
            <div class="vehicle-actions">
              <div class="pricing">
                <span class="price-label">Price:</span>
                <span class="price-value">{{ vehicle.price }}</span>
              </div>
              
              <div class="action-buttons">
                <a 
                  :href="vehicle.officialLink" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="btn btn-secondary"
                  :aria-label="`View ${vehicle.name} on official TVS website`"
                >
                  View Official Page
                  <span class="external-icon">↗</span>
                </a>
                
                <button 
                  class="btn btn-primary"
                  @click="handleContactInquiry(vehicle)"
                  :aria-label="`Contact us about ${vehicle.name}`"
                >
                  Contact for Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { featuredVehicle, vehicleData } from '../data/vehicleData'
import LazyImage from './LazyImage.vue'

// Reactive data
const vehicles = ref(vehicleData)
const currentImages = reactive({})
const imageLoading = reactive({})
const imageErrors = reactive({})

// Initialize component
onMounted(() => {
  // Set initial images and loading states
  vehicles.value.forEach(vehicle => {
    currentImages[vehicle.id] = vehicle.getPrimaryImage()
    imageLoading[vehicle.id] = false
    imageErrors[vehicle.id] = false
  })
})

// Image handling methods
const selectImage = (vehicleId, imageUrl) => {
  if (currentImages[vehicleId] !== imageUrl) {
    imageLoading[vehicleId] = true
    currentImages[vehicleId] = imageUrl
  }
}

const getCurrentImage = (vehicle) => {
  return currentImages[vehicle.id] || vehicle.getPrimaryImage()
}

const handleImageLoad = (vehicleId) => {
  imageLoading[vehicleId] = false
  imageErrors[vehicleId] = false
}

const handleImageError = (vehicleId, vehicle) => {
  imageLoading[vehicleId] = false
  imageErrors[vehicleId] = true
  console.warn(`Failed to load image for vehicle: ${vehicleId}`)
  
  // Try to fallback to a different image if available
  const currentImg = currentImages[vehicleId]
  const availableImages = vehicle.images.filter(img => img !== currentImg)
  
  if (availableImages.length > 0) {
    // Try the next available image
    setTimeout(() => {
      imageErrors[vehicleId] = false
      imageLoading[vehicleId] = true
      currentImages[vehicleId] = availableImages[0]
    }, 1000)
  }
}

// Utility methods
const formatSpecLabel = (key) => {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .trim()
}

const getDefaultVehicleImage = () => {
  // Fallback image for when vehicle images fail to load
  return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDYwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI2MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik0yNTAgMTUwSDM1MFYyNTBIMjUwVjE1MFoiIGZpbGw9IiNEREREREQiLz4KPHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4PSIyODAiIHk9IjE4MCI+CjxwYXRoIGQ9Ik0yMSAxOVY1QzIxIDMuOSAyMC4xIDMgMTkgM0g1QzMuOSAzIDMgMy45IDMgNVYxOUM3IDIxIDkgMjEgMTIgMjFTMTcgMjEgMjEgMTlaIiBzdHJva2U9IiM5OTk5OTkiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxjaXJjbGUgY3g9IjkiIGN5PSI5IiByPSIyIiBzdHJva2U9IiM5OTk5OTkiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Ik0yMSAxNUwxNiAxMEw1IDIxIiBzdHJva2U9IiM5OTk5OTkiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo8L3N2Zz4K'
}

const handleContactInquiry = (vehicle) => {
  // Scroll to contact section or trigger contact modal
  const contactSection = document.getElementById('contact')
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' })
  }
  
  // Optional: Store selected vehicle for contact form context
  console.log(`Contact inquiry for: ${vehicle.name}`)
}
</script>

<style scoped>
.vehicle-showcase {
  padding: var(--section-padding) 0;
  background: linear-gradient(135deg, var(--color-light-gray) 0%, var(--color-white) 100%);
}

.container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--container-padding);
}

/* Section Header */
.section-header {
  text-align: center;
  margin-bottom: var(--spacing-3xl);
}

.section-title {
  font-family: var(--font-family-heading);
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-black);
  margin-bottom: var(--spacing-md);
  line-height: var(--line-height-tight);
}

.section-subtitle {
  font-size: var(--font-size-lg);
  color: var(--color-dark-gray);
  line-height: var(--line-height-normal);
}

/* Vehicle Card */
.vehicle-card {
  background: var(--color-white);
  border-radius: var(--border-radius-xl);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
  margin-bottom: var(--spacing-2xl);
  transition: transform var(--transition-normal), box-shadow var(--transition-normal);
}

.vehicle-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.vehicle-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-xl);
  padding: var(--spacing-xl);
}

/* Image Gallery */
.vehicle-gallery {
  position: relative;
}

.main-image {
  position: relative;
  width: 100%;
  height: 300px;
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  background: var(--color-light-gray);
}

.vehicle-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.thumbnail-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Thumbnail Navigation */
.thumbnail-nav {
  display: flex;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-md);
  justify-content: center;
}

.thumbnail-btn {
  width: 60px;
  height: 60px;
  border: 2px solid transparent;
  border-radius: var(--border-radius-md);
  overflow: hidden;
  cursor: pointer;
  transition: border-color var(--transition-fast);
  background: none;
  padding: 0;
}

.thumbnail-btn:hover,
.thumbnail-btn.active {
  border-color: var(--color-primary);
}



/* Vehicle Information */
.vehicle-info {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.vehicle-header {
  text-align: center;
}

.vehicle-name {
  font-family: var(--font-family-heading);
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-black);
  margin-bottom: var(--spacing-xs);
  line-height: var(--line-height-tight);
}

.vehicle-model {
  font-size: var(--font-size-lg);
  color: var(--color-primary);
  font-weight: var(--font-weight-medium);
}

/* Specifications */
.spec-title,
.features-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-black);
  margin-bottom: var(--spacing-md);
  border-bottom: 2px solid var(--color-primary);
  padding-bottom: var(--spacing-xs);
}

.spec-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-md);
}

.spec-item {
  display: flex;
  flex-direction: column;
  padding: var(--spacing-md);
  background: var(--color-light-gray);
  border-radius: var(--border-radius-md);
  text-align: left;
}

.spec-label {
  font-size: var(--font-size-sm);
  color: var(--color-dark-gray);
  font-weight: var(--font-weight-medium);
  margin-bottom: var(--spacing-xs);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.spec-value {
  font-size: var(--font-size-lg);
  color: var(--color-black);
  font-weight: var(--font-weight-semibold);
}

/* Features */
.features-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-sm);
}

.feature-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm);
  background: var(--color-white);
  border: 1px solid var(--color-light-gray);
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-base);
  color: var(--color-dark-gray);
}

.feature-icon {
  color: var(--color-success);
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-lg);
}

/* Vehicle Actions */
.vehicle-actions {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
  padding-top: var(--spacing-lg);
  border-top: 1px solid var(--color-light-gray);
}

.pricing {
  text-align: left;
}

.price-label {
  font-size: var(--font-size-base);
  color: var(--color-dark-gray);
  margin-right: var(--spacing-sm);
}

.price-value {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md) var(--spacing-lg);
  border: none;
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  text-decoration: none;
  cursor: pointer;
  transition: all var(--transition-fast);
  min-height: 44px; /* Touch-friendly */
}

.btn-primary {
  background: var(--color-primary);
  color: var(--color-white);
}

.btn-primary:hover {
  background: #b71c1c;
  transform: translateY(-1px);
}

.btn-secondary {
  background: var(--color-white);
  color: var(--color-primary);
  border: 2px solid var(--color-primary);
}

.btn-secondary:hover {
  background: var(--color-primary);
  color: var(--color-white);
  transform: translateY(-1px);
}

.external-icon {
  font-size: var(--font-size-sm);
}

/* Mobile-first Responsive Design */
@media (max-width: 767px) {
  .vehicle-showcase {
    padding: var(--spacing-xl) 0;
  }
  
  .section-header {
    padding: 0 var(--spacing-sm);
    margin-bottom: var(--spacing-xl);
  }
  
  .section-title {
    font-size: var(--font-size-2xl);
  }
  
  .section-subtitle {
    font-size: var(--font-size-base);
  }
  
  .vehicle-content {
    padding: var(--spacing-lg);
    gap: var(--spacing-lg);
  }
  
  .main-image {
    height: 250px;
  }
  
  .thumbnail-nav {
    flex-wrap: wrap;
    gap: var(--spacing-xs);
  }
  
  .thumbnail-btn {
    width: 50px;
    height: 50px;
  }
  
  .vehicle-header {
    text-align: center;
  }
  
  .vehicle-name {
    font-size: var(--font-size-lg);
  }
  
  .vehicle-model {
    font-size: var(--font-size-base);
  }
  
  .spec-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-sm);
  }
  
  .spec-item {
    padding: var(--spacing-sm);
  }
  
  .features-list {
    grid-template-columns: 1fr;
    gap: var(--spacing-xs);
  }
  
  .feature-item {
    padding: var(--spacing-xs) var(--spacing-sm);
    font-size: var(--font-size-sm);
    justify-content: left;
  }
  
  .action-buttons {
    flex-direction: column;
    gap: var(--spacing-sm);
  }
  
  .btn {
    width: 100%;
    padding: var(--spacing-sm) var(--spacing-md);
  }
  
  .vehicle-actions {
    text-align: center;
  }
}

@media (max-width: 479px) {
  .section-title {
    font-size: var(--font-size-xl);
  }
  
  .section-subtitle {
    font-size: var(--font-size-sm);
  }
  
  .vehicle-content {
    padding: var(--spacing-md);
  }
  
  .main-image {
    height: 200px;
  }
  
  .thumbnail-btn {
    width: 40px;
    height: 40px;
  }
  
  .vehicle-name {
    font-size: var(--font-size-base);
  }
  
  .vehicle-model {
    font-size: var(--font-size-sm);
  }
  
  .spec-title,
  .features-title {
    font-size: var(--font-size-lg);
  }
  
  .pricing {
    margin-bottom: var(--spacing-md);
  }
  
  .price-value {
    font-size: var(--font-size-lg);
  }
}

/* Tablet and Desktop */
@media (min-width: 768px) {
  .vehicle-content {
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-2xl);
    align-items: start;
  }
  
  .main-image {
    height: 400px;
  }
  
  .vehicle-header {
    text-align: left;
  }
  
  .action-buttons {
    flex-direction: row;
  }
  
  .spec-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .features-list {
    grid-template-columns: 1fr;
  }
}

@media (min-width: 1024px) {
  .main-image {
    height: 450px;
  }
  
  .spec-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .features-list {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .vehicle-card,
  .btn,
  .vehicle-image {
    transition: none;
  }
  
  .loader-spinner {
    animation: none;
  }
}

/* Focus styles for keyboard navigation */
.thumbnail-btn:focus,
.btn:focus {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
</style>