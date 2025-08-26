import { Canvas, useThree } from '@react-three/fiber'
import { useEffect } from 'react'

export const SkyCanvas = () => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
        pointerEvents: 'none',
        // Golden hour gradient: deeper blue at top → warm near horizon
        backgroundImage:
          'linear-gradient(to bottom, #78b8f5 0%, #9fd0ff 55%, #ffd59e 82%, #ffe8c7 100%)'
      }}
    >
      <Canvas
        gl={{ alpha: true }}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      >
        <SkyGradient />
      </Canvas>
    </div>
  )
}

const SkyGradient = () => {
  const { gl } = useThree()

  useEffect(() => {
    try { gl.setClearColor(0x000000, 0) } catch {}
  }, [gl])
  return null
}


