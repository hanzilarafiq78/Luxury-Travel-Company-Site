// ═══════════════════════════════════════════════════════════════
// Global Type Declarations
// ═══════════════════════════════════════════════════════════════

/// <reference types="vite/client" />

// GLB/GLTF file imports
declare module '*.glb' {
  const src: string;
  export default src;
}

declare module '*.gltf' {
  const src: string;
  export default src;
}

// HDR environment maps
declare module '*.hdr' {
  const src: string;
  export default src;
}

declare module '*.exr' {
  const src: string;
  export default src;
}

// Image formats
declare module '*.webp' {
  const src: string;
  export default src;
}

declare module '*.avif' {
  const src: string;
  export default src;
}

// Video
declare module '*.mp4' {
  const src: string;
  export default src;
}

declare module '*.webm' {
  const src: string;
  export default src;
}

