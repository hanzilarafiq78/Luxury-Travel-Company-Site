// ═══════════════════════════════════════════════════════════════
// GLB Model Loader — For Blender Exports
// ═══════════════════════════════════════════════════════════════

import React, { useRef, useEffect, useMemo } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ModelLoaderProps {
  url: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number | [number, number, number];
  castShadow?: boolean;
  receiveShadow?: boolean;
  autoRotate?: boolean;
  rotationSpeed?: number;
  playAnimation?: string | boolean;
  onClick?: () => void;
  onPointerOver?: () => void;
  onPointerOut?: () => void;
}

export function ModelLoader({
  url,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  castShadow = true,
  receiveShadow = true,
  autoRotate = false,
  rotationSpeed = 0.005,
  playAnimation = false,
  onClick,
  onPointerOver,
  onPointerOut,
}: ModelLoaderProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF(url);
  const { actions } = useAnimations(animations, groupRef);

  // Clone scene to avoid mutation issues with multiple instances
  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  // Apply shadows to all meshes
  useEffect(() => {
    clonedScene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = castShadow;
        child.receiveShadow = receiveShadow;

        // Enhance materials for luxury look
        if (child.material instanceof THREE.MeshStandardMaterial) {
          child.material.envMapIntensity = 1.5;
          child.material.needsUpdate = true;
        }
      }
    });
  }, [clonedScene, castShadow, receiveShadow]);

  // Play animations
  useEffect(() => {
    if (!playAnimation || !actions) return;

    if (typeof playAnimation === 'string' && actions[playAnimation]) {
      actions[playAnimation]?.play();
    } else if (playAnimation === true) {
      // Play first animation
      const firstAction = Object.values(actions)[0];
      firstAction?.play();
    }

    return () => {
      Object.values(actions).forEach((action) => action?.stop());
    };
  }, [playAnimation, actions]);

  // Auto-rotate
  useFrame(() => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += rotationSpeed;
    }
  });

  const scaleArray: [number, number, number] = Array.isArray(scale)
    ? scale
    : [scale, scale, scale];

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      scale={scaleArray}
      onClick={onClick}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
    >
      <primitive object={clonedScene} />
    </group>
  );
}

// Preload helper
export function preloadModel(url: string): void {
  useGLTF.preload(url);
}

export default ModelLoader;

