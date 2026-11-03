// ═══════════════════════════════════════════════════════════════
// GSAP Module Declarations
// Required for GSAP Club plugins (ScrollSmoother, SplitText, etc.)
// ═══════════════════════════════════════════════════════════════

declare module 'gsap/ScrollSmoother' {
  import { Plugin } from 'gsap';

  interface ScrollSmootherVars {
    wrapper?: string | HTMLElement;
    content?: string | HTMLElement;
    smooth?: number;
    effects?: boolean | string;
    smoothTouch?: boolean | number;
    normalizeScroll?: boolean;
    ignoreMobileResize?: boolean;
    onUpdate?: (self: ScrollSmoother) => void;
    onStop?: (self: ScrollSmoother) => void;
  }

  class ScrollSmoother extends Plugin {
    static create(vars: ScrollSmootherVars): ScrollSmoother;
    static get(): ScrollSmoother | undefined;
    content: HTMLElement;
    wrapper: HTMLElement;
    smooth: number;
    effects(targets: string | HTMLElement[], config?: object): void;
    scrollTo(target: string | HTMLElement | number, smooth?: boolean, position?: string): void;
    paused(value?: boolean): boolean;
    kill(): void;
  }

  export { ScrollSmoother };
  export default ScrollSmoother;
}

declare module 'gsap/SplitText' {
  import { Plugin } from 'gsap';

  interface SplitTextVars {
    type?: string;
    charsClass?: string;
    wordsClass?: string;
    linesClass?: string;
  }

  class SplitText extends Plugin {
    constructor(target: string | HTMLElement, vars?: SplitTextVars);
    chars: HTMLElement[];
    words: HTMLElement[];
    lines: HTMLElement[];
    revert(): void;
    split(vars?: SplitTextVars): void;
  }

  export { SplitText };
  export default SplitText;
}

declare module 'gsap/CustomEase' {
  import { Plugin } from 'gsap';

  class CustomEase extends Plugin {
    static create(name: string, path: string): typeof CustomEase;
    static get(name: string): (progress: number) => number;
  }

  export { CustomEase };
  export default CustomEase;
}

