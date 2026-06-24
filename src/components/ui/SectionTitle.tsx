'use client'

import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

interface SectionTitleProps {
  title: string
  subtitle?: string
  className?: string
  align?: 'left' | 'center'
}

export default function SectionTitle({
  title,
  subtitle,
  className,
  align = 'center',
}: SectionTitleProps) {
  return (
    <div className={cn('mb-16', align === 'center' && 'text-center', className)}>
      {/* Subtitle with decorative line */}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-3 font-mono text-xs tracking-[0.25em] text-accent uppercase"
        >
          {subtitle}
        </motion.p>
      )}

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="font-heading text-[clamp(1.75rem,4vw,3rem)] font-bold tracking-tight text-white"
      >
        {title}
      </motion.h2>

      {/* Decor — orbit ring line */}
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: '80px' }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
        className={cn(
          'mt-4 h-[2px] rounded-full bg-gradient-to-r from-primary via-rose to-transparent',
          align === 'center' && 'mx-auto'
        )}
      />

      {/* Tiny orbiting dot */}
      <motion.div
        className={cn(
          'mt-1.5 h-1 w-1 rounded-full bg-accent shadow-[0_0_10px_rgba(0,245,212,0.6)]',
          align === 'center' && 'mx-auto'
        )}
        animate={{
          x: ['-40px', '40px', '-40px'],
          opacity: [0.4, 1, 0.4],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  )
}
