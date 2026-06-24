import * as THREE from 'three'

/**
 * Generate a random float within a range, optionally snapped to grid.
 */
export function rand(min: number, max: number, snap = 0): number {
  const r = Math.random() * (max - min) + min
  return snap ? Math.round(r / snap) * snap : r
}

/**
 * Generate a random point inside a sphere of given radius.
 */
export function randomPointInSphere(radius: number): [number, number, number] {
  const u = Math.random()
  const v = Math.random()
  const theta = 2 * Math.PI * u
  const phi = Math.acos(2 * v - 1)
  const r = radius * Math.cbrt(Math.random())
  return [
    r * Math.sin(phi) * Math.cos(theta),
    r * Math.sin(phi) * Math.sin(theta),
    r * Math.cos(phi),
  ]
}

/**
 * HSV → RGB (each 0–1).
 */
export function hsvToRgb(h: number, s: number, v: number): [number, number, number] {
  const i = Math.floor(h * 6)
  const f = h * 6 - i
  const p = v * (1 - s)
  const q = v * (1 - f * s)
  const t = v * (1 - (1 - f) * s)
  let r: number, g: number, b: number
  switch (i % 6) {
    case 0: r = v; g = t; b = p; break
    case 1: r = q; g = v; b = p; break
    case 2: r = p; g = v; b = t; break
    case 3: r = p; g = q; b = v; break
    case 4: r = t; g = p; b = v; break
    default: r = v; g = p; b = q; break
  }
  return [r, g, b]
}

/**
 * Create a smooth-star-colors palette in a Float32Array.
 */
export function createStarPalette(count: number): Float32Array {
  const colors = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const hue = 0.6 + Math.random() * 0.25 // blue → purple
    const sat = 0.3 + Math.random() * 0.5
    const val = 0.5 + Math.random() * 0.5
    const [r, g, b] = hsvToRgb(hue, sat, val)
    colors[i * 3] = r
    colors[i * 3 + 1] = g
    colors[i * 3 + 2] = b
  }
  return colors
}

/**
 * Dispose a Three.js object and its children.
 */
export function dispose(obj: THREE.Object3D) {
  obj.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.geometry?.dispose()
      if (Array.isArray(child.material)) {
        child.material.forEach((m) => m.dispose())
      } else {
        child.material?.dispose()
      }
    }
  })
}
