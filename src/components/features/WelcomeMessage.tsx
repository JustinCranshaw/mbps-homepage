import { motion } from 'framer-motion'
import { schoolInfo } from '../../content/data/school-info'

const WelcomeMessage = () => {
  return (
    <div className="text-center px-4 max-w-4xl mx-auto">
      {/* School Name */}
      <motion.h1
        className="text-display font-bold text-5xl md:text-7xl text-old-growth mb-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        {schoolInfo.name}
      </motion.h1>

      {/* Tagline */}
      <motion.p
        className="text-accent text-2xl md:text-3xl text-fern mb-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
      >
        {schoolInfo.tagline}
      </motion.p>

      {/* Welcome Text */}
      <motion.div
        className="space-y-4 mb-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <p className="text-lg md:text-xl text-granite leading-relaxed">
          Welcome to our nurturing Waldorf cooperative where children learn through 
          creative play, connection with nature, and community bonds.
        </p>
        <p className="text-base md:text-lg text-puget-sound">
          Currently enrolling for 2025-2026 • Ages 3-5
        </p>
      </motion.div>

      {/* Call to Action Buttons */}
      <motion.div
        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <motion.a
          href="/enrollment"
          className="btn-primary inline-flex items-center space-x-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>Learn About Enrollment</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </motion.a>
        
        <motion.a
          href="/philosophy"
          className="btn-secondary inline-flex items-center space-x-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>Our Philosophy</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </motion.a>
      </motion.div>

      {/* Decorative Elements */}
      <motion.div
        className="mt-12 flex justify-center space-x-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.5 }}
      >
        <div className="text-2xl animate-float">🌲</div>
        <div className="text-2xl animate-float" style={{ animationDelay: '1s' }}>🍃</div>
        <div className="text-2xl animate-float" style={{ animationDelay: '2s' }}>🌿</div>
      </motion.div>
    </div>
  )
}

export default WelcomeMessage
