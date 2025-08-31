import Section from '../ui/Section'
import { schoolInfo } from '../../content/data/school-info'

const ContactSection = () => {
  return (
    <Section id="contact" variant="mist" elevation="both">
      <div className="section-header text-center">
        <h2 className="section-title">Contact Us</h2>
      </div>

      <div className="text-center" style={{ marginTop: 8 }}>
        <h3 className="accent-text" style={{ fontSize: '1.6rem', margin: 0 }}>{schoolInfo.name}</h3>
        <p className="text-paragraph" style={{ marginTop: 10 }}>{schoolInfo.address}</p>
        <p className="text-paragraph" style={{ marginTop: 6 }}>
          <a href={`mailto:${schoolInfo.email}`} style={{ color: 'var(--forest-medium)', textDecoration: 'underline', textUnderlineOffset: 4 }}>{schoolInfo.email}</a>
        </p>

        {schoolInfo.inquiryFormEmbedUrl && (
          <div style={{ marginTop: 18 }}>
            <a className="btn-base btn-forest" href={schoolInfo.inquiryFormEmbedUrl} target="_blank" rel="noopener noreferrer">Apply or Inquire</a>
          </div>
        )}
      </div>
    </Section>
  )
}

export default ContactSection


