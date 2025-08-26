 
import HeroSection from '../components/features/HeroSection'
 
import AboutSection from '../components/features/AboutSection'
import ScenicDivider from '../components/features/ScenicDivider'
import dividerTop from '../assets/images/divider_kabota_bridge.jpg'
import dividerMaypole from '../assets/images/divider_maypole.jpg'
import dividerClassroom from '../assets/images/divider_classroom.jpg'
import dividerKubotaAll from '../assets/images/divider_kabota_all_32_12.jpg'
import Section from '../components/ui/Section'
import TraditionsSection from '../components/features/TraditionsSection'
import EnrollmentSection from '../components/features/EnrollmentSection'
import imgLove from '../assets/images/corvidae_collette.jpg'
import imgPlay from '../assets/images/stick_tower.jpg'
import imgCare from '../assets/images/ladybugs.jpg'
import imgWonder from '../assets/images/spiral_2.jpg'
import imgCurriculum from '../assets/images/gnomes.jpg'
import imgInclusive from '../assets/images/mushrooms.jpg'
import TeachersSection from '../components/features/TeachersSection'

const Homepage = () => {
  return (
    <div className="page-wrapper">
      {/* Hero Section */}
      <HeroSection />
      {/* Organic boundary strip moved into canvas; remove DOM strip */}

      {/* About Section (immediately following hero) */}
      <AboutSection />

      {/* Scenic divider to ease the transition after the hero */}
      <ScenicDivider src={dividerTop} alt="Children crossing a stone bridge surrounded by garden greens" />

      {/* Main Content */}
      <main id="main-content">
        {/* Welcome Section removed to avoid restating hero content */}

        {/* Philosophy Preview */}
        <Section id="philosophy" variant="mist" elevation="both">
          <div className="section-header text-center">
            <h2 className="section-title">Our Philosophy</h2>
            <p className="text-subheading">Nurturing the Whole Child</p>
            <p className="section-lede max-w-3xl mx-auto">
              We believe in cultivating every dimension of childhood development—body, mind, and soul—through an integrated approach that honors each child's creative, nurturing, and cognitive capabilities.
            </p>
          </div>

          <div className="philosophy-grid">
              <div className="card-organic philosophy-card">
                <div className="philosophy-card-media">
                  <img src={imgLove} alt="Two children hugging and smiling with flower crowns." />
                </div>
                <div className="philosophy-card-content text-center">
                  <h3 className="display-text text-xl text-old-growth mb-3">Love & Warmth</h3>
                  <p className="body-text text-sm">A nurturing environment where every child feels valued</p>
                </div>
              </div>

              <div className="card-organic philosophy-card">
                <div className="philosophy-card-media">
                  <img src={imgPlay} alt="Children building a small tower with sticks beneath a tree." />
                </div>
                <div className="philosophy-card-content text-center">
                  <h3 className="display-text text-xl text-old-growth mb-3">Creative Play</h3>
                  <p className="body-text text-sm">Free, imaginative play as the foundation of learning</p>
                </div>
              </div>

              <div className="card-organic philosophy-card">
                <div className="philosophy-card-media">
                  <img src={imgCare} alt="Children gently observing ladybugs outdoors." />
                </div>
                <div className="philosophy-card-content text-center">
                  <h3 className="display-text text-xl text-old-growth mb-3">Environmental Care</h3>
                  <p className="body-text text-sm">Awareness of our interaction with the world around us</p>
                </div>
              </div>

              <div className="card-organic philosophy-card">
                <div className="philosophy-card-media">
                  <img src={imgWonder} alt="Child lighting a candle during a quiet winter spiral celebration." />
                </div>
                <div className="philosophy-card-content text-center">
                  <h3 className="display-text text-xl text-old-growth mb-3">Wonder & Gratitude</h3>
                  <p className="body-text text-sm">Fostering reverence and appreciation for life's beauty</p>
                </div>
              </div>
          </div>

          <div className="about-two-col">
            <div className="philosophy-text">
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

            <div className="philosophy-card-media">
              <img src={imgCurriculum} alt="Children engaged in creative indoor play with natural materials" />
            </div>
          </div>

          <div className="about-two-col">
            <div className="philosophy-card-media">
              <img src={imgInclusive} alt="Children and caregivers gathered together outdoors during fall" />
            </div>

            <div className="philosophy-text">
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
          </div>

          {/* Philosophy CTA removed per design update */}
        </Section>

        {/* Scenic divider between philosophy and teachers */}
        <ScenicDivider src={dividerMaypole} alt="Children celebrating with colorful ribbons and flower crowns" />

        {/* Teachers Section */}
        <TeachersSection />

        {/* Scenic divider after teachers section */}
        <ScenicDivider src={dividerClassroom} alt="Children and teachers gathered for story time in the classroom" />

        {/* Daily Rhythm moved to About page; section removed */}

        {/* Traditions */}
        <TraditionsSection />

        {/* Scenic divider between traditions and enrollment */}
        <ScenicDivider src={dividerKubotaAll} alt="Children visiting Kubota Garden together" />

        <EnrollmentSection />
      </main>
    </div>
  )
}

export default Homepage