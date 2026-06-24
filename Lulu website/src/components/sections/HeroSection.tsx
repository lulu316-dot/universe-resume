'use client'

import { Suspense } from 'react'
import { motion } from 'framer-motion'
import Scene from '../three/Scene'
import StarField from '../three/StarField'
import NebulaCloud from '../three/NebulaCloud'
import MilkyWay from '../three/MilkyWay'
import CosmicDust from '../three/CosmicDust'
import GlowButton from '../ui/GlowButton'

const stagger = (i: number) => i * 0.18

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex h-screen w-full items-center justify-center overflow-hidden"
    >
      {/* ── 3D Background Layers ── */}
      <Scene camera={{ fov: 55, near: 0.1, far: 200, position: [0, 0.5, 10] }}>
        <Suspense fallback={null}>
          <StarField />
          <MilkyWay />
          {/* ⭐ Denser, brighter nebula cluster */}
          <NebulaCloud position={[-7, 3, -9]} scale={22} opacity={0.1} color1="#8B5CF6" color2="#6D28D9" rotationZ={0.25} />
          <NebulaCloud position={[6, -2.5, -8]} scale={18} opacity={0.08} color1="#7C3AED" color2="#3B82F6" rotationZ={-0.35} />
          <NebulaCloud position={[-5, -4, -7]} scale={24} opacity={0.07} color1="#D946EF" color2="#8B5CF6" rotationZ={0.55} />
          <NebulaCloud position={[3, 4, -10]} scale={20} opacity={0.09} color1="#6366F1" color2="#06B6D4" rotationZ={-0.15} />
          <NebulaCloud position={[0, -1, -6]} scale={28} opacity={0.05} color1="#A855F7" color2="#3B82F6" rotationZ={0.7} />
          <CosmicDust />
          <ambientLight intensity={0.25} />
          {/* Additional colored fill lights */}
          <pointLight position={[8, 3, 2]} color="#8B5CF6" intensity={8} distance={25} />
          <pointLight position={[-6, -2, -1]} color="#3B82F6" intensity={5} distance={20} />
        </Suspense>
      </Scene>

      {/* Bottom gradient fade */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-transparent to-[#050508]" />

      {/* Scan-line overlay */}
      <div className="scan-overlay z-[2]" />

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, delay: stagger(0), ease: 'easeOut' }}
          className="mb-4 font-mono text-sm tracking-[0.35em] text-cyan-300/80"
        >
          EXPLORING THE DIGITAL UNIVERSE
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 50, filter: 'blur(15px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.3, delay: stagger(1), ease: 'easeOut' }}
          className="font-heading text-[clamp(2.8rem,7.5vw,6.5rem)] font-black leading-[1.05] tracking-tight text-white glow-text"
        >
          Hi, I'm{' '}
          <span
            className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
            style={{
              textShadow: '0 0 60px rgba(139,92,246,0.7), 0 0 120px rgba(59,130,246,0.4), 0 0 200px rgba(139,92,246,0.2)',
            }}
          >
            Your Name
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.1, delay: stagger(2), ease: 'easeOut' }}
          className="mt-5 max-w-xl text-lg leading-relaxed text-text-secondary md:text-xl"
        >
          Senior Frontend Architect & Creative Developer
          <br />
          <span className="text-sm text-text-muted">
            — crafting immersive digital experiences at the intersection of code and art.
          </span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: stagger(3), ease: 'easeOut' }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <GlowButton href="#projects" variant="primary" size="md">
            View My Work
          </GlowButton>
          <GlowButton href="#about" variant="glass" size="md">
            About Me
          </GlowButton>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0], opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2.5">
          <span className="text-[10px] tracking-[0.3em] text-text-muted">SCROLL</span>
          <div className="h-8 w-[1px] bg-gradient-to-b from-purple-400/50 to-transparent" />
        </div>
      </motion.div>
    </section>
  )
}
