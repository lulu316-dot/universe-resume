'use client'

import { useRef, useState, type ReactNode, type MouseEvent } from 'react'
import { cn } from '../../utils/cn'

interface GradientBorderProps {
  children: ReactNode
  className?: string
  borderRadius?: string
  borderWidth?: string
  colors?: string // comma-separated color stops for the conic gradient
}

export default function GradientBorder({
  children,
  className,
  borderRadius = 'rounded-2xl',
  borderWidth = '2px',
  colors = '#6C5CE7, #E040FB, #00F5D4, #3B82F6, #6C5CE7',
}: GradientBorderProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [angle, setAngle] = useState(0)

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const deg = Math.atan2(e.clientY - cy, e.clientX - cx) * (180 / Math.PI) + 90
    setAngle(deg)
  }

  return (
    <div
      ref={ref}
      className={cn('relative', borderRadius, className)}
      onMouseMove={handleMouseMove}
      style={{
        background: `conic-gradient(from ${angle}deg, ${colors})`,
        padding: borderWidth,
      }}
    >
      <div className={cn('h-full w-full bg-cosmic-void', borderRadius)}>
        {children}
      </div>
    </div>
  )
}
