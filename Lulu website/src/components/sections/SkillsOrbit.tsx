'use client'

import { useState, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Scene from '../three/Scene'
import StarField from '../three/StarField'
import InteractivePlanet from '../three/InteractivePlanet'
import OrbitRing from '../three/OrbitRing'
import SectionTitle from '../ui/SectionTitle'
import GlassCard from '../ui/GlassCard'
import { skills, categoryColors, categoryLabels } from '../../data/skills'
import type { Skill } from '../../types'

// ── Group skills by category ──
const grouped = skills.reduce<Record<string, Skill[]>>((acc, s) => {
  ;(acc[s.category] ??= []).push(s)
  return acc
}, {})

const categories = Object.keys(grouped) as Skill['category'][]

// ── Orbit params per category ──
const orbitConfigs = [
  { radius: 3.8, tiltX: 0.4, tiltZ: 0.1, speed: 0.6 },
  { radius: 5.2, tiltX: -0.3, tiltZ: -0.15, speed: 0.45 },
  { radius: 6.6, tiltX: 0.25, tiltZ: 0.2, speed: 0.35 },
  { radius: 8.0, tiltX: -0.2, tiltZ: -0.1, speed: 0.28 },
]

export default function SkillsOrbit() {
  const [selected, setSelected] = useState<Skill | null>(null)

  return (
    <section
      id="skills"
      className="relative min-h-screen w-full overflow-hidden py-24"
    >
      {/* ── 3D Background ── */}
      <Scene camera={{ fov: 50, near: 0.1, far: 100, position: [0, 1.5, 12] }}>
        <Suspense fallback={null}>
          <StarField />
          <ambientLight intensity={0.4} />
          {/* Orbit rings */}
          {categories.map((cat, i) => (
            <OrbitRing
              key={cat}
              radius={orbitConfigs[i].radius}
              tiltX={orbitConfigs[i].tiltX}
              tiltZ={orbitConfigs[i].tiltZ}
              dotColor={categoryColors[cat]}
              speed={orbitConfigs[i].speed}
              dotCount={10 + i * 3}
            />
          ))}
          {/* Planet per skill */}
          {categories.flatMap((cat, ci) =>
            grouped[cat].map((skill, si) => (
              <InteractivePlanet
                key={skill.name}
                radius={0.35 + skill.level * 0.004}
                baseColor={skill.color ?? categoryColors[cat]}
                hoverColor={categoryColors[cat]}
                orbitRadius={orbitConfigs[ci].radius}
                orbitSpeed={orbitConfigs[ci].speed * (0.7 + si * 0.2)}
                onClick={() => setSelected(skill)}
              />
            ))
          )}
          {/* Center core */}
          <InteractivePlanet
            position={[0, 0, 0]}
            radius={0.7}
            baseColor="#FFFFFF"
            hoverColor="#6C5CE7"
            label="Core"
          />
        </Suspense>
      </Scene>

      {/* ── Overlay ── */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-cosmic-void/40 via-transparent to-cosmic-void/80" />

      {/* ── Title ── */}
      <div className="relative z-10">
        <SectionTitle
          title="Skill Orbit"
          subtitle="Where My Abilities Orbit"
          align="center"
        />

        {/* Legend */}
        <div className="mx-auto mb-12 flex flex-wrap justify-center gap-4">
          {categories.map((cat) => (
            <span
              key={cat}
              className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs text-text-secondary"
            >
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ backgroundColor: categoryColors[cat] }}
              />
              {categoryLabels[cat]}
            </span>
          ))}
        </div>
      </div>

      {/* ── Detail panel ── */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="relative z-20 mx-auto max-w-sm px-4"
          >
            <GlassCard hoverEffect="glow" className="p-6 text-center">
              <div
                className="mx-auto mb-3 h-3 w-3 rounded-full"
                style={{ backgroundColor: selected.color ?? categoryColors[selected.category] }}
              />
              <h3 className="font-heading text-lg font-bold text-white">
                {selected.name}
              </h3>
              <p className="mt-1 text-xs text-text-muted uppercase tracking-wider">
                {categoryLabels[selected.category]}
              </p>
              {/* Level bar */}
              <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${selected.level}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="h-full rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${selected.color ?? categoryColors[selected.category]}, ${categoryColors[selected.category]})`,
                  }}
                />
              </div>
              <p className="mt-2 font-mono text-xs text-text-muted">
                Proficiency: {selected.level}%
              </p>
              <button
                onClick={() => setSelected(null)}
                className="mt-4 text-xs text-text-muted underline transition-colors hover:text-white"
              >
                Close
              </button>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
