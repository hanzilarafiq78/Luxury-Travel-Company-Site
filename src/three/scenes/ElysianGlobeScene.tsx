// ═══════════════════════════════════════════════════════════════
// ELYSIAN — Floating World 3D Globe Scene
// Crafted in Blender 3.6 via MCP & Rendered with Three.js / R3F
// ═══════════════════════════════════════════════════════════════

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Html, Float } from '@react-three/drei';
import * as THREE from 'three';
import { SceneContainer } from './SceneContainer';
import { FloatingParticles } from '../effects/FloatingParticles';

interface MarkerProps {
  position: [number, number, number];
  name: string;
  coords: string;
  color: string;
  active?: boolean;
  onClick?: () => void;
}

function FrontierMarker({ position, name, coords, color, active, onClick }: MarkerProps) {
  const markerRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (markerRef.current) {
      const s = 1 + Math.sin(state.clock.getElapsedTime() * 3) * 0.15;
      markerRef.current.scale.set(s, s, s);
    }
  });

  return (
    <group position={position}>
      {/* Glowing Pulsing Sphere */}
      <mesh ref={markerRef} onClick={onClick}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>

      {/* Atmospheric Halo Ring */}
      <mesh>
        <ringGeometry args={[0.1, 0.14, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>

      {/* Tooltip Overlay */}
      <Html distanceFactor={8} position={[0, 0.15, 0]} center>
        <div className={`elysian-marker-badge ${active ? 'active' : ''}`} onClick={onClick}>
          <span className="marker-dot" style={{ backgroundColor: color }} />
          <span className="marker-name">{name}</span>
          <span className="marker-coords">{coords}</span>
        </div>
      </Html>
    </group>
  );
}

interface GlobeModelProps {
  scrollProgress: number;
  activeChapter: number;
  onSelectFrontier?: (chapterIndex: number) => void;
}

export function ElysianGlobeModel({ scrollProgress, activeChapter, onSelectFrontier }: GlobeModelProps) {
  const globeGroupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/models/elysian_globe.glb');

  // Clone to avoid mutation
  const clonedScene = useMemo(() => {
    const s = scene.clone(true);
    s.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material instanceof THREE.MeshStandardMaterial) {
          child.material.envMapIntensity = 2.0;
          child.material.needsUpdate = true;
        }
      }
    });
    return s;
  }, [scene]);

  useFrame((state) => {
    if (!globeGroupRef.current) return;
    const t = state.clock.getElapsedTime();

    // Base rotation + scroll influence
    globeGroupRef.current.rotation.y = t * 0.08 + scrollProgress * Math.PI * 1.5;
    globeGroupRef.current.rotation.x = 0.2 + Math.sin(t * 0.2) * 0.05 + (scrollProgress > 0.5 ? 0.2 : 0);

    // Zoom/scale based on chapter
    // Chapter 1 (0): scale ~1.1
    // Chapter 2 (0.15): scale ~1.35
    // Regional chapters (0.25 - 0.75): scale down and shift right to let video take stage
    // Chapter 7 & 8: return to full glorious view
    let targetScale = 1.25;
    let targetX = 0;
    let targetY = 0;

    if (scrollProgress < 0.2) {
      targetScale = 1.1 + scrollProgress * 1.5;
      targetX = 0;
    } else if (scrollProgress >= 0.2 && scrollProgress < 0.72) {
      // In regional footage chapters, the globe is smaller & tucked elegantly to top right
      targetScale = 0.55;
      targetX = 2.2;
      targetY = 1.1;
    } else {
      // Pullback in chapter 7 & 8
      targetScale = 1.35;
      targetX = 0;
      targetY = 0;
    }

    globeGroupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.06);
    globeGroupRef.current.position.lerp(new THREE.Vector3(targetX, targetY, 0), 0.06);
  });

  return (
    <group ref={globeGroupRef}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
        <primitive object={clonedScene} />

        {/* Frontier Interactive Markers */}
        <FrontierMarker
          position={[1.2, 0.5, 0.8]}
          name="Tropical Frontier"
          coords="08°20'N, 115°13'E"
          color="#228a8a"
          active={activeChapter === 2}
          onClick={() => onSelectFrontier?.(2)}
        />
        <FrontierMarker
          position={[-0.8, 1.2, 0.4]}
          name="Into the Wild"
          coords="00°45'S, 77°12'W"
          color="#38a169"
          active={activeChapter === 3}
          onClick={() => onSelectFrontier?.(3)}
        />
        <FrontierMarker
          position={[0.5, -1.3, -0.6]}
          name="Silent Desert"
          coords="24°30'N, 137°20'E"
          color="#d97706"
          active={activeChapter === 4}
          onClick={() => onSelectFrontier?.(4)}
        />
        <FrontierMarker
          position={[-0.5, -0.6, 1.3]}
          name="Above the Clouds"
          coords="46°01'N, 07°44'E"
          color="#90cdf4"
          active={activeChapter === 5}
          onClick={() => onSelectFrontier?.(5)}
        />
      </Float>
    </group>
  );
}

interface ElysianGlobeSceneProps {
  scrollProgress: number;
  activeChapter: number;
  onSelectFrontier?: (chapterIndex: number) => void;
}

export function ElysianGlobeScene({ scrollProgress, activeChapter, onSelectFrontier }: ElysianGlobeSceneProps) {
  return (
    <SceneContainer
      className="elysian-globe-canvas"
      cameraPosition={[0, 0, 4.6]}
      cameraFov={42}
      environmentPreset="night"
      enableEffects={true}
      shadows={true}
    >
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[6, 8, 5]} intensity={2.4} color="#faf4de" castShadow />
      <directionalLight position={[-6, -4, -4]} intensity={0.8} color="#1c2847" />
      <pointLight position={[0, 3, 3]} intensity={1.8} color="#d4b24a" distance={12} />

      {/* Floating 3D Globe */}
      <ElysianGlobeModel
        scrollProgress={scrollProgress}
        activeChapter={activeChapter}
        onSelectFrontier={onSelectFrontier}
      />

      {/* Atmospheric Stardust Particles */}
      <FloatingParticles count={120} spread={9} size={0.022} color="#d4b24a" opacity={0.65} />
      <FloatingParticles count={50} spread={7} size={0.016} color="#7ab8b8" opacity={0.4} />
    </SceneContainer>
  );
}

export default ElysianGlobeScene;

