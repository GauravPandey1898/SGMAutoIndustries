<template>
  <footer class="footer">
    <div class="footer-container">
      <!-- Main Footer Content -->
      <div class="footer-content">
        <!-- Business Information Section -->
        <div class="footer-section business-info">
          <h3 class="footer-title">{{ businessData.businessName }}</h3>
          <p class="footer-subtitle">Authorized TVS 3Wheeler Dealer</p>
          <p class="service-cities">Serving {{ businessData.serviceCities.join(', ') }}</p>
          <div class="contact-info">
            <p><i class="icon-phone"></i> {{ businessData.phone }}</p>
            <p><i class="icon-email"></i> {{ businessData.email }}</p>
            <p><i class="icon-location"></i> {{ businessData.address }}</p>
          </div>
        </div>

        <!-- Quick Navigation Section -->
        <div class="footer-section navigation">
          <h4 class="section-title">Quick Links</h4>
          <nav class="footer-nav">
            <a href="#hero" class="footer-link">Home</a>
            <a href="#vehicles" class="footer-link">Vehicles</a>
            <a href="#services" class="footer-link">Services</a>
            <a href="#about" class="footer-link">About Us</a>
            <a href="#contact" class="footer-link">Contact</a>
          </nav>
        </div>

        <!-- External Links Section -->
        <div class="footer-section external-links">
          <h4 class="section-title">Official Links</h4>
          <div class="external-nav">
            <a href="https://www.tvsmotor.com" target="_blank" rel="noopener noreferrer" class="footer-link external">
              TVS Motor Company
              <i class="icon-external"></i>
            </a>
            <a href="https://www.tvsmotor.com/three-wheeler" target="_blank" rel="noopener noreferrer" class="footer-link external">
              TVS 3Wheeler Official
              <i class="icon-external"></i>
            </a>
          </div>
        </div>

        <!-- Social Media Section -->
        <!-- <div class="footer-section social-media">
          <h4 class="section-title">Follow Us</h4>
          <div class="social-icons">
            <a href="#" target="_blank" rel="noopener noreferrer" class="footer-link social">
              <i class="icon-facebook"></i>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" class="footer-link social">
              <i class="icon-twitter"></i>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" class="footer-link social">
              <i class="icon-instagram"></i>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" class="footer-link social">
              <i class="icon-linkedin"></i>
            </a>
          </div>
        </div>  -->
      </div>
    </div>
    
    <!-- Footer Bottom - Full Width -->
    <div class="footer-bottom">
      <div class="copyright">
        <p>&copy; {{ currentYear }} {{ businessData.businessName }}. All rights reserved.</p>
        <p class="disclaimer">Authorized TVS 3Wheeler Dealer | {{ businessData.yearsOfExperience }}+ Years of Experience</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue';
import { businessData } from '../data/businessData.js';

// Get current year for copyright
const currentYear = computed(() => new Date().getFullYear());
</script>

<style scoped>
.footer {
  background: var(--color-black);
  color: var(--color-white);
  padding: var(--spacing-xl) 0 var(--spacing-lg);
  margin-top: var(--spacing-xl);
  position: relative;
}

.footer-container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: var(--spacing-xl);
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: var(--border-radius-xl);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  margin-bottom: var(--spacing-xl);
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-xl);
}

.footer-section {
  display: flex;
  flex-direction: column;
}

/* Business Information Section */
.business-info .footer-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: var(--spacing-xs);
  color: var(--color-white);
}

.footer-subtitle {
  font-size: 1rem;
  color: var(--color-white);
  margin-bottom: var(--spacing-sm);
  font-weight: 600;
  opacity: 0.9;
}

.service-cities {
  font-size: 0.9rem;
  margin-bottom: var(--spacing-md);
  color: var(--color-white);
  opacity: 0.8;
}

.contact-info p {
  display: flex;
  align-items: center;
  margin-bottom: var(--spacing-xs);
  font-size: 0.9rem;
}

.contact-info i {
  margin-right: var(--spacing-sm);
  width: 16px;
  color: var(--color-white);
}

/* Section Titles */
.section-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: var(--spacing-md);
  color: var(--color-white);
  border-bottom: 2px solid rgba(255, 255, 255, 0.3);
  padding-bottom: var(--spacing-xs);
}

/* Navigation Links */
.footer-nav,
.external-nav {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.footer-link {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s ease;
  display: flex;
  align-items: center;
}

.footer-link:hover {
  color: var(--color-white);
}

.footer-link.external {
  gap: var(--spacing-xs);
}

.icon-external {
  font-size: 0.8rem;
}

/* Social Media Links */
.social-links {
  display: flex;
  gap: var(--spacing-md);
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: all 0.3s ease;
}

.social-link:hover {
  background: rgba(255, 255, 255, 0.2);
  color: var(--color-white);
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(255, 255, 255, 0.1);
}

/* Footer Bottom - Full Width */
.footer-bottom {
  width: 100%;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  text-align: center;
  background: rgba(255, 255, 255, 0.05);
  padding: var(--spacing-lg) var(--spacing-md);
}

.copyright {
  max-width: var(--max-width);
  margin: 0 auto;
}

.copyright p {
  margin-bottom: var(--spacing-xs);
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
}

.disclaimer {
  font-size: 0.8rem;
  color: var(--color-white);
  font-weight: 500;
  opacity: 0.9;
}

/* Icon placeholders - using CSS pseudo-elements for basic icons */
.icon-phone::before { content: "📞"; }
.icon-email::before { content: "✉️"; }
.icon-location::before { content: "📍"; }
.icon-external::before { content: "↗️"; }
.icon-facebook::before { content: "📘"; }
.icon-instagram::before { content: "📷"; }
.icon-twitter::before { content: "🐦"; }
.icon-linkedin::before { content: "💼"; }

/* Responsive Design */
@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
  }
  
  .footer-section {
    text-align: center;
  }
  
  .contact-info p {
    justify-content: center;
  }
  
  .footer-nav,
  .external-nav {
    align-items: center;
  }
  
  .social-links {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .footer {
    padding: var(--spacing-lg) 0;
  }
  
  .footer-container {
    padding: 0 var(--spacing-sm);
  }
  
  .business-info .footer-title {
    font-size: 1.3rem;
  }
  
  .social-link {
    width: 35px;
    height: 35px;
  }
}
</style>