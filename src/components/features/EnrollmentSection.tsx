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
            Parents act as weekly classroom volunteers, take turns providing and preparing healthy snacks, hold a role
            outside the classroom to help manage the school (e.g. publicity, maintenance, enrollment), assist with
            fundraising efforts for our scholarship fund, and attend monthly parent meetings. Tuition is significantly
            reduced for Co‑Op Classroom model families.
          </p>

          <h4 className="display-text text-xl text-old-growth mb-2">2025/2026 Annual Tuition Options:</h4>
          <ul className="body-text space-y-2 tuition-list">
            <li>
              <span className="font-semibold">Three Days per Week: $4,237</span>
              <span className="tuition-days">(Mon – Wed or Tues – Thur)</span>
            </li>
            <li>
              <span className="font-semibold">Four Days per Week: $5,361</span>
              <span className="tuition-days">(Mon – Thur or Tues – Fri)</span>
            </li>
            <li>
              <span className="font-semibold">Five Days per Week: $6,356</span>
              <span className="tuition-days">(Mon – Fri)</span>
            </li>
          </ul>
        </div>

        {/* Co-Op Preschool Model */}
        <div className="philosophy-text">
          <h3 className="display-text text-2xl text-old-growth mb-3">Co‑Op Preschool Model</h3>
          <p className="body-text mb-4">
            Families in the Co-Op Preschool model pay a higher tuition rate and omit the weekly classroom volunteer
            commitment. Parents still hold a role outside the classroom to help manage the school, assist with
            fundraising efforts for our scholarship fund, and attend monthly parent meetings. There are a limited
            number of Co‑Op Preschool model spots available.
          </p>

          <h4 className="display-text text-xl text-old-growth mb-2">2025/2026 Annual Tuition Options:</h4>
          <ul className="body-text space-y-2 tuition-list">
            <li>
              <span className="font-semibold">Three Days per Week: $7,211</span>
              <span className="tuition-days">(Mon – Wed or Tues – Thur)</span>
            </li>
            <li>
              <span className="font-semibold">Four Days per Week: $8,261</span>
              <span className="tuition-days">(Mon – Thur or Tues – Fri)</span>
            </li>
            <li>
              <span className="font-semibold">Five Days per Week: $9,696</span>
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
                Apply or Inquire
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


