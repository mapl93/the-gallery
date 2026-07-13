#!/usr/bin/env node

/**
 * The Gallery — Build: Copy Components
 *
 * Copies platform-agnostic component CSS from components/css/
 * to each platform's asset directory. Each platform can then
 * add platform-specific overrides on top.
 *
 * Usage: node scripts/copy-components.js
 */

import { cpSync, existsSync, mkdirSync } from 'node:fs';
import { resolve, basename, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const SOURCE = resolve(root, 'components/css');
const JS_SOURCE = resolve(root, 'components/js');

// Platform targets: [destination dir, file mapping overrides]
const platforms = {
  shopify: {
    cssDir: resolve(root, 'platforms/shopify/assets'),
    jsDir: resolve(root, 'platforms/shopify/assets'),
    // Map base filenames to platform filenames where they differ
    fileMap: {
      'layout.css': 'layout-primitives.css',
    },
  },
  webflow: {
    cssDir: resolve(root, 'platforms/webflow'),
    jsDir: null,
    fileMap: {},
  },
};

// CSS files to copy (in order)
const cssFiles = [
  'reset.css',
  'foundations.css',
  'utilities.css',
  'primitives.css',
  'layout.css',
  'forms.css',
  'global.css',
  'product.css',
  'collection.css',
  'storytelling.css',
  'marketing.css',
  'cart.css',
  'account.css',
  'blog.css',
  'sections.css',
  'ceramics.css',
  'coming-soon.css',
  'reviews.css',
  'pages.css',
];

// JS files to copy
const jsFiles = ['theme.js'];

let copied = 0;

for (const [platform, config] of Object.entries(platforms)) {
  // CSS
  if (config.cssDir) {
    if (!existsSync(config.cssDir)) mkdirSync(config.cssDir, { recursive: true });
    for (const file of cssFiles) {
      const src = resolve(SOURCE, file);
      const destName = config.fileMap[file] || file;
      const dest = resolve(config.cssDir, destName);
      if (existsSync(src)) {
        cpSync(src, dest);
        copied++;
      }
    }
  }

  // JS
  if (config.jsDir) {
    if (!existsSync(config.jsDir)) mkdirSync(config.jsDir, { recursive: true });
    for (const file of jsFiles) {
      const src = resolve(JS_SOURCE, file);
      const dest = resolve(config.jsDir, file);
      if (existsSync(src)) {
        cpSync(src, dest);
        copied++;
      }
    }
  }
}

console.log(`✓ Copied ${copied} files to ${Object.keys(platforms).length} platforms`);
