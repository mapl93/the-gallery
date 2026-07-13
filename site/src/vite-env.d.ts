/// <reference types="vite/client" />

declare module '@components-css/*.css';
declare module '@platform-web/theme.js';

interface Window {
  TheGallery?: {
    enhanceSelects: (root?: ParentNode) => void;
    enhanceTextareas: (root?: ParentNode) => void;
    enhanceCheckboxes: (root?: ParentNode) => void;
    enhanceQuantities: (root?: ParentNode) => void;
    enhanceToggleGroups: (root?: ParentNode) => void;
  };
}

declare module '*.mdx' {
  import type { ComponentType } from 'react';
  const Component: ComponentType<Record<string, unknown>>;
  export default Component;
}
