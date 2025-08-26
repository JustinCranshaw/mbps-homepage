import { motion } from 'framer-motion'

interface ForestCanopyLayersProps {
  layer: number
}

const ForestCanopyLayers = ({ layer }: ForestCanopyLayersProps) => {
  // Create SVG forest silhouettes for each layer
  const getForestPath = (layerNum: number) => {
    switch (layerNum) {
      case 1: // Background layer - distant mountains and trees
        return (
          <svg viewBox="0 0 1200 400" className="w-full h-full">
            <defs>
              <linearGradient id={`forestGradient${layerNum}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1B4332" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#1B4332" stopOpacity="0.6" />
              </linearGradient>
            </defs>
            <path
              d="M0,400 L0,300 Q100,250 200,280 Q300,200 400,240 Q500,180 600,220 Q700,160 800,200 Q900,140 1000,180 Q1100,120 1200,160 L1200,400 Z"
              fill={`url(#forestGradient${layerNum})`}
            />
          </svg>
        )
      case 2: // Middle layer - medium trees
        return (
          <svg viewBox="0 0 1200 500" className="w-full h-full">
            <defs>
              <linearGradient id={`forestGradient${layerNum}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#52734D" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#52734D" stopOpacity="0.7" />
              </linearGradient>
            </defs>
            <path
              d="M0,500 L0,350 Q50,300 120,320 Q180,280 250,300 Q320,260 400,280 Q480,240 560,260 Q640,220 720,240 Q800,200 880,220 Q960,180 1040,200 Q1120,160 1200,180 L1200,500 Z"
              fill={`url(#forestGradient${layerNum})`}
            />
            {/* Add some individual tree shapes */}
            <ellipse cx="150" cy="320" rx="15" ry="40" fill="#52734D" opacity="0.6" />
            <ellipse cx="350" cy="280" rx="20" ry="50" fill="#52734D" opacity="0.6" />
            <ellipse cx="550" cy="260" rx="18" ry="45" fill="#52734D" opacity="0.6" />
            <ellipse cx="750" cy="240" rx="22" ry="55" fill="#52734D" opacity="0.6" />
            <ellipse cx="950" cy="220" rx="16" ry="42" fill="#52734D" opacity="0.6" />
          </svg>
        )
      case 3: // Foreground layer - close trees
        return (
          <svg viewBox="0 0 1200 600" className="w-full h-full">
            <defs>
              <linearGradient id={`forestGradient${layerNum}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1B4332" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#1B4332" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            <path
              d="M0,600 L0,400 Q80,350 160,370 Q240,330 320,350 Q400,310 480,330 Q560,290 640,310 Q720,270 800,290 Q880,250 960,270 Q1040,230 1120,250 L1200,250 L1200,600 Z"
              fill={`url(#forestGradient${layerNum})`}
            />
            {/* Detailed foreground trees */}
            <g opacity="0.8">
              <ellipse cx="100" cy="370" rx="25" ry="70" fill="#1B4332" />
              <ellipse cx="90" cy="350" rx="15" ry="40" fill="#1B4332" />
              <ellipse cx="110" cy="355" rx="18" ry="45" fill="#1B4332" />
              
              <ellipse cx="300" cy="350" rx="30" ry="80" fill="#1B4332" />
              <ellipse cx="285" cy="330" rx="20" ry="50" fill="#1B4332" />
              <ellipse cx="315" cy="335" rx="22" ry="55" fill="#1B4332" />
              
              <ellipse cx="500" cy="330" rx="28" ry="75" fill="#1B4332" />
              <ellipse cx="485" cy="310" rx="18" ry="45" fill="#1B4332" />
              <ellipse cx="515" cy="315" rx="20" ry="50" fill="#1B4332" />
              
              <ellipse cx="700" cy="290" rx="32" ry="85" fill="#1B4332" />
              <ellipse cx="680" cy="270" rx="22" ry="55" fill="#1B4332" />
              <ellipse cx="720" cy="275" rx="25" ry="60" fill="#1B4332" />
              
              <ellipse cx="900" cy="270" rx="26" ry="70" fill="#1B4332" />
              <ellipse cx="885" cy="250" rx="16" ry="42" fill="#1B4332" />
              <ellipse cx="915" cy="255" rx="19" ry="48" fill="#1B4332" />
            </g>
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <motion.div 
      className={`forest-layer forest-layer-${layer} absolute inset-0 w-full h-full`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, delay: layer * 0.5 }}
    >
      {getForestPath(layer)}
    </motion.div>
  )
}

export default ForestCanopyLayers
