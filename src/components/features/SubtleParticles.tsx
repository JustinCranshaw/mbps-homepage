import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const SubtleParticles = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      
      const particles = containerRef.current.querySelectorAll('.mouse-particle')
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      
      particles.forEach((particle, index) => {
        const element = particle as HTMLElement
        const speed = (index + 1) * 0.02
        const x = (clientX - innerWidth / 2) * speed
        const y = (clientY - innerHeight / 2) * speed
        
        element.style.transform = `translate(${x}px, ${y}px)`
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Floating Seeds */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={`seed-${i}`}
          className="particle seed mouse-particle absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            rotate: [0, 360],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 2,
          }}
        />
      ))}

      {/* Floating Leaves */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`leaf-${i}`}
          className="particle mouse-particle absolute text-fern/40"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            fontSize: `${12 + Math.random() * 8}px`,
          }}
          animate={{
            y: [0, -150, 0],
            x: [0, Math.random() * 80 - 40, 0],
            rotate: [0, Math.random() * 720 - 360],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 20 + Math.random() * 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 3,
          }}
        >
          🍃
        </motion.div>
      ))}

      {/* Fireflies (evening effect) */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={`firefly-${i}`}
          className="particle mouse-particle absolute w-2 h-2 bg-salmon/60 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            boxShadow: '0 0 6px rgba(224, 123, 57, 0.8)',
          }}
          animate={{
            x: [0, Math.random() * 200 - 100, Math.random() * 200 - 100, 0],
            y: [0, Math.random() * 200 - 100, Math.random() * 200 - 100, 0],
            opacity: [0, 0.8, 0.3, 0.8, 0],
            scale: [0.5, 1, 0.7, 1, 0.5],
          }}
          transition={{
            duration: 25 + Math.random() * 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 4,
          }}
        />
      ))}

      {/* Pollen particles */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={`pollen-${i}`}
          className="particle mouse-particle absolute w-1 h-1 bg-salmon/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -80, 0],
            x: [0, Math.random() * 30 - 15, 0],
            opacity: [0.1, 0.4, 0.1],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: 12 + Math.random() * 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 1.5,
          }}
        />
      ))}

      {/* Dandelion seeds */}
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.div
          key={`dandelion-${i}`}
          className="particle mouse-particle absolute text-morning-mist/60"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            fontSize: '8px',
          }}
          animate={{
            y: [0, -200, 0],
            x: [0, Math.random() * 60 - 30, 0],
            rotate: [0, 180, 360],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 18 + Math.random() * 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 2.5,
          }}
        >
          ❋
        </motion.div>
      ))}

      {/* SVG organic shapes */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800">
        <defs>
          <filter id="particleBlur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1" />
          </filter>
        </defs>
        
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.circle
            key={`svg-particle-${i}`}
            cx={Math.random() * 1200}
            cy={Math.random() * 800}
            r="2"
            fill="#52734D"
            opacity="0.3"
            filter="url(#particleBlur)"
            animate={{
              cy: [Math.random() * 800, Math.random() * 800 - 100, Math.random() * 800],
              opacity: [0.1, 0.4, 0.1],
              r: [1, 3, 1],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 3,
            }}
          />
        ))}
      </svg>
    </div>
  )
}

export default SubtleParticles
