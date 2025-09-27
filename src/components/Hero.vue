<template>
  <section class="hero" id="hero">
    <div class="hero-background" :class="{ 'image-loaded': imageLoaded, 'image-error': imageError }">
      <div class="hero-overlay"></div>
    </div>
    
    <div class="container">
      <div class="hero-content">
        <div class="hero-badge">
          <span class="badge-text">Authorized TVS Dealer</span>
        </div>
        
        <h1 class="hero-title">
          <span class="highlight">{{ businessData.businessName }}</span><br>
          Your Trusted TVS 3Wheeler Partner
        </h1>
        
        <p class="hero-subtitle">
          {{ businessData.yearsOfExperience }}+ years of excellence serving 
          <strong>{{ businessData.serviceCities.join(', ') }}</strong> with genuine TVS vehicles, 
          professional service, and unmatched customer satisfaction.
        </p>
        
        <div class="hero-features">
          <div class="feature-item">
            <span class="feature-icon">✓</span>
            <span>Authorized Dealer</span>
          </div>
          <div class="feature-item">
            <span class="feature-icon">✓</span>
            <span>Genuine Parts</span>
          </div>
          <div class="feature-item">
            <span class="feature-icon">✓</span>
            <span>Expert Service</span>
          </div>
        </div>
        
        <div class="hero-actions">
          <button 
            class="btn btn-primary" 
            @click="scrollToSection('contact')"
            aria-label="Contact us for inquiries"
          >
            Contact Us
          </button>
          <button 
            class="btn btn-secondary" 
            @click="scrollToSection('vehicles')"
            aria-label="View our vehicle collection"
          >
            View Vehicles
          </button>
        </div>
        
        <div class="hero-contact">
          <a 
            :href="`tel:${businessData.phone}`" 
            class="contact-link"
            aria-label="Call us directly"
          >
            <span class="contact-icon">📞</span>
            <span class="contact-text">{{ businessData.formatPhoneNumber() }}</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { businessData } from '../data/index.js';
import { shouldLoadHighQualityImages, preloadImages } from '../utils/performance.js';

// Background image URLs
const heroImageUrl = 'https://www.tvsmotor.com/three-wheelers/-/media/Feature/tvs-three-wheeler/king-ev-max-hero-banner/Mushkil-raaste-banner-web.webp';
const fallbackImageUrl = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop&crop=center';

const imageLoaded = ref(false);
const imageError = ref(false);

/**
 * Smooth scroll to a specific section
 * @param {string} sectionId - The ID of the section to scroll to
 */
const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }
};

/**
 * Preload hero background image
 */
const preloadHeroImage = async () => {
  try {
    // Check if we should load high quality images
    if (shouldLoadHighQualityImages()) {
      await preloadImages([heroImageUrl]);
      imageLoaded.value = true;
    } else {
      // Load fallback image for slower connections
      await preloadImages([fallbackImageUrl]);
      imageLoaded.value = true;
    }
  } catch (error) {
    console.warn('Failed to preload hero image:', error);
    imageError.value = true;
    // Try to load fallback image
    try {
      await preloadImages([fallbackImageUrl]);
      imageLoaded.value = true;
    } catch (fallbackError) {
      console.warn('Failed to load fallback image:', fallbackError);
    }
  }
};

onMounted(() => {
  preloadHeroImage();
});
</script>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  color: var(--color-white);
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('https://www.tvsmotor.com/three-wheelers/-/media/Feature/tvs-three-wheeler/king-ev-max-hero-banner/Mushkil-raaste-banner-web.webp');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
}

.container {
  position: relative;
  z-index: 2;
}

.hero-content {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
  padding: var(--spacing-xl);
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: var(--border-radius-xl);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.hero-badge {
  display: inline-block;
  margin-bottom: var(--spacing-lg);
  animation: fadeInUp 0.8s ease-out;
}

.badge-text {
  background: var(--color-black);
  color: var(--color-white);
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: var(--border-radius-xl);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.hero-title {
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
  margin-bottom: var(--spacing-lg);
  animation: fadeInUp 0.8s ease-out 0.2s both;
}

.highlight {
  color: var(--color-black);
}

.hero-subtitle {
  font-size: var(--font-size-lg);
  line-height: var(--line-height-relaxed);
  margin-bottom: var(--spacing-2xl);
  opacity: 0.95;
  animation: fadeInUp 0.8s ease-out 0.4s both;
}

.hero-features {
  display: flex;
  justify-content: center;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-2xl);
  animation: fadeInUp 0.8s ease-out 0.6s both;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
}

.feature-icon {
  color: var(--color-black);
  font-weight: var(--font-weight-bold);
}

.hero-actions {
  display: flex;
  justify-content: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-xl);
  animation: fadeInUp 0.8s ease-out 0.8s both;
}

.btn {
  padding: var(--spacing-md) var(--spacing-xl);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  border-radius: var(--border-radius-lg);
  transition: all var(--transition-normal);
  cursor: pointer;
  border: 2px solid transparent;
  min-height: 48px;
  min-width: 140px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.btn-primary {
  background: var(--color-black);
  color: var(--color-white);
  border-color: var(--color-black);
}

.btn-primary:hover,
.btn-primary:focus {
  background: transparent;
  border-color: var(--color-black);
  color: var(--color-black);
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.btn-secondary {
  background: transparent;
  color: var(--color-white);
  border-color: var(--color-white);
}

.btn-secondary:hover,
.btn-secondary:focus {
  background: var(--color-white);
  color: var(--color-primary);
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.hero-contact {
  animation: fadeInUp 0.8s ease-out 1s both;
}

.contact-link {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-sm);
  color: var(--color-white);
  text-decoration: none;
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-medium);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--border-radius-md);
  transition: all var(--transition-fast);
}

.contact-link:hover,
.contact-link:focus {
  background: rgba(255, 255, 255, 0.1);
  color: var(--color-black);
  text-decoration: none;
  transform: scale(1.05);
}

.contact-icon {
  font-size: var(--font-size-xl);
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Background Image Loading States */
.hero-background {
  transition: opacity var(--transition-normal);
}

.hero-background:not(.image-loaded) {
  background-image: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
}

.hero-background.image-error {
  background-image: 
    linear-gradient(135deg, rgba(220, 38, 127, 0.8) 0%, rgba(33, 150, 243, 0.7) 100%),
    url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop&crop=center');
}

/* Mobile Responsive Design */
@media (max-width: 767px) {
  .hero-background {
    background-attachment: scroll; /* Better performance on mobile */
    background-size: cover;
  }
  
  .hero {
    min-height: 85vh;
    padding: var(--spacing-lg) 0;
  }
  
  .container {
    padding: 0 var(--spacing-sm);
  }
  
  .hero-content {
    padding: var(--spacing-lg);
    margin: 0 var(--spacing-sm);
    max-width: calc(100% - var(--spacing-lg));
  }
  
  .hero-title {
    font-size: var(--font-size-2xl);
    margin-bottom: var(--spacing-md);
    text-align: center;
  }
  
  .hero-subtitle {
    font-size: var(--font-size-sm);
    margin-bottom: var(--spacing-lg);
    text-align: center;
  }
  
  .hero-features {
    flex-direction: column;
    gap: var(--spacing-sm);
    align-items: center;
    margin-bottom: var(--spacing-lg);
  }
  
  .feature-item {
    font-size: var(--font-size-sm);
    justify-content: center;
  }
  
  .hero-actions {
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-sm);
  }
  
  .btn {
    width: 100%;
    max-width: 280px;
    font-size: var(--font-size-base);
  }
  
  .contact-link {
    font-size: var(--font-size-base);
    margin-top: var(--spacing-sm);
  }
}

/* Extra small screens */
@media (max-width: 479px) {
  .hero {
    min-height: 80vh;
  }
  
  .hero-content {
    padding: var(--spacing-md);
    margin: 0 var(--spacing-xs);
  }
  
  .hero-title {
    font-size: var(--font-size-xl);
    line-height: 1.2;
  }
  
  .hero-subtitle {
    font-size: var(--font-size-xs);
  }
  
  .badge-text {
    font-size: var(--font-size-xs);
    padding: var(--spacing-xs) var(--spacing-sm);
  }
  
  .btn {
    padding: var(--spacing-sm) var(--spacing-lg);
    font-size: var(--font-size-sm);
    min-height: 44px;
  }
  
  .contact-link {
    font-size: var(--font-size-sm);
  }
}

/* Tablet Responsive Design */
@media (min-width: 768px) and (max-width: 1023px) {
  .hero-title {
    font-size: var(--font-size-4xl);
  }
  
  .hero-features {
    gap: var(--spacing-xl);
  }
}

/* Large Screen Optimizations */
@media (min-width: 1200px) {
  .hero-content {
    max-width: 900px;
  }
  
  .hero-title {
    font-size: 3.5rem;
  }
}

/* High DPI Display Optimizations */
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  .hero-background {
    background-size: cover;
  }
}

/* Reduced Motion Accessibility */
@media (prefers-reduced-motion: reduce) {
  .hero-content * {
    animation: none !important;
  }
  
  .btn:hover,
  .btn:focus,
  .contact-link:hover,
  .contact-link:focus {
    transform: none;
  }
  
  html {
    scroll-behavior: auto;
  }
}

/* Focus Styles for Accessibility */
.btn:focus,
.contact-link:focus {
  outline: 2px solid var(--color-black);
  outline-offset: 2px;
}
</style>