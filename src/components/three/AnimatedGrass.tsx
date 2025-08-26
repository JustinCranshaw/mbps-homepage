import { useRef, useMemo, useEffect } from 'react'
import { InstancedMesh, Vector3, ShaderMaterial, BufferGeometry, InstancedBufferAttribute, Float32BufferAttribute } from 'three'
import { useFrame } from '@react-three/fiber'
import { useWindPhysics } from '../../lib/WindPhysics'
import { TerrainGenerator, defaultTerrainConfig } from '../../lib/TerrainGenerator'

// Import shaders as strings (Vite handles this)
import grassVertexShader from '../../shaders/grassVertex.glsl?raw'
import grassFragmentShader from '../../shaders/grassFragment.glsl?raw'

const GRASS_COUNT = 18000 // Drastically increased for lushness

export const AnimatedGrass = () => {
  const meshRef = useRef<InstancedMesh>(null)
  const shaderMaterialRef = useRef<ShaderMaterial>(null)
  const { updateWind } = useWindPhysics()
  
  // Store grass blade positions and properties
  const { geometry, material } = useMemo(() => {
    // Generate a matching height map so we can place blades on the terrain
    const generator = new TerrainGenerator({
      ...defaultTerrainConfig,
      width: 25, // Match smaller terrain
      height: 15, // Match smaller terrain
      segments: 80,
      heightScale: 3.0,
      noiseScale: 0.08
    })
    const terrainPositions = generator.generatePositions()

    const data = []
    
    for (let i = 0; i < GRASS_COUNT; i++) {
      // Non-uniform random distribution for natural clustering
      const r = Math.sqrt(Math.random())
      const theta = Math.random() * 2 * Math.PI
      const x = r * Math.cos(theta) * (25 / 2) // Match smaller terrain width
      const z = r * Math.sin(theta) * (15 / 2) // Match smaller terrain height

      // Sample approximate y by finding nearest vertex in height positions
      let y = 0
      let closestDist = Infinity
      for (let p = 0; p < terrainPositions.length; p += 3) {
        const px = terrainPositions[p]
        const py = terrainPositions[p + 1]
        const pz = terrainPositions[p + 2]
        const dx = px - x
        const dz = pz - z
        const d2 = dx * dx + dz * dz
        if (d2 < closestDist) {
          closestDist = d2
          y = py
        }
      }
      // Lift grass slightly above terrain to avoid z-fighting/occlusion
      y += 0.25
      
      // Random grass properties
      const height = 0.8 + Math.random() * 1.2
      const width = 0.04 + Math.random() * 0.04
      const bendFactor = Math.random() * 0.4 + 0.6 // How much this blade bends in wind
      
      data.push({
        position: new Vector3(x, y, z),
        height,
        width,
        bendFactor,
        phase: Math.random() * Math.PI * 2
      })
    }

    // Create simple grass blade geometry (quad)
    const geometry = new BufferGeometry()
    
    const vertices = new Float32Array([
      -0.05, 0, 0,   // bottom left
       0.05, 0, 0,   // bottom right
       0.05, 1, 0,   // top right
      -0.05, 1, 0    // top left
    ])
    
    const indices = [0, 1, 2, 0, 2, 3]
    
    const uvs = new Float32Array([
      0, 0,  // bottom left
      1, 0,  // bottom right
      1, 1,  // top right
      0, 1   // top left
    ])
    
    geometry.setAttribute('position', new Float32BufferAttribute(vertices, 3))
    geometry.setAttribute('uv', new Float32BufferAttribute(uvs, 2))
    geometry.setIndex(indices)

    // Instance attributes
    const positions = new Float32Array(GRASS_COUNT * 3)
    const heights = new Float32Array(GRASS_COUNT)
    const widths = new Float32Array(GRASS_COUNT)
    const bendFactors = new Float32Array(GRASS_COUNT)
    const phases = new Float32Array(GRASS_COUNT)

    data.forEach((grass, i) => {
      // Taper grass height more gently toward the horizon to keep coverage
      const distance = (grass.position.z + (15 / 2)) / 15 // 0 near, 1 far
      const d = Math.min(1, Math.max(0, distance))
      const factor = 0.85 - 0.35 * d // near: ~0.85, far: ~0.5
      grass.height *= factor
      positions[i * 3] = grass.position.x
      positions[i * 3 + 1] = grass.position.y
      positions[i * 3 + 2] = grass.position.z
      heights[i] = grass.height
      widths[i] = grass.width
      bendFactors[i] = grass.bendFactor
      phases[i] = grass.phase
    })

    geometry.setAttribute('instancePosition', new InstancedBufferAttribute(positions, 3))
    geometry.setAttribute('instanceHeight', new InstancedBufferAttribute(heights, 1))
    geometry.setAttribute('instanceWidth', new InstancedBufferAttribute(widths, 1))
    geometry.setAttribute('instanceBendFactor', new InstancedBufferAttribute(bendFactors, 1))
    geometry.setAttribute('instancePhase', new InstancedBufferAttribute(phases, 1))

    // Custom shader material
    const material = new ShaderMaterial({
      vertexShader: grassVertexShader,
      fragmentShader: grassFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uWindStrength: { value: 0 },
        uWindDirection: { value: new Vector3(1, 0, 0) },
        uWindTurbulence: { value: 1 },
        uBaseColor: { value: new Vector3(0.2, 0.7, 0.15) },
        uTipColor: { value: new Vector3(0.4, 0.9, 0.3) }
      },
      transparent: true,
      depthWrite: false,
      depthTest: false,
      side: 2
    })
    
    return { geometry, material }
  }, [])

  // Store material ref for uniform updates
  useEffect(() => {
    if (material instanceof ShaderMaterial) {
      shaderMaterialRef.current = material
    }
  }, [material])

  // Animate grass with wind using shader uniforms
  useFrame((state) => {
    const windState = updateWind()
    
    if (shaderMaterialRef.current) {
      // Update shader uniforms
      shaderMaterialRef.current.uniforms.uTime.value = state.clock.elapsedTime
      shaderMaterialRef.current.uniforms.uWindStrength.value = windState.strength * 2.0
      shaderMaterialRef.current.uniforms.uWindDirection.value.set(
        windState.direction.x,
        windState.direction.y,
        windState.direction.z
      )
      shaderMaterialRef.current.uniforms.uWindTurbulence.value = windState.turbulence
    }
  })

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, material, GRASS_COUNT]}
      position={[0, -8, 5]} // Match much lower terrain position
      frustumCulled={false}
      renderOrder={10}
    />
  )
}
