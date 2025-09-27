/**
 * Vehicle Model
 * Represents a TVS vehicle with specifications and features
 */
export class Vehicle {
  constructor({
    id = '',
    name = '',
    model = '',
    images = [],
    specifications = {},
    features = [],
    price = '',
    officialLink = ''
  } = {}) {
    this.id = id;
    this.name = name;
    this.model = model;
    this.images = images;
    this.specifications = specifications;
    this.features = features;
    this.price = price;
    this.officialLink = officialLink;
  }

  /**
   * Validates the vehicle data
   * @returns {Object} validation result with isValid boolean and errors array
   */
  validate() {
    const errors = [];
    
    if (!this.id.trim()) {
      errors.push('Vehicle ID is required');
    }
    
    if (!this.name.trim()) {
      errors.push('Vehicle name is required');
    }
    
    if (!this.model.trim()) {
      errors.push('Vehicle model is required');
    }
    
    if (!this.images.length) {
      errors.push('At least one image is required');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Gets the primary image for the vehicle
   * @returns {string} primary image URL or empty string
   */
  getPrimaryImage() {
    return this.images.length > 0 ? this.images[0] : '';
  }

  /**
   * Checks if the vehicle has specifications
   * @returns {boolean} true if specifications exist
   */
  hasSpecifications() {
    return Object.keys(this.specifications).length > 0;
  }
}