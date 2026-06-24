'use client'

import { useRef, useMemo, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface InteractivePlanetProps {
  position?: [number, number, number]
  radius?: number
  baseColor?: string
  hoverColor?: string
  label?: string
  orbitRadius?: number
  orbitSpeed?: number
  onClick?: () => void
  hasRing?: boolean
}

const vertexShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec3 vWorldPosition;
  varying vec2 vUv;

  void main() {
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPos.xyz;
    vNormal = normalize(mat3(modelMatrix) * normal);
    vPosition = position;
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec3 vWorldPosition;
  varying vec2 vUv;
  uniform vec3 uBaseColor;
  uniform vec3 uHoverColor;
  uniform float uHover;
  uniform float uTime;
  uniform vec3 uViewPosition;

  float hash(vec3 p) {
    return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453);
  }

  float noise(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(mix(hash(i), hash(i + vec3(1,0,0)), f.x),
          mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
      mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
          mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y), f.z);
  }

  float fbm(vec3 p) {
    float v = 0.0;
    float a = 0.5;
    float f = 1.0;
    for (int i = 0; i < 5; i++) {
      v += a * noise(p * f);
      f *= 2.1;
      a *= 0.45;
    }
    return v;
  }

  void main() {
    vec3 N = normalize(vNormal);
    vec3 V = normalize(uViewPosition - vWorldPosition);

    // Vibrant Fresnel — much stronger atmosphere
    float fresnel = pow(1.0 - abs(dot(N, V)), 2.2);
    float fresnelEdge = pow(1.0 - abs(dot(N, V)), 4.5);
    float fresnelCore = pow(1.0 - abs(dot(N, V)), 7.0);

    // Surface detail with more contrast
    float n1 = fbm(vPosition * 4.5 + uTime * 0.08);
    float n2 = fbm(vPosition * 8.5 - uTime * 0.12);
    float n3 = fbm(vPosition * 18.0 + uTime * 0.06);
    float surfaceDetail = n1 * 0.45 + n2 * 0.35 + n3 * 0.2;

    // Brighter surface
    vec3 surfaceColor = mix(uBaseColor, uHoverColor, uHover * 0.6);
    surfaceColor = mix(surfaceColor * 0.6, surfaceColor * 1.6, surfaceDetail);

    // Stronger lighting
    vec3 lightDir = normalize(vec3(1.0, 0.5, 0.4));
    float diffuse = dot(N, lightDir) * 0.5 + 0.5;
    float specular = pow(max(dot(reflect(-lightDir, N), V), 0.0), 24.0) * 0.5;

    // Bright atmosphere glow
    vec3 atmosColor = mix(uBaseColor, vec3(0.7, 0.85, 1.0), 0.55) * 2.8;

    // Build color
    vec3 color = surfaceColor * (0.3 + diffuse * 0.6);
    color += specular * uBaseColor * 2.0;

    // Thick fresnel atmosphere halo
    color += atmosColor * fresnel * (0.7 + uHover * 0.6);
    // Sharp edge glow
    color += atmosColor * fresnelEdge * 0.5;
    // Inner bright ring
    color += atmosColor * fresnelCore * 0.4;

    // Hover brightening
    color *= 1.0 + uHover * 0.5;
    // Boost overall brightness
    color *= 1.15;

    gl_FragColor = vec4(color, 1.0);
  }
`

export default function InteractivePlanet({
  position = [0, 0, 0],
  radius = 0.6,
  baseColor = '#8B5CF6',
  hoverColor = '#C4B5FD',
  label: _label,
  orbitRadius = 0,
  orbitSpeed = 0,
  onClick,
  hasRing = false,
}: InteractivePlanetProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)
  const ringRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)
  const [hover, setHover] = useState(false)
  const angleRef = useRef(Math.random() * Math.PI * 2)
  const spinRef = useRef(0)

  const uniforms = useMemo(() => ({
    uBaseColor: { value: new THREE.Color(baseColor) },
    uHoverColor: { value: new THREE.Color(hoverColor) },
    uHover: { value: 0 },
    uTime: { value: 0 },
    uViewPosition: { value: new THREE.Vector3(0, 0, 8) },
  }), [baseColor, hoverColor])

  const ringGeo = useMemo(() => {
    const g = new THREE.RingGeometry(radius * 1.35, radius * 2.3, 160)
    g.rotateX(Math.PI / 2 + 0.4)
    return g
  }, [radius])

  useFrame(({ camera }, delta) => {
    if (groupRef.current && orbitRadius > 0) {
      angleRef.current += delta * orbitSpeed * 0.45
      groupRef.current.position.x = Math.cos(angleRef.current) * orbitRadius
      groupRef.current.position.z = Math.sin(angleRef.current) * orbitRadius * 0.5
    }

    if (meshRef.current) {
      spinRef.current += delta * 2.0
      meshRef.current.rotation.y = spinRef.current

      const target = hover ? 1.4 : 1.0
      const s = THREE.MathUtils.lerp(meshRef.current.scale.x, target, 0.18)
      meshRef.current.scale.setScalar(s)

      uniforms.uHover.value = THREE.MathUtils.lerp(uniforms.uHover.value, hover ? 1 : 0, 0.2)
      uniforms.uTime.value += delta
      uniforms.uViewPosition.value.copy(camera.position)
    }

    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.5
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1 + Math.sin(Date.now() * 0.002) * 0.04)
    }
  })

  return (
    <group ref={groupRef}>
      {/* ── Outer glow halo (always visible) ── */}
      <mesh ref={glowRef} position={position}>
        <sphereGeometry args={[radius * 1.5, 32, 32]} />
        <meshBasicMaterial
          color={baseColor}
          transparent
          opacity={0.08}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>

      {/* ── Saturn ring ── */}
      {hasRing && (
        <mesh ref={ringRef} position={position}>
          <primitive object={ringGeo} attach="geometry" />
          <meshBasicMaterial
            color={hover ? hoverColor : baseColor}
            transparent
            opacity={hover ? 0.45 : 0.22}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      )}

      {/* ── Planet body ── */}
      <mesh
        ref={meshRef}
        position={position}
        onClick={(e) => { e.stopPropagation(); onClick?.() }}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
      >
        <sphereGeometry args={[radius, 80, 80]} />
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
        />
      </mesh>

      {/* ── Inner atmosphere (backside bloom) ── */}
      <mesh position={position} scale={[1.3, 1.3, 1.3]}>
        <sphereGeometry args={[radius, 48, 48]} />
        <meshBasicMaterial
          color={hover ? hoverColor : baseColor}
          transparent
          opacity={hover ? 0.28 : 0.12}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>

      {/* ── Front atmosphere rim ── */}
      <mesh position={position} scale={[1.1, 1.1, 1.1]}>
        <sphereGeometry args={[radius, 48, 48]} />
        <meshBasicMaterial
          color={baseColor}
          transparent
          opacity={hover ? 0.15 : 0.06}
          side={THREE.FrontSide}
          depthWrite={false}
        />
      </mesh>

      {/* ── Hover lights ── */}
      {hover && (
        <>
          <pointLight position={position} color={hoverColor} intensity={4} distance={5} />
          <pointLight position={[position[0], position[1] + 1, position[2]]} color={baseColor} intensity={2} distance={3} />
        </>
      )}
    </group>
  )
}
