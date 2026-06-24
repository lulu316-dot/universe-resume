'use client'

import { Canvas } from '@react-three/fiber'
import type { ReactNode } from 'react'

interface SceneProps {
  children: ReactNode
  className?: string
  camera?: { fov?: number; near?: number; far?: number; position?: [number, number, number] }
}

export default function Scene({
  children,
  className,
  camera = { fov: 60, near: 0.1, far: 1000, position: [0, 0, 8] },
}: SceneProps) {
  return (
    <div className={className} style={{ position: 'absolute', inset: 0 }}>
      <Canvas
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: 3, // ACESFilmicToneMapping for richer colors
          toneMappingExposure: 1.2,
        }}
        camera={camera}
        style={{ background: 'transparent' }}
      >
        {children}
      </Canvas>
    </div>
  )
}
