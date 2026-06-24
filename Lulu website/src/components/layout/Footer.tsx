'use client'

import { socialLinks } from '../../data/social'

const iconMap: Record<string, string> = {
  github: 'GH',
  linkedin: 'LI',
  twitter: '𝕏',
  email: '@',
}

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-cosmic-void/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-10 md:flex-row md:justify-between">
        {/* Logo */}
        <a
          href="#hero"
          className="font-heading text-sm font-bold tracking-[0.2em] text-text-muted transition-colors hover:text-white"
        >
          COSMIC<span className="text-primary">·</span>CV
        </a>

        {/* Copyright */}
        <p className="text-xs text-text-muted">
          &copy; {new Date().getFullYear()} — Crafted in the cosmos with{' '}
          <span className="text-rose">♥</span>
        </p>

        {/* Social links */}
        <div className="flex items-center gap-4">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target={link.url.startsWith('mailto:') ? undefined : '_blank'}
              rel="noopener noreferrer"
              title={link.name}
              className="glass flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-text-muted transition-all duration-300 hover:border-primary/30 hover:text-white hover:shadow-[0_0_15px_rgba(108,92,231,0.3)]"
            >
              {iconMap[link.icon] ?? link.name[0]}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
