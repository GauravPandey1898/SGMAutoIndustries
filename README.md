# SGM Auto Industries - TVS Dealership Landing Page

A modern, responsive landing page for SGM Auto Industries, an authorized TVS 3Wheeler dealer serving Lucknow, Hardoi, and Unnao regions in Uttar Pradesh, India.

## 🚀 Features

### 🎨 Modern Design
- **Glassmorphism UI**: Modern glass-effect design elements
- **Responsive Layout**: Mobile-first design that works on all devices
- **Professional Aesthetics**: Clean, automotive industry-focused design
- **Accessibility Compliant**: WCAG guidelines followed for inclusive design

### 🏍️ Vehicle Showcase
- **Featured Vehicles**: Complete details of TVS 3Wheeler models
  - TVS King EV Max (Electric)
  - TVS King Duramax (Diesel)
  - TVS King Kargo (Petrol Goods Carrier)
  - TVS King Kargo EV (Electric Goods Carrier)
- **Detailed Specifications**: Technical specs, features, and pricing
- **Image Gallery**: Multiple vehicle images with lazy loading
- **Official Links**: Direct links to TVS Motor Company product pages

### 🏢 Business Information
- **Company Profile**: 12+ years of experience as authorized TVS dealer
- **Service Areas**: Lucknow, Hardoi, Unnao coverage
- **Showroom Photos**: Real showroom images for credibility
- **Contact Information**: Phone, email, address, and operating hours
- **Location Details**: Multiple locations with Google Maps integration

### 🛠️ Services Offered
- **Sales**: New vehicle sales with financing options
- **Service & Maintenance**: Authorized service center
- **Genuine Parts**: Original TVS parts and accessories
- **Warranty Support**: Official warranty services

### ⚡ Performance Features
- **Lazy Loading**: Optimized image loading for better performance
- **Progressive Web App**: PWA capabilities with service worker
- **SEO Optimized**: Meta tags and structured data
- **Fast Loading**: Optimized assets and code splitting
- **Error Handling**: Graceful error boundaries and fallbacks

## 🛠️ Technology Stack

### Frontend Framework
- **Vue 3**: Composition API with `<script setup>` syntax
- **Vite**: Fast build tool and development server
- **JavaScript ES6+**: Modern JavaScript features

### Styling & Design
- **CSS3**: Custom CSS with CSS Variables
- **Responsive Design**: Mobile-first approach
- **CSS Grid & Flexbox**: Modern layout techniques
- **Glassmorphism**: Modern UI design trend

### Performance & Optimization
- **Lazy Loading**: Custom LazyImage component
- **Image Optimization**: Multiple image formats and sizes
- **Code Splitting**: Optimized bundle sizes
- **Service Worker**: Caching and offline capabilities

### Development Tools
- **ESLint**: Code linting and formatting
- **Vite DevTools**: Development debugging
- **Hot Module Replacement**: Fast development experience

## 📁 Project Structure

```
src/
├── components/          # Vue components
│   ├── Hero.vue        # Hero section with glassmorphism
│   ├── VehicleShowcase.vue  # Featured vehicles display
│   ├── Services.vue    # Services offered
│   ├── About.vue       # Company information
│   ├── Contact.vue     # Contact form and details
│   ├── Header.vue      # Navigation header
│   ├── Footer.vue      # Footer with full-width design
│   ├── LazyImage.vue   # Optimized image loading
│   ├── LoadingState.vue # Loading indicators
│   └── ErrorBoundary.vue # Error handling
├── data/               # Business data
│   ├── businessData.js # Company information
│   ├── vehicleData.js  # Vehicle specifications
│   ├── serviceData.js  # Services offered
│   └── index.js        # Data exports
├── models/             # Data models
│   ├── BusinessInfo.js # Business information model
│   ├── Vehicle.js      # Vehicle data model
│   └── Service.js      # Service data model
├── styles/             # Global styles
│   ├── variables.css   # CSS custom properties
│   ├── base.css        # Base styles
│   └── responsive.css  # Responsive utilities
├── utils/              # Utility functions
│   ├── performance.js  # Performance optimizations
│   └── monitoring.js   # Error monitoring
└── App.vue             # Main application component
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sgm-auto-tvs-dealership
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

## 🎯 Business Information

### SGM Auto Industries
- **Established**: 12+ years of experience
- **Authorization**: Official TVS Motor Company dealer
- **Specialization**: TVS 3Wheeler vehicles
- **Service Areas**: Lucknow, Hardoi, Unnao (Uttar Pradesh)

### Contact Details
- **Phone**: +91 9415024323
- **Email**: info@sgmauto.com
- **Main Showroom**: Lucknow, Uttar Pradesh
- **Branch Office**: Hardoi, Uttar Pradesh

### Services Provided
- New vehicle sales
- Authorized service and maintenance
- Genuine TVS parts and accessories
- Financing assistance
- Warranty support

## 🔧 Customization

### Updating Business Information
Edit `src/data/businessData.js` to update:
- Company details
- Contact information
- Service locations
- Operating hours

### Adding New Vehicles
Update `src/data/vehicleData.js` to add new vehicle models:
- Vehicle specifications
- Features and benefits
- Pricing information
- Official product links

### Modifying Services
Edit `src/data/serviceData.js` to update:
- Service offerings
- Service descriptions
- Service highlights

### Styling Customization
Modify `src/styles/variables.css` for:
- Brand colors
- Typography settings
- Spacing and layout
- Responsive breakpoints

## 📱 Responsive Design

The website is optimized for all device sizes:
- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px and above

## 🔍 SEO Features

- Meta tags for search engines
- Structured data for business information
- Semantic HTML markup
- Optimized images with alt text
- Fast loading performance

## 🚀 Performance Optimizations

- Lazy loading for images
- Code splitting and tree shaking
- Optimized asset delivery
- Service worker for caching
- Progressive Web App features

## 📞 Support & Contact

For technical support or business inquiries:
- **Business Phone**: +91 9415024323
- **Email**: info@sgmauto.com
- **Location**: Lucknow, Uttar Pradesh

## 📄 License

This project is proprietary software for SGM Auto Industries.

---

**Built with ❤️ for SGM Auto Industries - Your Trusted TVS 3Wheeler Partner**
