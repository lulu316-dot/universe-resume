'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const PARTICLE_COUNT = 6000
const ARMS = 5
const RADIUS = 18

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  h = ((h % 1) + 1) % 1
  const a = s * Math.min(l, 1 - l)
  const f = (n: number) => {
    const k = (n + h * 12) % 12
    return l - a * Math.max(-1, Math.min(k - 3, Math.min(9 - k, 1)))
  }
  return [f(0), f(8), f(4)]
}

export default function MilkyWay() {
  const ref = useRef<THREE.Points>(null)

  const { positions, colors, sizes } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3)
    const col = new Float32Array(PARTICLE_COUNT * 3)
    const siz = new Float32Array(PARTICLE_COUNT)

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const arm = i % ARMS
      const baseAngle = (arm / ARMS) * Math.PI * 2

      // Logarithmic spiral arm
      const t = Math.random()
      const maxR = RADIUS * (0.4 + t * 0.6)
      const r = maxR * (0.2 + Math.random() * 0.8)
      const twist = r * 1.8
      const scatterAngle = (Math.random() - 0.5) * 0.6 * (0.3 + r / RADIUS)
      const scatterR = (Math.random() - 0.5) * 1.2 * (0.2 + r / RADIUS)

      const angle = baseAngle + twist + scatterAngle
      const dist = r + scatterR

      pos[i * 3] = Math.cos(angle) * dist
      pos[i * 3 + 1] = (Math.random() - 0.5) * 0.6 * (1 - t * 0.7)
      pos[i * 3 + 2] = Math.sin(angle) * dist * 0.4

      // Color: core white → mid blue-purple → edge dark blue
      const hue = 0.58 + t * 0.2
      const saturation = 0.3 + t * 0.4
      const lightness = 0.3 + (1 - t) * 0.6
      const [cr, cg, cb] = hslToRgb(hue, saturation, lightness)
      col[i * 3] = cr
      col[i * 3 + 1] = cg
      col[i * 3 + 2] = cb

      siz[i] = (1 - t) * 3.5 + Math.random() * 1.5
    }

    return { positions: pos, colors: col, sizes: siz }
  }, [])

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    g.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    g.setAttribute('size', new THREE.BufferAttribute(sizes, 1))
    return g
  }, [positions, colors, sizes])

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.025
      ref.current.rotation.x += delta * 0.005
    }
  })

  return (
    <points ref={ref}>
      <primitive object={geo} attach="geometry" />
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.55}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  )
}
