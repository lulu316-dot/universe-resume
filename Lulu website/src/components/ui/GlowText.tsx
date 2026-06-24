'use client'

import type { ReactNode } from 'react'
import { cn } from '../../utils/cn'

interface GlowTextProps {
  children: ReactNode
  variant?: 'primary' | 'accent'
  as?: 'h1' | 'h2' | 'h3' | 'span' | 'p'
  className?: string
}

export default function GlowText({
  children,
  variant = 'primary',
  as: Tag = 'span',
  className,
}: GlowTextProps) {
  const glowClasses = {
    primary: 'glow-text',
    accent: 'glow-text-accent',
  }

  return <Tag className={cn(glowClasses[variant], className)}>{children}</Tag>
}
