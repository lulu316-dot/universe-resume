import type { Skill } from '../types'

export const skills: Skill[] = [
  // ── Frontend ──
  { name: 'React', category: 'frontend', level: 95, color: '#61DAFB' },
  { name: 'TypeScript', category: 'frontend', level: 90, color: '#3178C6' },
  { name: 'Next.js', category: 'frontend', level: 88, color: '#FFFFFF' },
  { name: 'Tailwind CSS', category: 'frontend', level: 92, color: '#06B6D4' },
  { name: 'Vue.js', category: 'frontend', level: 75, color: '#4FC08D' },

  // ── Backend ──
  { name: 'Node.js', category: 'backend', level: 85, color: '#339933' },
  { name: 'Python', category: 'backend', level: 80, color: '#3776AB' },
  { name: 'PostgreSQL', category: 'backend', level: 78, color: '#4169E1' },
  { name: 'GraphQL', category: 'backend', level: 72, color: '#E10098' },

  // ── Design ──
  { name: 'Figma', category: 'design', level: 85, color: '#F24E1E' },
  { name: 'Three.js', category: 'design', level: 80, color: '#FFFFFF' },
  { name: 'Framer Motion', category: 'design', level: 82, color: '#0055FF' },

  // ── Tools ──
  { name: 'Docker', category: 'tools', level: 75, color: '#2496ED' },
  { name: 'Git', category: 'tools', level: 90, color: '#F05032' },
  { name: 'Vite', category: 'tools', level: 88, color: '#BD34FE' },
]

export const categoryColors: Record<Skill['category'], string> = {
  frontend: '#61DAFB',
  backend: '#339933',
  design: '#F24E1E',
  tools: '#BD34FE',
}

export const categoryLabels: Record<Skill['category'], string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  design: 'Design',
  tools: 'DevOps & Tools',
}
