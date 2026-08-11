/// <reference types="vite/client" />

declare module '@components-css/*.css';
declare module '@platform-web/theme.js';

interface Window {
  TheGallery?: {
    enhanceSelects: (root?: ParentNode) => void;
    enhanceTextareas: (root?: ParentNode) => void;
    enhanceCheckboxes: (root?: ParentNode) => void;
    enhanceQuantities: (root?: ParentNode) => void;
    enhanceSliders: (root?: ParentNode) => void;
    enhanceComboboxes: (root?: ParentNode) => void;
    enhanceDatepickers: (root?: ParentNode) => void;
    enhanceToggleGroups: (root?: ParentNode) => void;
    enhanceCountdowns: (root?: ParentNode) => void;
    refreshCountdowns: () => void;
    enhanceMarquees: (root?: ParentNode) => void;
    enhanceAnnouncements: (root?: ParentNode) => void;
    enhanceHeroes: (root?: ParentNode) => void;
    enhanceReadingProgress: (root?: ParentNode) => void;
    enhanceFileUploads: (root?: ParentNode) => void;
    enhanceFilterPanels: (root?: ParentNode) => void;
    destroyFilterPanels: (root?: ParentNode) => void;
  };
}

declare module '*.mdx' {
  import type { ComponentType } from 'react';
  const Component: ComponentType<Record<string, unknown>>;
  export default Component;
}
