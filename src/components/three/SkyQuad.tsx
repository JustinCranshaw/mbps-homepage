import { useRef } from 'react'
import { Mesh } from 'three'

export const SkyQuad = () => {
  const meshRef = useRef<Mesh>(null)
  
  return (
    <mesh
      ref={meshRef}
      renderOrder={-1000} // Render behind everything else
      position={[0, 0, -50]} // Far behind camera
    >
      {/* Large plane that fills the entire view */}
      <planeGeometry args={[1000, 1000]} />
      <meshBasicMaterial 
        color="#87CEEB" 
        depthWrite={false} // Don't write to depth buffer so it never covers content
      />
    </mesh>
  )
}
