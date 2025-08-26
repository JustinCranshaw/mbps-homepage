import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
// import { TerrainMesh } from './TerrainMesh'
// import { AnimatedGrass } from './AnimatedGrass'
import { BillboardGrass } from './BillboardGrass'
import { TestBlade } from './TestBlade'
// Import sprite URLs so TextureLoader resolves the files correctly via Vite
import grass1 from '../../assets/textures/lush-grass-1.png'
import grass2 from '../../assets/textures/lush-grass-2.png'
import grass3 from '../../assets/textures/lush-grass-3.png'
import grass4 from '../../assets/textures/lush-grass-4.png'

export const GroundCanvas = () => {
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: '46%', // slightly taller so the top edge feels organic
        zIndex: 5,
        pointerEvents: 'none'
      }}
    >
      <Canvas
        gl={{ alpha: true, antialias: true, depth: true }}
        camera={{ position: [0, 1.2, 8], fov: 50, near: 0.1, far: 100 }}
        onCreated={({ camera }) => {
          camera.lookAt(0, -7.5, 5)
        }}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.7} color="#ffffff" />
          <directionalLight position={[15, 25, 10]} intensity={1.5} color="#ffffff" />
          {/* Terrain silhouette back in to give an organic top edge */}
          {/* Re-enable if we want a gentle hill line under sprites */}
          {/* <TerrainMesh /> */}
          <BillboardGrass 
            textures={[grass1, grass2, grass3, grass4]}
            count={16000}
            area={{ width: 80, height: 26 }}
            baseY={-8}
            zOffset={6}
          />
          {/* Debug: bright magenta test blade to verify layering */}
          <TestBlade />
        </Suspense>
      </Canvas>
    </div>
  )
}


