'use client'

import type { ReactNode, ButtonHTMLAttributes } from 'react'
import { cn } from '../../utils/cn'

interface GlowButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'glass'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  href?: string
}

const sizeMap = {
  sm: 'px-5 py-2.5 text-xs',
  md: 'px-8 py-3.5 text-sm',
  lg: 'px-10 py-4 text-base',
}

const baseClasses =
  'inline-flex items-center justify-center rounded-full font-semibold text-white transition-all duration-300 cursor-pointer select-none'

export default function GlowButton({
  children,
  variant = 'primary',
  size = 'md',
  className,
  href,
  ...buttonProps
}: GlowButtonProps) {
  const variantClasses = {
    primary: cn(
      'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500',
      'shadow-[0_0_30px_rgba(139,92,246,0.5),0_0_60px_rgba(59,130,246,0.2)]',
      'hover:shadow-[0_0_50px_rgba(139,92,246,0.7),0_0_80px_rgba(59,130,246,0.35)]',
      'hover:scale-105 active:scale-95'
    ),
    secondary: cn(
      'border border-cyan-400/30 bg-cyan-500/10',
      'text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.2)]',
      'hover:bg-cyan-500/20 hover:shadow-[0_0_35px_rgba(6,182,212,0.45)]'
    ),
    glass: cn(
      'glass',
      'hover:border-purple-500/40 hover:bg-white/[0.06] hover:shadow-[0_0_25px_rgba(139,92,246,0.2)]'
    ),
  }

  const combined = cn(baseClasses, variantClasses[variant], sizeMap[size], className)

  if (href) {
    return <a href={href} className={combined}>{children}</a>
  }

  return <button type="button" className={combined} {...buttonProps}>{children}</button>
}
