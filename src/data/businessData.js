/**
 * Business Data for TVS Dealership
 * Contains the actual business information for the dealership
 */
import { BusinessInfo } from '../models/BusinessInfo.js';

export const businessData = new BusinessInfo({
  businessName: 'SGM Auto Industries',
  authorizedDealer: true,
  serviceCities: ['Lucknow', 'Hardoi', 'Unnao'],
  address: 'Lucknow Showroom/Workshop, Uttar Pradesh',
  phone: '+919415024323',
  email: 'info@sgmauto.com',
  operatingHours: {
    weekdays: '9:00 AM - 7:00 PM',
    weekends: '9:00 AM - 6:00 PM'
  },
  yearsOfExperience: 12,
  locations: [
    {
      name: 'Lucknow Showroom/Workshop',
      type: 'Main Showroom & Service Center',
      address: 'Lucknow, Uttar Pradesh',
      phone: '+919415024323',
      googleMapsUrl: 'https://share.google/p6496CB0FBFGAc641',
      services: ['Sales', 'Service', 'Parts', 'Financing']
    },
    {
      name: 'Hardoi Office',
      type: 'Branch Office',
      address: 'SH-25, Industrial Area, In front of Sabji Mandi, Hardoi, Uttar Pradesh 241001',
      phone: '+919415024323',
      services: ['Sales', 'Service', 'Parts', 'Financing']
    }
  ]
});