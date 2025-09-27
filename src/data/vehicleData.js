/**
 * Vehicle Data
 * Contains information about TVS vehicles offered by the dealership
 * Updated with detailed specifications from official TVS product analysis
 */
import { Vehicle } from '../models';

export const vehicleData = [
  new Vehicle({
    id: 'tvs-king-ev-max',
    name: 'TVS King EV Max',
    model: 'Electric Three Wheeler',
    images: [
      'https://www.tvsmotor.com/three-wheelers/-/media/Feature/tvs-three-wheeler/ev-max-our-product-images/ev-passenger-auto-img-4x.webp?la=en&h=1800&w=2880&hash=C8DE60C05F08A50510797C9AC3D9BB74',
      'https://www.tvsmotor.com/three-wheelers/-/media/Feature/tvs-three-wheeler/king-ev-max-feature-image/Pick-up-updated.webp?la=en&hash=67ED3984B5D059A4EB9963B821FF7B6C',
      'https://www.tvsmotor.com/three-wheelers/-/media/Feature/tvs-three-wheeler/king-ev-max-feature-image/wading-capacity-updated.webp?la=en&hash=67CC1A71E3012BAEF8B800540494C67C',
      'https://www.tvsmotor.com/three-wheelers/-/media/Feature/tvs-three-wheeler/king-ev-max-feature-image/Range-Updated.webp?la=en&hash=4AD4968756D7F3F443EAE46D7370BF7D',
      'https://www.tvsmotor.com/three-wheelers/-/media/Feature/tvs-three-wheeler/king-ev-max-feature-image/Charging-time-updated.webp?la=en&hash=120FB892A3BAE4509DAAD6D5BDD20465'
    ],
    specifications: {
      motorPower: '11 kW PMSM Motor',
      torque: '40 Nm',
      certifiedRange: '179 km (variant dependent)',
      acceleration: '0-30 km/h in 3.7s',
      topSpeed: 'Eco 40 / City 50 / Power 60 km/h',
      chargingTime80: '≈2.25 hours (0-80%)',
      chargingTimeFull: '≈3.4 hours (full charge)',
      kerbWeight: '457 kg',
      groundClearance: '185 mm',
      waterWading: '500 mm',
      gradeability: '31%'
    },
    features: [
      '11 kW PMSM (permanent-magnet synchronous) motor',
      '40 Nm torque with 179 km certified range',
      '0–30 km/h in 3.7 seconds acceleration',
      'Top speed modes: Eco 40 / City 50 / Power 60 km/h',
      'Regenerative braking and hill-hold assist',
      'LED headlamps with USB charging',
      'Twin lockable glove boxes',
      'Flat floor and tumble seat design',
      'Openable rear boot for battery access'
    ],
    price: 'Contact for Price',
    officialLink: 'https://www.tvsmotor.com/three-wheelers/king-ev-max'
  }),

  new Vehicle({
    id: 'tvs-king-deluxe',
    name: 'TVS King Deluxe (King Duramax)',
    model: 'CNG Commercial Three Wheeler',
    images: [
      'https://www.tvsmotor.com/three-wheelers/-/media/Feature/tvs-three-wheeler/Home-Our-Product/king-deluxe-web.webp?la=en&h=450&w=720&hash=27FB193D1B61697CCFDAB0BE9BD69AA8',
      'https://www.tvsmotor.com/three-wheelers/-/media/Feature/tvs-three-wheeler/TvsFeatureSlider/deluxe-dashboard.webp?la=en&h=222&w=325&hash=4F5F024107CEFA427F899DE44093659B',
      'https://www.tvsmotor.com/three-wheelers/-/media/Feature/tvs-three-wheeler/TvsFeatureSlider/duramax-engine.webp?la=en&h=223&w=325&hash=27AE440E038278E0EB47F7E25D9ADA6D',
    ],
    specifications: {
      engine: '≈200cc 4-stroke engine',
      fuelType: 'Petrol / CNG options',
      topSpeed: '≈60-65 km/h (variant dependent)',
      brakes: 'Drum brakes',
      chassis: 'Robust commercial-grade',
      cabin: 'Comfortable with doors'
    },
    features: [
      'Robust 4-stroke petrol / CNG engine options',
      'Comfortable cabin with doors',
      'Generous headroom and legroom',
      'Durable chassis with reinforced impact zones',
      'Practical storage with glove box',
      'Easy maintenance access',
      'Good suspension for daily commercial use',
      'Ergonomic design for driver comfort'
    ],
    price: 'Contact for Price',
    officialLink: 'https://www.tvsmotor.com/three-wheelers/king-deluxe'
  }),

  new Vehicle({
    id: 'tvs-king-kargo',
    name: 'TVS King Kargo',
    model: 'Petrol / CNG Cargo Three Wheeler',
    images: [
      'https://www.tvsmotor.com/three-wheelers/-/media/Feature/tvs-three-wheeler/Home-Our-Product/kargo-product.webp?la=en&h=900&w=1440&hash=0F8ACE88BEFCD6B87E680692422D73F3',
      'https://www.tvsmotor.com/three-wheelers/-/media/Feature/tvs-three-wheeler/TvsFeatureSlider/kargo-petrol-bi-fuel.webp?la=en&h=223&w=325&hash=7725903E36996413BE008EDB72EB182D',
      'https://www.tvsmotor.com/three-wheelers/-/media/Feature/tvs-three-wheeler/TvsFeatureSlider/kargo-integrated-foot-step.webp?la=en&h=222&w=325&hash=F5BF43EF7583260960AC2F9E00EDAC1A',
      'https://www.tvsmotor.com/three-wheelers/-/media/Feature/tvs-three-wheeler/TvsFeatureSlider/kargo-protected-tail-lamps.webp?la=en&h=222&w=325&hash=11B60B74D03796CDE619172820BD3839'
    ],
    specifications: {
      fuelType: 'Petrol / CNG',
      chassis: 'Reinforced load-carrying frame',
      bodyOptions: 'Open tray / Grill / Delivery box',
      payload: 'Variant dependent (see configurations)',
      drivetrain: 'Commercial-grade powertrain'
    },
    features: [
      'Purpose-built cargo platform',
      'Configurable bodies (open tray, grill, delivery box)',
      'Reinforced load-carrying chassis',
      'Stability-focused design',
      'Ergonomic driver seating',
      'Basic instrumentation for long hours',
      'Low running cost and fuel-efficiency',
      'Optimized for commercial use'
    ],
    price: 'Contact for Price',
    officialLink: 'https://www.tvsmotor.com/three-wheelers/king-kargo'
  }),

  new Vehicle({
    id: 'tvs-king-kargo-ev-hd',
    name: 'TVS King Kargo EV HD',
    model: 'Electric Cargo Three Wheeler',
    images: [
      'https://www.tvsmotor.com/three-wheelers/-/media/Feature/tvs-three-wheeler/Home-Our-Product/kargo-home-page-img-web.webp?la=en&hash=9970768F434612A5C18EC6B340E08772',
      'https://www.tvsmotor.com/three-wheelers/-/media/Feature/tvs-three-wheeler/TvsFeatureSlider/TVS-KING-KARGO-HD-EV/Go-Far.webp?la=en&hash=414D7E549819F15A5CCFCF5CA9B77474',
      'https://www.tvsmotor.com/three-wheelers/-/media/Feature/tvs-three-wheeler/TvsFeatureSlider/TVS-KING-KARGO-HD-EV/Max-Speed.webp?la=en&hash=228368D871505B72AA04C163536AB31C',
      'https://www.tvsmotor.com/three-wheelers/-/media/Feature/tvs-three-wheeler/TvsFeatureSlider/TVS-KING-KARGO-HD-EV/Heavy-Performance.webp?la=en&hash=2BD0FBA39BBC3B782F8D1CE2B1DD834A',
      'https://www.tvsmotor.com/three-wheelers/-/media/Feature/tvs-three-wheeler/TvsFeatureSlider/TVS-KING-KARGO-HD-EV/Rolling-Window.webp?la=en&hash=45CBDD8FE87E924E21B437CBB5EE96B1'
    ],
    specifications: {
      powertrain: 'Electric (variant dependent)',
      range: 'See product page (variant dependent)',
      payload: 'Variant dependent - check technical specs',
      bodyOptions: 'Configurable cargo deck options',
      emissions: 'Zero tailpipe emissions'
    },
    features: [
      'Electric cargo variant for intra-city deliveries',
      'Zero tailpipe emissions',
      'Lower operating costs than ICE variants',
      'Configurable cargo deck options',
      'Focus on payload and durability',
      'EV-specific features: battery access',
      'Regenerative braking system',
      'Ideal for fleet operators'
    ],
    price: 'Contact for Price',
    officialLink: 'https://www.tvsmotor.com/three-wheelers/king-kargo-ev-hd'
  })
];

export const featuredVehicle = vehicleData[0];