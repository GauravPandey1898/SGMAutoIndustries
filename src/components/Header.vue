<template>
  <header class="header">
    <div class="header-container">
      <!-- Logo and Branding Section -->
      <div class="header-brand">
        <div class="logo-section">
          <div class="tvs-logo">
            <LazyImage
              src="/static/TVS_Motor_Company-Logo.wine.svg"
              alt="TVS Motor Company Logo"
              fallback-src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA4MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHR0ZXh0IHg9IjQwIiB5PSIyNCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0iI0ZGRkZGRiIgdGV4dC1hbmNob3I9Im1pZGRsZSI+VFZTPC90ZXh0Pgo8L3N2Zz4K"
              image-class="tvs-logo-image"
              loading="eager"
            />
          </div>
          <div class="business-info">
            <h1 class="business-name">{{ businessData.businessName }}</h1>
            <!-- <div class="authorization-badge" v-if="businessData.authorizedDealer">
              <span class="badge-text">Authorized TVS Dealer</span>
            </div> -->
          </div>
        </div>
        <div class="service-cities">
          <span class="cities-label">Serving:</span>
          <span class="cities-list">{{ businessData.serviceCities.join(' • ') }}</span>
        </div>
      </div>

      <!-- Desktop Navigation -->
      <nav class="desktop-nav" :class="{ 'nav-hidden': isMobileMenuOpen }">
        <ul class="nav-list">
          <li><a href="#hero" @click="scrollToSection('hero')" class="nav-link">Home</a></li>
          <li><a href="#vehicles" @click="scrollToSection('vehicles')" class="nav-link">Vehicles</a></li>
          <li><a href="#services" @click="scrollToSection('services')" class="nav-link">Services</a></li>
          <li><a href="#about" @click="scrollToSection('about')" class="nav-link">About</a></li>
          <li><a href="#contact" @click="scrollToSection('contact')" class="nav-link">Contact</a></li>
        </ul>
      </nav>

      <!-- Contact Info and Mobile Menu -->
      <div class="header-actions">
        <!-- Phone Number with Click-to-Call -->
        <a :href="`tel:${businessData.phone}`" class="phone-link">
          <img src="/static/phone-call.png" alt="Phone" class="phone-icon" />
          <span class="phone-number">{{ businessData.formatPhoneNumber() }}</span>
        </a>

        <!-- Mobile Menu Toggle -->
        <button 
          class="mobile-menu-toggle"
          @click="toggleMobileMenu"
          :class="{ 'menu-open': isMobileMenuOpen }"
          aria-label="Toggle navigation menu"
        >
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
        </button>
      </div>
    </div>

    <!-- Mobile Navigation Menu -->
    <nav class="mobile-nav" :class="{ 'mobile-nav-open': isMobileMenuOpen }">
      <ul class="mobile-nav-list">
        <li><a href="#hero" @click="handleMobileNavClick('hero')" class="mobile-nav-link">Home</a></li>
        <li><a href="#vehicles" @click="handleMobileNavClick('vehicles')" class="mobile-nav-link">Vehicles</a></li>
        <li><a href="#services" @click="handleMobileNavClick('services')" class="mobile-nav-link">Services</a></li>
        <li><a href="#about" @click="handleMobileNavClick('about')" class="mobile-nav-link">About</a></li>
        <li><a href="#contact" @click="handleMobileNavClick('contact')" class="mobile-nav-link">Contact</a></li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { businessData } from '../data/index.js';
import LazyImage from './LazyImage.vue';

// Reactive state
const isMobileMenuOpen = ref(false);

// Methods
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }
};

const handleMobileNavClick = (sectionId) => {
  scrollToSection(sectionId);
  isMobileMenuOpen.value = false;
};

// Close mobile menu when clicking outside
const handleClickOutside = (event) => {
  const header = event.target.closest('.header');
  if (!header && isMobileMenuOpen.value) {
    isMobileMenuOpen.value = false;
  }
};

// Close mobile menu on escape key
const handleEscapeKey = (event) => {
  if (event.key === 'Escape' && isMobileMenuOpen.value) {
    isMobileMenuOpen.value = false;
  }
};

// Lifecycle hooks
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  document.addEventListener('keydown', handleEscapeKey);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
  document.removeEventListener('keydown', handleEscapeKey);
});
</script>

<style scoped>
.header {
  background: var(--color-black);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  color: var(--color-white);
  position: sticky;
  top: 0;
  z-index: var(--z-index-sticky);
  box-shadow: 0 4px 32px rgba(0, 0, 0, 0.1);
}

.header-container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: var(--spacing-sm) var(--container-padding);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-md);
}

/* Logo and Branding */
.header-brand {
  flex: 1;
  min-width: 0;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-xs);
}

.tvs-logo {
  flex-shrink: 0;
  width: 80px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.tvs-logo-image {
  width: 80px !important;
  height: 40px !important;
  max-width: 80px;
  max-height: 40px;
  object-fit: contain;
  background: transparent;
  mix-blend-mode: normal;
  filter: brightness(1.1) contrast(1.1);
}

.business-info {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  flex-wrap: wrap;
}

.business-name {
  font-family: var(--font-family-heading);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  margin: 0;
  white-space: nowrap;
}

.authorization-badge {
  background-color: #d91010;
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-sm);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  white-space: nowrap;
}

.service-cities {
  font-size: var(--font-size-sm);
  color: rgba(255, 255, 255, 0.9);
}

.cities-label {
  font-weight: var(--font-weight-medium);
  margin-right: var(--spacing-xs);
}

.cities-list {
  font-weight: var(--font-weight-normal);
}

/* Desktop Navigation */
.desktop-nav {
  display: none;
}

.nav-list {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: var(--spacing-lg);
}

.nav-link {
  color: var(--color-white);
  text-decoration: none;
  font-weight: var(--font-weight-medium);
  padding: var(--spacing-sm) 0;
  transition: color var(--transition-fast);
  position: relative;
}

.nav-link:hover {
  color: var(--color-accent);
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--color-accent);
  transition: width var(--transition-fast);
}

.nav-link:hover::after {
  width: 100%;
}

/* Header Actions */
.header-actions {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.phone-link {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  color: var(--color-white);
  text-decoration: none;
  font-weight: var(--font-weight-medium);
  padding: var(--spacing-sm);
  border-radius: var(--border-radius-md);
  transition: background-color var(--transition-fast);
  min-height: 44px; /* Touch-friendly */
}

.phone-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.phone-icon {
  width: 20px;
  height: 20px;
  object-fit: contain;
  filter: brightness(0) invert(1); /* Makes the icon white */
}

.phone-number {
  font-size: var(--font-size-sm);
  white-space: nowrap;
}

/* Mobile Menu Toggle */
.mobile-menu-toggle {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 44px;
  height: 44px;
  background: none;
  border: none;
  cursor: pointer;
  padding: var(--spacing-sm);
  border-radius: var(--border-radius-sm);
  transition: background-color var(--transition-fast);
}

.mobile-menu-toggle:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.hamburger-line {
  width: 24px;
  height: 2px;
  background-color: var(--color-white);
  transition: all var(--transition-normal);
  transform-origin: center;
}

.hamburger-line:not(:last-child) {
  margin-bottom: 4px;
}

/* Hamburger Animation */
.menu-open .hamburger-line:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.menu-open .hamburger-line:nth-child(2) {
  opacity: 0;
}

.menu-open .hamburger-line:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -6px);
}

/* Mobile Navigation */
.mobile-nav {
  background: rgba(40, 113, 184, 0.9);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  max-height: 0;
  overflow: hidden;
  transition: max-height var(--transition-normal);
  position: relative;
  z-index: var(--z-index-dropdown);
}

.mobile-nav-open {
  max-height: 350px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.mobile-nav-list {
  list-style: none;
  margin: 0;
  padding: var(--spacing-md) var(--container-padding);
}

.mobile-nav-list li {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.mobile-nav-list li:last-child {
  border-bottom: none;
}

.mobile-nav-link {
  display: block;
  color: var(--color-white);
  text-decoration: none;
  padding: var(--spacing-md) 0;
  font-weight: var(--font-weight-medium);
  transition: color var(--transition-fast);
  min-height: 44px; /* Touch-friendly */
  display: flex;
  align-items: center;
}

.mobile-nav-link:hover {
  color: var(--color-accent);
}

/* Tablet and Desktop Styles */
@media (min-width: 768px) {
  .header-container {
    padding: var(--spacing-md) var(--container-padding);
  }

  .business-name {
    font-size: var(--font-size-xl);
  }

  .authorization-badge {
    font-size: var(--font-size-sm);
  }

  .service-cities {
    font-size: var(--font-size-base);
  }

  .phone-number {
    font-size: var(--font-size-base);
  }

  .desktop-nav {
    display: block;
  }

  .mobile-menu-toggle {
    display: none;
  }

  .mobile-nav {
    display: none;
  }
}

@media (min-width: 1024px) {
  .header-brand {
    flex: 0 0 auto;
  }

  .desktop-nav {
    flex: 1;
    display: flex;
    justify-content: center;
  }

  .nav-list {
    gap: var(--spacing-2xl);
  }

  .nav-link {
    font-size: var(--font-size-lg);
  }
}

/* Mobile touch optimizations */
@media (max-width: 767px) {
  .header-container {
    min-height: 60px;
  }
  
  .mobile-nav-link {
    font-size: var(--font-size-base);
    padding: var(--spacing-md) var(--spacing-sm);
  }
  
  .phone-link {
    padding: var(--spacing-sm);
    border-radius: var(--border-radius-md);
  }
  
  .mobile-menu-toggle {
    position: relative;
    z-index: calc(var(--z-index-dropdown) + 1);
  }
}

/* Extra small screens */
@media (max-width: 480px) {
  .business-name {
    font-size: var(--font-size-base);
  }
  
  .authorization-badge {
    display: none; /* Hide on very small screens */
  }
  
  .service-cities {
    font-size: var(--font-size-xs);
  }
  
  .phone-number {
    font-size: var(--font-size-xs);
  }
  
  .tvs-logo {
    width: 60px;
    height: 32px;
  }
  
  .tvs-logo-image {
    width: 60px !important;
    height: 32px !important;
    max-width: 60px;
    max-height: 32px;
  }
  
  .logo-section {
    gap: var(--spacing-sm);
  }
  
  .business-info {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-xs);
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .nav-link::after,
  .hamburger-line,
  .mobile-nav,
  .phone-link,
  .mobile-menu-toggle {
    transition: none;
  }
}

/* High contrast mode */
@media (prefers-contrast: high) {
  .authorization-badge {
    border: 1px solid var(--color-white);
  }
  
  .nav-link:hover,
  .mobile-nav-link:hover {
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: var(--border-radius-sm);
    padding: var(--spacing-sm);
  }
}
</style>