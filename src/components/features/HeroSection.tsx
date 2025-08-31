import heroLogo from '../../assets/mbps-logo-forest.png'
import heroImage from '../../assets/images/hero.jpg'

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
      {/* Paint-inspired background */}
      <div className="paint-bg"></div>
      
      {/* Hero Content - Two Column Layout */}
      <div className="hero-content">
        <div className="hero-grid">
          {/* Left Column - Text Content */}
          <div className="hero-text-column">
            {/* MBPS Logo */}
            <div className="hero-card-logo">
              <img 
                src={heroLogo}
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
          </div>

          {/* Right Column - Hero Image */}
          <div className="hero-image-column">
            <div className="children-hero-image">
              <img 
                src={heroImage}
                alt="Children at Mount Baker Preschool" 
                className="hero-image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
