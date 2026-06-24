import type { Project } from '../types'

export const projects: Project[] = [
  {
    id: 'proj-1',
    name: 'Cosmic Dashboard',
    description:
      'Real-time analytics dashboard with 3D data visualization, dark mode, and customizable widgets.',
    tech: ['React', 'TypeScript', 'Three.js', 'D3.js', 'WebSocket'],
    link: 'https://github.com/yourusername/cosmic-dashboard',
    github: 'https://github.com/yourusername/cosmic-dashboard',
  },
  {
    id: 'proj-2',
    name: 'Stellar UI Kit',
    description:
      'Open-source component library with 60+ accessible, animated UI components for React.',
    tech: ['React', 'Storybook', 'Tailwind CSS', 'Framer Motion', 'Vitest'],
    link: 'https://stellar-ui.dev',
    github: 'https://github.com/yourusername/stellar-ui',
  },
  {
    id: 'proj-3',
    name: 'Orbit Planner',
    description:
      'Collaborative project management tool with Gantt charts, kanban boards, and AI sprint planning.',
    tech: ['Next.js', 'Prisma', 'PostgreSQL', 'tRPC', 'OpenAI'],
    link: 'https://orbitplanner.app',
    github: 'https://github.com/yourusername/orbit-planner',
  },
  {
    id: 'proj-4',
    name: 'Nova Chat',
    description:
      'Real-time messaging app with end-to-end encryption, voice calls, and file sharing.',
    tech: ['React Native', 'Socket.io', 'Node.js', 'MongoDB', 'WebRTC'],
    link: 'https://novachat.app',
    github: 'https://github.com/yourusername/nova-chat',
  },
]
