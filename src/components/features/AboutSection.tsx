import Section from '../ui/Section'
import imgCurriculum from '../../assets/images/indoor_play_1.jpg'
import imgInclusive from '../../assets/images/fall_picnic.jpg'
import imgIndoorPlay from '../../assets/images/indoor_play.jpg'

const AboutSection = () => {
  return (
    <Section id="about" variant="mist" elevation="above">
      <div className="section-header text-center">
          <h2 className="section-title">About Our School</h2>
          <p className="text-subheading">Where Community and Learning Come Together</p>
          <p className="section-lede max-w-3xl mx-auto">
            We are a unique Waldorf cooperative in Seattle's Leschi neighborhood. Our days flow with gentle
            rhythm in a home-like classroom filled with natural materials, where children learn through free,
            imaginative play—tending our pea patch, sharing stories, creating art, and exploring neighborhood green spaces.
          </p>
        </div>
        
        <div className="about-two-col">
          {/* Left: Text (Cooperative) */}
          <div className="philosophy-text">
            <h3 className="display-text text-2xl text-old-growth mb-2">Our Cooperative Model</h3>
            <p className="body-text mb-4">
              As a true cooperative, families are active participants in their child's education. Parents and caregivers spend time in the classroom, creating a rich learning environment where children experience multiple caring adults as part of their extended community.
            </p>
            <p className="body-text">
              This collaborative approach builds meaningful connections between families while ensuring children learn in a warm, supportive environment enriched by the diverse skills and perspectives that each family brings.
            </p>
          </div>

          {/* Right: Image (Cooperative) */}
          <div className="philosophy-card-media">
            <img src={imgInclusive} alt="Children and caregivers gathered together outdoors during fall" />
          </div>
        </div>

        <div className="about-two-col" style={{ marginTop: 24 }}>
          {/* Left: Image (Basics) */}
          <div className="philosophy-card-media">
            <img src={imgCurriculum} alt="Children engaged in creative indoor play with natural materials" />
          </div>

          {/* Right: Text (Basics) */}
          <div className="philosophy-text">
            <h3 className="display-text text-2xl text-old-growth mb-2">The Basics</h3>
            <p className="body-text mb-4">
              We welcome families of every race, creed, religion, and sexual orientation, and encourage families in need to apply for financial aid.
            </p>
            <p className="body-text mb-3">
              <span className="label">Ages</span>: Mixed‑age program for children 3–5 years old.
            </p>
            <p className="body-text mb-3">
              <span className="label">Schedule</span>: 9:00 AM to 1:00 PM, Monday through Friday. Fridays reserved for ages 4–5.
            </p>
            <p className="body-text">
              <span className="label">Flexible Plans</span>: Choose 3, 4, or 5‑day programs with flexible levels of classroom involvement.
            </p>
            <p className="body-text mb-3">
              <span className="label">Location</span>: Seattle's Leschi neighborhood, where tree‑lined streets and green spaces extend our classroom outdoors.
            </p>
          </div>
        </div>

        {/* Daily Rhythm (moved from homepage) */}
        <div className="about-two-col" style={{ marginTop: 24 }}>
          <div className="philosophy-text">
            <h3 className="display-text text-2xl text-old-growth mb-3">Our Daily Rhythm</h3>
            <p className="body-text mb-4">
              Each day flows with a predictable rhythm, alternating between free play and coming together as a community for meals, circle time, and quiet activities.
            </p>
            <ul className="facts-list">
              <li><span className="label">9am:</span> Arrival, outdoor play, seasonal circle, walk</li>
              <li><span className="label">10:30am:</span> Inside, bathroom and hand washing</li>
              <li><span className="label">11:00am:</span> Circle and story</li>
              <li><span className="label">11:20am:</span> Snack (whole grain and fruit or vegetable)</li>
              <li><span className="label">11:20am:</span> Free play / artistic activity</li>
              <li><span className="label">12:10pm:</span> Bathroom and clean up</li>
              <li><span className="label">12:30pm:</span> Snack (whole grain and fruit or vegetable)</li>
              <li><span className="label">1:00pm:</span> Pick up by parents and caregivers</li>
            </ul>
          </div>
          <div className="philosophy-card-media">
            <img src={imgIndoorPlay} alt="Children engaged in indoor play and tidy-up" />
          </div>
        </div>
    </Section>
  )
}

export default AboutSection
