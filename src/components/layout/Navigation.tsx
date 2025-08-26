import { useEffect, useState } from 'react'
import type { MouseEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import logoWhite from '../../assets/mbps-logo-white.png'

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const navItems = [
    { path: '/#about', label: 'About' },
    { path: '/#philosophy', label: 'Philosophy' },
    { path: '/#teachers', label: 'Teachers' },
    { path: '/#traditions', label: 'Traditions' },
    { path: '/#enrollment', label: 'Enrollment' },
  ]

  const handleAnchorClick = (e: MouseEvent<HTMLAnchorElement>, path: string) => {
    const hashIndex = path.indexOf('#')
    if (hashIndex !== -1) {
      e.preventDefault()
      const id = path.slice(hashIndex + 1)
      const el = document.getElementById(id)
      const sameHash = location.hash === `#${id}`
      navigate(path, { replace: sameHash })
      setIsOpen(false)
      if (el) {
        const NAV_OFFSET = 70
        const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET
        window.scrollTo({ top, behavior: 'smooth' })
      }
    }
  }

  // Smooth-scroll to section on hash change or initial mount
  useEffect(() => {
    const hash = location.hash
    if (!hash) return
    const id = hash.slice(1)
    const el = document.getElementById(id)
    if (!el) return
    const NAV_OFFSET = 70
    const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET
    window.scrollTo({ top, behavior: 'smooth' })
  }, [location])

  const isActive = (path: string) => {
    const hashIndex = path.indexOf('#')
    if (hashIndex === -1) return location.pathname === path
    const pathHash = path.slice(hashIndex)
    return location.hash === pathHash
  }

  return (
    <nav className="nav">
      <div className="nav-container">
        {/* Logo */}
        <Link to="/" className="nav-logo">
          <div className="nav-logo-icon">
            <img 
              src={logoWhite}
              alt="Mount Baker Preschool Logo" 
              className="logo-nav"
            />
          </div>
          <div className="nav-logo-text">
            <h1 className="font-display site-title">Mount Baker Preschool</h1>
            <p className="site-title">A Waldorf Cooperative</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                onClick={(e) => handleAnchorClick(e, item.path)}
                className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="nav-mobile-toggle"
          aria-label="Toggle navigation"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className={`nav-mobile-menu ${isOpen ? 'open' : ''}`}>
        <ul className="nav-mobile-links">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                onClick={(e) => handleAnchorClick(e, item.path)}
                className={`nav-mobile-link ${isActive(item.path) ? 'active' : ''}`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Navigation