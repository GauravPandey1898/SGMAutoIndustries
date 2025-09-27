<template>
  <section class="services" id="services">
    <div class="container">
      <div class="services-header">
        <h2 class="services-title">Our Services</h2>
        <p class="services-subtitle">
          Comprehensive automotive solutions for all your TVS 3Wheeler needs
        </p>
      </div>
      
      <div class="services-grid">
        <div 
          v-for="service in services" 
          :key="service.id"
          class="service-card"
        >
          <div class="service-icon">
            <i :class="`fas fa-${service.icon}`" aria-hidden="true"></i>
          </div>
          
          <div class="service-content">
            <h3 class="service-name">{{ service.name }}</h3>
            <p class="service-description">{{ service.description }}</p>
            
            <ul class="service-highlights" v-if="service.hasHighlights()">
              <li 
                v-for="highlight in service.highlights" 
                :key="highlight"
                class="highlight-item"
              >
                <i class="fas fa-check" aria-hidden="true"></i>
                {{ highlight }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { serviceData } from '../data/serviceData.js';

// Use the service data
const services = serviceData;
</script>

<style scoped>
.services {
  padding: var(--section-padding) 0;
  background-color: var(--color-light-gray);
}

.container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--container-padding);
}

.services-header {
  text-align: center;
  margin-bottom: var(--spacing-2xl);
  padding: 0 var(--spacing-sm);
}

.services-title {
  color: var(--color-black);
  margin-bottom: var(--spacing-md);
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
}

.services-subtitle {
  color: var(--color-dark-gray);
  font-size: var(--font-size-lg);
  max-width: 600px;
  margin: 0 auto;
  line-height: var(--line-height-relaxed);
}

.services-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-xl);
}

.service-card {
  background: var(--color-white);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-md);
  transition: all var(--transition-normal);
  border: 1px solid transparent;
}

.service-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: var(--color-primary);
}

.service-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  border-radius: 50%;
  margin: 0 auto var(--spacing-lg) auto;
  color: var(--color-white);
  font-size: var(--font-size-2xl);
}

.service-content {
  text-align: center;
}

.service-name {
  color: var(--color-black);
  margin-bottom: var(--spacing-md);
  font-size: var(--font-size-xl);
}

.service-description {
  color: var(--color-dark-gray);
  margin-bottom: var(--spacing-lg);
  line-height: var(--line-height-relaxed);
}

.service-highlights {
  list-style: none;
  padding: 0;
  margin: 0;
}

.highlight-item {
  display: flex;
  align-items: center;
  margin-bottom: var(--spacing-sm);
  color: var(--color-dark-gray);
  font-size: var(--font-size-sm);
}

.highlight-item i {
  color: var(--color-success);
  margin-right: var(--spacing-sm);
  font-size: var(--font-size-xs);
  flex-shrink: 0;
}

.highlight-item:last-child {
  margin-bottom: 0;
}

/* Responsive Design */
@media (min-width: 768px) {
  .services-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-2xl);
  }
  
  .service-card {
    text-align: center;
  }
  
  .service-content {
    text-align: center;
  }
  
  .highlight-item {
    justify-content: center;
  }
}

@media (min-width: 1024px) {
  .services-grid {
    grid-template-columns: repeat(4, 1fr);
  }
  
  .service-card {
    padding: var(--spacing-2xl) var(--spacing-lg);
  }
}

/* Mobile Responsive Design */
@media (max-width: 767px) {
  .services {
    padding: var(--spacing-xl) 0;
  }
  
  .services-header {
    margin-bottom: var(--spacing-xl);
  }
  
  .services-title {
    font-size: var(--font-size-2xl);
  }
  
  .services-subtitle {
    font-size: var(--font-size-base);
  }
  
  .service-card {
    padding: var(--spacing-lg);
    text-align: center;
  }
  
  .service-content {
    text-align: center;
  }
  
  .highlight-item {
    justify-content: center;
    text-align: center;
  }
  
  .service-card:active {
    transform: scale(0.98);
  }
}

@media (max-width: 479px) {
  .services-title {
    font-size: var(--font-size-xl);
  }
  
  .services-subtitle {
    font-size: var(--font-size-sm);
  }
  
  .service-card {
    padding: var(--spacing-md);
  }
  
  .service-icon {
    width: 56px;
    height: 56px;
    font-size: var(--font-size-xl);
  }
  
  .service-name {
    font-size: var(--font-size-lg);
  }
  
  .service-description {
    font-size: var(--font-size-sm);
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .service-card {
    border: 2px solid var(--color-black);
  }
  
  .service-card:hover {
    border-color: var(--color-primary);
    border-width: 3px;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .service-card {
    transition: none;
  }
  
  .service-card:hover {
    transform: none;
  }
}
</style>