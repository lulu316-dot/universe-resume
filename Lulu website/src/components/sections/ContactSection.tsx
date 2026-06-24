'use client'

import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import SectionTitle from '../ui/SectionTitle'
import GlassCard from '../ui/GlassCard'
import GlowButton from '../ui/GlowButton'
import { socialLinks } from '../../data/social'
import { cn } from '../../utils/cn'

const iconMap: Record<string, string> = {
  github: 'GH',
  linkedin: 'LI',
  twitter: '𝕏',
  email: '@',
}

export default function ContactSection() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    // Simulate send (replace with real form handler)
    setTimeout(() => setStatus('sent'), 1200)
  }

  return (
    <section id="contact" className="relative w-full px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <SectionTitle
          title="Open a Channel"
          subtitle="Hailing Frequencies Open"
        />

        {/* ── Form card ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <GlassCard hoverEffect="glow" className="p-8 md:p-10">
            {status === 'sent' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center py-8 text-center"
              >
                <div className="mb-4 text-5xl">📡</div>
                <h3 className="font-heading text-xl font-bold text-white">
                  Transmission Received
                </h3>
                <p className="mt-2 text-text-secondary">
                  I'll get back to you within 48 hours. Thanks for reaching out!
                </p>
                <GlowButton
                  variant="glass"
                  size="sm"
                  className="mt-6"
                  onClick={() => setStatus('idle')}
                >
                  Send Another Signal
                </GlowButton>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  {/* Name */}
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-medium tracking-wider text-text-muted uppercase">
                      Name
                    </span>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      className={cn(
                        'w-full rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3 text-sm text-white placeholder:text-text-muted/50',
                        'transition-colors duration-300 focus:border-primary/40 focus:bg-white/[0.04] focus:outline-none focus:ring-1 focus:ring-primary/20'
                      )}
                    />
                  </label>

                  {/* Email */}
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-medium tracking-wider text-text-muted uppercase">
                      Email
                    </span>
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      className={cn(
                        'w-full rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3 text-sm text-white placeholder:text-text-muted/50',
                        'transition-colors duration-300 focus:border-primary/40 focus:bg-white/[0.04] focus:outline-none focus:ring-1 focus:ring-primary/20'
                      )}
                    />
                  </label>
                </div>

                {/* Subject */}
                <label className="block">
                  <span className="mb-1.5 block text-xs font-medium tracking-wider text-text-muted uppercase">
                    Subject
                  </span>
                  <input
                    type="text"
                    required
                    placeholder="What's this about?"
                    className={cn(
                      'w-full rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3 text-sm text-white placeholder:text-text-muted/50',
                      'transition-colors duration-300 focus:border-primary/40 focus:bg-white/[0.04] focus:outline-none focus:ring-1 focus:ring-primary/20'
                    )}
                  />
                </label>

                {/* Message */}
                <label className="block">
                  <span className="mb-1.5 block text-xs font-medium tracking-wider text-text-muted uppercase">
                    Message
                  </span>
                  <textarea
                    required
                    rows={5}
                    placeholder="Your message..."
                    className={cn(
                      'w-full resize-none rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3 text-sm text-white placeholder:text-text-muted/50',
                      'transition-colors duration-300 focus:border-primary/40 focus:bg-white/[0.04] focus:outline-none focus:ring-1 focus:ring-primary/20'
                    )}
                  />
                </label>

                {/* Submit */}
                <div className="flex items-center justify-between">
                  <GlowButton
                    type="submit"
                    variant="primary"
                    size="md"
                    disabled={status === 'sending'}
                  >
                    {status === 'sending' ? (
                      <span className="flex items-center gap-2">
                        <span className="h-3 w-3 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Transmitting...
                      </span>
                    ) : (
                      'Transmit Signal'
                    )}
                  </GlowButton>

                  <span className="hidden text-xs text-text-muted sm:block">
                    Response time: ~48h
                  </span>
                </div>
              </form>
            )}
          </GlassCard>
        </motion.div>

        {/* ── Social links ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex justify-center gap-4"
        >
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target={link.url.startsWith('mailto:') ? undefined : '_blank'}
              rel="noopener noreferrer"
              title={link.name}
              className="glass flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold text-text-muted transition-all duration-300 hover:border-primary/40 hover:text-white hover:shadow-[0_0_20px_rgba(108,92,231,0.3)]"
            >
              {iconMap[link.icon] ?? link.name[0]}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
