import wecanLogo from '../../assets/WECAN_Blk_Hor_FullM.png'

const Footer = () => {
  return (
    <footer style={{ backgroundColor: 'var(--old-growth)', color: 'var(--text-light)', padding: '4rem 0' }}>
      <div className="container">
        <div className="footer-grid">
          {/* School Info */}
          <div className="footer-main">
            <h3>Mount Baker Preschool</h3>
            <p>A Waldorf Cooperative</p>
            <p>
              Join our Waldorf cooperative community where children learn through play, 
              creativity, and connection with nature.
            </p>
          </div>

          {/* Contact */}
          <div className="footer-column">
            <h4>Contact</h4>
            <div className="footer-contact">
              <p>722 30th Avenue South</p>
              <p>Seattle, WA 98144</p>
              <p>
                <a 
                  href="mailto:mountbakerpreschool@gmail.com"
                >
                  mountbakerpreschool@gmail.com
                </a>
              </p>
            </div>
          </div>

          {/* Memberships */}
          <div className="footer-column">
            <h4>Memberships</h4>
            <div className="footer-memberships">
              <div className="membership-item">
                <a 
                  href="https://waldorfearlychildhood.org/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <img 
                    src={wecanLogo} 
                    alt="WECAN Full Member Logo" 
                    className="wecan-logo"
                  />
                </a>
                <p className="membership-text">
                  A Full Member of the Waldorf Early Childhood Association of North America
                </p>
              </div>
              <div className="membership-item">
                <p className="membership-link">
                  <a 
                    href="https://www.parentchildpreschools.org/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    PCPO Member
                  </a>
                </p>
                <p className="membership-text">
                  Parent Child Preschool Organization
                </p>
              </div>
            </div>
          </div>
        </div>

        <div style={{ paddingTop: '2rem', borderTop: '1px solid rgba(168, 181, 187, 0.3)', textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-light-muted)', marginTop: '3rem' }}>
          <p style={{ marginBottom: '0.5rem' }}>
            © {new Date().getFullYear()} Mount Baker Preschool. All rights reserved.
          </p>
          <p style={{ fontSize: '0.75rem' }}>
            Nurturing children through Waldorf education and cooperative community
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
