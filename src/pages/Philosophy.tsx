import Section from '../components/ui/Section'

const Philosophy = () => {
  return (
    <Section variant="mist">
      <div className="section-header text-center">
        <h2 className="section-title">Our Philosophy</h2>
        <p className="section-lede max-w-3xl mx-auto">
          Philosophy page coming soon...
        </p>
      </div>

      <div className="about-two-col">
        <div className="text-backdrop basic-info-card">
          <h3 className="display-text text-2xl text-old-growth mb-3">The Waldorf Curriculum</h3>
          <p className="body-text">
            As a cooperative, the teachers design and implement the curriculum, and parents work to support them in creating an environment where our children are free to learn, explore, and play safely. We believe young children learn best when they play freely and explore.
          </p>
          <p className="body-text">
            The classroom is intended to resemble a home with an emphasis on natural materials, the smells of grains cooking in the kitchen, and a large communal table for sharing meals.
          </p>
          <p className="body-text">
            Our day flows with a predictable rhythm and alternates between periods of free play (outdoor and indoor) and coming together to share a meal, join in circle time, or gather at the art table for a quiet project. Working parents and teachers provide a general structure, model empathy, assist with transitions, aid in conflict resolution, and provide a nurturing environment.
          </p>
        </div>

        <div className="card-organic philosophy-card">
          <div className="philosophy-card-media">
            <div className="w-full h-full bg-slate-200/70 flex items-center justify-center">
              <span className="text-slate-500">Photo Placeholder</span>
            </div>
          </div>
        </div>
      </div>

      <div className="about-two-col" style={{ marginTop: 32 }}>
        <div className="text-backdrop basic-info-card">
          <h3 className="display-text text-2xl text-old-growth mb-3">Inclusive and Respectful Learning Environment</h3>
          <p className="body-text">
            At Mount Baker Preschool, we believe in working toward a society in which all people are treated with dignity and honor. This work begins with our children.
          </p>
          <p className="body-text">
            We believe barriers of prejudice, misinformation, and stereotypes may be avoided by creating an inclusive and respectful learning environment for families and children of all gender, ethnicity, economic class, religion, family composition, physical ability, and size.
          </p>
          <p className="body-text">
            We support this work in the classroom through critical thinking and problem solving, empathy development, building self-esteem in students, and respecting others.
          </p>
        </div>

        <div className="card-organic philosophy-card">
          <div className="philosophy-card-media">
            <div className="w-full h-full bg-slate-200/70 flex items-center justify-center">
              <span className="text-slate-500">Photo Placeholder</span>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

export default Philosophy
