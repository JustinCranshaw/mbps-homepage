import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const BANNER_DISMISSED_KEY = 'openHouseBannerDismissed'

const OpenHouseBanner = () => {
  const [isDismissed, setIsDismissed] = useState(true) // Start hidden to prevent flash

  useEffect(() => {
    const dismissed = sessionStorage.getItem(BANNER_DISMISSED_KEY)
    setIsDismissed(dismissed === 'true')
  }, [])

  const handleDismiss = () => {
    setIsDismissed(true)
    sessionStorage.setItem(BANNER_DISMISSED_KEY, 'true')
  }

  if (isDismissed) return null

  return (
    <div className="open-house-banner">
      <div className="open-house-banner-content">
        <span className="open-house-banner-label">✨ Open House</span>
        <span className="open-house-banner-divider">|</span>
        <span className="open-house-banner-dates">
          <span className="open-house-date">Sat, Jan 31, 10am–12pm</span>
          <span className="open-house-banner-dot">•</span>
          <span className="open-house-date">Sat, Feb 7, 10am–12pm</span>
        </span>
        <Link to="/#enrollment" className="open-house-banner-cta">
          Learn More
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </Link>
      </div>
      <button 
        className="open-house-banner-close" 
        onClick={handleDismiss}
        aria-label="Dismiss banner"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M18 6L6 18M6 6l12 12"/>
        </svg>
      </button>
    </div>
  )
}

export default OpenHouseBanner
