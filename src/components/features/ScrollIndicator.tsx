import { motion } from 'framer-motion'

const ScrollIndicator = () => {
  const scrollToContent = () => {
    const nextSection = document.getElementById('main-content')
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <motion.button
      onClick={scrollToContent}
      className="flex flex-col items-center space-y-2 text-old-growth hover:text-fern transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-fern/50 rounded-lg p-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 3 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <span className="text-sm font-medium">Explore</span>
      
      {/* Animated Arrow */}
      <motion.div
        className="relative"
        animate={{ y: [0, 8, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <svg 
          className="w-6 h-6" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M19 14l-7 7m0 0l-7-7m7 7V3" 
          />
        </svg>
      </motion.div>

      {/* Organic scroll indicator design */}
      <div className="flex flex-col items-center space-y-1 mt-2">
        <motion.div
          className="w-1 h-8 bg-gradient-to-b from-fern to-transparent rounded-full"
          animate={{ scaleY: [1, 0.5, 1] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />
        <motion.div
          className="w-2 h-2 bg-fern rounded-full"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      {/* Decorative elements */}
      <div className="absolute -left-8 top-1/2 transform -translate-y-1/2">
        <motion.div
          className="text-fern/40 text-xs"
          animate={{ 
            rotate: [0, 10, -10, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          🍃
        </motion.div>
      </div>
      
      <div className="absolute -right-8 top-1/2 transform -translate-y-1/2">
        <motion.div
          className="text-fern/40 text-xs"
          animate={{ 
            rotate: [0, -10, 10, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        >
          🌿
        </motion.div>
      </div>
    </motion.button>
  )
}

export default ScrollIndicator
