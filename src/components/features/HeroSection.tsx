import { DynamicRibbons } from './DynamicRibbons'
import { RollingHillsBackground } from '../three/RollingHillsBackground'

const HeroSection = () => {
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) {
      const NAV_OFFSET = 70
      const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET
      window.history.replaceState(null, '', `/#${id}`)
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }
  return (
    <section className="hero">
      {/* Rolling Hills Background - positioned behind everything */}
      <RollingHillsBackground />
      
      {/* Dynamic Ribbons - positioned at hero level */}
      <DynamicRibbons />
      
      {/* Abstract Flowing Ribbons Background */}
      <div className="ribbons-bg">
        {/* Animated Background Gradient */}
        <div className="animated-bg"></div>


        
        {/* Floating Natural Elements */}
        <div className="floating-elements">
          {/* Organic Shapes */}
          <div className="organic-shape shape-1"></div>
          <div className="organic-shape shape-2"></div>
          <div className="organic-shape shape-3"></div>
          <div className="organic-shape shape-4"></div>
          
          {/* Floating Particles */}
          <div className="particle particle-1"></div>
          <div className="particle particle-2"></div>
          <div className="particle particle-3"></div>
          <div className="particle particle-4"></div>
          <div className="particle particle-5"></div>
          <div className="particle particle-6"></div>
        </div>
      </div>

      {/* Hero Content with Text Backdrop */}
      <div className="hero-content">
        <div className="text-backdrop">
          {/* Ribbon Anchor Point */}
          <div className="ribbon-anchor"></div>
          
          {/* MBPS Logo in hero card */}
          <div className="hero-card-logo">
            <img 
              src="/src/assets/mbps-logo.png" 
              alt="Mount Baker Preschool Logo" 
              className="logo-hero"
            />
          </div>
          
          <h1 className="hero-title site-title">
            Mount Baker Preschool
          </h1>
          
          <p className="hero-subtitle site-title">
            A Waldorf Cooperative
          </p>
          
          <p className="hero-description">
            A nurturing school where children learn through creative play, 
            connection with nature, and community bonds.
          </p>
          
          <div className="hero-buttons">
            <a href="/#enrollment" className="hero-btn primary" onClick={(e) => handleScrollTo(e, 'enrollment')}>
              About Enrollment
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            <a href="/#philosophy" className="hero-btn secondary" onClick={(e) => handleScrollTo(e, 'philosophy')}>
              Our Philosophy
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
              </svg>
            </a>
          </div>

          {/* Decorative dots removed */}
        </div>
      </div>
    </section>
  )
}

export default HeroSection