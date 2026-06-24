'use client'

import { useRef, useState, type ReactNode, type MouseEvent } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { cn } from '../../utils/cn'

type HoverEffect = 'lift' | 'glow' | 'tilt' | 'glass-glow'

interface GlassCardProps {
  children: ReactNode
  className?: string
  hoverEffect?: HoverEffect
  as?: 'div' | 'article' | 'section'
  onClick?: () => void
}

export default function GlassCard({
  children,
  className,
  hoverEffect = 'lift',
  as: Tag = 'div',
  onClick,
}: GlassCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)
  const springX = useSpring(mouseX, { stiffness: 400, damping: 30 })
  const springY = useSpring(mouseY, { stiffness: 400, damping: 30 })

  const rotateX = useTransform(springY, [0, 1], [6, -6])
  const rotateY = useTransform(springX, [0, 1], [-6, 6])
  const glowX = useTransform(springX, [0, 1], [0, 100])
  const glowY = useTransform(springY, [0, 1], [0, 100])

  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width)
    mouseY.set((e.clientY - rect.top) / rect.height)
  }

  const handleMouseLeave = () => {
    mouseX.set(0.5)
    mouseY.set(0.5)
    setIsHovered(false)
  }

  const baseClasses = cn(
    'rounded-2xl border transition-all duration-200',
    'bg-white/[0.025] backdrop-blur-[24px]',
    'border-white/[0.06]',
    'shadow-[0_8px_32px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.03)]',
    className
  )

  const hoverClasses: Record<string, string> = {
    lift: 'hover:-translate-y-2 hover:shadow-[0_16px_48px_rgba(0,0,0,0.6),0_0_50px_rgba(139,92,246,0.2),inset_0_1px_0_rgba(255,255,255,0.08)] hover:border-purple-500/35',
    glow: 'hover:border-purple-500/50 hover:shadow-[0_8px_32px_rgba(139,92,246,0.3),0_0_50px_rgba(139,92,246,0.15),inset_0_1px_0_rgba(255,255,255,0.08)]',
    tilt: 'cursor-pointer',
    'glass-glow': 'glass-glow cursor-pointer',
  }

  if (hoverEffect === 'tilt') {
    return (
      <motion.div
        ref={ref}
        className={cn(baseClasses, hoverClasses.tilt, 'relative overflow-hidden')}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        onMouseMove={(e) => { handleMouseMove(e); setIsHovered(true) }}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
      >
        <motion.div
          className="pointer-events-none absolute inset-0 z-0 opacity-0"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(500px circle at ${glowX.get() * 100}% ${glowY.get() * 100}%, rgba(139,92,246,0.12), transparent 50%)`,
            transition: 'opacity 0.2s',
          }}
        />
        <div className="relative z-10">{children}</div>
      </motion.div>
    )
  }

  return (
    <Tag
      ref={ref}
      className={cn(baseClasses, hoverClasses[hoverEffect], (hoverEffect !== 'tilt' as HoverEffect) && 'relative overflow-hidden')}
      onMouseMove={(e) => { handleMouseMove(e); setIsHovered(true) }}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(450px circle at ${glowX.get() * 100}% ${glowY.get() * 100}%, rgba(139,92,246,0.12), rgba(59,130,246,0.05) 28%, transparent 60%)`,
          transition: 'opacity 0.15s',
        }}
      />
      <div className="relative z-10">{children}</div>
    </Tag>
  )
}
