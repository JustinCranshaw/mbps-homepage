import { useRef, useCallback } from 'react'

export interface WindState {
  // Global wind properties
  strength: number
  targetStrength: number
  lastChange: number
  isBlowing: boolean
  
  // Wind direction (for 3D use)
  direction: {
    x: number
    y: number
    z: number
  }
  
  // Turbulence and variation
  turbulence: number
  timestamp: number
}

export interface RibbonWindState {
  phase: number
  amplitude: number
  frequency: number
  lastUpdate: number
}

export interface WindPhysicsConfig {
  // Timing controls
  windChangeInterval: { min: number; max: number } // milliseconds
  transitionSpeed: number
  
  // Strength controls
  strengthRange: { min: number; max: number }
  
  // Individual ribbon variation
  individualAmplitudeRange: { min: number; max: number }
  individualFrequencyRange: { min: number; max: number }
}

const defaultConfig: WindPhysicsConfig = {
  windChangeInterval: { min: 4000, max: 10000 },
  transitionSpeed: 0.02,
  strengthRange: { min: 0.03, max: 0.08 },
  individualAmplitudeRange: { min: 0.1, max: 0.25 },
  individualFrequencyRange: { min: 0.1, max: 0.3 }
}

class WindPhysicsManager {
  private windState: WindState
  private config: WindPhysicsConfig
  private listeners: Set<(windState: WindState) => void> = new Set()

  constructor(config: Partial<WindPhysicsConfig> = {}) {
    this.config = { ...defaultConfig, ...config }
    this.windState = {
      strength: 0,
      targetStrength: 0,
      lastChange: Date.now(),
      isBlowing: false,
      direction: { x: 1, y: 0, z: 0 }, // Default left-to-right
      turbulence: 0,
      timestamp: Date.now()
    }
  }

  public update(): WindState {
    const currentTime = Date.now()
    const windTimeDelta = currentTime - this.windState.lastChange

    // Change wind state periodically
    if (windTimeDelta > this.config.windChangeInterval.min + 
        Math.random() * (this.config.windChangeInterval.max - this.config.windChangeInterval.min)) {
      this.windState.isBlowing = !this.windState.isBlowing
      this.windState.targetStrength = this.windState.isBlowing
        ? this.config.strengthRange.min + Math.random() * 
          (this.config.strengthRange.max - this.config.strengthRange.min)
        : 0
      this.windState.lastChange = currentTime
    }

    // Smoothly transition wind strength
    this.windState.strength += (this.windState.targetStrength - this.windState.strength) * this.config.transitionSpeed

    // Update turbulence for natural variation
    this.windState.turbulence = Math.sin(currentTime * 0.001) * 0.3 + 0.7 // 0.4 to 1.0

    // Update timestamp
    this.windState.timestamp = currentTime

    // Notify listeners
    this.listeners.forEach(listener => listener(this.windState))

    return { ...this.windState }
  }

  public subscribe(listener: (windState: WindState) => void): () => void {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  public getWindState(): WindState {
    return { ...this.windState }
  }

  public setWindDirection(x: number, y: number, z: number = 0): void {
    this.windState.direction = { x, y, z }
  }
}

// Singleton instance for global wind state
export const globalWindManager = new WindPhysicsManager()

// React hook for using wind physics
export const useWindPhysics = () => {
  const windStateRef = useRef<WindState>(globalWindManager.getWindState())

  const updateWind = useCallback(() => {
    windStateRef.current = globalWindManager.update()
    return windStateRef.current
  }, [])

  const subscribeToWind = useCallback((callback: (windState: WindState) => void) => {
    return globalWindManager.subscribe(callback)
  }, [])

  return {
    updateWind,
    subscribeToWind,
    getWindState: () => windStateRef.current
  }
}

// Utility functions for wind calculations
export const calculateWindForce = (
  windState: WindState,
  position: { x: number; y: number; z?: number },
  weight: number = 1.0,
  flexibility: number = 1.0
): { x: number; y: number; z: number } => {
  const { strength, direction, turbulence } = windState
  
  // Weight-based resistance (lighter objects move more)
  const weightFactor = (2.0 - weight)
  
  // Height-based wind variation (if z/y position provided)
  const heightFactor = (position.z || position.y) / 400
  const windVariation = Math.sin(heightFactor * Math.PI * 2 + windState.timestamp * 0.0008) * 0.3 + 0.7
  
  // Calculate final wind force
  const windForce = strength * weightFactor * windVariation * turbulence
  
  return {
    x: direction.x * windForce * flexibility,
    y: direction.y * windForce * flexibility * 0.3, // Reduced Y component
    z: direction.z * windForce * flexibility
  }
}

// Generate individual ribbon/grass wind state
export const createIndividualWindState = (config = defaultConfig): RibbonWindState => ({
  phase: Math.random() * Math.PI * 2,
  amplitude: config.individualAmplitudeRange.min + 
    Math.random() * (config.individualAmplitudeRange.max - config.individualAmplitudeRange.min),
  frequency: config.individualFrequencyRange.min + 
    Math.random() * (config.individualFrequencyRange.max - config.individualFrequencyRange.min),
  lastUpdate: Date.now()
})

// Update individual wind state with occasional variation
export const updateIndividualWindState = (
  windState: RibbonWindState,
  config = defaultConfig
): RibbonWindState => {
  const currentTime = Date.now()
  const timeDelta = (currentTime - windState.lastUpdate) * 0.001
  
  // Update phase
  windState.phase += windState.frequency * timeDelta
  windState.lastUpdate = currentTime
  
  // Occasionally add variation (0.1% chance per frame)
  if (Math.random() < 0.001) {
    windState.amplitude = config.individualAmplitudeRange.min + 
      Math.random() * (config.individualAmplitudeRange.max - config.individualAmplitudeRange.min)
    windState.frequency = config.individualFrequencyRange.min + 
      Math.random() * (config.individualFrequencyRange.max - config.individualFrequencyRange.min)
  }
  
  return windState
}
