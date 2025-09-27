/**
 * Business Information Model
 * Represents the dealership's core business data
 */
export class BusinessInfo {
  constructor({
    businessName = '',
    authorizedDealer = false,
    serviceCities = [],
    address = '',
    phone = '',
    email = '',
    operatingHours = { weekdays: '', weekends: '' },
    yearsOfExperience = 0,
    locations = []
  } = {}) {
    this.businessName = businessName;
    this.authorizedDealer = authorizedDealer;
    this.serviceCities = serviceCities;
    this.address = address;
    this.phone = phone;
    this.email = email;
    this.operatingHours = operatingHours;
    this.yearsOfExperience = yearsOfExperience;
    this.locations = locations;
  }

  /**
   * Get the main location (first location or fallback to main address)
   * @returns {Object} Main location information
   */
  getMainLocation() {
    if (this.locations && this.locations.length > 0) {
      return this.locations[0];
    }
    
    return {
      name: this.businessName,
      address: this.address,
      phone: this.phone,
      services: ['Sales', 'Service', 'Parts']
    };
  }

  /**
   * Get all locations
   * @returns {Array} Array of all locations
   */
  getAllLocations() {
    return this.locations || [];
  }

  /**
   * Get location by type
   * @param {string} type - Location type to filter by
   * @returns {Array} Filtered locations
   */
  getLocationsByType(type) {
    return this.locations.filter(location => location.type === type);
  }

  /**
   * Format phone number for display
   * @param {string} phone - Phone number to format
   * @returns {string} Formatted phone number
   */
  formatPhoneNumber(phone = this.phone) {
    // Remove any non-digit characters except +
    const cleaned = phone.replace(/[^\d+]/g, '');
    
    // Format Indian phone numbers
    if (cleaned.startsWith('+91')) {
      const number = cleaned.substring(3);
      if (number.length === 10) {
        return `+91 ${number.substring(0, 5)} ${number.substring(5)}`;
      }
    }
    
    return phone;
  }

  /**
   * Validates the business information
   * @returns {Object} validation result with isValid boolean and errors array
   */
  validate() {
    const errors = [];
    
    if (!this.businessName.trim()) {
      errors.push('Business name is required');
    }
    
    if (!this.serviceCities.length) {
      errors.push('At least one service city is required');
    }
    
    if (!this.phone.trim()) {
      errors.push('Phone number is required');
    }
    
    if (!this.email.trim()) {
      errors.push('Email is required');
    }
    
    // Validate locations if provided
    if (this.locations && this.locations.length > 0) {
      this.locations.forEach((location, index) => {
        if (!location.name || !location.address) {
          errors.push(`Location ${index + 1} is missing required information`);
        }
      });
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
}