import { SkyCanvas } from './SkyCanvas'
import { CssGrassLayer } from './CssGrassLayer'

export const RollingHillsBackground = () => {
  return (
    <div 
      className="rolling-hills-background"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: -40, // extend 40px below fold to host organic bottom edge
        zIndex: 2, // Force above any other background layers
        pointerEvents: 'none'
      }}
    >
      {/* CSS-based tiling grass layer (above sky) */}
      <CssGrassLayer />
      {/* Opaque blue sky full-canvas (below grass) */}
      <SkyCanvas />
      {/* White padding beneath the front-most row to create organic edge into page background */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: 40,
          background: 'white',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />
    </div>
  )
}
