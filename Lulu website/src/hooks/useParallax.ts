import { useState, useEffect } from 'react'

interface ParallaxOffsets {
  x: number
  y: number
}

export function useParallax(intensity = 0.02): ParallaxOffsets {
  const [offsets, setOffsets] = useState<ParallaxOffsets>({ x: 0, y: 0 })

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setOffsets({
        x: 0,
        y: scrollY * intensity,
      })
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [intensity])

  return offsets
}
