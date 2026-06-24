# Cosmic CV — Project Documentation

A deeply immersive personal portfolio website built with React + Three.js + Framer Motion.

## 🚀 Quick Start

```bash
npm install
npm run dev        # dev server at http://localhost:5173
npm run build      # production build → dist/
npm run preview    # preview production build
```

## 🧱 Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React 19 + TypeScript |
| Build | Vite 8 |
| Styling | Tailwind CSS v4 (custom cosmic theme) |
| 3D | Three.js + @react-three/fiber + @react-three/drei |
| Animation | Framer Motion v12 |
| Fonts | Orbitron, Inter, JetBrains Mono (Google Fonts) |

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/        # CursorGlow, Navbar, Footer, PageWrapper
│   ├── three/         # StarField, Scene, InteractivePlanet, OrbitRing, NebulaCloud
│   ├── ui/            # GlassCard, GlowButton, GlowText, SectionTitle, GradientBorder, ScrollProgress
│   └── sections/      # HeroSection, AboutSection, SkillsOrbit, ExperienceTimeline, ProjectsGalaxy, ContactSection
├── hooks/             # useMousePosition, useScrollProgress, useIntersectionObserver, useParallax
├── data/              # skills.ts, experience.ts, projects.ts, social.ts, navigation.ts
├── types/             # TypeScript interfaces
├── utils/             # cn(), three-helpers.ts
├── App.tsx            # Root component with lazy-loaded sections
├── main.tsx           # Entry point
└── index.css          # Tailwind imports + cosmic design tokens + global utilities
```

## 🎨 Design System

### Colors
- **Deep Space**: `#0A0A1A`
- **Cosmic Void**: `#06060F`
- **Primary (Nebula Purple)**: `#6C5CE7`
- **Secondary (Nebula Blue)**: `#3B82F6`
- **Accent (Aurora Cyan)**: `#00F5D4`
- **Star Gold**: `#F9A826`
- **Rose Nebula**: `#E040FB`

### Glassmorphism
Two glass utilities available: `.glass` (standard) and `.glass-strong` (heavy blur).

### Typography
- Headings: Orbitron (geometric, futuristic)
- Body: Inter (clean, readable)
- Code/Accents: JetBrains Mono

## 🎬 Component Highlights

### Loading Screen (PageWrapper)
Big Bang animation: white dot gather → 40-particle explosion → logo fade-in → homepage reveal (2.4s total).

### 3D Components
- **StarField**: 5000 particles (1500 on mobile), custom GLSL shaders with twinkle + soft glow
- **InteractivePlanet**: Procedural FBM noise surface, Fresnel atmosphere edge glow, orbit motion, hover-to-scale
- **OrbitRing**: Dashed ring + orbiting dot indicators
- **NebulaCloud**: FBM noise volumetric cloud with additive blending
- **SkillsOrbit**: 4 tilted orbit rings, 15 skill planets, center core, click-to-detail panel
- **ProjectsGalaxy**: 4 spiral galaxies (1200 particles each, 4 arms) with color gradients

### UI Components
- **GlassCard**: 3 hover modes (lift, glow, tilt with perspective tracking)
- **GlowButton**: 3 variants (primary glow, secondary accent, glass) + 3 sizes
- **SectionTitle**: Orbital decorative line + orbiting dot animation
- **GradientBorder**: Conic gradient border that follows cursor angle
- **ScrollProgress**: Gradient progress bar driven by scroll position

## 🛠️ Custom Hooks

| Hook | Purpose |
|------|---------|
| `useMousePosition` | Track cursor with normalized coordinates |
| `useScrollProgress` | Scroll percentage (0–1) |
| `useIntersectionObserver` | Element visibility detection |
| `useParallax` | Scroll-driven parallax offset |

## ☁️ Deployment

Pre-configured for **Vercel**. Just connect the repo and deploy.

### Manual deploy:
```bash
npm run build
npx vercel --prod
```

### Security headers configured:
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- Immutable cache for `/assets/*`

## ♿ Accessibility

- Skip-to-content link (visible on focus)
- ARIA labels on interactive elements
- `prefers-reduced-motion` respected globally
- Semantic HTML structure
- Keyboard-navigable mobile menu

## 📱 Mobile Strategy

- Three.js particle count reduced from 5000 → 1500 on <768px
- Canvas precision downgraded to `mediump` for performance
- Hamburger slide-out menu with spring animation
- Responsive grid layouts in all sections

## 🔮 Future Enhancements

- [ ] Real contact form backend (Resend / Formspree / API route)
- [ ] CMS integration for editable content
- [ ] Sound design (ambient background + UI hover sounds)
- [ ] 3D avatar model replacement (GLTF)
- [ ] Blog section with MDX
