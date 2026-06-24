'use client'

import { useMousePosition } from '../../hooks/useMousePosition'

export default function CursorGlow() {
  const { x, y } = useMousePosition()

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        background: `
          radial-gradient(450px circle at ${x}px ${y}px, rgba(139,92,246,0.08), rgba(59,130,246,0.04) 35%, transparent 55%),
          radial-gradient(250px circle at ${x}px ${y}px, rgba(139,92,246,0.12), transparent 100%)
        `,
      }}
      aria-hidden="true"
    />
  )
}
