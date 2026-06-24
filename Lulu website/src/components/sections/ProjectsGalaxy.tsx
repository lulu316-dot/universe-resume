'use client'

import { useRef, useMemo, Suspense, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { motion } from 'framer-motion'
import * as THREE from 'three'
import Scene from '../three/Scene'
import StarField from '../three/StarField'
import SectionTitle from '../ui/SectionTitle'
import GlassCard from '../ui/GlassCard'
import { projects } from '../../data/projects'
import type { Project } from '../../types'

// ── Spiral galaxy particle component ──
function SpiralGalaxy({
  center,
  color1 = '#6C5CE7',
  color2 = '#00F5D4',
  particleCount = 1500,
  spread = 4,
}: {
  center: [number, number, number]
  color1?: string
  color2?: string
  particleCount?: number
  spread?: number
}) {
  const ref = useRef<THREE.Points>(null)
  const arms = 4

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3)
    const col = new Float32Array(particleCount * 3)
    const c1 = new THREE.Color(color1)
    const c2 = new THREE.Color(color2)

    for (let i = 0; i < particleCount; i++) {
      const arm = i % arms
      const r = (i / particleCount) * spread
      const angle = (arm / arms) * Math.PI * 2 + r * 2.5 + (Math.random() - 0.5) * 0.4
      const scatter = (1 - r / spread) * 1.2 * Math.random()

      pos[i * 3] = center[0] + Math.cos(angle) * (r + scatter)
      pos[i * 3 + 1] = center[1] + (Math.random() - 0.5) * 0.3
      pos[i * 3 + 2] = center[2] + Math.sin(angle) * (r + scatter)

      const t = r / spread
      const mixed = c1.clone().lerp(c2, t)
      col[i * 3] = mixed.r
      col[i * 3 + 1] = mixed.g
      col[i * 3 + 2] = mixed.b
    }
    return { positions: pos, colors: col }
  }, [center, color1, color2, particleCount, spread])

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    g.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    return g
  }, [positions, colors])

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.3
    }
  })

  return (
    <points ref={ref}>
      <primitive object={geo} attach="geometry" />
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.8}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// ── Galaxy positions ──
const galaxyPositions: Array<[number, number, number]> = [
  [-5, 2, -2],
  [5, -1.5, -3],
  [-4, -3, -5],
  [6, 2.5, -4],
]

const galaxyColors = [
  { c1: '#6C5CE7', c2: '#E040FB' },
  { c1: '#3B82F6', c2: '#00F5D4' },
  { c1: '#F9A826', c2: '#E040FB' },
  { c1: '#00F5D4', c2: '#6C5CE7' },
]

export default function ProjectsGalaxy() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <section
      id="projects"
      className="relative min-h-screen w-full overflow-hidden py-24"
    >
      {/* ── 3D Background ── */}
      <Scene camera={{ fov: 55, near: 0.1, far: 100, position: [0, 1, 8] }}>
        <Suspense fallback={null}>
          <StarField />
          <ambientLight intensity={0.3} />
          {projects.map((_, i) => (
            <SpiralGalaxy
              key={i}
              center={galaxyPositions[i]}
              color1={galaxyColors[i].c1}
              color2={galaxyColors[i].c2}
              particleCount={1200}
              spread={3 + i * 0.5}
            />
          ))}
        </Suspense>
      </Scene>

      {/* ── Overlay ── */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-cosmic-void/60" />

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <SectionTitle
          title="Project Galaxy"
          subtitle="Stars I've Built"
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
            >
              <GlassCard
                hoverEffect="lift"
                className="h-full cursor-pointer p-6"
                onClick={() => setSelectedProject(project)}
              >
                <h3 className="font-heading text-base font-bold text-white">
                  {project.name}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-text-muted">
                  {project.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.tech.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-white/[0.04] px-2.5 py-0.5 text-[11px] text-text-secondary"
                    >
                      {t}
                    </span>
                  ))}
                  {project.tech.length > 4 && (
                    <span className="text-[11px] text-text-muted">
                      +{project.tech.length - 4}
                    </span>
                  )}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Detail panel */}
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 mx-auto max-w-2xl"
          >
            <GlassCard hoverEffect="glow" className="p-8">
              <h3 className="font-heading text-xl font-bold text-white">
                {selectedProject.name}
              </h3>
              <p className="mt-3 text-text-secondary">
                {selectedProject.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {selectedProject.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/[0.08] bg-white/[0.02] px-3 py-1 text-xs text-text-secondary"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex gap-3">
                {selectedProject.link && (
                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-gradient-to-r from-primary to-secondary px-5 py-2 text-xs font-semibold text-white transition-all hover:scale-105"
                  >
                    Live Demo
                  </a>
                )}
                {selectedProject.github && (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass rounded-full px-5 py-2 text-xs font-medium text-text-primary transition-all hover:border-primary/30"
                  >
                    Source Code
                  </a>
                )}
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="mt-4 block text-xs text-text-muted underline transition-colors hover:text-white"
              >
                Close
              </button>
            </GlassCard>
          </motion.div>
        )}
      </div>
    </section>
  )
}
