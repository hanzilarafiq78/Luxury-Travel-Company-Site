// ═══════════════════════════════════════════════════════════════
// Floating Particles Effect — Ambient Luxury Particles
// ═══════════════════════════════════════════════════════════════

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FloatingParticlesProps {
  count?: number;
  size?: number;
  color?: string;
  spread?: number;
  speed?: number;
  opacity?: number;
}

export function FloatingParticles({
  count = 200,
  size = 0.02,
  color = '#d4b24a',
  spread = 10,
  speed = 0.2,
  opacity = 0.6,
}: FloatingParticlesProps) {
  const meshRef = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const speeds = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * spread;
      positions[i * 3 + 1] = (Math.random() - 0.5) * spread;
      positions[i * 3 + 2] = (Math.random() - 0.5) * spread;
      scales[i] = Math.random();
      speeds[i] = 0.5 + Math.random() * 1.5;
    }

    return { positions, scales, speeds };
  }, [count, spread]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime() * speed;
    const posArray = meshRef.current.geometry.attributes.position
      .array as Float32Array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      posArray[i3 + 1] += Math.sin(time * particles.speeds[i] + i) * 0.001;
      posArray[i3] += Math.cos(time * particles.speeds[i] * 0.5 + i) * 0.0005;
    }

    meshRef.current.geometry.attributes.position.needsUpdate = true;
    meshRef.current.rotation.y = time * 0.02;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles.positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color={color}
        transparent
        opacity={opacity}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default FloatingParticles;

