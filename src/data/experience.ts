import type { Experience } from '../types'

export const experiences: Experience[] = [
  {
    id: 'exp-1',
    company: 'Stellar Technologies',
    role: 'Senior Frontend Architect',
    period: '2023 — Present',
    description:
      'Leading the frontend architecture team, building immersive web experiences with React, Three.js, and cutting-edge animation frameworks.',
    highlights: [
      'Architected component library used by 15+ product teams',
      'Reduced bundle size by 40% through code-splitting strategy',
      'Mentored 5 junior developers to senior level',
    ],
  },
  {
    id: 'exp-2',
    company: 'Nebula Software',
    role: 'Frontend Developer',
    period: '2021 — 2023',
    description:
      'Built data visualization dashboards and interactive user interfaces for enterprise clients.',
    highlights: [
      'Shipped 3 major product launches on schedule',
      'Implemented real-time collaboration with WebSocket',
      'Won internal hackathon with AI-powered design tool',
    ],
  },
  {
    id: 'exp-3',
    company: 'Digital Cosmos Agency',
    role: 'Junior Developer',
    period: '2019 — 2021',
    description:
      'Worked on diverse client projects spanning e-commerce, SaaS, and brand experiences.',
    highlights: [
      'Delivered 20+ client websites across 6 industries',
      'Introduced React to replace jQuery codebase',
      'Built agency\'s first design system',
    ],
  },
]
