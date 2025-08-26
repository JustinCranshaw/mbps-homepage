import { useEffect, useMemo, useRef } from 'react'
import { NEAR_ROW_BASE_SIZES, NEAR_ROW_BASE_POSITIONS } from '../../lib/GrassConfig'
import grass1 from '../../assets/textures/lush-grass-1.png'
import grass2 from '../../assets/textures/lush-grass-2.png'
import grass3 from '../../assets/textures/lush-grass-3.png'
import grass4 from '../../assets/textures/lush-grass-4.png'
import grass5 from '../../assets/textures/lush-grass-5.png'

export const CssGrassLayer = () => {
  const ref0 = useRef<HTMLDivElement>(null)
  const ref1 = useRef<HTMLDivElement>(null)
  const ref2 = useRef<HTMLDivElement>(null)
  const ref3 = useRef<HTMLDivElement>(null)
  const ref4 = useRef<HTMLDivElement>(null)

  // Create stable, slightly randomized background sizes per texture to reduce banding
  const sizeStrings = useMemo(() => {
    const jitter = (sizes: number[], pct = 0.1) =>
      sizes.map(px => Math.round(px * (1 + (Math.random() * 2 * pct - pct))))
    const toString = (sizes: number[]) => sizes.map(px => `${px}px auto`).join(', ')
    const layer0 = jitter(NEAR_ROW_BASE_SIZES.map(px => Math.round(px * 1.18))) // row 0 bigger
    const layer1 = jitter(NEAR_ROW_BASE_SIZES)
    const layer2 = jitter([286, 330, 242, 396, 308])
    const layer3 = jitter([220, 242, 198, 286, 264])
    const layer4 = jitter([190, 210, 170, 240, 200])
    return {
      l0: toString(layer0),
      l1: toString(layer1),
      l2: toString(layer2),
      l3: toString(layer3),
      l4: toString(layer4)
    }
  }, [])

  // Small static skews to visually desynchronize straight rows
  const skews = useMemo(() => [-0.6, 0.5, -0.3, 0.2], [])

  useEffect(() => {
    const layers = [
      { el: ref0.current, speeds: [0.035, 0.04, 0.03, 0.045, 0.032], baseX: ['-5%', '8%', '26%', '54%', '78%'] },
      { el: ref1.current, speeds: [0.02, 0.03, 0.015, 0.04, 0.025], baseX: ['0%', '10%', '30%', '60%', '80%'] },
      { el: ref2.current, speeds: [0.025, 0.035, 0.02, 0.045, 0.03], baseX: ['15%', '35%', '55%', '75%', '90%'] },
      { el: ref3.current, speeds: [0.012, 0.018, 0.01, 0.02, 0.015], baseX: ['-10%', '5%', '20%', '40%', '65%'] },
      { el: ref4.current, speeds: [0.01, 0.012, 0.008, 0.014, 0.01], baseX: ['-20%', '0%', '20%', '40%', '60%'] }
    ] as Array<{ el: HTMLDivElement | null; speeds: number[]; baseX: string[] }>

    // Static per-texture vertical offsets to help reduce banding (no time-based animation)
    const baseYOffsetPx: number[][] = layers.map(l =>
      l.speeds.map((_, i) => {
        const base = i % 2 === 0 ? -10 : 8
        const jitter = Math.round((Math.random() - 0.5) * 14) // ~±7px extra jitter
        return base + jitter
      })
    )

    const rowParallax = [0.04, 0.028, 0.018, 0.01, 0.006] // row0, near, mid, far, farthest
    const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v))
    const updatePositions = () => {
      const y = window.scrollY || 0
      layers.forEach((layer, layerIndex) => {
        if (!layer.el) return
        const pos = layer.speeds
          .map((s, i) => {
            const yPx = clamp(-(y * s) + baseYOffsetPx[layerIndex][i], -40, 40)
            return `${layer.baseX[i]} calc(100% + ${yPx.toFixed(1)}px)`
          })
          .join(', ')
        layer.el.style.backgroundPosition = pos
        // per-row parallax via CSS variable consumed in transform
        layer.el.style.setProperty('--py', `${(y * rowParallax[layerIndex]).toFixed(1)}px`)
      })
    }

    updatePositions()
    window.addEventListener('scroll', updatePositions)
    return () => window.removeEventListener('scroll', updatePositions)
  }, [])

  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: '38%',
        zIndex: 5,
        pointerEvents: 'none',
        overflow: 'hidden',
        // Transparent underpaint to avoid color cast under the mask
        backgroundColor: 'transparent',
        WebkitMaskImage:
          'linear-gradient(to top, rgba(0,0,0,1) 84%, rgba(0,0,0,0) 100%)',
        maskImage:
          'linear-gradient(to top, rgba(0,0,0,1) 84%, rgba(0,0,0,0) 100%)'
      }}
    >
      {/* Row 0 - front-most, slightly larger, excludes grass5 */}
      <div
        ref={ref0}
        style={{
          position: 'absolute', inset: 0,
          zIndex: 4,
          backgroundImage: `url(${grass1}), url(${grass2}), url(${grass3}), url(${grass4})`,
          backgroundRepeat: 'repeat-x, repeat-x, repeat-x, repeat-x',
          backgroundSize: sizeStrings.l0,
          backgroundPosition: NEAR_ROW_BASE_POSITIONS.join(', '),
          transform: `skewX(${skews[0]}deg) translateY(var(--py, 0px)) scaleY(1.02)`,
          filter: 'none',
          opacity: 1
        }}
      />
      {/* Base layer */}
      <div
        ref={ref1}
        style={{
          position: 'absolute', inset: 0,
          zIndex: 3,
          backgroundImage: `url(${grass1}), url(${grass2}), url(${grass3}), url(${grass4}), url(${grass5})`,
          backgroundRepeat: 'repeat-x, repeat-x, repeat-x, repeat-x, repeat-x',
          backgroundSize: sizeStrings.l1,
          backgroundPosition: NEAR_ROW_BASE_POSITIONS.join(', '),
          transform: `skewX(${skews[0]}deg) translateY(var(--py, 0px)) scaleY(1)`,
          filter: 'none',
          opacity: 1
        }}
      />
      {/* Offset layer to fill gaps */}
      <div
        ref={ref2}
        style={{
          position: 'absolute', inset: 0,
          zIndex: 2,
          backgroundImage: `url(${grass2}), url(${grass3}), url(${grass4}), url(${grass1}), url(${grass5})`,
          backgroundRepeat: 'repeat-x, repeat-x, repeat-x, repeat-x, repeat-x',
          backgroundSize: sizeStrings.l2,
          backgroundPosition: '15% 100%, 35% 100%, 55% 100%, 75% 100%, 90% 100%',
          opacity: 1,
          transform: `skewX(${skews[1]}deg) translateY(var(--py, 0px)) scaleY(0.98)`,
          filter: 'none'
        }}
      />
      {/* Fine grain layer for density */}
      <div
        ref={ref3}
        style={{
          position: 'absolute', inset: 0,
          zIndex: 1,
          backgroundImage: `url(${grass3}), url(${grass1}), url(${grass2}), url(${grass4}), url(${grass5})`,
          backgroundRepeat: 'repeat-x, repeat-x, repeat-x, repeat-x, repeat-x',
          backgroundSize: sizeStrings.l3,
          backgroundPosition: '-10% 100%, 5% 100%, 20% 100%, 40% 100%, 65% 100%',
          opacity: 1,
          transform: `skewX(${skews[2]}deg) translateY(var(--py, 0px)) scaleY(0.96)`,
          filter: 'none'
        }}
      />
      {/* Farthest background layer */}
      <div
        ref={ref4}
        style={{
          position: 'absolute', inset: 0,
          zIndex: 0,
          backgroundImage: `url(${grass4}), url(${grass5}), url(${grass2}), url(${grass1}), url(${grass3})`,
          backgroundRepeat: 'repeat-x, repeat-x, repeat-x, repeat-x, repeat-x',
          backgroundSize: sizeStrings.l4,
          backgroundPosition: '0% 100%, 20% 100%, 40% 100%, 60% 100%, 80% 100%',
          opacity: 1,
          transform: `skewX(${skews[3]}deg) translateY(var(--py, 0px)) scaleY(0.94)`,
          filter: 'none'
        }}
      />
      {/* Bottom shading to anchor */}
      <div
        style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 40, boxShadow: 'inset 0 -30px 40px rgba(0,0,0,0.12)' }}
      />
    </div>
  )
}


