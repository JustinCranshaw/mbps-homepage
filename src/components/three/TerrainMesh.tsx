import { useRef, useMemo } from 'react'
import { Mesh, BufferGeometry } from 'three'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { TerrainGenerator, defaultTerrainConfig } from '../../lib/TerrainGenerator'

export const TerrainMesh = () => {
  const meshRef = useRef<Mesh>(null)
  
  // Generate terrain geometry
  const { geometry } = useMemo(() => {
    const generator = new TerrainGenerator({
      ...defaultTerrainConfig,
      width: 25, // Smaller width so it doesn't fill viewport
      height: 15, // Smaller height 
      segments: 80,
      heightScale: 3.0, // Lower hills
      noiseScale: 0.08
    })

    const positions = generator.generatePositions()
    const indices = generator.generateIndices()
    const normals = generator.generateNormals(positions, indices)
    const uvs = generator.generateUVs()

    const geometry = new BufferGeometry()
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3))
    geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2))
    geometry.setIndex(Array.from(indices))

    // Add height-based vertex colors to read as hills
    const colorArray = new Float32Array((positions.length / 3) * 3)
    for (let i = 0; i < positions.length; i += 3) {
      const y = positions[i + 1]
      // Normalize height to 0..1 for ramp
      const h = Math.min(1, Math.max(0, (y + 0.5) / 3.2))
      // Ramp from vibrant valley green to bright crest green
      const low = new THREE.Color('#4A8B3A') // vibrant valley green
      const high = new THREE.Color('#6BC95A') // bright crest green
      const c = low.clone().lerp(high, h)
      colorArray[i] = c.r
      colorArray[i + 1] = c.g
      colorArray[i + 2] = c.b
    }
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colorArray, 3))

    return { geometry }
  }, [])

  // Optional: Add subtle animation to terrain (very subtle breathing effect)
  useFrame((state) => {
    if (meshRef.current) {
      // Very subtle vertical movement for organic feeling
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.02
    }
  })

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      position={[0, -8.2, 5]}
      rotation={[-Math.PI / 1.9, 0, 0]}
      renderOrder={0}
    >
      {/* Terrain material uses vertex colors with a soft Lambert for simple shading */}
      <meshLambertMaterial vertexColors={true} />
    </mesh>
  )
}
