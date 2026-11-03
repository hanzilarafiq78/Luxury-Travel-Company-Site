// ═══════════════════════════════════════════════════════════════
// Luxury Gradient Shader — Custom Background Material
// ═══════════════════════════════════════════════════════════════

import * as THREE from 'three';
import { shaderMaterial } from '@react-three/drei';

const LuxuryGradientMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor1: new THREE.Color('#0a0e1a'),
    uColor2: new THREE.Color('#151e38'),
    uColor3: new THREE.Color('#1c7676'),
    uAccent: new THREE.Color('#d4b24a'),
    uMouse: new THREE.Vector2(0, 0),
    uResolution: new THREE.Vector2(1, 1),
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    varying vec3 vPosition;
    
    void main() {
      vUv = uv;
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform float uTime;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform vec3 uColor3;
    uniform vec3 uAccent;
    uniform vec2 uMouse;
    uniform vec2 uResolution;
    
    varying vec2 vUv;
    varying vec3 vPosition;
    
    // Simplex noise
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }
    
    float snoise(vec2 v) {
      const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                         -0.577350269189626, 0.024390243902439);
      vec2 i = floor(v + dot(v, C.yy));
      vec2 x0 = v - i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod289(i);
      vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
      vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
      m = m * m;
      m = m * m;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
      vec3 g;
      g.x = a0.x * x0.x + h.x * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }
    
    void main() {
      vec2 uv = vUv;
      float time = uTime * 0.15;
      
      // Animated noise layers
      float noise1 = snoise(uv * 2.0 + time * 0.3) * 0.5 + 0.5;
      float noise2 = snoise(uv * 4.0 - time * 0.2) * 0.5 + 0.5;
      float noise3 = snoise(uv * 1.5 + time * 0.1 + uMouse * 0.1) * 0.5 + 0.5;
      
      // Gradient mixing
      vec3 color = mix(uColor1, uColor2, uv.y + noise1 * 0.3);
      color = mix(color, uColor3, noise2 * 0.15);
      
      // Accent glow based on mouse proximity
      float mouseGlow = smoothstep(0.5, 0.0, length(uv - uMouse * 0.5 - 0.5));
      color = mix(color, uAccent, mouseGlow * 0.08 * noise3);
      
      // Subtle vignette
      float vignette = smoothstep(1.2, 0.4, length(uv - 0.5) * 1.5);
      color *= vignette;
      
      gl_FragColor = vec4(color, 1.0);
    }
  `
);

export default LuxuryGradientMaterial;

// Type augmentation for JSX
declare global {
  namespace JSX {
    interface IntrinsicElements {
      luxuryGradientMaterial: any;
    }
  }
}

