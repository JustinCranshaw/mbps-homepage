import Section from '../ui/Section'
import imgCarolyn from '../../assets/images/carolyn.jpg'
import imgAlyssa from '../../assets/images/alyssa.jpg'

const TeachersSection = () => {
  const teachers = [
    {
      name: "Carolyn",
      role: "Co-Lead Teacher",
      image: imgCarolyn,
      bio: "Carolyn enjoys nurturing preschool children with songs, stories, art, nature and lots of time for imaginative play. Her three daughters are all MBPS alumni, and she loves the unique cooperative model of the school and the community that it provides. After seven cumulative years as a parent and assistant teacher at MBPS, she became a lead teacher in 2019. Carolyn completed her Waldorf Early Childhood teacher training with Sound Circle Center. Outside of teaching she enjoys family time, yoga, board games, cooking, thrifting, and sewing."
    },
    {
      name: "Alyssa",
      role: "Assistant Teacher",
      image: imgAlyssa,
      bio: "Alyssa is dedicated to early childhood education and building a sense of community and sociality between children. Through encouraging play and communication between students, she aims to build their sense of self and others. Since 2018, Alyssa has been a part of the MBPS community; her son and daughter are both proud alumni, and she became an assistant teacher in 2023. She has a bachelor's degree in education and has previously taught middle school math and science for nearly a decade. Away from school she loves gardening, spending time with her family, woodworking, crafting, and watching the UW Women's Basketball."
    }
  ]

  return (
    <Section id="teachers" variant="mist" elevation="both">
      <div className="section-header text-center">
        <h2 className="section-title">Meet Our Teachers</h2>
        <p className="section-lede max-w-4xl mx-auto">
          Our dedicated educators bring warmth, experience, and passion to nurturing each child's natural development 
          through the Waldorf approach.
        </p>
      </div>

      {/* Row 1: Photo left, text right */}
      <div className="about-two-col">
        <div className="teacher-photo-media">
          <img
            src={teachers[0].image}
            alt={`${teachers[0].name}, ${teachers[0].role}`}
          />
        </div>
        <div className="philosophy-text">
          <h3 className="display-text text-4xl text-old-growth mb-6">{teachers[0].name}</h3>
          <p className="body-text text-lg text-granite leading-relaxed">{teachers[0].bio}</p>
        </div>
      </div>

      {/* Row 2: Text left, photo right */}
      <div className="about-two-col" style={{ marginTop: 24 }}>
        <div className="philosophy-text">
          <h3 className="display-text text-4xl text-old-growth mb-6">{teachers[1].name}</h3>
          <p className="body-text text-lg text-granite leading-relaxed">{teachers[1].bio}</p>
        </div>
        <div className="teacher-photo-media">
          <img
            src={teachers[1].image}
            alt={`${teachers[1].name}, ${teachers[1].role}`}
          />
        </div>
      </div>

      {/* CTA removed per design update */}
    </Section>
  )
}

export default TeachersSection
