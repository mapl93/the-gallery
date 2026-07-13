import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourceBuildDir = path.join(repoRoot, 'tokens', 'source', 'build', 'css');
const webDir = path.join(repoRoot, 'platforms', 'web');
const destination = path.join(webDir, 'tokens.css');

const viewports = [
  { name: 'mobile', media: null },
  { name: 'tablet', media: '(min-width: 768px)' },
  { name: 'desktop', media: '(min-width: 1024px)' },
  { name: 'xl', media: '(min-width: 1440px)' }
];

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function readCss(theme, viewport) {
  const filePath = path.join(sourceBuildDir, `${theme}.${viewport}.css`);
  assert(fs.existsSync(filePath), `${path.relative(repoRoot, filePath)} does not exist. Run npm run build:tokens:source first.`);
  return fs.readFileSync(filePath, 'utf8');
}

function extractDeclarations(css, label) {
  const match = css.match(/:root\s*\{([\s\S]*?)\n\}/);
  assert(match, `Could not find :root block in ${label}`);

  return match[1]
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}

function shadowAlias(name) {
  return `--shadow-${name}: var(--tg-shadow-${name}-x) var(--tg-shadow-${name}-y) var(--tg-shadow-${name}-blur) var(--tg-shadow-${name}-spread) var(--tg-shadow-${name}-color);`;
}

function publicAliasDeclarations() {
  return [
    '--color-surface-primary: var(--tg-color-surface-primary);',
    '--color-surface-secondary: var(--tg-color-surface-secondary);',
    '--color-surface-archival: var(--tg-color-surface-archival);',
    '--color-surface-statement: var(--tg-color-surface-statement);',
    '--color-text-primary: var(--tg-color-text-primary);',
    '--color-text-secondary: var(--tg-color-text-secondary);',
    '--color-text-disabled: color-mix(in srgb, var(--tg-color-text-secondary) 60%, transparent);',
    '--color-text-inverse: var(--tg-color-text-inverse);',
    '--color-text-accent: var(--tg-color-text-statement);',
    '--color-border-subtle: var(--tg-color-border-default);',
    '--color-border-default: var(--tg-color-border-default);',
    '--color-border-strong: var(--tg-color-border-strong);',
    '--color-border-focus: var(--tg-color-text-primary);',
    '--color-border-focus-subtle: color-mix(in srgb, var(--color-border-focus) 15%, transparent);',
    '--color-border-decorative: var(--tg-color-border-archival);',
    '--color-feedback-info-bg: var(--tg-color-feedback-info-background);',
    '--color-feedback-info-default: var(--tg-color-feedback-info-default);',
    '--color-feedback-success-bg: var(--tg-color-feedback-success-background);',
    '--color-feedback-success-default: var(--tg-color-feedback-success-default);',
    '--color-feedback-warning-bg: var(--tg-color-feedback-warning-background);',
    '--color-feedback-warning-default: var(--tg-color-feedback-warning-default);',
    '--color-feedback-error-bg: var(--tg-color-feedback-error-background);',
    '--color-feedback-error-default: var(--tg-color-feedback-error-default);',

    '--color-button-primary-bg-default: var(--tg-component-button-primary-background-default);',
    '--color-button-primary-bg-hover: var(--tg-component-button-primary-background-hover);',
    '--color-button-primary-bg-active: var(--tg-component-button-primary-background-active);',
    '--color-button-primary-text: var(--tg-component-button-primary-text);',
    '--color-button-primary-text-default: var(--tg-component-button-primary-text);',
    '--color-button-primary-text-hover: var(--tg-component-button-primary-text);',
    '--color-button-primary-text-active: var(--tg-component-button-primary-text);',
    '--color-button-primary-border-default: var(--tg-component-button-primary-border);',
    '--color-button-primary-border-hover: var(--tg-component-button-primary-border);',
    '--color-button-primary-border-active: var(--tg-component-button-primary-border);',
    '--color-button-secondary-bg-default: var(--tg-component-button-secondary-background-default);',
    '--color-button-secondary-bg-hover: var(--tg-component-button-secondary-background-hover);',
    '--color-button-secondary-bg-active: var(--tg-component-button-secondary-background-active);',
    '--color-button-secondary-text-default: var(--tg-component-button-secondary-text);',
    '--color-button-secondary-text-hover: var(--tg-component-button-secondary-text);',
    '--color-button-secondary-text-active: var(--tg-component-button-secondary-text);',
    '--color-button-secondary-border-default: var(--tg-component-button-secondary-border);',
    '--color-button-secondary-border-hover: var(--tg-component-button-secondary-border);',
    '--color-button-secondary-border-active: var(--tg-component-button-secondary-border);',
    '--color-button-outline-bg-default: var(--tg-component-button-outline-background-default);',
    '--color-button-outline-bg-hover: var(--tg-component-button-outline-background-hover);',
    '--color-button-outline-bg-active: var(--tg-component-button-outline-background-active);',
    '--color-button-outline-text-default: var(--tg-component-button-outline-text);',
    '--color-button-outline-text-hover: var(--tg-component-button-outline-text);',
    '--color-button-outline-text-active: var(--tg-component-button-outline-text);',
    '--color-button-outline-border-default: var(--tg-component-button-outline-border);',
    '--color-button-outline-border-hover: var(--tg-component-button-outline-border);',
    '--color-button-outline-border-active: var(--tg-component-button-outline-border);',
    '--color-button-link-bg-default: var(--tg-component-button-link-background-default);',
    '--color-button-link-bg-hover: var(--tg-component-button-link-background-hover);',
    '--color-button-link-bg-active: var(--tg-component-button-link-background-hover);',
    '--color-button-link-text-default: var(--tg-component-button-link-text);',
    '--color-button-link-text-hover: var(--tg-component-button-link-text);',
    '--color-button-link-text-active: var(--tg-component-button-link-text);',
    '--color-button-link-border-default: var(--tg-component-button-link-border);',
    '--color-button-link-border-hover: var(--tg-component-button-link-border);',
    '--color-button-link-border-active: var(--tg-component-button-link-border);',
    '--color-button-danger-bg-default: var(--tg-component-button-danger-background-default);',
    '--color-button-danger-bg-hover: var(--tg-component-button-danger-background-hover);',
    '--color-button-danger-bg-active: var(--tg-component-button-danger-background-hover);',
    '--color-button-danger-text-default: var(--tg-component-button-danger-text);',
    '--color-button-danger-text-hover: var(--tg-component-button-danger-text);',
    '--color-button-danger-text-active: var(--tg-component-button-danger-text);',
    '--color-button-danger-border-default: var(--tg-component-button-danger-border);',
    '--color-button-danger-border-hover: var(--tg-component-button-danger-border);',
    '--color-button-danger-border-active: var(--tg-component-button-danger-border);',

    '--color-input-default-unfocused-bg: var(--tg-color-surface-primary);',
    '--color-input-default-unfocused-label: var(--tg-color-text-secondary);',
    '--color-input-default-unfocused-placeholder: var(--tg-color-text-secondary);',
    '--color-input-default-unfocused-value: var(--tg-color-text-primary);',
    '--color-input-default-unfocused-message: var(--tg-color-text-secondary);',
    '--color-input-default-unfocused-icon: var(--tg-color-text-secondary);',
    '--color-input-default-unfocused-inner-border: var(--tg-color-border-default);',
    '--color-input-default-unfocused-outer-border: transparent;',
    '--color-input-default-hover-bg: var(--tg-color-surface-primary);',
    '--color-input-default-hover-inner-border: var(--tg-color-border-strong);',
    '--color-input-default-focused-inner-border: var(--tg-color-border-strong);',
    '--color-input-default-focused-outer-border: var(--color-border-focus-subtle);',
    '--color-input-default-disabled-bg: var(--tg-color-surface-secondary);',
    '--color-input-default-disabled-value: var(--color-text-disabled);',
    '--color-input-default-disabled-inner-border: var(--tg-color-border-default);',
    '--color-input-error-unfocused-label: var(--tg-color-feedback-error-default);',
    '--color-input-error-unfocused-message: var(--tg-color-feedback-error-default);',
    '--color-input-error-unfocused-icon: var(--tg-color-feedback-error-default);',
    '--color-input-error-unfocused-inner-border: var(--tg-color-feedback-error-default);',
    '--color-input-error-focused-inner-border: var(--tg-color-feedback-error-default);',
    '--color-input-error-focused-outer-border: var(--tg-color-feedback-error-background);',
    '--color-input-success-unfocused-message: var(--tg-color-feedback-success-default);',
    '--color-input-success-unfocused-icon: var(--tg-color-feedback-success-default);',
    '--color-input-success-unfocused-label: var(--tg-color-feedback-success-default);',
    '--color-input-success-unfocused-inner-border: var(--tg-color-feedback-success-default);',
    '--color-input-success-focused-inner-border: var(--tg-color-feedback-success-default);',
    '--color-input-success-focused-outer-border: var(--tg-color-feedback-success-background);',
    '--color-input-warning-unfocused-label: var(--tg-color-feedback-warning-default);',
    '--color-input-warning-unfocused-message: var(--tg-color-feedback-warning-default);',
    '--color-input-warning-unfocused-icon: var(--tg-color-feedback-warning-default);',
    '--color-input-warning-unfocused-inner-border: var(--tg-color-feedback-warning-default);',
    '--color-input-warning-focused-inner-border: var(--tg-color-feedback-warning-default);',
    '--color-input-warning-focused-outer-border: var(--tg-color-feedback-warning-background);',
    '--color-input-validation-unfocused-label: var(--tg-color-feedback-info-default);',
    '--color-input-validation-unfocused-message: var(--tg-color-feedback-info-default);',
    '--color-input-validation-unfocused-icon: var(--tg-color-feedback-info-default);',
    '--color-input-validation-unfocused-inner-border: var(--tg-color-feedback-info-default);',

    '--font-family-body: var(--tg-font-family-sans);',
    '--font-family-heading: var(--tg-font-family-serif);',
    '--font-family-accent: var(--tg-font-family-serif);',
    '--font-family-article: var(--tg-typography-article-body-family);',
    "--font-family-mono: ui-monospace, 'SFMono-Regular', Consolas, 'Liberation Mono', monospace;",
    '--typo-display-size: var(--tg-typography-display-size);',
    '--typo-display-line-height: var(--tg-typography-display-line-height);',
    '--typo-display-tracking: 0;',
    '--typo-h1-size: var(--tg-typography-h1-size);',
    '--typo-h1-line-height: var(--tg-typography-h1-line-height);',
    '--typo-h1-tracking: 0;',
    '--typo-h2-size: var(--tg-typography-h2-size);',
    '--typo-h2-line-height: var(--tg-typography-h2-line-height);',
    '--typo-h3-size: var(--tg-typography-h3-size);',
    '--typo-h3-line-height: var(--tg-typography-h3-line-height);',
    '--typo-h4-size: var(--tg-typography-body-large-size);',
    '--typo-h4-line-height: var(--tg-typography-body-large-line-height);',
    '--typo-body-lg-size: var(--tg-typography-body-large-size);',
    '--typo-body-size: var(--tg-typography-body-default-size);',
    '--typo-body-line-height: var(--tg-typography-body-default-line-height);',
    '--typo-body-sm-size: var(--tg-typography-body-small-size);',
    '--typo-body-sm-line-height: var(--tg-typography-body-small-line-height);',
    '--typo-caption-size: var(--tg-typography-body-caption-size);',
    '--typo-caption-line-height: var(--tg-typography-body-caption-line-height);',
    '--typo-article-size: var(--tg-typography-article-body-size);',
    '--typo-article-line-height: var(--tg-typography-article-body-line-height);',
    '--typo-button-size: var(--tg-component-button-font-size);',
    '--typo-button-weight: var(--tg-component-button-font-weight);',

    '--space-layout-container: var(--tg-space-container-margin);',
    '--space-layout-section-gap: var(--tg-space-section-md);',
    '--space-layout-element-gap: var(--tg-space-component-md);',
    '--space-layout-grid-gap: var(--tg-grid-gutter);',
    '--space-layout-touch-target: var(--tg-size-touch-min-height);',
    '--layout-content-width: var(--tg-size-container-max-width);',
    '--layout-gutter: var(--tg-space-container-margin);',
    '--section-spacing-y: var(--tg-space-section-md);',
    '--grid-columns: var(--tg-grid-columns);',
    '--space-button-padding-x: var(--tg-component-button-padding-x);',
    '--space-button-padding-y: var(--tg-component-button-padding-y);',
    '--space-button-min-height: var(--tg-component-button-min-height);',
    '--space-button-gap: var(--tg-component-button-gap);',
    '--space-button-icon-size: var(--tg-component-button-icon-size);',
    '--space-input-padding-x: var(--tg-dimension-12);',
    '--space-input-padding-y: var(--tg-dimension-10);',
    '--space-input-margin-bottom: var(--tg-dimension-4);',
    '--space-input-icon-size: var(--tg-dimension-20);',
    '--space-input-icon-gap: var(--tg-dimension-8);',
    '--space-input-label-size: var(--tg-typography-body-small-size);',
    '--space-input-value-size: var(--tg-typography-body-default-size);',
    '--space-input-message-size: var(--tg-typography-body-caption-size);',
    '--typo-input-label-size: var(--tg-typography-body-small-size);',
    '--typo-input-label-line-height: var(--tg-typography-body-small-line-height);',
    '--typo-input-value-size: var(--tg-typography-body-default-size);',
    '--typo-input-value-line-height: var(--tg-typography-body-default-line-height);',
    '--typo-input-message-size: var(--tg-typography-body-caption-size);',
    '--typo-input-message-line-height: var(--tg-typography-body-caption-line-height);',

    '--radius-sm: var(--tg-radius-sm);',
    '--radius-md: var(--tg-radius-md);',
    '--radius-lg: var(--tg-radius-lg);',
    '--radius-full: var(--tg-radius-full);',
    '--radius-button: var(--tg-component-button-radius);',
    shadowAlias('sm'),
    shadowAlias('md'),
    shadowAlias('lg'),
    shadowAlias('xl'),
    shadowAlias('2xl'),
    '--motion-duration-instant: var(--tg-motion-duration-instant);',
    '--motion-duration-micro: var(--tg-motion-duration-micro);',
    '--motion-duration-standard: var(--tg-motion-duration-standard);',
    '--motion-duration-moderate: var(--tg-motion-duration-moderate);',
    '--motion-duration-emphasis: var(--tg-motion-duration-emphasis);',
    '--motion-curve-linear: var(--tg-motion-curve-linear);',
    '--motion-curve-standard: var(--tg-motion-curve-standard);',
    '--motion-curve-enter: var(--tg-motion-curve-enter);',
    '--motion-curve-exit: var(--tg-motion-curve-exit);',
    '--motion-curve-emphasis: var(--tg-motion-curve-emphasis);',
    '--motion-transition-instant: var(--tg-motion-transition-instant);',
    '--motion-transition-micro: var(--tg-motion-transition-micro);',
    '--motion-transition-standard: var(--tg-motion-transition-standard);',
    '--motion-transition-disclosure: var(--tg-motion-transition-disclosure);',
    '--motion-transition-overlay-enter: var(--tg-motion-transition-overlay-enter);',
    '--motion-transition-overlay-exit: var(--tg-motion-transition-overlay-exit);',
    '--motion-transition-feedback: var(--tg-motion-transition-feedback);',
    '--motion-transition-media: var(--tg-motion-transition-media);',
    '--motion-transition-emphasis: var(--tg-motion-transition-emphasis);',
    '--motion-transition-continuous: var(--tg-motion-transition-continuous);',
    '--motion-opacity-hidden: var(--tg-motion-opacity-hidden);',
    '--motion-opacity-subtle: var(--tg-motion-opacity-subtle);',
    '--motion-opacity-disabled: var(--tg-motion-opacity-disabled);',
    '--motion-opacity-scrim: var(--tg-motion-opacity-scrim);',
    '--motion-opacity-visible: var(--tg-motion-opacity-visible);',
    '--transition-instant: var(--tg-motion-duration-instant);',
    '--transition-fast: var(--tg-motion-duration-micro);',
    '--transition-button-duration: var(--tg-component-button-transition-duration);',
    '--transition-default: var(--tg-motion-duration-standard);',
    '--transition-base: var(--tg-motion-duration-standard);',
    '--transition-slow: var(--tg-motion-duration-moderate);',
    '--transition-slower: var(--tg-motion-duration-emphasis);',
    '--easing-linear: var(--tg-motion-curve-linear);',
    '--easing-default: var(--tg-motion-curve-standard);',
    '--easing-button: var(--tg-component-button-transition-curve);',
    '--easing-in: var(--tg-motion-curve-exit);',
    '--easing-out: var(--tg-motion-curve-enter);',
    '--opacity-disabled: var(--tg-motion-opacity-disabled);',
    '--opacity-overlay: var(--tg-motion-opacity-scrim);',
    '--z-dropdown: var(--tg-z-index-dropdown);',
    '--z-modal: var(--tg-z-index-modal);',
    '--z-overlay: var(--tg-z-index-overlay);',
    '--z-sticky: var(--tg-z-index-sticky);',
    '--z-toast: var(--tg-z-index-toast);'
  ];
}

function declarationBlock(selectors, declarations, level = 0) {
  const indent = '  '.repeat(level);
  const bodyIndent = '  '.repeat(level + 1);
  const selectorText = selectors.join(`,\n${indent}`);
  const body = declarations.map((line) => `${bodyIndent}${line}`).join('\n');

  return `${indent}${selectorText} {\n${body}\n${indent}}`;
}

function mediaBlock(media, content) {
  return `@media ${media} {\n${content}\n}`;
}

function buildThemeBlocks(theme, selectors, mediaPrefix = '') {
  return viewports.map(({ name, media }) => {
    const declarations = [
      ...extractDeclarations(readCss(theme, name), `${theme}.${name}.css`),
      ...publicAliasDeclarations()
    ];
    const block = declarationBlock(selectors, declarations, media ? 1 : 0);

    if (!media && mediaPrefix) {
      return mediaBlock(mediaPrefix, declarationBlock(selectors, declarations, 1));
    }

    if (!media) {
      return block;
    }

    const query = mediaPrefix ? `${mediaPrefix} and ${media}` : media;
    return mediaBlock(query, block);
  });
}

const lightBlocks = buildThemeBlocks('light', [':root', '[data-theme="light"]']);
const systemDarkBlocks = buildThemeBlocks('dark', [':root:not([data-theme])'], '(prefers-color-scheme: dark)');
const manualDarkBlocks = buildThemeBlocks('dark', ['[data-theme="dark"]']);

const header = [
  '/**',
  ' * Do not edit directly.',
  ' * Generated by scripts/build-web-tokens.js from tokens/source.',
  ' */',
  ''
].join('\n');

const output = `${header}${[...lightBlocks, ...systemDarkBlocks, ...manualDarkBlocks].join('\n\n')}\n`;

fs.mkdirSync(webDir, { recursive: true });
fs.writeFileSync(destination, output);

console.log(`Built ${path.relative(repoRoot, destination)} from tokens/source matrices.`);
