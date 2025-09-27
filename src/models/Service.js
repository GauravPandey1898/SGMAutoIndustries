/**
 * Service Model
 * Represents a dealership service offering
 */
export class Service {
  constructor({
    id = '',
    name = '',
    description = '',
    icon = '',
    highlights = []
  } = {}) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.icon = icon;
    this.highlights = highlights;
  }

  /**
   * Validates the service data
   * @returns {Object} validation result with isValid boolean and errors array
   */
  validate() {
    const errors = [];
    
    if (!this.id.trim()) {
      errors.push('Service ID is required');
    }
    
    if (!this.name.trim()) {
      errors.push('Service name is required');
    }
    
    if (!this.description.trim()) {
      errors.push('Service description is required');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Checks if the service has highlights
   * @returns {boolean} true if highlights exist
   */
  hasHighlights() {
    return this.highlights.length > 0;
  }
}