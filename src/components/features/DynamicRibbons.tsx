import { useRef, useEffect } from 'react'
import { useWindPhysics, calculateWindForce, createIndividualWindState, updateIndividualWindState, type RibbonWindState } from '../../lib/WindPhysics'

interface RibbonData {
  id: string
  color: string
  strokeWidth: number
  opacity: number
  length: number // Individual ribbon length
  weight: number // How much the ribbon is affected by wind (lighter = more movement)
  flexibility: number // How much the ribbon bends and flows
}

interface Sprite {
  id: string
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  opacity: number
  glowSize: number
  phase: number // For oscillation
  speed: number
  heading: number
  turnSpeed: number
  bezier?: {
    p0: { x: number, y: number }
    p1: { x: number, y: number }
    p2: { x: number, y: number }
    p3: { x: number, y: number }
    startTime: number
    durationMs: number
  }
  cooldownUntil?: number
}

const ribbons: RibbonData[] = [
  { id: 'green', color: '#7FFF7F', strokeWidth: 4.25, opacity: 0.85, length: 210, weight: 0.8, flexibility: 1.2 },
  { id: 'teal', color: '#40E0D0', strokeWidth: 3.75, opacity: 0.8, length: 235, weight: 0.6, flexibility: 1.4 },
  { id: 'gold', color: '#FFE55C', strokeWidth: 3.25, opacity: 0.8, length: 190, weight: 0.4, flexibility: 1.6 },
  { id: 'coral', color: '#FF7F7F', strokeWidth: 4.25, opacity: 0.85, length: 255, weight: 1.0, flexibility: 1.0 },
  { id: 'lavender', color: '#DDA0DD', strokeWidth: 3.25, opacity: 0.8, length: 220, weight: 0.5, flexibility: 1.5 },
  { id: 'mint', color: '#98FB98', strokeWidth: 3.75, opacity: 0.8, length: 200, weight: 0.7, flexibility: 1.3 }
]

// Create initial sprites with gentle, magical colors
const createSprites = (canvasWidth: number, canvasHeight: number): Sprite[] => {
  const spriteColors = [
    '#FFE55C', // Soft gold
    '#7FFF7F', // Soft green
    '#DDA0DD', // Lavender
    '#40E0D0', // Teal
    '#FF7F7F', // Coral
    '#98FB98', // Mint
    '#F0E68C', // Khaki
    '#DEB887'  // Burlywood
  ]
  
  return Array.from({ length: 5 }, (_, i) => ({
    id: `sprite-${i}`,
    x: Math.random() * canvasWidth,
    y: Math.random() * canvasHeight,
    vx: (Math.random() - 0.5) * 0.5, // Very slow movement
    vy: (Math.random() - 0.5) * 0.5,
    size: 2 + Math.random() * 3, // 2-5px
    color: spriteColors[i % spriteColors.length],
    opacity: 0.55 + Math.random() * 0.35, // 0.55-0.9 (slightly brighter)
    glowSize: 8 + Math.random() * 12, // 8-20px glow
    phase: Math.random() * Math.PI * 2, // Random starting phase
    speed: 0.3 + Math.random() * 0.4, // 0.3-0.7 speed multiplier
    heading: Math.random() * Math.PI * 2,
    turnSpeed: 0.003 + Math.random() * 0.004,
    cooldownUntil: 0
  }))
}

export const DynamicRibbons = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  
  // Individual physics state for each ribbon
  const ribbonSegments = useRef<Array<Array<{
    x: number
    y: number
    oldX: number
    oldY: number
    pinned: boolean
  }>>>([])

  // Individual wind state for each ribbon
  const ribbonWind = useRef<Array<RibbonWindState>>([])

  // Sprites state
  const sprites = useRef<Sprite[]>([])

  // Use shared wind physics
  const { updateWind } = useWindPhysics()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // Mouse tracking for subtle interactions
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    
    // Function to get the anchor position relative to canvas
    const getAnchorPosition = () => {
      const contentEl = document.querySelector('.text-backdrop')
      const canvasRect = canvas.getBoundingClientRect()
      
      if (contentEl) {
        const contentRect = contentEl.getBoundingClientRect()
        
        // Calculate anchor position relative to canvas (moved 25px left)
        const anchorX = contentRect.right - canvasRect.left - 25
        const anchorY = contentRect.top - canvasRect.top
        
        return { x: anchorX, y: anchorY }
      }
      
      // Fallback position
      return { x: canvasRect.width * 0.8, y: canvasRect.height * 0.2 }
    }
    
    // Set canvas size to match container exactly
    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
    }
    
    updateCanvasSize()
    
    // Initialize sprites
    if (sprites.current.length === 0) {
      sprites.current = createSprites(canvas.width, canvas.height)
    }
    
    // Handle window resize
    const resizeObserver = new ResizeObserver(() => {
      updateCanvasSize()
      // Reinitialize sprites with new canvas dimensions
      sprites.current = createSprites(canvas.width, canvas.height)
    })
    resizeObserver.observe(canvas)
    
    // Initialize segments for each ribbon individually
    if (ribbonSegments.current.length === 0) {
      const anchor = getAnchorPosition()
      
      ribbons.forEach((ribbon, ribbonIndex) => {
        const segmentCount = Math.floor(ribbon.length / 12) // Varying segment counts
        const segmentLength = 12
        
        // Initialize segments for this ribbon
        const segments = Array.from({ length: segmentCount }, (_, i) => ({
          x: anchor.x + (ribbonIndex - 2.5) * 1.5, // Slight initial spread
          y: anchor.y + i * segmentLength,
          oldX: anchor.x + (ribbonIndex - 2.5) * 1.5,
          oldY: anchor.y + i * segmentLength,
          pinned: i === 0 // Only first segment is pinned
        }))
        
        ribbonSegments.current.push(segments)
        
        // Initialize wind state for this ribbon using shared system
        ribbonWind.current.push(createIndividualWindState())
      })
    }
    
    // Animation loop
    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Get current anchor position and update global wind
      const anchor = getAnchorPosition()
      const globalWindState = updateWind()
      const currentTime = Date.now()
      
      // Update each ribbon independently
      ribbons.forEach((ribbon, ribbonIndex) => {
        const segments = ribbonSegments.current[ribbonIndex]
        const wind = ribbonWind.current[ribbonIndex]
        
        if (!segments || !wind) return
        
        // Update anchor position for pinned segment
        if (segments[0]) {
          segments[0].x = anchor.x + (ribbonIndex - 2.5) * 1.5
          segments[0].y = anchor.y
        }
        
        // Update individual ribbon wind state using shared system
        updateIndividualWindState(wind)
        
        // Calculate mouse influence (very subtle)
        const mouseDistance = Math.sqrt(
          Math.pow(mouseRef.current.x - anchor.x, 2) + 
          Math.pow(mouseRef.current.y - anchor.y, 2)
        )
        const mouseInfluence = Math.max(0, 1 - mouseDistance / 200) * 0.3
        
        // Update physics for this ribbon (Verlet integration)
        segments.forEach((segment, i) => {
          if (segment.pinned) return
          
          const velX = segment.x - segment.oldX
          const velY = segment.y - segment.oldY
          
          segment.oldX = segment.x
          segment.oldY = segment.y
          
          // Silk-like damping - less damping for more fluid movement
          const dampingFactor = 0.995 - (ribbon.flexibility * 0.002) // More flexible = less damping
          segment.x += velX * dampingFactor
          segment.y += velY * dampingFactor + 0.3 // Slightly less gravity for silk-like float
          
          // Segment factor for progressive effects down the ribbon
          const segmentFactor = Math.pow(i / segments.length, 0.8) // Slightly less exponential
          
          // Calculate wind force using shared physics
          const windForce = calculateWindForce(
            globalWindState,
            { x: segment.x, y: segment.y },
            ribbon.weight,
            ribbon.flexibility
          )
          
          // Apply wind force with segment progression
          segment.x += windForce.x * segmentFactor
          segment.y += windForce.y * segmentFactor
          
          // Very subtle undulation - only when wind is blowing
          if (globalWindState.strength > 0.01) {
            const t = currentTime * 0.001
            const subtleWaveX = Math.sin(t * 0.5 + i * 0.1 + ribbonIndex * 0.2) * ribbon.flexibility * 0.15 * segmentFactor
            const subtleWaveY = Math.cos(t * 0.3 + i * 0.08 + ribbonIndex * 0.15) * ribbon.flexibility * 0.05 * segmentFactor
            segment.x += subtleWaveX
            segment.y += subtleWaveY
          }
          
          // Mouse interaction - very subtle push away
          if (mouseInfluence > 0) {
            const dx = segment.x - mouseRef.current.x
            const dy = segment.y - mouseRef.current.y
            const distance = Math.sqrt(dx * dx + dy * dy) || 1
            segment.x += (dx / distance) * mouseInfluence * segmentFactor
            segment.y += (dy / distance) * mouseInfluence * segmentFactor * 0.5
          }
        })
        
        // Satisfy constraints (keep segments connected) - more flexible for silk-like behavior
        const constraintIterations = 2 // Fewer iterations for more flexibility
        for (let iter = 0; iter < constraintIterations; iter++) {
          for (let i = 1; i < segments.length; i++) {
            const seg1 = segments[i - 1]
            const seg2 = segments[i]
            
            const dx = seg2.x - seg1.x
            const dy = seg2.y - seg1.y
            const distance = Math.sqrt(dx * dx + dy * dy)
            const targetDistance = 12 // segmentLength
            
            if (distance > 0) {
              const difference = targetDistance - distance
              // Softer constraint enforcement for silk-like flexibility
              const constraintStrength = 0.3 + (ribbon.flexibility * 0.1) // More flexible = softer constraints
              const percent = (difference / distance) * constraintStrength
              const offsetX = dx * percent
              const offsetY = dy * percent
              
              if (!seg1.pinned) {
                seg1.x -= offsetX
                seg1.y -= offsetY
              }
              if (!seg2.pinned) {
                seg2.x += offsetX
                seg2.y += offsetY
              }
            }
          }
        }
        
        // Draw this ribbon with smooth curves for silk-like appearance
        ctx.strokeStyle = ribbon.color
        ctx.globalAlpha = ribbon.opacity
        ctx.lineWidth = ribbon.strokeWidth
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
        
        // Create smooth curved path instead of straight lines
        const points = segments.map((segment, i) => {
          // Small natural variations at the start point
          const startVariationX = i === 0 ? (ribbonIndex - 2.5) * 2 : 0
          const startVariationY = i === 0 ? (ribbonIndex - 2.5) * 0.5 : 0
          
          // Gradually spread out more as we go down the ribbon
          const spreadFactor = Math.pow(i / segments.length, 1.5) // Exponential spread
          const offsetX = startVariationX + (ribbonIndex - 2.5) * 8 * spreadFactor
          
          // Subtle visual curve - only when wind is active
          let waveOffset = 0
          if (globalWindState.strength > 0.01) {
            const t = currentTime * 0.001
            const segmentRatio = i / segments.length
            
            // Single, gentle curve along the ribbon
            waveOffset = Math.sin(segmentRatio * Math.PI * 1.2 + t * 0.4 + ribbonIndex * 0.3) * ribbon.flexibility * 1.5 * segmentRatio
          }
          
          return {
            x: segment.x + offsetX + waveOffset,
            y: segment.y + startVariationY
          }
        })
        
        // Draw smooth curve through points using quadratic curves
        ctx.beginPath()
        if (points.length > 0) {
          ctx.moveTo(points[0].x, points[0].y)
          
          for (let i = 1; i < points.length; i++) {
            if (i === points.length - 1) {
              // Last point - draw line to end
              ctx.lineTo(points[i].x, points[i].y)
            } else {
              // Create smooth curve using quadratic Bezier
              const currentPoint = points[i]
              const nextPoint = points[i + 1]
              const controlX = currentPoint.x
              const controlY = currentPoint.y
              const endX = (currentPoint.x + nextPoint.x) / 2
              const endY = (currentPoint.y + nextPoint.y) / 2
              
              ctx.quadraticCurveTo(controlX, controlY, endX, endY)
            }
          }
        }
        ctx.stroke()
      })
      
      // Update and render sprites
      sprites.current.forEach((sprite) => {
        // Update sprite position with meandering motion or Bezier animation
        const t = currentTime * 0.001
        const now = currentTime

        if (sprite.bezier) {
          // Ease-in-out cubic for smooth acceleration
          const elapsed = now - sprite.bezier.startTime
          const raw = Math.max(0, Math.min(1, elapsed / sprite.bezier.durationMs))
          const eased = raw < 0.5
            ? 4 * raw * raw * raw
            : 1 - Math.pow(-2 * raw + 2, 3) / 2
          const { p0, p1, p2, p3 } = sprite.bezier
          // Cubic Bezier evaluation
          const u = 1 - eased
          const bx = u*u*u*p0.x + 3*u*u*eased*p1.x + 3*u*eased*eased*p2.x + eased*eased*eased*p3.x
          const by = u*u*u*p0.y + 3*u*u*eased*p1.y + 3*u*eased*eased*p2.y + eased*eased*eased*p3.y
          sprite.x = bx
          sprite.y = by
          if (raw >= 1) {
            // End of animation, continue meandering from new spot
            sprite.bezier = undefined
            const angle = Math.atan2(p3.y - p2.y, p3.x - p2.x)
            sprite.heading = angle
            sprite.vx *= 0.2
            sprite.vy *= 0.2
          }
        } else {
          // Meandering: slowly change heading with jitter and drift
          const jitter = (Math.random() - 0.5) * sprite.turnSpeed
          const drift = Math.sin(t + sprite.phase) * sprite.turnSpeed * 0.5
          sprite.heading += jitter + drift
          
          // Desired velocity based on heading
          const baseSpeed = 0.25 * sprite.speed
          const desiredVx = Math.cos(sprite.heading) * baseSpeed
          const desiredVy = Math.sin(sprite.heading) * baseSpeed
          
          // Smoothly steer towards desired velocity
          sprite.vx = sprite.vx * 0.96 + desiredVx * 0.04
          sprite.vy = sprite.vy * 0.96 + desiredVy * 0.04
          
          // Gentle oscillation layered on movement
          const oscillationX = Math.sin(t * 0.8 + sprite.phase) * 0.2
          const oscillationY = Math.cos(t * 0.6 + sprite.phase * 1.2) * 0.15
          
          // Apply movement
          sprite.x += sprite.vx + oscillationX
          sprite.y += sprite.vy + oscillationY
        }

        // Mouse interaction: if cursor touches sprite, trigger Bezier zoom to random spot
        const dxMouse = sprite.x - mouseRef.current.x
        const dyMouse = sprite.y - mouseRef.current.y
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse)
        const triggerRadius = Math.max(16, sprite.glowSize * 0.6)
        if (!sprite.bezier && now >= (sprite.cooldownUntil || 0) && distMouse <= triggerRadius) {
          const canvasRect = canvas.getBoundingClientRect()
          const contentEl = document.querySelector('.text-backdrop')
          let hero: { left: number, top: number, right: number, bottom: number } | null = null
          if (contentEl) {
            const contentRect = contentEl.getBoundingClientRect()
            hero = {
              left: contentRect.left - canvasRect.left,
              top: contentRect.top - canvasRect.top,
              right: contentRect.right - canvasRect.left,
              bottom: contentRect.bottom - canvasRect.top
            }
          }
          // Pick a random target not inside hero rect
          const pad = sprite.glowSize
          let targetX = sprite.x
          let targetY = sprite.y
          for (let tries = 0; tries < 12; tries++) {
            targetX = Math.random() * canvas.width
            targetY = Math.random() * canvas.height
            if (!hero) break
            const inside = targetX > hero.left - pad && targetX < hero.right + pad && targetY > hero.top - pad && targetY < hero.bottom + pad
            if (!inside) break
          }
          // Build Bezier control points to make a nice arc
          const dir = Math.atan2(targetY - sprite.y, targetX - sprite.x)
          const dist = Math.hypot(targetX - sprite.x, targetY - sprite.y)
          const perp = dir + (Math.random() < 0.5 ? 1 : -1) * Math.PI / 2
          const offset = Math.min(120, Math.max(40, dist * 0.2))
          const p0 = { x: sprite.x, y: sprite.y }
          const p3 = { x: targetX, y: targetY }
          const p1 = {
            x: p0.x + Math.cos(dir) * dist * 0.25 + Math.cos(perp) * offset,
            y: p0.y + Math.sin(dir) * dist * 0.25 + Math.sin(perp) * offset
          }
          const p2 = {
            x: p0.x + Math.cos(dir) * dist * 0.75 - Math.cos(perp) * offset,
            y: p0.y + Math.sin(dir) * dist * 0.75 - Math.sin(perp) * offset
          }
          const duration = 600 + Math.random() * 500
          sprite.bezier = { p0, p1, p2, p3, startTime: now, durationMs: duration }
          sprite.cooldownUntil = now + duration + 250
        }
        
        // Avoid hero card region (never render over it)
        let shouldRender = true
        const contentEl = document.querySelector('.text-backdrop')
        if (contentEl) {
          const canvasRect = canvas.getBoundingClientRect()
          const contentRect = contentEl.getBoundingClientRect()
          const left = contentRect.left - canvasRect.left
          const top = contentRect.top - canvasRect.top
          const right = contentRect.right - canvasRect.left
          const bottom = contentRect.bottom - canvasRect.top
          const pad = sprite.glowSize
          const inside = sprite.x > left - pad && sprite.x < right + pad && sprite.y > top - pad && sprite.y < bottom + pad
          if (inside) {
            // Push sprite to nearest edge and steer away
            const centerX = (left + right) / 2
            const centerY = (top + bottom) / 2
            const dx = sprite.x - centerX
            const dy = sprite.y - centerY
            sprite.heading = Math.atan2(dy, dx)
            // Snap to just outside the nearest edge
            const distLeft = Math.abs(sprite.x - left)
            const distRight = Math.abs(right - sprite.x)
            const distTop = Math.abs(sprite.y - top)
            const distBottom = Math.abs(bottom - sprite.y)
            const minDist = Math.min(distLeft, distRight, distTop, distBottom)
            if (minDist === distLeft) sprite.x = left - pad
            else if (minDist === distRight) sprite.x = right + pad
            else if (minDist === distTop) sprite.y = top - pad
            else sprite.y = bottom + pad
            shouldRender = false
          }
        }
        
        // Wrap around screen edges with some padding
        const padding = sprite.glowSize
        if (sprite.x < -padding) {
          sprite.x = canvas.width + padding
        } else if (sprite.x > canvas.width + padding) {
          sprite.x = -padding
        }
        if (sprite.y < -padding) {
          sprite.y = canvas.height + padding
        } else if (sprite.y > canvas.height + padding) {
          sprite.y = -padding
        }
        
        if (!shouldRender) return
        
        // Render sprite with glow effect
        ctx.save()
        
        // Create radial gradient for glow
        const gradient = ctx.createRadialGradient(
          sprite.x, sprite.y, 0,
          sprite.x, sprite.y, sprite.glowSize
        )
        
        // Pulsing opacity for magical effect
        const pulseOpacity = sprite.opacity * (0.7 + 0.3 * Math.sin(t * 2 + sprite.phase))
        
        gradient.addColorStop(0, sprite.color + Math.floor(pulseOpacity * 255).toString(16).padStart(2, '0'))
        gradient.addColorStop(0.3, sprite.color + Math.floor(pulseOpacity * 0.6 * 255).toString(16).padStart(2, '0'))
        gradient.addColorStop(1, sprite.color + '00') // Transparent at edges
        
        // Draw glow
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(sprite.x, sprite.y, sprite.glowSize, 0, Math.PI * 2)
        ctx.fill()
        
        // Draw core sprite
        ctx.fillStyle = sprite.color
        ctx.globalAlpha = pulseOpacity
        ctx.beginPath()
        ctx.arc(sprite.x, sprite.y, sprite.size, 0, Math.PI * 2)
        ctx.fill()
        
        ctx.restore()
      })
      
      animationRef.current = requestAnimationFrame(animate)
    }
    
    animate()
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener('mousemove', handleMouseMove)
      resizeObserver.disconnect()
    }
  }, [])
  
  return (
    <div className="dynamic-ribbons" style={{ 
      position: 'absolute', 
      top: 0, 
      left: 0, 
      right: 0, 
      bottom: 0, 
      zIndex: 20,
      pointerEvents: 'none'
    }}>
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none'
        }}
      />
    </div>
  )
}