import { useMemo, useRef } from 'react'
import { InstancedMesh, TextureLoader, MeshBasicMaterial, Matrix4, Vector3, Quaternion, SRGBColorSpace, DoubleSide } from 'three'
import { useFrame, useLoader } from '@react-three/fiber'

interface Props {
  textures: string[] // paths to grass sprite pngs
  count?: number
  area?: { width: number; height: number }
  baseY?: number
  zOffset?: number
  debug?: boolean
}

export const BillboardGrass = ({
  textures,
  count = 6000,
  area = { width: 25, height: 15 },
  baseY = -8,
  zOffset = 5
}: Props) => {
  const meshRef = useRef<InstancedMesh>(null)
  const mats = useLoader(TextureLoader, textures)

  const { positions, scales, rotations, material } = useMemo(() => {
    // Configure materials from textures
    const materials = mats.map((tex) => {
      tex.colorSpace = SRGBColorSpace
      tex.generateMipmaps = true
      tex.anisotropy = 4
      const m = new MeshBasicMaterial({
        map: tex,
        color: 0xffffff,
        transparent: true,
        alphaTest: 0.5,
        opacity: 1,
        depthWrite: false,
        depthTest: true,
        side: DoubleSide
      })
      return m
    })

    const positions: Vector3[] = []
    const scales: Vector3[] = []
    const rotations: number[] = []
    // const textureIndex: number[] = [] // reserved for per-instance material in future

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * area.width
      // Center clumps around terrain z (~5) so they're in front of the camera
      const z = 5 + (Math.random() - 0.5) * area.height * 0.8 + (zOffset - 5)
      const y = baseY + 0.5 + Math.random() * 0.35
      positions.push(new Vector3(x, y, z))

      // Consistent clump size to avoid distortion while testing
      // Make clumps roughly 2x bigger than prior baseline
      const s = 2.0 + Math.random() * 0.6
      scales.push(new Vector3(s, s * 1.4, 1))

      rotations.push((Math.random() - 0.5) * 0.3)
    }

    return { positions, scales, rotations, material: materials[0] }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, area.width, area.height, baseY])

  useFrame(({ camera }) => {
    if (!meshRef.current) return
    const temp = new Matrix4()
    const quat = new Quaternion()
    const swayQuat = new Quaternion()

    for (let i = 0; i < count; i++) {
      const pos = positions[i]
      const scl = scales[i]
      const rotY = rotations[i]
      // Billboard: face camera
      quat.copy(camera.quaternion)
      // Optional motion removed for now
      swayQuat.setFromAxisAngle(new Vector3(0, 1, 0), rotY)
      quat.multiply(swayQuat)

      // Compose matrix from position, orientation, and scale
      temp.compose(pos, quat, scl)
      meshRef.current.setMatrixAt(i, temp)
      // Swap material per-instance by groups of indices (simple approach)
    }
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined as any, undefined as any, count]} renderOrder={80} frustumCulled={false}>
      {/* Make plane pivot at base by translating geometry upward */}
      <planeGeometry args={[1, 1]} onUpdate={(g: any) => g.translate(0, 0.5, 0)} />
      {material && <primitive object={material} attach="material" />}
    </instancedMesh>
  )
}


