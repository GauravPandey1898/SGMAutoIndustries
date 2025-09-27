<template>
  <section class="contact" id="contact">
    <div class="contact-container">
      <div class="contact-header">
        <h2>Contact Us</h2>
        <p>Get in touch with our authorized TVS dealership for all your three-wheeler needs</p>
      </div>

      <div class="contact-content">
        <!-- Contact Information -->
        <div class="contact-info">
          <h3>Get In Touch</h3>
          
          <!-- Locations -->
          <div v-for="(location, index) in businessData.getAllLocations()" :key="index" class="location-item">
            <div class="location-header">
              <h4>{{ location.name }}</h4>
              <span class="location-type">{{ location.type }}</span>
            </div>
            
            <div class="info-item">
              <div class="info-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor"/>
                </svg>
              </div>
              <div class="info-content">
                <p>{{ location.address }}</p>
                <div class="location-actions">
                  <a 
                    v-if="location.googleMapsUrl" 
                    :href="location.googleMapsUrl" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    class="maps-link"
                  >
                    View on Google Maps
                  </a>
                  <a 
                    :href="`tel:${location.phone || businessData.phone}`" 
                    class="contact-link phone-link"
                  >
                    {{ businessData.formatPhoneNumber(location.phone || businessData.phone) }}
                  </a>
                </div>
                <div class="services-offered">
                  <span class="services-label">Services:</span>
                  <span class="services-list">{{ location.services.join(', ') }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Fallback for single location -->
          <div v-if="businessData.getAllLocations().length === 0" class="info-item">
            <div class="info-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor"/>
              </svg>
            </div>
            <div class="info-content">
              <h4>Address</h4>
              <p>{{ businessData.address }}</p>
              <p class="service-cities">Serving: {{ businessData.serviceCities.join(', ') }}</p>
            </div>
          </div>
          
          <!-- Service Areas -->
          <div class="info-item">
            <div class="info-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/>
              </svg>
            </div>
            <div class="info-content">
              <h4>Service Areas</h4>
              <p class="service-cities">{{ businessData.serviceCities.join(', ') }}</p>
            </div>
          </div>

          <!-- Email -->
          <div class="info-item">
            <div class="info-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="currentColor"/>
              </svg>
            </div>
            <div class="info-content">
              <h4>Email</h4>
              <a :href="`mailto:${businessData.email}`" class="contact-link email-link">
                {{ businessData.email }}
              </a>
            </div>
          </div>

          <!-- Operating Hours -->
          <div class="info-item">
            <div class="info-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" fill="currentColor"/>
                <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z" fill="currentColor"/>
              </svg>
            </div>
            <div class="info-content">
              <h4>Operating Hours</h4>
              <p><strong>Monday - Friday:</strong> {{ businessData.operatingHours.weekdays }}</p>
              <p><strong>Saturday - Sunday:</strong> {{ businessData.operatingHours.weekends }}</p>
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="contact-form-container">
          <h3>Send us a Message</h3>
          <form @submit.prevent="handleSubmit" class="contact-form" novalidate>
            <div class="form-group">
              <label for="name">Full Name *</label>
              <input
                type="text"
                id="name"
                v-model="form.name"
                :class="{ 'error': errors.name }"
                @blur="validateField('name')"
                @input="clearError('name'); debouncedValidation('name')"
                placeholder="Enter your full name"
                required
              >
              <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
            </div>

            <div class="form-group">
              <label for="phone">Phone Number *</label>
              <input
                type="tel"
                id="phone"
                v-model="form.phone"
                :class="{ 'error': errors.phone }"
                @blur="validateField('phone')"
                @input="clearError('phone'); debouncedValidation('phone')"
                placeholder="Enter your phone number"
                required
              >
              <span v-if="errors.phone" class="error-message">{{ errors.phone }}</span>
            </div>

            <div class="form-group">
              <label for="email">Email Address *</label>
              <input
                type="email"
                id="email"
                v-model="form.email"
                :class="{ 'error': errors.email }"
                @blur="validateField('email')"
                @input="clearError('email'); debouncedValidation('email')"
                placeholder="Enter your email address"
                required
              >
              <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
            </div>

            <div class="form-group">
              <label for="subject">Subject *</label>
              <select
                id="subject"
                v-model="form.subject"
                :class="{ 'error': errors.subject }"
                @change="clearError('subject')"
                required
              >
                <option value="">Select a subject</option>
                <option value="vehicle-inquiry">Vehicle Inquiry</option>
                <option value="service-appointment">Service Appointment</option>
                <option value="parts-inquiry">Parts Inquiry</option>
                <option value="financing">Financing Options</option>
                <option value="general">General Inquiry</option>
              </select>
              <span v-if="errors.subject" class="error-message">{{ errors.subject }}</span>
            </div>

            <div class="form-group">
              <label for="message">Message *</label>
              <textarea
                id="message"
                v-model="form.message"
                :class="{ 'error': errors.message }"
                @blur="validateField('message')"
                @input="clearError('message'); debouncedValidation('message')"
                placeholder="Tell us how we can help you..."
                rows="5"
                required
              ></textarea>
              <span v-if="errors.message" class="error-message">{{ errors.message }}</span>
            </div>

            <button
              type="submit"
              class="submit-btn"
              :disabled="isSubmitting || !isFormValid"
              :class="{ 'submitting': isSubmitting }"
            >
              <LoadingState
                v-if="isSubmitting"
                message="Sending..."
                variant="minimal"
                size="small"
                :show-spinner="true"
              />
              <span v-else>Send Message</span>
            </button>

            <div v-if="submitMessage" class="submit-message" :class="submitStatus">
              {{ submitMessage }}
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { businessData } from '../data/index.js';
import LoadingState from './LoadingState.vue';
import { debounce } from '../utils/performance.js';

// Form data
const form = reactive({
  name: '',
  phone: '',
  email: '',
  subject: '',
  message: ''
});

// Form validation errors
const errors = reactive({
  name: '',
  phone: '',
  email: '',
  subject: '',
  message: ''
});

// Form submission state
const isSubmitting = ref(false);
const submitMessage = ref('');
const submitStatus = ref('');
const submitAttempts = ref(0);
const maxSubmitAttempts = 3;

// Form validation state
const isFormValid = computed(() => {
  return form.name.trim() && 
         form.phone.trim() && 
         form.email.trim() && 
         form.subject && 
         form.message.trim() &&
         !Object.values(errors).some(error => error !== '')
});

// Validation functions
const validateField = (fieldName) => {
  switch (fieldName) {
    case 'name':
      if (!form.name.trim()) {
        errors.name = 'Name is required';
      } else if (form.name.trim().length < 2) {
        errors.name = 'Name must be at least 2 characters';
      } else {
        errors.name = '';
      }
      break;

    case 'phone':
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
      if (!form.phone.trim()) {
        errors.phone = 'Phone number is required';
      } else if (!phoneRegex.test(form.phone.replace(/[\s\-\(\)]/g, ''))) {
        errors.phone = 'Please enter a valid phone number';
      } else {
        errors.phone = '';
      }
      break;

    case 'email':
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!form.email.trim()) {
        errors.email = 'Email is required';
      } else if (!emailRegex.test(form.email)) {
        errors.email = 'Please enter a valid email address';
      } else {
        errors.email = '';
      }
      break;

    case 'subject':
      if (!form.subject) {
        errors.subject = 'Please select a subject';
      } else {
        errors.subject = '';
      }
      break;

    case 'message':
      if (!form.message.trim()) {
        errors.message = 'Message is required';
      } else if (form.message.trim().length < 10) {
        errors.message = 'Message must be at least 10 characters';
      } else {
        errors.message = '';
      }
      break;
  }
};

const clearError = (fieldName) => {
  errors[fieldName] = '';
  submitMessage.value = '';
};

// Debounced validation for better performance
const debouncedValidation = debounce((fieldName) => {
  validateField(fieldName);
}, 300);

const validateForm = () => {
  validateField('name');
  validateField('phone');
  validateField('email');
  validateField('subject');
  validateField('message');

  return !Object.values(errors).some(error => error !== '');
};

const resetForm = () => {
  Object.keys(form).forEach(key => {
    form[key] = '';
  });
  Object.keys(errors).forEach(key => {
    errors[key] = '';
  });
};

const handleSubmit = async () => {
  if (!validateForm()) {
    submitMessage.value = 'Please correct the errors above';
    submitStatus.value = 'error';
    return;
  }

  if (submitAttempts.value >= maxSubmitAttempts) {
    submitMessage.value = 'Too many attempts. Please try again later.';
    submitStatus.value = 'error';
    return;
  }

  isSubmitting.value = true;
  submitMessage.value = '';
  submitAttempts.value++;

  try {
    // Simulate form submission with potential network issues
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate occasional network failures for testing
        if (Math.random() > 0.8 && submitAttempts.value < 2) {
          reject(new Error('Network error'));
        } else {
          resolve();
        }
      }, 2000);
    });
    
    // Success
    submitMessage.value = 'Thank you for your message! We will get back to you soon.';
    submitStatus.value = 'success';
    submitAttempts.value = 0; // Reset attempts on success
    resetForm();
  } catch (error) {
    // Error handling with retry logic
    console.error('Form submission error:', error);
    
    if (submitAttempts.value < maxSubmitAttempts) {
      submitMessage.value = `Submission failed. Retrying... (Attempt ${submitAttempts.value}/${maxSubmitAttempts})`;
      submitStatus.value = 'error';
      
      // Auto-retry after a delay
      setTimeout(() => {
        if (submitAttempts.value < maxSubmitAttempts) {
          handleSubmit();
        }
      }, 2000);
    } else {
      submitMessage.value = 'Sorry, there was an error sending your message. Please try again later.';
      submitStatus.value = 'error';
    }
  } finally {
    if (submitAttempts.value >= maxSubmitAttempts || submitStatus.value === 'success') {
      isSubmitting.value = false;
    }
  }
};
</script>

<style scoped>
.contact {
  padding: var(--spacing-xl) 0;
  background-color: var(--color-light-gray);
}

.contact-container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--container-padding);
}

.contact-header {
  text-align: center;
  margin-bottom: var(--spacing-2xl);
}

.contact-header h2 {
  font-family: var(--font-family-heading);
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-black);
  margin-bottom: var(--spacing-md);
}

.contact-header p {
  font-size: var(--font-size-lg);
  color: var(--color-dark-gray);
  max-width: 600px;
  margin: 0 auto;
}

.contact-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-2xl);
}

/* Contact Information */
.contact-info h3,
.contact-form-container h3 {
  font-family: var(--font-family-heading);
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-black);
  margin-bottom: var(--spacing-lg);
}

.info-item {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
  padding: var(--spacing-lg);
  background-color: var(--color-white);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-sm);
}

.info-icon {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-primary);
  color: var(--color-white);
  border-radius: var(--border-radius-md);
}

.info-content h4 {
  font-weight: var(--font-weight-semibold);
  color: var(--color-black);
  margin-bottom: var(--spacing-xs);
}

.info-content p {
  color: var(--color-dark-gray);
  margin-bottom: var(--spacing-xs);
}

.service-cities {
  font-style: italic;
  color: var(--color-medium-gray);
}

.contact-link {
  color: var(--color-primary);
  text-decoration: none;
  font-weight: var(--font-weight-medium);
  transition: color var(--transition-fast);
}

.contact-link:hover {
  color: var(--color-black);
  text-decoration: underline;
}

/* Location Styles */
.location-item {
  margin-bottom: var(--spacing-xl);
  padding: var(--spacing-lg);
  background-color: var(--color-white);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-sm);
  border-left: 4px solid var(--color-primary);
}

.location-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
  padding-bottom: var(--spacing-sm);
  border-bottom: 1px solid var(--color-light-gray);
}

.location-header h4 {
  font-weight: var(--font-weight-semibold);
  color: var(--color-black);
  margin: 0;
  font-size: var(--font-size-lg);
}

.location-type {
  background-color: var(--color-primary);
  color: var(--color-white);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-sm);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.location-actions {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  margin-top: var(--spacing-sm);
}

.maps-link {
  color: var(--color-black);
  text-decoration: none;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  transition: color var(--transition-fast);
}

.maps-link:hover {
  color: var(--color-primary);
  text-decoration: underline;
}

.services-offered {
  margin-top: var(--spacing-sm);
  padding-top: var(--spacing-sm);
  border-top: 1px solid var(--color-light-gray);
}

.services-label {
  font-weight: var(--font-weight-medium);
  color: var(--color-dark-gray);
  margin-right: var(--spacing-xs);
}

.services-list {
  color: var(--color-medium-gray);
  font-size: var(--font-size-sm);
}

/* Contact Form */
.contact-form-container {
  background-color: var(--color-white);
  padding: var(--spacing-xl);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: var(--font-weight-medium);
  color: var(--color-black);
  margin-bottom: var(--spacing-sm);
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: var(--spacing-md);
  border: 2px solid var(--color-medium-gray);
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-base);
  font-family: var(--font-family-primary);
  transition: border-color var(--transition-fast);
  background-color: var(--color-white);
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--color-primary);
}

.form-group input.error,
.form-group select.error,
.form-group textarea.error {
  border-color: #f44336;
}

.error-message {
  color: #f44336;
  font-size: var(--font-size-sm);
  margin-top: var(--spacing-xs);
}

.submit-btn {
  padding: var(--spacing-md) var(--spacing-xl);
  background-color: var(--color-primary);
  color: var(--color-white);
  border: none;
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  transition: all var(--transition-fast);
  min-height: 48px;
}

.submit-btn:hover:not(:disabled) {
  background-color: var(--color-secondary);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.submit-btn.submitting {
  background-color: var(--color-medium-gray);
}

.submit-message {
  padding: var(--spacing-md);
  border-radius: var(--border-radius-md);
  text-align: center;
  font-weight: var(--font-weight-medium);
}

.submit-message.success {
  background-color: #e8f5e8;
  color: var(--color-success);
  border: 1px solid var(--color-success);
}

.submit-message.error {
  background-color: #ffeaea;
  color: #f44336;
  border: 1px solid #f44336;
}

/* Responsive Design */
@media (min-width: 768px) {
  .contact-content {
    grid-template-columns: 1fr 1fr;
    align-items: start;
  }
  
  .info-item {
    margin-bottom: var(--spacing-xl);
  }
}

@media (min-width: 1024px) {
  .contact-content {
    gap: var(--spacing-3xl);
  }
}

/* Mobile Optimization */
@media (max-width: 767px) {
  .contact {
    padding: var(--spacing-lg) 0;
  }
  
  .contact-header h2 {
    font-size: var(--font-size-2xl);
  }
  
  .contact-form-container {
    padding: var(--spacing-lg);
  }
  
  .info-item {
    padding: var(--spacing-md);
  }
  
  .info-icon {
    width: 40px;
    height: 40px;
  }
  
  .submit-btn {
    padding: var(--spacing-md);
    font-size: var(--font-size-base);
  }
}

/* Touch-friendly interactions */
@media (hover: none) and (pointer: coarse) {
  .contact-link {
    padding: var(--spacing-sm);
    margin: calc(-1 * var(--spacing-sm));
  }
  
  .submit-btn {
    min-height: 48px;
    padding: var(--spacing-md) var(--spacing-lg);
  }
  
  .form-group input,
  .form-group select,
  .form-group textarea {
    min-height: 44px;
    font-size: 16px; /* Prevents zoom on iOS */
  }
}
</style>