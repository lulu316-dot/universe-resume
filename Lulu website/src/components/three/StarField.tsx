'use client'

import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { rand } from '../../utils/three-helpers'

const DESKTOP_STAR_COUNT = 8000
const MOBILE_STAR_COUNT = 2000
const SPREAD = 50

// ── HSV→RGB helper ──
function hsvToRgb(h: number, s: number, v: number): [number, number, number] {
  const i = Math.floor(h * 6)
  const f = h * 6 - i
  const p = v * (1 - s)
  const q = v * (1 - f * s)
  const t = v * (1 - (1 - f) * s)
  switch (i % 6) {
    case 0: return [v, t, p]
    case 1: return [q, v, p]
    case 2: return [p, v, t]
    case 3: return [p, q, v]
    case 4: return [t, p, v]
    default: return [v, p, q]
  }
}

export default function StarField() {
  const meshRef = useRef<THREE.Points>(null)
  const { size } = useThree()

  const isMobile = size.width < 768
  const starCount = isMobile ? MOBILE_STAR_COUNT : DESKTOP_STAR_COUNT

  const { positions, colors, sizes } = useMemo(() => {
    const pos = new Float32Array(starCount * 3)
    const col = new Float32Array(starCount * 3)
    const siz = new Float32Array(starCount)

    for (let i = 0; i < starCount; i++) {
      // Spherical distribution for more natural look
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = rand(SPREAD * 0.3, SPREAD)

      pos[i * 3] = Math.sin(phi) * Math.cos(theta) * r
      pos[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * r
      pos[i * 3 + 2] = Math.cos(phi) * r * 0.6

      // Color palette: blue → purple → white (hot stars)
      const hue = 0.55 + Math.random() * 0.35 // blue to purple
      const sat = 0.2 + Math.random() * 0.5
      const val = 0.4 + Math.random() * 0.6
      const [cr, cg, cb] = hsvToRgb(hue, sat, val)
      col[i * 3] = cr
      col[i * 3 + 1] = cg
      col[i * 3 + 2] = cb

      // Size: mostly tiny, a few bright giants
      const brightness = cr * 0.299 + cg * 0.587 + cb * 0.114
      siz[i] = rand(1.0, 7.0) * (0.2 + brightness * 1.2)
    }

    return { positions: pos, colors: col, sizes: siz }
  }, [starCount])

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    g.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    g.setAttribute('size', new THREE.BufferAttribute(sizes, 1))
    return g
  }, [positions, colors, sizes])

  const shader = useMemo(() => ({
    uniforms: {
      uTime: { value: 0 },
      uDpr: { value: Math.min(window.devicePixelRatio, 2) },
    },
    vertexShader: /* glsl */ `
      attribute float size;
      varying vec3 vColor;
      varying float vBrightness;
      uniform float uTime;
      uniform float uDpr;

      void main() {
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        // Multi-frequency twinkle for more organic feel
        float twinkle = 0.5
          + 0.3 * sin(uTime * 2.3 + position.x * 17.0 + position.y * 11.0)
          + 0.2 * sin(uTime * 1.7 + position.z * 13.0 + position.x * 5.0)
          + 0.15 * sin(uTime * 0.8 + position.y * 8.0 - position.z * 6.0);

        gl_PointSize = size * (400.0 / -mvPosition.z) * twinkle * uDpr;
        gl_PointSize = clamp(gl_PointSize, 0.5, 12.0);
        gl_Position = projectionMatrix * mvPosition;

        vColor = color;
        vBrightness = twinkle;
      }
    `,
    fragmentShader: /* glsl */ `
      varying vec3 vColor;
      varying float vBrightness;

      void main() {
        float d = length(gl_PointCoord - 0.5) * 2.0;

        // Sharp core + soft halo = cross-like sparkle
        float core = exp(-d * 4.0) * 0.9;
        float halo = exp(-d * 1.5) * 0.25;
        float glow = exp(-d * 7.0) * 0.5;

        float alpha = core + halo + glow;
        alpha *= 0.7 + vBrightness * 0.3;

        vec3 finalColor = vColor * (1.0 + glow * 0.8);
        gl_FragColor = vec4(finalColor, alpha);
      }
    `,
  }), [])

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.02
      meshRef.current.rotation.x += delta * 0.006
      const mat = meshRef.current.material as THREE.ShaderMaterial
      if (mat.uniforms) mat.uniforms.uTime.value += delta
    }
  })

  return (
    <points ref={meshRef}>
      <primitive object={geo} attach="geometry" />
      <shaderMaterial
        attach="material"
        args={[shader]}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
