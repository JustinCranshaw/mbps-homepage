export const TestBlade = () => {
  return (
    <mesh position={[0, -7.4, 5]} renderOrder={50} frustumCulled={false}>
      <planeGeometry args={[0.3, 4]} />
      <meshBasicMaterial color="#ff00ff" side={2} transparent opacity={0.9} depthTest={false} depthWrite={false} />
    </mesh>
  )
}


