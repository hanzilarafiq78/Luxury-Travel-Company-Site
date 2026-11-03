// ═══════════════════════════════════════════════════════════════
// Hero 3D Scene — Interactive Luxury Centerpiece
// ═══════════════════════════════════════════════════════════════

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Torus } from '@react-three/drei';
import * as THREE from 'three';
import { SceneContainer } from './SceneContainer';
import { FloatingParticles } from '../effects/FloatingParticles';

function CentralMonument() {
  const outerRingRef = useRef<THREE.Mesh>(null);
  const innerRingRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (outerRingRef.current) {
      outerRingRef.current.rotation.x = t * 0.15;
      outerRingRef.current.rotation.y = t * 0.2;
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.x = -t * 0.25;
      innerRingRef.current.rotation.z = t * 0.18;
    }
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.1;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Floating Centerpiece */}
      <Float speed={2} rotationIntensity={0.6} floatIntensity={0.8}>
        {/* Core Organic Luxury Sphere */}
        <Sphere ref={coreRef} args={[1.1, 64, 64]}>
          <MeshDistortMaterial
            color="#121829"
            roughness={0.15}
            metalness={0.9}
            distort={0.25}
            speed={1.5}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </Sphere>

        {/* Champagne Gold Orbital Rings */}
        <Torus ref={outerRingRef} args={[1.8, 0.02, 32, 100]}>
          <meshStandardMaterial
            color="#d4b24a"
            metalness={0.95}
            roughness={0.2}
            emissive="#5c4a1e"
            emissiveIntensity={0.2}
          />
        </Torus>

        <Torus ref={innerRingRef} args={[1.45, 0.015, 32, 100]} rotation={[Math.PI / 3, 0, 0]}>
          <meshStandardMaterial
            color="#e0c56e"
            metalness={0.98}
            roughness={0.15}
            emissive="#d4b24a"
            emissiveIntensity={0.15}
          />
        </Torus>
      </Float>
    </group>
  );
}

function DynamicLighting() {
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const { pointer } = state;
    if (lightRef.current) {
      lightRef.current.position.x = pointer.x * 3;
      lightRef.current.position.y = pointer.y * 3 + 2;
    }
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 8, 5]} intensity={1.5} color="#faf4de" castShadow />
      <pointLight ref={lightRef} position={[0, 2, 4]} intensity={2.5} color="#d4b24a" distance={10} />
      <pointLight position={[-4, -2, -3]} intensity={1.2} color="#1c7676" />
    </>
  );
}

export function HeroScene() {
  return (
    <SceneContainer
      className="hero__3d-canvas"
      cameraPosition={[0, 0, 4.5]}
      cameraFov={42}
      environmentPreset="city"
      enableEffects={true}
    >
      <DynamicLighting />
      <CentralMonument />
      <FloatingParticles count={140} spread={8} size={0.025} color="#d4b24a" opacity={0.7} />
      <FloatingParticles count={60} spread={6} size={0.018} color="#7ab8b8" opacity={0.5} />
    </SceneContainer>
  );
}

export default HeroScene;

