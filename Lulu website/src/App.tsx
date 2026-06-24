import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import ScrollProgress from './components/ui/ScrollProgress'
import PageWrapper from './components/layout/PageWrapper'
import CursorGlow from './components/layout/CursorGlow'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

// ── Eager-loaded (above the fold) ──
import HeroSection from './components/sections/HeroSection'

// ── Lazy-loaded (below the fold) ──
const AboutSection = lazy(() => import('./components/sections/AboutSection'))
const SkillsOrbit = lazy(() => import('./components/sections/SkillsOrbit'))
const ExperienceTimeline = lazy(() => import('./components/sections/ExperienceTimeline'))
const ProjectsGalaxy = lazy(() => import('./components/sections/ProjectsGalaxy'))
const ContactSection = lazy(() => import('./components/sections/ContactSection'))

// ── Shared loading skeleton (matches glass card aesthetic) ──
function SectionSkeleton() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="h-3 w-3 rounded-full bg-primary shadow-[0_0_20px_rgba(108,92,231,0.6)]"
      />
    </div>
  )
}

export default function App() {
  return (
    <PageWrapper>
      <div className="relative min-h-screen bg-cosmic-void text-text-primary" id="main-content">
        <CursorGlow />
        <ScrollProgress />
        <Navbar />

        {/* ── Eager: Hero (first paint critical) ── */}
        <HeroSection />

        {/* ── Lazy: below-fold sections ── */}
        <Suspense fallback={<SectionSkeleton />}>
          <AboutSection />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <SkillsOrbit />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <ExperienceTimeline />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <ProjectsGalaxy />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <ContactSection />
        </Suspense>

        <Footer />
      </div>
    </PageWrapper>
  )
}
