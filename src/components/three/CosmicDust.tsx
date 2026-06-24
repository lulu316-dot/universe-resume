'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const DUST_COUNT = 400
const SPREAD = 12

export default function CosmicDust() {
  const ref = useRef<THREE.Points>(null)
  const speeds = useMemo(() => new Float32Array(DUST_COUNT).map(() => 0.1 + Math.random() * 0.4), [])
  const offsets = useMemo(() => new Float32Array(DUST_COUNT).map(() => Math.random() * Math.PI * 2), [])

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(DUST_COUNT * 3)
    const col = new Float32Array(DUST_COUNT * 3)
    for (let i = 0; i < DUST_COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * SPREAD * 2
      pos[i * 3 + 1] = (Math.random() - 0.5) * SPREAD
      pos[i * 3 + 2] = (Math.random() - 0.5) * SPREAD * 0.8

      const hue = 0.55 + Math.random() * 0.25
      const c = new THREE.Color()
      c.setHSL(hue, 0.6, 0.5 + Math.random() * 0.5)
      col[i * 3] = c.r
      col[i * 3 + 1] = c.g
      col[i * 3 + 2] = c.b
    }
    return { positions: pos, colors: col }
  }, [])

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    g.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    return g
  }, [positions, colors])

  useFrame((_, delta) => {
    if (!ref.current) return
    const posArr = ref.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < DUST_COUNT; i++) {
      // Float up and down slowly
      posArr[i * 3 + 1] += Math.sin(offsets[i] + Date.now() * 0.0005) * delta * speeds[i] * 0.6
      // Drift sideways
      posArr[i * 3] += Math.cos(offsets[i] + Date.now() * 0.0007) * delta * speeds[i] * 0.3

      // Wrap around
      if (posArr[i * 3 + 1] > SPREAD * 0.5) posArr[i * 3 + 1] = -SPREAD * 0.5
      if (posArr[i * 3 + 1] < -SPREAD * 0.5) posArr[i * 3 + 1] = SPREAD * 0.5
      if (posArr[i * 3] > SPREAD) posArr[i * 3] = -SPREAD
      if (posArr[i * 3] < -SPREAD) posArr[i * 3] = SPREAD
    }
    ref.current.geometry.attributes.position.needsUpdate = true
    ref.current.rotation.y += delta * 0.01
  })

  return (
    <points ref={ref}>
      <primitive object={geo} attach="geometry" />
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.5}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
