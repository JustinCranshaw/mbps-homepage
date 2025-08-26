import { motion } from 'framer-motion'

const MistOverlay = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Animated mist layers */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-morning-mist/20 via-transparent to-transparent"
        animate={{
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-morning-mist/30 via-transparent to-transparent"
        animate={{
          opacity: [0.3, 0.1, 0.3],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />

      {/* Floating mist particles */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-32 h-32 rounded-full bg-morning-mist/10 blur-xl"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 2,
          }}
        />
      ))}

      {/* SVG mist effect */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800">
        <defs>
          <filter id="mistBlur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
          </filter>
          <radialGradient id="mistGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F0F4F5" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#F0F4F5" stopOpacity="0" />
          </radialGradient>
        </defs>
        
        {/* Animated mist clouds */}
        <motion.ellipse
          cx="200"
          cy="300"
          rx="150"
          ry="50"
          fill="url(#mistGradient)"
          filter="url(#mistBlur)"
          animate={{
            cx: [200, 250, 200],
            rx: [150, 180, 150],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        <motion.ellipse
          cx="800"
          cy="200"
          rx="120"
          ry="40"
          fill="url(#mistGradient)"
          filter="url(#mistBlur)"
          animate={{
            cx: [800, 750, 800],
            rx: [120, 140, 120],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5,
          }}
        />
        
        <motion.ellipse
          cx="400"
          cy="500"
          rx="100"
          ry="30"
          fill="url(#mistGradient)"
          filter="url(#mistBlur)"
          animate={{
            cx: [400, 450, 400],
            rx: [100, 130, 100],
            opacity: [0.15, 0.35, 0.15],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 10,
          }}
        />
        
        <motion.ellipse
          cx="1000"
          cy="400"
          rx="140"
          ry="45"
          fill="url(#mistGradient)"
          filter="url(#mistBlur)"
          animate={{
            cx: [1000, 950, 1000],
            rx: [140, 170, 140],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 7,
          }}
        />
      </svg>
    </div>
  )
}

export default MistOverlay
