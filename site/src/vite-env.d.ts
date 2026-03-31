/// <reference types="vite/client" />

declare module '@components-css/*.css';

declare module '*.mdx' {
  import type { ComponentType } from 'react';
  const Component: ComponentType<Record<string, unknown>>;
  export default Component;
}
