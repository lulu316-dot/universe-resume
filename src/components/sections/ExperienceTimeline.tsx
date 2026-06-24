'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import SectionTitle from '../ui/SectionTitle'
import GlassCard from '../ui/GlassCard'
import { experiences } from '../../data/experience'
import { cn } from '../../utils/cn'

function PulseNode({ active }: { active: boolean }) {
  return (
    <div className="relative flex items-center justify-center">
      {/* Outer ripple */}
      <div
        className={cn(
          'absolute h-5 w-5 rounded-full border transition-all duration-500',
          active
            ? 'border-primary/60 scale-[2.5] opacity-0'
            : 'border-white/[0.08] scale-100 opacity-100'
        )}
      />
      {/* Inner glow */}
      <div
        className={cn(
          'absolute h-4 w-4 rounded-full transition-all duration-500',
          active
            ? 'bg-primary/20 blur-sm scale-150'
            : 'bg-white/[0.03] scale-100'
        )}
      />
      {/* Core */}
      <div
        className={cn(
          'relative z-10 h-3 w-3 rounded-full border-2 transition-all duration-500',
          active
            ? 'border-primary bg-white shadow-[0_0_10px_rgba(108,92,231,0.6)]'
            : 'border-white/[0.15] bg-white/[0.05]'
        )}
      />
    </div>
  )
}

function FlowLine({ active }: { active: boolean }) {
  return (
    <div className="relative w-[2px] flex-1">
      {/* Static dashed line */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(to bottom, rgba(255,255,255,0.06) 50%, transparent 50%)',
          backgroundSize: '2px 8px',
        }}
      />
      {/* Flowing particle on hover */}
      {active && (
        <motion.div
          className="absolute left-1/2 top-0 h-3 w-1 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_8px_rgba(0,245,212,0.6)]"
          animate={{ top: ['0%', '100%'] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        />
      )}
    </div>
  )
}

export default function ExperienceTimeline() {
  const [activeId, setActiveId] = useState<string | null>(null)

  return (
    <section id="experience" className="relative w-full px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <SectionTitle
          title="Stellar Journey"
          subtitle="Where I've Traveled"
        />

        {/* Timeline */}
        <div className="relative">
          {experiences.map((exp, i) => {
            const isActive = activeId === exp.id
            return (
              <div key={exp.id} className="relative flex items-start gap-6">
                {/* ── Left rail ── */}
                <div className="flex flex-col items-center">
                  {i > 0 && <FlowLine active={isActive} />}
                  <PulseNode active={isActive} />
                </div>

                {/* ── Card ── */}
                <div className="flex-1 pb-12">
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.15 }}
                    onMouseEnter={() => setActiveId(exp.id)}
                    onMouseLeave={() => setActiveId(null)}
                  >
                    <GlassCard
                      hoverEffect="lift"
                      className={cn(
                        'p-6 transition-all duration-500',
                        isActive && 'border-primary/20'
                      )}
                    >
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h3 className="font-heading text-base font-bold text-white">
                          {exp.role}
                        </h3>
                        <span className="font-mono text-xs text-accent">
                          {exp.period}
                        </span>
                      </div>
                      <p className="mt-1 font-medium text-primary">
                        {exp.company}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                        {exp.description}
                      </p>
                      {/* Highlights */}
                      <ul className="mt-4 space-y-1.5">
                        {exp.highlights.map((h) => (
                          <li
                            key={h}
                            className="flex items-start gap-2 text-xs text-text-muted"
                          >
                            <span className="mt-0.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                            {h}
                          </li>
                        ))}
                      </ul>
                    </GlassCard>
                  </motion.div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
