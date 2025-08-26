# Mount Baker Preschool Website - React Strategy

## Project Overview

Build a modern, distinctive website for Mount Baker Preschool that honors Waldorf philosophy while delivering a startup-quality web experience. Pure React SPA for maximum creative freedom, familiar development patterns, and excellent performance.

## Core Technical Decisions

### Stack
- **Framework:** React 18+ with Vite
- **Language:** TypeScript
- **Routing:** React Router v6
- **Styling:** Tailwind CSS + CSS Modules for custom animations
- **Animation:** Framer Motion + GSAP for complex interactions
- **3D (if needed):** Three.js/React Three Fiber for special effects
- **Maps:** Mapbox GL for interactive neighborhood map
- **Forms:** Formspree or Web3Forms (external service)
- **Hosting:** Vercel free tier
- **Domain:** Custom domain via DNS configuration
- **Version Control:** GitHub

### Pure React Approach
- Single Page Application (SPA) with client-side routing
- Content managed through TypeScript/JSON files
- No server-side complexity
- External services for dynamic needs
- Git for version control and content history

## Visual Design: Pacific Northwest Nature Theme

### Design Philosophy
Capture the essence of the Pacific Northwest's natural beauty with subtle, sophisticated interactions that feel magical without being overwhelming.

### Color Palette
```css
:root {
  --old-growth: #1B4332;      /* Deep forest green */
  --fern: #52734D;             /* Living green */
  --morning-mist: #F0F4F5;     /* Soft fog white */
  --puget-sound: #5C7A8B;      /* Water blue-grey */
  --granite: #8B8680;          /* Mountain stone */
  --salmon: #E07B39;           /* Sunset/salmon */
  --rain-cloud: #A8B5BB;       /* Overcast sky */
  --bark: #3E2723;             /* Douglas fir bark */
}
```

### Typography
```css
--font-display: 'Fraunces', serif;        /* Warm, distinctive headers */
--font-body: 'Inter', sans-serif;         /* Clean, readable body */
--font-accent: 'Amatic SC', cursive;      /* Hand-drawn accents */
```

### Visual Elements
- Layered forest silhouettes with parallax scrolling
- Subtle particle effects (rain, floating seeds, fireflies)
- Organic shapes and borders (no hard rectangles)
- Textured backgrounds suggesting wood, paper, or stone
- Hand-drawn illustrations mixed with photography

## Site Architecture

### React Router Structure
```typescript
// App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/philosophy" element={<Philosophy />} />
          <Route path="/daily-rhythm" element={<DailyRhythm />} />
          <Route path="/traditions" element={<Traditions />} />
          <Route path="/traditions/:id" element={<TraditionDetail />} />
          <Route path="/neighborhood" element={<NeighborhoodMap />} />
          <Route path="/community" element={<Community />} />
          <Route path="/enrollment" element={<Enrollment />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
```

### Project Structure
```
/mount-baker-preschool
  /src
    /components            
      /ui                  # Reusable components
      /features           # Page-specific components
      /three             # 3D/WebGL components
      /layout            # Navigation, Footer, etc.
    /pages               # Route components
    /content            
      /data             # JSON/TS content files
    /hooks              # Custom React hooks
    /lib                # Utilities
    /styles            # Global styles
  /public
    /images
    /fonts
    /sounds
  /index.html
  /vite.config.ts
  /tailwind.config.js
```

## Homepage Experience

### Hero Section Component
```typescript
// components/features/HeroSection.tsx
export const HeroSection = () => {
  return (
    <section className="hero">
      <ForestCanopyLayers />     {/* Parallax forest layers */}
      <MistOverlay />            {/* Animated fog effect */}
      <WelcomeMessage />         {/* School name + tagline */}
      <SubtleParticles />        {/* Floating elements */}
      <ScrollIndicator />        {/* Custom animated arrow */}
    </section>
  )
}
```

**Interactions:**
- Parallax depth on scroll using Framer Motion
- Particles respond to mouse movement
- Time-of-day lighting (morning, afternoon, evening)
- Gentle wind effect on tree layers using GSAP

### Content Sections Flow
1. **Welcome Statement** - Brief, warm introduction
2. **Philosophy Preview** - Interactive cards revealing core principles
3. **Daily Rhythm Wheel** - Circular visualization of the day
4. **Upcoming Traditions** - Next celebration with countdown
5. **Community Glimpse** - Parent testimonials carousel
6. **Call to Action** - Visit/enrollment prompt

## Key Feature Pages

### Our Philosophy
Interactive cards using Framer Motion:

```typescript
// pages/Philosophy.tsx
import { motion } from 'framer-motion'
import { philosophyPrinciples } from '../content/data/philosophy'

export const Philosophy = () => {
  return (
    <div className="philosophy-grid">
      {philosophyPrinciples.map((principle, index) => (
        <motion.div
          key={principle.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
        >
          <PhilosophyCard {...principle} />
        </motion.div>
      ))}
    </div>
  )
}
```

### Daily Rhythm
**Circular Timeline Component:**
```typescript
// components/features/DailyRhythm/CircularTimeline.tsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const activities = [
  { time: "8:30", activity: "Outdoor Play", icon: "🌲", duration: 30 },
  { time: "9:00", activity: "Neighborhood Walk", icon: "🚶", duration: 45 },
  { time: "9:45", activity: "Circle Time", icon: "⭕", duration: 20 },
  { time: "10:05", activity: "Free Play", icon: "🎨", duration: 40 },
  { time: "10:45", activity: "Story Time", icon: "📖", duration: 15 },
  { time: "11:00", activity: "First Snack", icon: "🍎", duration: 20 },
  { time: "11:20", activity: "Play", icon: "🧩", duration: 40 },
  { time: "12:00", activity: "Second Snack", icon: "🥕", duration: 30 }
]

export const CircularTimeline = () => {
  const [selectedActivity, setSelectedActivity] = useState(null)
  
  return (
    <div className="circular-timeline">
      <svg viewBox="0 0 400 400">
        {/* Render circular segments */}
        {activities.map((activity, index) => (
          <TimelineSegment 
            key={activity.time}
            {...activity}
            angle={index * (360 / activities.length)}
            onClick={() => setSelectedActivity(activity)}
          />
        ))}
      </svg>
      
      <AnimatePresence>
        {selectedActivity && (
          <ActivityDetail activity={selectedActivity} />
        )}
      </AnimatePresence>
    </div>
  )
}
```

### Our Traditions
**Interactive Gallery with Detail Views:**

```typescript
// content/data/traditions.ts
export interface Tradition {
  id: string
  name: string
  month: number
  season: 'fall' | 'winter' | 'spring' | 'summer'
  description: string
  longDescription: string
  heroImage: string
  galleryImages: string[]
  activities: string[]
  preparation?: string[]
  whatToBring?: string[]
}

export const traditions: Tradition[] = [
  {
    id: "pumpkin-patch",
    name: "Pumpkin Patch Visit",
    month: 10,
    season: "fall",
    description: "Annual visit to local pumpkin patch for harvest celebration",
    longDescription: "Each October, we venture to a local pumpkin patch where children can explore, choose pumpkins, and connect with the harvest season. This tradition celebrates the abundance of autumn and gives children hands-on experience with seasonal rhythms.",
    heroImage: "/images/traditions/pumpkin-patch/hero.jpg",
    galleryImages: [
      "/images/traditions/pumpkin-patch/picking.jpg",
      "/images/traditions/pumpkin-patch/group.jpg",
      "/images/traditions/pumpkin-patch/wagon-ride.jpg"
    ],
    activities: ["Pumpkin picking", "Hay rides", "Seasonal songs"],
    whatToBring: ["Weather-appropriate clothing", "Camera for memories"]
  },
  {
    id: "lantern-walk",
    name: "Lantern Walk",
    month: 11,
    season: "fall",
    description: "Evening walk with handmade lanterns bringing light to darkness",
    longDescription: "As the days grow shorter, we gather for our beloved Lantern Walk. Children carry beautiful handmade lanterns through the neighborhood, singing traditional songs and celebrating the light we carry within ourselves during the darker months.",
    heroImage: "/images/traditions/lantern-walk/hero.jpg",
    galleryImages: [
      "/images/traditions/lantern-walk/making-lanterns.jpg",
      "/images/traditions/lantern-walk/procession.jpg",
      "/images/traditions/lantern-walk/circle.jpg"
    ],
    activities: ["Lantern making", "Evening procession", "Community songs"],
    preparation: ["Craft lanterns in class", "Practice lantern songs"],
    whatToBring: ["Warm clothes", "Comfortable walking shoes"]
  },
  {
    id: "winter-spiral",
    name: "Winter Spiral",
    month: 12,
    season: "winter",
    description: "Contemplative ceremony welcoming the return of light",
    longDescription: "The Winter Spiral is a quiet, reverent celebration marking the winter solstice. Children walk a spiral path of evergreen boughs, lighting a candle at the center and carrying their light back out into the world, symbolizing hope and renewal.",
    heroImage: "/images/traditions/winter-spiral/hero.jpg",
    galleryImages: [
      "/images/traditions/winter-spiral/spiral-setup.jpg",
      "/images/traditions/winter-spiral/candle-lighting.jpg",
      "/images/traditions/winter-spiral/reflection.jpg"
    ],
    activities: ["Spiral walk", "Candle lighting", "Quiet reflection"],
    preparation: ["Create peaceful atmosphere", "Practice walking meditation"]
  },
  {
    id: "kite-day",
    name: "Kite Day",
    month: 4,
    season: "spring",
    description: "Celebrating spring winds with colorful kites at the park",
    longDescription: "When spring winds return, we head to the park with homemade and store-bought kites. Children experience the joy of flight, wind patterns, and the freedom that comes with warmer weather and longer days.",
    heroImage: "/images/traditions/kite-day/hero.jpg",
    galleryImages: [
      "/images/traditions/kite-day/flying.jpg",
      "/images/traditions/kite-day/making-kites.jpg",
      "/images/traditions/kite-day/windy-fun.jpg"
    ],
    activities: ["Kite flying", "Wind observation", "Outdoor games"],
    preparation: ["Make simple kites", "Check weather conditions"],
    whatToBring: ["Kites", "Picnic lunch", "Layers for changing weather"]
  },
  {
    id: "may-pole",
    name: "May Pole Dance",
    month: 5,
    season: "spring",
    description: "Traditional May Day celebration with ribbon dancing",
    longDescription: "Our May Pole celebration welcomes the full bloom of spring with traditional ribbon dancing, flower crowns, and community joy. Children weave colorful ribbons around the pole while singing, creating beautiful patterns and celebrating renewal.",
    heroImage: "/images/traditions/may-pole/hero.jpg",
    galleryImages: [
      "/images/traditions/may-pole/ribbon-weaving.jpg",
      "/images/traditions/may-pole/flower-crowns.jpg",
      "/images/traditions/may-pole/community-dance.jpg"
    ],
    activities: ["Ribbon dancing", "Flower crown making", "Spring songs"],
    preparation: ["Practice May Pole dance", "Gather flowers and ribbons"],
    whatToBring: ["Comfortable dancing clothes", "Flowers for crowns"]
  }
]

// pages/Traditions.tsx
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { traditions } from '../content/data/traditions'

export const Traditions = () => {
  const seasonColors = {
    fall: 'from-orange-200 to-red-200',
    winter: 'from-blue-100 to-purple-100', 
    spring: 'from-green-100 to-yellow-100',
    summer: 'from-yellow-100 to-orange-100'
  }

  return (
    <div className="traditions-gallery">
      <header className="traditions-header">
        <h1>Our Cherished Traditions</h1>
        <p>Throughout the year, we celebrate the changing seasons with meaningful traditions that connect our children to natural rhythms and community bonds.</p>
      </header>
      
      <div className="traditions-grid">
        {traditions.map((tradition, index) => (
          <motion.div
            key={tradition.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`tradition-card bg-gradient-to-br ${seasonColors[tradition.season]}`}
          >
            <Link to={`/traditions/${tradition.id}`}>
              <div className="tradition-image">
                <img src={tradition.heroImage} alt={tradition.name} />
                <div className="season-badge">{tradition.season}</div>
              </div>
              <div className="tradition-content">
                <h3>{tradition.name}</h3>
                <p>{tradition.description}</p>
                <span className="month">Month: {new Date(2024, tradition.month - 1).toLocaleString('default', { month: 'long' })}</span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// pages/TraditionDetail.tsx
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { traditions } from '../content/data/traditions'

export const TraditionDetail = () => {
  const { id } = useParams()
  const tradition = traditions.find(t => t.id === id)
  
  if (!tradition) return <div>Tradition not found</div>
  
  return (
    <motion.div 
      className="tradition-detail"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="tradition-hero">
        <img src={tradition.heroImage} alt={tradition.name} />
        <div className="hero-overlay">
          <h1>{tradition.name}</h1>
          <p className="tradition-season">{tradition.season} • {new Date(2024, tradition.month - 1).toLocaleString('default', { month: 'long' })}</p>
        </div>
      </div>
      
      <div className="tradition-content">
        <div className="tradition-description">
          <p className="lead">{tradition.longDescription}</p>
        </div>
        
        <div className="tradition-details">
          <div className="activities-section">
            <h3>Activities</h3>
            <ul>
              {tradition.activities.map(activity => (
                <li key={activity}>{activity}</li>
              ))}
            </ul>
          </div>
          
          {tradition.preparation && (
            <div className="preparation-section">
              <h3>How We Prepare</h3>
              <ul>
                {tradition.preparation.map(prep => (
                  <li key={prep}>{prep}</li>
                ))}
              </ul>
            </div>
          )}
          
          {tradition.whatToBring && (
            <div className="bring-section">
              <h3>What to Bring</h3>
              <ul>
                {tradition.whatToBring.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        <div className="tradition-gallery">
          <h3>Gallery</h3>
          <div className="gallery-grid">
            {tradition.galleryImages.map((image, index) => (
              <motion.img
                key={image}
                src={image}
                alt={`${tradition.name} ${index + 1}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              />
            ))}
          </div>
        </div>
        
        <Link to="/traditions" className="back-link">
          ← Back to All Traditions
        </Link>
      </div>
    </motion.div>
  )
}
```

### Our Neighborhood (Feature Page)
**Interactive Map with React:**

```typescript
// pages/NeighborhoodMap.tsx
import { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import { locations } from '../content/data/locations'

export const NeighborhoodMap = () => {
  const mapContainer = useRef(null)
  const map = useRef(null)
  const [selectedLocation, setSelectedLocation] = useState(null)
  
  useEffect(() => {
    if (map.current) return // initialize once
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/outdoors-v12', // Custom style
      center: [-122.2945, 47.5803], // Mount Baker coordinates
      zoom: 14
    })
    
    // Add location markers
    locations.forEach(location => {
      const marker = new mapboxgl.Marker({
        color: '#52734D'
      })
        .setLngLat(location.coordinates)
        .addTo(map.current)
      
      marker.getElement().addEventListener('click', () => {
        setSelectedLocation(location)
      })
    })
  }, [])
  
  return (
    <div className="neighborhood-container">
      <div ref={mapContainer} className="map-container" />
      {selectedLocation && (
        <LocationDetail location={selectedLocation} />
      )}
    </div>
  )
}
```

## Interactive Elements & Easter Eggs

### Global Interactions
```typescript
// hooks/useEasterEggs.ts
import { useEffect } from 'react'
import confetti from 'canvas-confetti'

export const useEasterEggs = () => {
  useEffect(() => {
    // Konami code
    const sequence = []
    const konami = '38384040373937396665'
    
    const handleKeydown = (e) => {
      sequence.push(e.keyCode)
      if (sequence.join('').includes(konami)) {
        triggerRainbow()
        sequence.length = 0
      }
    }
    
    // Click sequence for butterflies
    let clickSequence = []
    const handleClick = (e) => {
      if (e.target.matches('.tree')) {
        clickSequence.push('tree')
        if (clickSequence.filter(c => c === 'tree').length >= 3) {
          releaseButterflies()
          clickSequence = []
        }
      }
    }
    
    window.addEventListener('keydown', handleKeydown)
    window.addEventListener('click', handleClick)
    
    return () => {
      window.removeEventListener('keydown', handleKeydown)
      window.removeEventListener('click', handleClick)
    }
  }, [])
}
```

### Custom Cursor
```typescript
// components/ui/CustomCursor.tsx
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [cursorType, setCursorType] = useState('default')
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
      
      // Change cursor based on element
      if (e.target.closest('.philosophy')) setCursorType('leaf')
      else if (e.target.closest('.map')) setCursorType('compass')
      else if (e.target.closest('.art')) setCursorType('brush')
      else setCursorType('default')
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])
  
  return (
    <motion.div
      className={`custom-cursor cursor-${cursorType}`}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 500, damping: 28 }}
    />
  )
}
```

## Content Management (No CMS)

### Data Structure
```typescript
// content/data/school-info.ts
export const schoolInfo = {
  name: "Mount Baker Preschool",
  tagline: "A Waldorf Cooperative",
  address: "722 30th Avenue South, Seattle, Washington 98144",
  email: "mountbakerpreschool@gmail.com"
}

// content/data/teachers.ts
export const teachers = [
  {
    id: 'carolyn',
    name: 'Carolyn Pugh',
    role: 'Lead Teacher',
    bio: 'Carolyn enjoys nurturing preschool children with songs, stories, art, nature, and plenty of time for imaginative play. Her three daughters are all MBPS alumni, and she loves the unique cooperative model of the school and the community it provides. In 2019, Carolyn became the lead teacher at MBPS following seven cumulative years as a parent and assistant teacher. She has a bachelor\'s and master\'s degree in history and completed her Waldorf Early Childhood teacher training through Sound Circle Center. Outside of teaching, she enjoys family time, yoga, board games, birding, cooking, and sewing.',
    image: '/images/teachers/carolyn.jpg',
    credentials: ['Bachelor\'s and Master\'s in History', 'Waldorf Early Childhood Training - Sound Circle Center'],
    interests: ['Family time', 'Yoga', 'Board games', 'Birding', 'Cooking', 'Sewing']
  },
  {
    id: 'alyssa',
    name: 'Alyssa',
    role: 'Teacher',
    bio: 'Alyssa brings warmth and creativity to our classroom community. [Bio to be provided]',
    image: '/images/teachers/alyssa.jpg',
    credentials: ['[Credentials to be provided]'],
    interests: ['[Interests to be provided]']
  }
]

// content/data/enrollment.ts
export const enrollmentInfo = {
  programDetails: {
    ageRange: "3-5 years old",
    schedule: "9am - 1pm",
    calendar: "September - June (follows Seattle Public Schools calendar)",
    ageRequirement: "Children must be 3 years old by August 31st"
  },
  cooperativeModels: [
    {
      name: "Co-Op Classroom Model",
      description: "Parents volunteer weekly in classroom and take on school management roles",
      tuition: {
        threeDays: "$4,237",
        fourDays: "$5,361", 
        fiveDays: "$6,356"
      },
      responsibilities: [
        "Weekly classroom volunteering",
        "Provide and prepare healthy snacks",
        "Hold management role outside classroom",
        "Assist with fundraising",
        "Attend monthly parent meetings"
      ]
    },
    {
      name: "Co-Op Preschool Model", 
      description: "Higher tuition rate without weekly classroom volunteer commitment",
      tuition: {
        threeDays: "$7,211",
        fourDays: "$8,261",
        fiveDays: "$9,696"
      },
      responsibilities: [
        "Hold management role outside classroom",
        "Assist with fundraising", 
        "Attend monthly parent meetings"
      ],
      note: "Limited spots available"
    }
  ],
  scheduleOptions: [
    { name: "Three Days", days: "Mon-Wed or Tues-Thur" },
    { name: "Four Days", days: "Mon-Thur or Tues-Fri" },
    { name: "Five Days", days: "Mon-Fri", note: "Fridays reserved for 4-5 year olds" }
  ],
  applicationProcess: {
    description: "Interested families should contact us to begin the enrollment conversation. Our staff will reach out to discuss your family's needs and answer any questions about our Waldorf cooperative approach.",
    contactMethod: "Submit inquiry form and we'll be in touch"
  }
}

// content/data/traditions.ts
export const traditions: Tradition[] = [
  {
    id: 'lantern-walk',
    title: 'Lantern Walk',
    date: 'November 11',
    description: 'Bringing light into darkness...',
    images: [
      '/images/traditions/lantern-walk/hero.jpg',
      '/images/traditions/lantern-walk/lanterns.jpg'
    ],
    preparationActivities: ['Make lanterns', 'Learn songs'],
    volunteerNeeds: ['Setup crew', 'Song leaders']
  }
]
```

### Form Handling with External Service
```typescript
// components/ui/ContactForm.tsx
export const ContactForm = () => {
  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    
    await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
    
    // Handle success/error
  }
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  )
}
```

## Performance Strategy

### Vite Configuration
```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { compression } from 'vite-plugin-compression2'

export default defineConfig({
  plugins: [
    react(),
    compression()
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'animation': ['framer-motion', 'gsap'],
          'three': ['@react-three/fiber', '@react-three/drei'],
          'map': ['mapbox-gl']
        }
      }
    }
  }
})
```

### Lazy Loading
```typescript
import { lazy, Suspense } from 'react'

// Lazy load heavy components
const NeighborhoodMap = lazy(() => import('./pages/NeighborhoodMap'))
const TraditionsWheel = lazy(() => import('./components/features/TraditionsWheel'))

// Use with Suspense
<Suspense fallback={<LoadingSpinner />}>
  <NeighborhoodMap />
</Suspense>
```

### Image Optimization
```typescript
// Use Cloudinary for optimization
const getOptimizedImage = (path: string, width: number) => {
  return `https://res.cloudinary.com/mount-baker/image/upload/w_${width},q_auto,f_auto/${path}`
}

// Progressive loading component
export const ProgressiveImage = ({ src, alt, width }) => {
  const [loaded, setLoaded] = useState(false)
  
  return (
    <>
      <img 
        src={getOptimizedImage(src, 50)} 
        alt={alt}
        className={`blur ${loaded ? 'hidden' : ''}`}
      />
      <img 
        src={getOptimizedImage(src, width)}
        alt={alt}
        onLoad={() => setLoaded(true)}
        className={loaded ? 'fade-in' : 'hidden'}
      />
    </>
  )
}
```

## Deployment Strategy

### Vercel Configuration
```json
// vercel.json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### Environment Variables
```env
VITE_MAPBOX_TOKEN=xxx
VITE_WEATHER_API_KEY=xxx
VITE_FORMSPREE_ID=xxx
VITE_SITE_URL=https://mountbakerpreschool.org
```

### Deployment Commands
```bash
# Install Vercel CLI
npm i -g vercel

# Initial deployment
vercel

# Production deployment
vercel --prod

# Link to GitHub for auto-deploy
vercel link
```

## Implementation Phases

### Phase 1: Foundation (Week 1-2)
- [ ] Setup Vite + React + TypeScript
- [ ] Configure Tailwind with custom design system
- [ ] Implement Pacific Northwest color palette
- [ ] Setup React Router with basic pages
- [ ] Create layout components (Nav, Footer)
- [ ] Build forest parallax hero component

### Phase 2: Core Pages (Week 3-4)
- [ ] Philosophy page with interactive cards
- [ ] Daily Rhythm circular timeline
- [ ] Traditions wheel of the year
- [ ] Basic enrollment information
- [ ] Community/cooperative section
- [ ] Content data structure

### Phase 3: Interactive Features (Week 5-6)
- [ ] Neighborhood illustrated map with Mapbox
- [ ] Custom cursor effects
- [ ] Particle systems and animations
- [ ] Easter eggs implementation
- [ ] Weather integration for map
- [ ] Form integration with Formspree

### Phase 4: Polish & Launch (Week 7-8)
- [ ] Performance optimization with code splitting
- [ ] Accessibility audit (WCAG 2.1)
- [ ] Cross-browser testing
- [ ] Mobile experience refinement
- [ ] Content population
- [ ] Image optimization setup
- [ ] Deployment to Vercel

## Development Setup

### Initial Project Creation
```bash
# Create project with Vite
npm create vite@latest mount-baker-preschool -- --template react-ts
cd mount-baker-preschool

# Install dependencies
npm install react-router-dom
npm install framer-motion gsap
npm install @react-three/fiber @react-three/drei three
npm install mapbox-gl @types/mapbox-gl
npm install -D tailwindcss postcss autoprefixer
npm install -D @types/react @types/react-dom

# Initialize Tailwind
npx tailwindcss init -p

# Start development
npm run dev
```

### Package.json Scripts
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "deploy": "vercel",
    "deploy:prod": "vercel --prod"
  }
}
```

## Success Metrics

### Qualitative
- "Wow" factor on first visit
- Parents spend time exploring interactive elements
- Word-of-mouth about website design
- Increased tour requests

### Quantitative
- Time on site >3 minutes average
- Enrollment inquiry conversion >5%
- Mobile usage >60%
- Page load speed <2 seconds
- Lighthouse score >95
- Accessibility score 100

## Conclusion

This React-based approach delivers:
- **Familiar development** with React patterns you know
- **Distinctive identity** through Pacific Northwest theming
- **Modern interactions** rivaling startup websites
- **Authentic Waldorf** philosophy communication
- **Maximum flexibility** with no server-side complexity
- **Free hosting** via Vercel with excellent performance
- **Simple deployment** and maintenance

The website will stand out as the most engaging, memorable preschool website parents have encountered, while authentically representing Mount Baker's unique Waldorf cooperative approach - all built with straightforward React patterns.