'use client'

import { useState, useEffect, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ── Big Bang explosion particles ──
const PARTICLE_COUNT = 40
function bangParticles() {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => {
    const angle = (i / PARTICLE_COUNT) * Math.PI * 2
    const dist = 80 + Math.random() * 200
    return {
      x: Math.cos(angle) * dist,
      y: Math.sin(angle) * dist,
      scale: 0.5 + Math.random() * 2,
      delay: Math.random() * 0.15,
      color: ['#6C5CE7', '#E040FB', '#00F5D4', '#3B82F6', '#F9A826'][
        Math.floor(Math.random() * 5)
      ],
    }
  })
}

interface LoadingScreenProps {
  onComplete: () => void
}

function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const particles = bangParticles()
  const [phase, setPhase] = useState<'gather' | 'bang' | 'fade'>('gather')

  useEffect(() => {
    // Gather → Bang → Fade sequence
    const t1 = setTimeout(() => setPhase('bang'), 600)
    const t2 = setTimeout(() => setPhase('fade'), 1800)
    const t3 = setTimeout(() => onComplete(), 2400)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-cosmic-void"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Gather stage — shrinking dot */}
      {phase === 'gather' && (
        <motion.div
          initial={{ scale: 3, opacity: 0 }}
          animate={{ scale: 0.8, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeIn' }}
          className="h-4 w-4 rounded-full bg-white shadow-[0_0_40px_10px_rgba(255,255,255,0.6)]"
        />
      )}

      {/* Bang stage — explosion + logo */}
      {(phase === 'bang' || phase === 'fade') && (
        <>
          {/* Particles */}
          {particles.map((p, i) => (
            <motion.div
              key={i}
              initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
              animate={{
                x: p.x,
                y: p.y,
                scale: [0, p.scale, 0],
                opacity: [1, 1, 0],
              }}
              transition={{ duration: 1.2, delay: p.delay, ease: 'easeOut' }}
              className="absolute left-1/2 top-1/2 h-2 w-2 rounded-full"
              style={{ backgroundColor: p.color }}
            />
          ))}

          {/* Central glow */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 2, opacity: phase === 'fade' ? 0 : 0.6 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="absolute h-40 w-40 rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(108,92,231,0.4), rgba(0,245,212,0.15), transparent 70%)',
            }}
          />

          {/* Logo text */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{
              opacity: phase === 'fade' ? 0 : 1,
              scale: phase === 'fade' ? 1.3 : 1,
            }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative z-10 font-heading text-3xl font-black tracking-[0.3em] text-white glow-text"
          >
            COSMIC<span className="text-primary">·</span>CV
          </motion.h1>
        </>
      )}
    </motion.div>
  )
}

// ── Page wrapper ──
interface PageWrapperProps {
  children: ReactNode
}

export default function PageWrapper({ children }: PageWrapperProps) {
  const [loading, setLoading] = useState(true)

  return (
    <>
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {children}
        </motion.div>
      )}
    </>
  )
}
