import Section from '../ui/Section'

const EnrollmentSection = () => {
  return (
    <Section id="enrollment" variant="mist" elevation="both">
      <div className="section-header text-center">
        <h2 className="section-title">Enrollment</h2>
        <p className="section-lede max-w-4xl mx-auto">
          We offer a mixed-age program for children aged 3–5 years old. Families may choose from three, four, or
          five-day programs, which run from 9am – 1pm. Fridays are reserved for older children (4 or 5 years old).
          The school year follows the Seattle Public Schools calendar (September – June). Applicants should be 3 years
          old by August 31. September birthdays will be considered on a case-by-case basis.
        </p>
      </div>

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
            Families in the preschool model pay a higher tuition rate and omit the weekly classroom volunteer
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
    </Section>
  )
}

export default EnrollmentSection


