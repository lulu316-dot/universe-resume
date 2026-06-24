'use client'

import { motion } from 'framer-motion'
import SectionTitle from '../ui/SectionTitle'
import GlassCard from '../ui/GlassCard'

const stats = [
  { label: 'Years Exp.', value: '7+' },
  { label: 'Projects', value: '30+' },
  { label: 'Clients', value: '20+' },
  { label: 'Commits', value: '4k+' },
]

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative min-h-screen w-full px-6 py-24"
    >
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          title="About Me"
          subtitle="The Explorer Behind the Code"
        />

        <div className="grid items-center gap-12 md:grid-cols-5">
          {/* Avatar column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:col-span-2"
          >
            {/* 3D avatar placeholder — will be replaced with actual 3D model in Phase 4 */}
            <div className="glass relative mx-auto aspect-square w-full max-w-[320px] overflow-hidden rounded-3xl">
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 via-transparent to-accent/10">
                {/* SVG silhouette */}
                <svg
                  viewBox="0 0 200 200"
                  className="h-3/5 w-3/5 opacity-40"
                  fill="none"
                >
                  <circle cx="100" cy="70" r="30" stroke="currentColor" strokeWidth="1.5" />
                  <path
                    d="M55 180c0-30 20-55 45-55s45 25 45 55"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
              {/* Glow border */}
              <div className="pointer-events-none absolute inset-0 rounded-3xl border border-white/[0.06]" />
            </div>
          </motion.div>

          {/* Bio column */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:col-span-3"
          >
            <GlassCard hoverEffect="glow" className="p-8">
              <p className="text-lg leading-relaxed text-text-secondary">
                I'm a <span className="font-semibold text-white">Senior Frontend Architect</span> with
                over 7 years of experience crafting digital experiences that live at the
                intersection of <span className="text-accent">code</span> and{' '}
                <span className="text-rose">art</span>.
              </p>
              <p className="mt-4 leading-relaxed text-text-muted">
                When I'm not pushing pixels or optimizing render loops, you'll find me exploring
                the latest in 3D web graphics, contributing to open-source, or mentoring the
                next generation of developers. I believe every interface should tell a story —
                and every interaction should feel like magic.
              </p>

              {/* Stat pills */}
              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                    className="glass rounded-xl px-4 py-3 text-center"
                  >
                    <div className="font-heading text-xl font-bold text-white">
                      {stat.value}
                    </div>
                    <div className="mt-0.5 text-[11px] text-text-muted">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
