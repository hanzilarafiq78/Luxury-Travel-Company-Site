// ═══════════════════════════════════════════════════════════════
// Three.js Scene Setup — Cinematic 3D Environment
// ═══════════════════════════════════════════════════════════════

import React, { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  Environment,
  Preload,
  AdaptiveDpr,
  AdaptiveEvents,
  BakeShadows,
} from '@react-three/drei';
import {
  EffectComposer,
  Bloom,
  Vignette,
  ChromaticAberration,
  DepthOfField,
} from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';

// ── Post-Processing Effects ──
function CinematicEffects() {
  return (
    <EffectComposer multisampling={4}>
      <Bloom
        intensity={0.4}
        luminanceThreshold={0.8}
        luminanceSmoothing={0.9}
        mipmapBlur
      />
      <Vignette
        offset={0.3}
        darkness={0.6}
        blendFunction={BlendFunction.NORMAL}
      />
      <ChromaticAberration
        offset={new THREE.Vector2(0.0005, 0.0005)}
        blendFunction={BlendFunction.NORMAL}
        radialModulation={true}
        modulationOffset={0.5}
      />
    </EffectComposer>
  );
}

// ── Loading Fallback ──
function SceneLoader() {
  return (
    <mesh>
      <sphereGeometry args={[0.5, 16, 16]} />
      <meshBasicMaterial color="#d4b24a" wireframe />
    </mesh>
  );
}

// ── Main Scene Container ──
interface SceneContainerProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  enableEffects?: boolean;
  environmentPreset?: 'sunset' | 'dawn' | 'night' | 'warehouse' | 'city' | 'studio';
  cameraPosition?: [number, number, number];
  cameraFov?: number;
  shadows?: boolean;
}

export function SceneContainer({
  children,
  className = '',
  style,
  enableEffects = true,
  environmentPreset = 'sunset',
  cameraPosition = [0, 0, 5],
  cameraFov = 45,
  shadows = true,
}: SceneContainerProps) {
  return (
    <Canvas
      className={className}
      style={style}
      camera={{
        position: cameraPosition,
        fov: cameraFov,
        near: 0.1,
        far: 1000,
      }}
      shadows={shadows}
      dpr={[1, 2]}
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.2,
        outputColorSpace: THREE.SRGBColorSpace,
        powerPreference: 'high-performance',
      }}
      onCreated={({ gl }) => {
        gl.setClearColor(new THREE.Color('#0a0e1a'), 0);
      }}
    >
      <Suspense fallback={<SceneLoader />}>
        {/* Adaptive performance */}
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />

        {/* Environment lighting */}
        <Environment preset={environmentPreset} />

        {/* Scene content */}
        {children}

        {/* Post-processing */}
        {enableEffects && <CinematicEffects />}

        {/* Optimizations */}
        {shadows && <BakeShadows />}
        <Preload all />
      </Suspense>
    </Canvas>
  );
}

export default SceneContainer;

