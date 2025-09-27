<template>
  <section class="about" id="about">
    <div class="about-container">
      <div class="about-header">
        <h2 class="about-title">About SGM Auto Industries</h2>
        <p class="about-subtitle">Your Trusted TVS 3Wheeler Partner</p>
      </div>

      <div class="about-content">
        <!-- Experience and Trust Section -->
        <div class="experience-section">
          <div class="experience-card">
            <div class="experience-icon">
              <i class="fas fa-calendar-alt"></i>
            </div>
            <div class="experience-content">
              <h3 class="experience-number">{{ businessData.yearsOfExperience }}+</h3>
              <p class="experience-text">Years of Excellence</p>
            </div>
          </div>

          <div class="experience-card">
            <div class="experience-icon">
              <i class="fas fa-map-marker-alt"></i>
            </div>
            <div class="experience-content">
              <h3 class="experience-number">{{ businessData.serviceCities.length }}</h3>
              <p class="experience-text">Cities Served</p>
            </div>
          </div>

          <div class="experience-card">
            <div class="experience-icon">
              <i class="fas fa-certificate"></i>
            </div>
            <div class="experience-content">
              <h3 class="experience-number">100%</h3>
              <p class="experience-text">Authorized Dealer</p>
            </div>
          </div>
        </div>

        <!-- Credentials and Certifications -->
        <div class="credentials-section">
          <h3 class="credentials-title">Our Credentials & Certifications</h3>
          
          <div class="credentials-grid">
            <div class="credential-card">
              <div class="credential-image credential-placeholder" data-credential="TVS Authorization">
                <div class="credential-placeholder-content">
                  <i class="fas fa-certificate"></i>
                  <span>TVS Authorization Certificate</span>
                </div>
              </div>
              <div class="credential-content">
                <h4>TVS Authorized Dealer</h4>
                <p>Official authorization from TVS Motor Company for 3Wheeler sales and service</p>
              </div>
            </div>

            <div class="credential-card">
              <div class="credential-image credential-placeholder" data-credential="Service Excellence">
                <div class="credential-placeholder-content">
                  <i class="fas fa-award"></i>
                  <span>Service Excellence Award</span>
                </div>
              </div>
              <div class="credential-content">
                <h4>Service Excellence Award</h4>
                <p>Recognized for outstanding customer service and technical expertise</p>
              </div>
            </div>

            <div class="credential-card">
              <div class="credential-image credential-placeholder" data-credential="Technical Certification">
                <div class="credential-placeholder-content">
                  <i class="fas fa-tools"></i>
                  <span>Technical Certification</span>
                </div>
              </div>
              <div class="credential-content">
                <h4>Technical Certification</h4>
                <p>Certified technicians trained by TVS for maintenance and repairs</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Trust Indicators -->
        <div class="trust-section">
          <div class="trust-content">
            <h3 class="trust-title">Why Choose SGM Auto Industries?</h3>
            <div class="trust-points">
              <div class="trust-point">
                <i class="fas fa-shield-alt"></i>
                <div>
                  <h4>Authorized & Trusted</h4>
                  <p>Official TVS dealership with genuine parts and warranty</p>
                </div>
              </div>
              
              <div class="trust-point">
                <i class="fas fa-users"></i>
                <div>
                  <h4>Experienced Team</h4>
                  <p>{{ businessData.yearsOfExperience }} years of expertise in 3Wheeler industry</p>
                </div>
              </div>
              
              <div class="trust-point">
                <i class="fas fa-map-marked-alt"></i>
                <div>
                  <h4>Local Presence</h4>
                  <p>Serving {{ businessData.serviceCities.join(', ') }} with dedicated support</p>
                </div>
              </div>
              
              <div class="trust-point">
                <i class="fas fa-tools"></i>
                <div>
                  <h4>Complete Service</h4>
                  <p>Sales, maintenance, parts, and financing under one roof</p>
                </div>
              </div>
            </div>
          </div>

          <div class="trust-image">
            <LazyImage
              src="https://lh3.googleusercontent.com/p/AF1QipNyfv3kATEd9RTc9SvWGVYmDXdVz30L9cWe2AuU=s680-w680-h510-rw"
              alt="SGM Auto Industries Showroom - Authorized TVS Dealer"
              fallback-src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop&crop=center"
              image-class="showroom-image"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { businessData } from '../data/businessData.js';
import LazyImage from './LazyImage.vue';
</script>

<style scoped>
.about {
  padding: var(--spacing-xl) var(--spacing-md);
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  position: relative;
}

.about-container {
  max-width: var(--max-width);
  margin: 0 auto;
}

.about-header {
  text-align: center;
  margin-bottom: var(--spacing-xl);
}

.about-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: var(--spacing-sm);
}

.about-subtitle {
  font-size: 1.2rem;
  color: var(--color-text-secondary);
  font-weight: 500;
}

.about-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
}

/* Experience Section */
.experience-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
}

.experience-card {
  background: var(--color-white);
  padding: var(--spacing-lg);
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.experience-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.experience-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
}

.experience-number {
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-primary);
  margin: 0;
}

.experience-text {
  color: var(--color-text-secondary);
  margin: 0;
  font-weight: 500;
}

/* Credentials Section */
.credentials-section {
  background: var(--color-white);
  padding: var(--spacing-xl);
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.credentials-title {
  text-align: center;
  font-size: 2rem;
  color: var(--color-primary);
  margin-bottom: var(--spacing-xl);
}

.credentials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-lg);
}

.credential-card {
  background: #f8f9fa;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.credential-card:hover {
  transform: translateY(-2px);
}

.credential-image {
  height: 200px;
  overflow: hidden;
  position: relative;
}

.credential-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.credential-card:hover .credential-image img {
  transform: scale(1.05);
}

/* Credential Placeholder Styles */
.credential-placeholder {
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  display: flex;
  align-items: center;
  justify-content: center;
}

.credential-placeholder-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-sm);
  color: white;
  text-align: center;
  padding: var(--spacing-md);
}

.credential-placeholder-content i {
  font-size: 3rem;
  opacity: 0.9;
}

.credential-placeholder-content span {
  font-size: 1.1rem;
  font-weight: 600;
  opacity: 0.9;
}

.credential-content {
  padding: var(--spacing-lg);
}

.credential-content h4 {
  color: var(--color-primary);
  margin-bottom: var(--spacing-sm);
  font-size: 1.2rem;
}

.credential-content p {
  color: var(--color-text-secondary);
  line-height: 1.6;
}

/* Trust Section */
.trust-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-xl);
  align-items: center;
  background: var(--color-white);
  padding: var(--spacing-xl);
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.trust-title {
  font-size: 1.8rem;
  color: var(--color-primary);
  margin-bottom: var(--spacing-lg);
}

.trust-points {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.trust-point {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-md);
}

.trust-point i {
  color: var(--color-primary);
  font-size: 1.5rem;
  margin-top: 4px;
  flex-shrink: 0;
}

.trust-point h4 {
  color: var(--color-primary);
  margin: 0 0 var(--spacing-xs) 0;
  font-size: 1.1rem;
}

.trust-point p {
  color: var(--color-text-secondary);
  margin: 0;
  line-height: 1.5;
}

.trust-image {
  border-radius: 12px;
  overflow: hidden;
  position: relative;
}

.trust-image img,
.showroom-image {
  width: 100%;
  height: 400px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.trust-image:hover .showroom-image {
  transform: scale(1.02);
}

/* Trust Image Placeholder */
.trust-placeholder {
  background: linear-gradient(135deg, #e9ecef, #dee2e6);
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.trust-placeholder-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-md);
  color: var(--color-text-secondary);
  text-align: center;
}

.trust-placeholder-content i {
  font-size: 4rem;
  opacity: 0.6;
}

.trust-placeholder-content span {
  font-size: 1.2rem;
  font-weight: 600;
  opacity: 0.8;
}

/* Responsive Design */
@media (max-width: 768px) {
  .about {
    padding: var(--spacing-lg) var(--spacing-sm);
  }

  .about-title {
    font-size: 2rem;
  }

  .experience-section {
    grid-template-columns: 1fr;
  }

  .credentials-grid {
    grid-template-columns: 1fr;
  }

  .trust-section {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
  }

  .trust-image {
    order: -1;
  }

  .trust-image img,
  .showroom-image {
    height: 250px;
  }

  .experience-card {
    flex-direction: column;
    text-align: center;
  }

  .trust-point {
    flex-direction: column;
    text-align: center;
    gap: var(--spacing-sm);
  }
}

@media (max-width: 480px) {
  .about-title {
    font-size: 1.8rem;
  }

  .credentials-title {
    font-size: 1.6rem;
  }

  .trust-title {
    font-size: 1.5rem;
  }

  .experience-number {
    font-size: 1.5rem;
  }
}
</style>