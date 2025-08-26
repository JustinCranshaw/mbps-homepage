import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

export const SkyGradient = () => {
  const { scene } = useThree()

  useFrame(() => {
    // Set a beautiful Pacific Northwest sky gradient
    const topColor = new THREE.Color('#87CEEB')    // Sky blue
    const bottomColor = new THREE.Color('#F0F4F5') // Morning mist white
    
    // Create gradient background
    scene.background = new THREE.Color().lerpColors(bottomColor, topColor, 0.5)
  })

  return null // This component just sets the scene background
}
