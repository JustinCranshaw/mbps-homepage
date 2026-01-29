import Section from '../ui/Section'
import { schoolInfo } from '../../content/data/school-info'
// Modal removed per updated design (open in new tab)
import windowStar from '../../assets/window_star.svg'

const EnrollmentSection = () => {
  return (
    <Section id="enrollment" variant="mist" elevation="both">
      <div className="section-header text-center">
        <h2 className="section-title">Enrollment</h2>
      </div>

      <p className="section-lede enrollment-intro">
        Join our warm, nature‑rich community where play sparks learning and friendships grow. Discover a joyful preschool rooted in curiosity, care, and connection.
      </p>

      {/* Open House Section */}
      <div className="open-house-section">
        <div className="open-house-card">
          <div className="open-house-header">
            <h3 className="display-text text-2xl text-old-growth">🌟 Visit Us at Our Open House 🌟</h3>
          </div>
          <p className="body-text mb-4">
            We warmly invite you to step inside our cozy classroom, meet our teachers, and our co-op community.
            <br />
            No RSVP needed—just drop by and say hello. We can't wait to welcome you!
          </p>
          <div className="open-house-dates-grid">
            <div className="open-house-date-card">
              <span className="open-house-day">Saturday, January 31</span>
              <span className="open-house-time">10:00 am – 12:00 pm</span>
            </div>
            <div className="open-house-date-card">
              <span className="open-house-day">Saturday, February 7</span>
              <span className="open-house-time">10:00 am – 12:00 pm</span>
            </div>
          </div>
          <div className="open-house-address" style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <p className="body-text" style={{ margin: 0, lineHeight: '1.5' }}>722 30th Avenue South</p>
            <p className="body-text" style={{ margin: 0, lineHeight: '1.5' }}>Seattle, WA 98144</p>
          </div>
        </div>
      </div>

      <div className="facts-grid">
        <div className="facts-text facts-card card-organic">
          <h3 className="display-text facts-title">Key Facts</h3>
          <ul className="facts-list">
            <li>Mixed‑age classroom for children 3–5 years old</li>
            <li>3, 4, or 5 days per week; 9am–1pm</li>
            <li>Fridays reserved for older children (ages 4–5)</li>
            <li>Follows Seattle Public Schools calendar (September–June)</li>
            <li>Applicants should be 3 by August 31; September and October birthdays considered case‑by‑case</li>
          </ul>
        </div>
        <div className="facts-media">
          <img src={windowStar} alt="Decorative star" />
        </div>
      </div>

      {/* (moved) Inquiry CTA will appear below the model blocks */}

      <div className="about-two-col">
        {/* Co-Op Classroom Model */}
        <div className="philosophy-text">
          <h3 className="display-text text-2xl text-old-growth mb-3">Co‑Op Classroom Model</h3>
          <p className="body-text mb-4">
            In our Co-Op Classroom model, parents contribute through weekly classroom volunteering, healthy snack preparation on a rotating basis, essential school management roles (including publicity, maintenance, and enrollment), fundraising support for our scholarship fund, and attendance at monthly parent meetings. In return for this collaborative commitment, participating families enjoy significantly reduced tuition costs.
          </p>

          <h4 className="display-text text-xl text-old-growth mb-2">2026/2027 Annual Tuition Options:</h4>
          <ul className="body-text space-y-2 tuition-list">
            <li>
              <span className="font-semibold">Three Days per Week: $4,661</span>
              <span className="tuition-days">(Mon – Wed or Tues – Thur)</span>
            </li>
            <li>
              <span className="font-semibold">Four Days per Week: $5,898</span>
              <span className="tuition-days">(Mon – Thur or Tues – Fri)</span>
            </li>
            <li>
              <span className="font-semibold">Five Days per Week: $6,992</span>
              <span className="tuition-days">(Mon – Fri)</span>
            </li>
          </ul>
        </div>

        {/* Co-Op Preschool Model */}
        <div className="philosophy-text">
          <h3 className="display-text text-2xl text-old-growth mb-3">Co‑Op Preschool Model</h3>
          <p className="body-text mb-4">
            Our Co-Op Preschool model offers families a different level of involvement at a higher tuition rate. While parents are not required to volunteer weekly in the classroom, they still contribute through essential school management roles (including publicity, maintenance, and enrollment), fundraising support for our scholarship fund, and attendance at monthly parent meetings. Co-Op Preschool spots are limited.
          </p>

          <h4 className="display-text text-xl text-old-growth mb-2">2026/2027 Annual Tuition Options:</h4>
          <ul className="body-text space-y-2 tuition-list">
            <li>
              <span className="font-semibold">Three Days per Week: $7,933</span>
              <span className="tuition-days">(Mon – Wed or Tues – Thur)</span>
            </li>
            <li>
              <span className="font-semibold">Four Days per Week: $9,088</span>
              <span className="tuition-days">(Mon – Thur or Tues – Fri)</span>
            </li>
            <li>
              <span className="font-semibold">Five Days per Week: $10,666</span>
              <span className="tuition-days">(Mon – Fri)</span>
            </li>
          </ul>
        </div>
      </div>
      {/* Contact Us section placed where the CTA was */}
      <div className="text-center" style={{ marginTop: 24 }}>
        {schoolInfo.inquiryFormEmbedUrl && (
          <>
            <div style={{ marginTop: 12 }}>
              <a className="btn-base btn-forest" href={schoolInfo.inquiryFormEmbedUrl} target="_blank" rel="noopener noreferrer">
                Inquire About Enrollment
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginLeft: 6 }}>
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
            <p className="text-paragraph" style={{ color: 'var(--slate-text)', marginTop: 10 }}>
              Or email us at: <a href={`mailto:${schoolInfo.email}`} style={{ color: 'var(--forest-medium)', textDecoration: 'underline', textUnderlineOffset: 4 }}>{schoolInfo.email}</a>
            </p>
          </>
        )}
      </div>
    </Section>
  )
}

export default EnrollmentSection
