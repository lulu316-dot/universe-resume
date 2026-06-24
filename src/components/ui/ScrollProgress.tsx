'use client'

import { useScrollProgress } from '../../hooks/useScrollProgress'
import { motion } from 'framer-motion'

export default function ScrollProgress() {
  const progress = useScrollProgress()

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[2px]">
      <motion.div
        className="h-full bg-gradient-to-r from-primary via-rose to-accent"
        style={{
          width: `${progress * 100}%`,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: progress > 0.001 ? 1 : 0, boxShadow: progress > 0 ? '0 0 10px rgba(108,92,231,0.6)' : 'none' }}
        transition={{ opacity: { duration: 0.3 } }}
      />
    </div>
  )
}
