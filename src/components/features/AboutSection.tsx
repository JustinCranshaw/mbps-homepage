import Section from '../ui/Section'
import imgCurriculum from '../../assets/images/indoor_play_1.jpg'
import imgInclusive from '../../assets/images/fall_picnic.jpg'
import imgIndoorPlay from '../../assets/images/indoor_play.jpg'

const AboutSection = () => {
  const snackSchedule = [
    {
      time: '11:20 AM',
      title: 'First Snack',
      description: 'Children gather after circle and story for a simple whole grain with fruit or vegetable.',
    },
    {
      time: '12:30 PM',
      title: 'Second Snack',
      description: 'A lighter shared snack helps children settle after clean up and before family pickup.',
    },
  ]

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

        <div id="snack-time" className="snack-schedule">
          <div className="section-header text-center">
            <h3 className="section-title snack-schedule-title">Snack-Time Schedule</h3>
            <p className="section-lede">
              Snack is part of the daily rhythm: predictable, shared, and prepared with care by our cooperative community.
            </p>
          </div>

          <div className="snack-time-grid">
            {snackSchedule.map((snack) => (
              <div className="snack-time-card" key={snack.time}>
                <p className="snack-time-card__time">{snack.time}</p>
                <h4 className="display-text text-xl text-old-growth">{snack.title}</h4>
                <p className="body-text">{snack.description}</p>
              </div>
            ))}
          </div>

          <div className="snack-rotation-card">
            <div>
              <h4 className="display-text text-xl text-old-growth mb-2">Family Snack Rotation</h4>
              <p className="body-text">
                Families participate in preparing healthy classroom snacks on a rotating basis. The classroom schedule
                notes who is signed up, what to bring, and any allergy or dietary updates for the week.
              </p>
            </div>
            <ul className="snack-note-list">
              <li>Whole grains, fruits, and vegetables are the everyday foundation.</li>
              <li>Snack duties are coordinated with classroom work and school needs.</li>
              <li>Teachers share current allergy guidance before families prepare food.</li>
            </ul>
          </div>
        </div>
    </Section>
  )
}

export default AboutSection
