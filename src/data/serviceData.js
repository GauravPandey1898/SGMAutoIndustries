/**
 * Service Data
 * Contains information about services offered by the dealership
 */
import { Service } from '../models';

export const serviceData = [
  new Service({
    id: 'vehicle-sales',
    name: 'Vehicle Sales',
    description: 'Authorized sales of new TVS 3Wheeler vehicles with genuine parts and warranty',
    icon: 'car',
    highlights: [
      'Authorized TVS Dealer',
      'Genuine Vehicles',
      'Manufacturer Warranty',
      'Competitive Pricing'
    ]
  }),
  new Service({
    id: 'maintenance-service',
    name: 'Maintenance & Service',
    description: 'Professional maintenance and repair services by certified technicians',
    icon: 'wrench',
    highlights: [
      'Certified Technicians',
      'Genuine Spare Parts',
      'Quick Service',
      'Service Warranty'
    ]
  }),
  new Service({
    id: 'spare-parts',
    name: 'Spare Parts',
    description: 'Genuine TVS spare parts and accessories for all 3Wheeler models',
    icon: 'cog',
    highlights: [
      'Genuine Parts Only',
      'Wide Inventory',
      'Competitive Prices',
      'Quick Availability'
    ]
  }),
  new Service({
    id: 'financing',
    name: 'Financing Solutions',
    description: 'Easy financing options and loan assistance for vehicle purchases',
    icon: 'credit-card',
    highlights: [
      'Easy Loan Process',
      'Multiple Bank Tie-ups',
      'Competitive Interest Rates',
      'Quick Approval'
    ]
  })
];