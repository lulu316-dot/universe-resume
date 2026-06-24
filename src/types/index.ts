export interface Skill {
  name: string
  category: 'frontend' | 'backend' | 'design' | 'tools'
  level: number // 0–100
  icon?: string
  color?: string
}

export interface Experience {
  id: string
  company: string
  role: string
  period: string
  description: string
  highlights: string[]
}

export interface Project {
  id: string
  name: string
  description: string
  tech: string[]
  image?: string
  link?: string
  github?: string
}

export interface SocialLink {
  name: string
  url: string
  icon: string
}

export interface NavItem {
  label: string
  href: string
}
