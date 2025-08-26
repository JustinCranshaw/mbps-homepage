/**
 * Terrain generation using Perlin noise for creating natural rolling hills
 */

// Simple Perlin noise implementation
class PerlinNoise {
  private gradients: number[][]
  private permutation: number[]

  constructor(seed: number = 12345) {
    this.gradients = []
    this.permutation = []
    this.init(seed)
  }

  private init(seed: number) {
    // Create gradients
    for (let i = 0; i < 256; i++) {
      const theta = Math.random() * 2 * Math.PI
      this.gradients[i] = [Math.cos(theta), Math.sin(theta)]
    }

    // Create permutation table
    for (let i = 0; i < 256; i++) {
      this.permutation[i] = i
    }

    // Shuffle permutation table with seed
    let rng = seed
    for (let i = 255; i > 0; i--) {
      rng = (rng * 9301 + 49297) % 233280
      const j = Math.floor((rng / 233280) * (i + 1))
      ;[this.permutation[i], this.permutation[j]] = [this.permutation[j], this.permutation[i]]
    }
  }

  private fade(t: number): number {
    return t * t * t * (t * (t * 6 - 15) + 10)
  }

  private lerp(a: number, b: number, t: number): number {
    return a + t * (b - a)
  }

  private dot(grad: number[], x: number, y: number): number {
    return grad[0] * x + grad[1] * y
  }

  public noise(x: number, y: number): number {
    const xi = Math.floor(x) & 255
    const yi = Math.floor(y) & 255
    const xf = x - Math.floor(x)
    const yf = y - Math.floor(y)

    const u = this.fade(xf)
    const v = this.fade(yf)

    const aa = this.permutation[(xi + this.permutation[yi]) & 255]
    const ab = this.permutation[(xi + this.permutation[(yi + 1) & 255]) & 255]
    const ba = this.permutation[(xi + 1 + this.permutation[yi]) & 255]
    const bb = this.permutation[(xi + 1 + this.permutation[(yi + 1) & 255]) & 255]

    const gradAA = this.gradients[aa]
    const gradAB = this.gradients[ab]
    const gradBA = this.gradients[ba]
    const gradBB = this.gradients[bb]

    const x1 = this.lerp(
      this.dot(gradAA, xf, yf),
      this.dot(gradBA, xf - 1, yf),
      u
    )
    const x2 = this.lerp(
      this.dot(gradAB, xf, yf - 1),
      this.dot(gradBB, xf - 1, yf - 1),
      u
    )

    return this.lerp(x1, x2, v)
  }

  public octaveNoise(x: number, y: number, octaves: number, persistence: number, scale: number): number {
    let value = 0
    let amplitude = 1
    let frequency = scale

    for (let i = 0; i < octaves; i++) {
      value += this.noise(x * frequency, y * frequency) * amplitude
      amplitude *= persistence
      frequency *= 2
    }

    return value
  }
}

export interface TerrainConfig {
  width: number
  height: number
  segments: number
  heightScale: number
  noiseScale: number
  octaves: number
  persistence: number
  seed: number
}

export const defaultTerrainConfig: TerrainConfig = {
  width: 20,
  height: 12,
  segments: 64,
  heightScale: 2.5,
  noiseScale: 0.1,
  octaves: 4,
  persistence: 0.5,
  seed: 12345
}

export class TerrainGenerator {
  private noise: PerlinNoise
  private config: TerrainConfig

  constructor(config: Partial<TerrainConfig> = {}) {
    this.config = { ...defaultTerrainConfig, ...config }
    this.noise = new PerlinNoise(this.config.seed)
  }

  public generateHeightMap(): Float32Array {
    const { segments, heightScale, noiseScale, octaves, persistence } = this.config
    const heightMap = new Float32Array((segments + 1) * (segments + 1))

    for (let i = 0; i <= segments; i++) {
      for (let j = 0; j <= segments; j++) {
        const x = (i / segments - 0.5) * 2 // -1 to 1
        const y = (j / segments - 0.5) * 2 // -1 to 1

        // Generate height using octave noise
        let height = this.noise.octaveNoise(x, y, octaves, persistence, noiseScale)
        
        // Apply height scaling
        height *= heightScale

        // Create rolling hills effect - emphasize positive heights
        height = Math.max(0, height * 0.8 + 0.2)

        // Smooth edges to avoid sharp cutoffs
        const edgeFactor = this.calculateEdgeFactor(x, y)
        height *= edgeFactor

        heightMap[i * (segments + 1) + j] = height
      }
    }

    return heightMap
  }

  private calculateEdgeFactor(x: number, y: number): number {
    // Create smooth falloff towards edges
    const distanceFromCenter = Math.sqrt(x * x + y * y)
    const maxDistance = Math.sqrt(2) // Distance to corner
    const falloffStart = 0.7
    
    if (distanceFromCenter < falloffStart) {
      return 1.0
    }
    
    const falloffRange = maxDistance - falloffStart
    const falloffProgress = (distanceFromCenter - falloffStart) / falloffRange
    
    return Math.max(0, 1 - falloffProgress * falloffProgress)
  }

  public generatePositions(): Float32Array {
    const { width, height, segments } = this.config
    const heightMap = this.generateHeightMap()
    const positions = new Float32Array((segments + 1) * (segments + 1) * 3)

    for (let i = 0; i <= segments; i++) {
      for (let j = 0; j <= segments; j++) {
        const index = (i * (segments + 1) + j) * 3
        const heightIndex = i * (segments + 1) + j

        const x = (j / segments - 0.5) * width
        const z = (i / segments - 0.5) * height

        // Subtle curvature toward horizon: lower far z to suggest a curve
        const distanceToHorizon = (i / segments) // 0 near, 1 far
        const curvature = -Math.pow(distanceToHorizon, 2) * 0.6 // lowers far positions

        positions[index] = x
        positions[index + 1] = heightMap[heightIndex] + curvature
        positions[index + 2] = z
      }
    }

    return positions
  }

  public generateIndices(): Uint16Array {
    const { segments } = this.config
    const indices = new Uint16Array(segments * segments * 6)

    let index = 0
    for (let i = 0; i < segments; i++) {
      for (let j = 0; j < segments; j++) {
        const a = i * (segments + 1) + j
        const b = a + 1
        const c = a + (segments + 1)
        const d = c + 1

        // Two triangles per quad
        indices[index++] = a
        indices[index++] = b
        indices[index++] = c

        indices[index++] = b
        indices[index++] = d
        indices[index++] = c
      }
    }

    return indices
  }

  public generateNormals(positions: Float32Array, indices: Uint16Array): Float32Array {
    const normals = new Float32Array(positions.length)
    
    // Initialize normals to zero
    normals.fill(0)

    // Calculate face normals and accumulate
    for (let i = 0; i < indices.length; i += 3) {
      const i1 = indices[i] * 3
      const i2 = indices[i + 1] * 3
      const i3 = indices[i + 2] * 3

      // Get triangle vertices
      const v1 = [positions[i1], positions[i1 + 1], positions[i1 + 2]]
      const v2 = [positions[i2], positions[i2 + 1], positions[i2 + 2]]
      const v3 = [positions[i3], positions[i3 + 1], positions[i3 + 2]]

      // Calculate face normal
      const edge1 = [v2[0] - v1[0], v2[1] - v1[1], v2[2] - v1[2]]
      const edge2 = [v3[0] - v1[0], v3[1] - v1[1], v3[2] - v1[2]]
      
      const normal = [
        edge1[1] * edge2[2] - edge1[2] * edge2[1],
        edge1[2] * edge2[0] - edge1[0] * edge2[2],
        edge1[0] * edge2[1] - edge1[1] * edge2[0]
      ]

      // Accumulate normal for each vertex
      for (const idx of [i1, i2, i3]) {
        normals[idx] += normal[0]
        normals[idx + 1] += normal[1]
        normals[idx + 2] += normal[2]
      }
    }

    // Normalize
    for (let i = 0; i < normals.length; i += 3) {
      const length = Math.sqrt(
        normals[i] * normals[i] + 
        normals[i + 1] * normals[i + 1] + 
        normals[i + 2] * normals[i + 2]
      )
      
      if (length > 0) {
        normals[i] /= length
        normals[i + 1] /= length
        normals[i + 2] /= length
      }
    }

    return normals
  }

  public generateUVs(): Float32Array {
    const { segments } = this.config
    const uvs = new Float32Array((segments + 1) * (segments + 1) * 2)

    for (let i = 0; i <= segments; i++) {
      for (let j = 0; j <= segments; j++) {
        const index = (i * (segments + 1) + j) * 2
        uvs[index] = j / segments     // u
        uvs[index + 1] = i / segments // v
      }
    }

    return uvs
  }
}
