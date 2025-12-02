/// <reference types="astro/client" />

declare module '*.json' {
  const value: any;
  export default value;
}

declare module 'astro:content' {
  interface Render {
    '.astro': Promise<{
      Content: import('astro').AstroComponent;
    }>;
  }
} 