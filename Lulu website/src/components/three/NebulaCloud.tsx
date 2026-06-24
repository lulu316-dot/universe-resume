'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface NebulaCloudProps {
  position?: [number, number, number]
  scale?: number
  opacity?: number
  color1?: string
  color2?: string
  rotationZ?: number
}

const nebulaVertex = /* glsl */ `
  varying vec3 vPos;
  varying vec2 vUv;
  void main() {
    vPos = position;
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const nebulaFragment = /* glsl */ `
  varying vec3 vPos;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform float uOpacity;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
      f.y
    );
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.55;
    float f = 1.0;
    for (int i = 0; i < 6; i++) {
      v += a * noise(p * f);
      f *= 2.0;
      a *= 0.45;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    float r = length(uv - 0.5) * 2.0;

    float n1 = fbm(uv * 4.5 + uTime * 0.022);
    float n2 = fbm(uv * 3.0 - uTime * 0.016 + 1.5);
    float n3 = fbm(uv * 6.5 + uTime * 0.01 + 3.0);
    float n4 = fbm(uv * 9.0 - uTime * 0.008 + 5.0);
    float n = n1 * 0.4 + n2 * 0.3 + n3 * 0.2 + n4 * 0.1;

    float falloff = 1.0 - smoothstep(0.0, 1.15, r);
    falloff = pow(falloff, 1.6);

    float alpha = n * falloff * uOpacity;
    vec3 color = mix(uColor1, uColor2, n + sin(uv.x * 2.5 + uTime * 0.015) * 0.35);

    // Brighter center
    color += vec3(0.2, 0.15, 0.35) * (1.0 - r) * 0.3;

    gl_FragColor = vec4(color, alpha);
  }
`

export default function NebulaCloud({
  position = [0, 0, -5],
  scale = 16,
  opacity = 0.12,
  color1 = '#8B5CF6',
  color2 = '#3B82F6',
  rotationZ = 0,
}: NebulaCloudProps) {
  const meshRef = useRef<THREE.Mesh>(null)

  const uniforms = useMemo(() => ({
    uTime: { value: Math.random() * 10 },
    uColor1: { value: new THREE.Color(color1) },
    uColor2: { value: new THREE.Color(color2) },
    uOpacity: { value: opacity },
  }), [color1, color2, opacity])

  useFrame((_, delta) => {
    if (meshRef.current) uniforms.uTime.value += delta
  })

  return (
    <mesh ref={meshRef} position={position} rotation={[0, 0, rotationZ]}>
      <planeGeometry args={[scale, scale]} />
      <shaderMaterial
        vertexShader={nebulaVertex}
        fragmentShader={nebulaFragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  )
}
