'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface OrbitRingProps {
  radius?: number
  tiltX?: number
  tiltZ?: number
  dotCount?: number
  dotColor?: string
  lineColor?: string
  speed?: number
  dotSize?: number
}

export default function OrbitRing({
  radius = 5,
  tiltX = 0,
  tiltZ = 0,
  dotCount = 12,
  dotColor = '#6C5CE7',
  lineColor = '#FFFFFF',
  speed = 0.3,
  dotSize = 0.06,
}: OrbitRingProps) {
  const groupRef = useRef<THREE.Group>(null)

  // ── Ring geometry ──
  const ringLine = useMemo(() => {
    const segments = 128
    const points: THREE.Vector3[] = []
    for (let i = 0; i <= segments; i++) {
      const a = (i / segments) * Math.PI * 2
      points.push(new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius))
    }
    return new THREE.BufferGeometry().setFromPoints(points)
  }, [radius])

  // ── Orbiting dot positions ──
  const dotMeshes = useMemo(() => {
    return Array.from({ length: dotCount }, (_, i) => {
      const angle = (i / dotCount) * Math.PI * 2
      return {
        angle,
        y: (Math.random() - 0.5) * 0.3,
      }
    })
  }, [dotCount])

  const dotRefs = useRef<THREE.Mesh[]>([])

  useFrame((_, delta) => {
    // Slowly rotate the full ring group
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * speed * 0.1
    }

    // Move dots along the ring at different speeds
    dotRefs.current.forEach((dot, i) => {
      if (!dot) return
      const base = dotMeshes[i]
      base.angle += delta * speed * (0.6 + Math.random() * 0.02)
      dot.position.x = Math.cos(base.angle) * radius
      dot.position.z = Math.sin(base.angle) * radius
      dot.position.y += Math.sin(Date.now() * 0.001 + i) * 0.0005
      dot.position.y = THREE.MathUtils.clamp(dot.position.y, -0.15, 0.15)

      // Pulsing size
      const pulse = 1 + Math.sin(Date.now() * 0.003 + i) * 0.4
      dot.scale.setScalar(pulse)
    })
  })

  const dotColorObj = new THREE.Color(dotColor)
  const lineColorObj = new THREE.Color(lineColor)

  return (
    <group ref={groupRef} rotation={[tiltX, 0, tiltZ]}>
      {/* Dashed ring line */}
      <lineSegments>
        <primitive object={ringLine} attach="geometry" />
        <lineBasicMaterial
          color={lineColorObj}
          transparent
          opacity={0.08}
          depthWrite={false}
        />
      </lineSegments>

      {/* Orbiting dots */}
      {dotMeshes.map((_, i) => (
        <mesh
          key={i}
          ref={(el) => {
            dotRefs.current[i] = el!
          }}
        >
          <sphereGeometry args={[dotSize, 8, 8]} />
          <meshBasicMaterial color={dotColorObj} transparent opacity={0.9} depthWrite={false} />
        </mesh>
      ))}
    </group>
  )
}
