#!/usr/bin/env node
/**
 * generate-mdx.mjs – Generate MDX documentation pages for all components.
 *
 * Reads registry.json for metadata and examples.ts (compiled) for HTML.
 * Usage: node site/scripts/generate-mdx.mjs
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..', '..');
const SITE = resolve(__dirname, '..');
const OUT_DIR = resolve(SITE, 'src', 'content', 'components');

// ── Load registry ──────────────────────────────────────────
const registry = JSON.parse(readFileSync(resolve(ROOT, 'registry.json'), 'utf-8'));
const components = registry.components;

// ── Parse examples.ts for HTML strings ─────────────────────
const exSrc = readFileSync(resolve(SITE, 'src', 'lib', 'examples.ts'), 'utf-8');

/** Very small parser: extract the JS object per slug from examples.ts */
function parseExamples(src) {
  const out = {};
  // Match  slug: { ... }, or "slug": { ... },
  // We walk the source looking for top-level entries in the `examples` object.
  const entryRe = /^  (?:"([^"]+)"|(\w[\w-]*))\s*:\s*\{/gm;
  let m;
  while ((m = entryRe.exec(src)) !== null) {
    const slug = m[1] || m[2];
    // Find balanced braces from this point
    const start = m.index + m[0].length - 1; // the opening {
    let depth = 1;
    let i = start + 1;
    while (i < src.length && depth > 0) {
      if (src[i] === '{') depth++;
      else if (src[i] === '}') depth--;
      if (src[i] === '`') {
        // skip template literal
        i++;
        while (i < src.length && src[i] !== '`') {
          if (src[i] === '\\') i++; // skip escaped
          i++;
        }
      }
      i++;
    }
    const block = src.slice(start, i);
    out[slug] = extractFields(block, slug);
  }
  return out;
}

function extractFields(block, slug) {
  const result = { preview: '', variants: {}, sizes: {}, interaction: null };

  // Extract preview
  const prevMatch = block.match(/preview\s*:\s*`([\s\S]*?)`/);
  if (prevMatch) result.preview = prevMatch[1].trim();

  // Extract variants
  const varBlock = block.match(/variants\s*:\s*\{([\s\S]*?)\n  \}/);
  if (varBlock) {
    const varRe = /(\w[\w-]*)\s*:\s*`([\s\S]*?)`/g;
    let vm;
    while ((vm = varRe.exec(varBlock[1])) !== null) {
      result.variants[vm[1]] = vm[2].trim();
    }
  }

  // Extract sizes
  const sizeBlock = block.match(/sizes\s*:\s*\{([\s\S]*?)\n  \}/);
  if (sizeBlock) {
    const sizeRe = /(\w[\w-]*)\s*:\s*`([\s\S]*?)`/g;
    let sm;
    while ((sm = sizeRe.exec(sizeBlock[1])) !== null) {
      result.sizes[sm[1]] = sm[2].trim();
    }
  }

  // Extract interaction
  const intMatch = block.match(/interaction\s*:\s*\{([\s\S]*?)\}/);
  if (intMatch) {
    const raw = intMatch[1];
    const sel = raw.match(/selector\s*:\s*'([^']+)'/);
    const tog = raw.match(/toggle\s*:\s*'([^']+)'/);
    const trig = raw.match(/triggerLabel\s*:\s*'([^']+)'/);
    const sv = raw.match(/startVisible\s*:\s*(true|false)/);
    if (sel && tog && trig) {
      result.interaction = {
        selector: sel[1],
        toggle: tog[1],
        triggerLabel: trig[1],
        startVisible: sv ? sv[1] === 'true' : false,
      };
    }
  }

  return result;
}

const examples = parseExamples(exSrc);

// ── Category labels ────────────────────────────────────────
const categoryLabels = {
  primitives: 'Primitives',
  layout: 'Layout & Overlays',
  forms: 'Forms',
  global: 'Global Chrome',
  product: 'Product',
  collection: 'Collection',
  cart: 'Cart & Checkout',
  account: 'Account',
  blog: 'Blog & Editorial',
  storytelling: 'Art & Storytelling',
  marketing: 'Marketing & Conversion',
  sections: 'Page Sections',
  ceramics: 'Ceramics / Artisan',
  reviews: 'Reviews & Ratings',
  pages: 'Pages',
};

// ── Content hints for DoDont/Callout by category ───────────
const categoryGuidance = {
  primitives: {
    doText: 'Use this component consistently across your theme for a cohesive UI.',
    dontText: "Don't override the component's built-in states with custom CSS — use the provided variants instead.",
    callout: 'Primitive components are building blocks. They\'re referenced by higher-level components throughout the system.',
    calloutType: 'info',
  },
  layout: {
    doText: 'Use semantic HTML (section, nav, aside) alongside the layout classes.',
    dontText: "Don't nest layout overlays (modal inside drawer, etc.) — it creates confusing z-index stacking.",
    callout: 'Layout components handle z-index and focus trapping. Test keyboard navigation before shipping.',
    calloutType: 'warning',
  },
  forms: {
    doText: 'Always pair form inputs with visible labels for accessibility.',
    dontText: "Don't rely on placeholder text as the only label — it disappears on input.",
    callout: 'Use the `field-wrapper` component to ensure consistent spacing and label alignment across all form fields.',
    calloutType: 'tip',
  },
  global: {
    doText: 'Keep global chrome consistent across all pages — header and footer should be in the layout template.',
    dontText: "Don't duplicate global elements inside individual sections or pages.",
    callout: 'Global components are typically included in your theme layout, not in individual pages.',
    calloutType: 'info',
  },
  product: {
    doText: 'Optimize product images for web — use WebP format and responsive srcset.',
    dontText: "Don't overload product components with too many badges or CTAs — keep it clean.",
    callout: 'Product components are designed to work together. The product page combines gallery, info, form, and related products.',
    calloutType: 'tip',
  },
  collection: {
    doText: 'Use the collection grid with product cards for consistent spacing and responsive behavior.',
    dontText: "Don't mix collection grid with manual floats or absolute positioning.",
    callout: 'Collection components handle responsive breakpoints automatically via CSS Grid.',
    calloutType: 'info',
  },
  cart: {
    doText: 'Show real-time updates (totals, quantities) when the user modifies the cart.',
    dontText: "Don't require a page reload for cart changes — use AJAX for a smooth experience.",
    callout: 'Cart components are designed for Shopify\'s AJAX Cart API. Wire up the JS interactions in your theme.',
    calloutType: 'tip',
  },
  account: {
    doText: 'Pre-fill fields when possible (e.g., address from previous orders) to reduce friction.',
    dontText: "Don't expose sensitive account data without authentication.",
    callout: 'Account components require Shopify customer authentication. They render only for logged-in customers.',
    calloutType: 'warning',
  },
  blog: {
    doText: 'Use the article body/prose component for rich text — it handles typography, images, and spacing.',
    dontText: "Don't manually style article content with inline styles — let the prose class handle it.",
    callout: 'Blog components support Shopify\'s article template system. Use metafields for custom article data.',
    calloutType: 'info',
  },
  storytelling: {
    doText: 'Use high-quality images and thoughtful copy — storytelling components are editorial by nature.',
    dontText: "Don't use storytelling blocks for product-heavy pages — they're designed for brand narrative.",
    callout: 'These components are unique to The Gallery\'s editorial focus. They work best with curated content.',
    calloutType: 'tip',
  },
  marketing: {
    doText: 'A/B test marketing components (hero copy, CTA placement, popup timing) to optimize conversion.',
    dontText: "Don't show too many marketing elements at once — popups + banners + badges = fatigue.",
    callout: 'Marketing components often need JavaScript for interactions (countdown timers, popup triggers, etc.).',
    calloutType: 'info',
  },
  sections: {
    doText: 'Use section components for page builder blocks — they\'re designed to be reorderable in Shopify\'s theme editor.',
    dontText: "Don't hard-code section content — use Shopify schema settings for customizability.",
    callout: 'Sections map to Shopify\'s section architecture. Each one can have its own schema settings.',
    calloutType: 'info',
  },
  ceramics: {
    doText: 'Use these specialty components to tell the artisan story behind your products.',
    dontText: "Don't use generic product descriptions — ceramics customers value process, materials, and provenance.",
    callout: 'Ceramics components are designed specifically for artisan e-commerce. They showcase craft and materials.',
    calloutType: 'tip',
  },
  reviews: {
    doText: 'Display aggregate ratings prominently — social proof drives conversions.',
    dontText: "Don't hide negative reviews — authenticity builds trust.",
    callout: 'Review components work with Shopify product metafields or third-party review apps.',
    calloutType: 'info',
  },
  pages: {
    doText: 'Keep page templates simple and focused on their primary purpose.',
    dontText: "Don't add navigation-heavy sidebars to simple pages like 404 or policy pages.",
    callout: 'Page components map to Shopify template types. Each has a corresponding .json template file.',
    calloutType: 'info',
  },
};

// ── Accessibility hints by component type ──────────────────
function getA11yNotes(slug, comp) {
  const notes = [];
  const s = slug.toLowerCase();
  const desc = (comp.description || '').toLowerCase();

  if (s.includes('button') || s.includes('btn') || s === 'fab' || s === 'toggle')
    notes.push('Use `<button>` elements for actions and `<a>` for navigation. Never use `<div>` with a click handler.');
  if (s.includes('input') || s.includes('select') || s.includes('textarea') || s.includes('form') || s.includes('field') || s.includes('password') || s.includes('number') || s.includes('pin') || s.includes('tags-input') || s.includes('date') || s.includes('color') || s.includes('file') || s.includes('slider'))
    notes.push('Associate every input with a `<label>` using matching `for`/`id` attributes.');
  if (s.includes('modal') || s.includes('drawer') || s.includes('lightbox') || s.includes('command') || s.includes('popup') || s.includes('quick-view'))
    notes.push('Trap focus inside the overlay while open. Return focus to the trigger on close.');
  if (s.includes('modal') || s.includes('drawer') || s.includes('popover') || s.includes('dropdown') || s.includes('context') || s.includes('lightbox') || s.includes('popup') || s.includes('overlay') || s.includes('command'))
    notes.push('Close on `Escape` key press.');
  if (desc.includes('image') || s.includes('gallery') || s.includes('avatar') || s.includes('card'))
    notes.push('All images must have descriptive `alt` text.');
  if (s.includes('accordion') || s.includes('tabs') || s.includes('disclosure'))
    notes.push('Use `aria-expanded` and `aria-controls` to communicate state to screen readers.');
  if (s.includes('progress') || s.includes('spinner') || s.includes('loading') || s.includes('skeleton'))
    notes.push('Use `aria-live="polite"` or `role="status"` so screen readers announce loading state.');
  if (s.includes('rating') || s.includes('star'))
    notes.push('Provide a text alternative for the rating value (e.g., "4 out of 5 stars").');
  if (s.includes('toast') || s.includes('alert') || s.includes('cookie') || s.includes('social-proof'))
    notes.push('Use `role="alert"` or `aria-live="assertive"` for important notifications.');
  if (s.includes('nav') || s.includes('menu') || s.includes('breadcrumb') || s.includes('pagination') || s.includes('header') || s.includes('footer'))
    notes.push('Use `<nav>` with `aria-label` to identify the navigation region.');

  if (notes.length === 0)
    notes.push('Ensure proper color contrast ratios (4.5:1 for text, 3:1 for large text) when customizing tokens.');

  return notes;
}

// ── Escape helpers ─────────────────────────────────────────
function escapeJsx(html) {
  // Escape curly braces for JSX context inside MDX
  return html.replace(/\{/g, '\\{').replace(/\}/g, '\\}');
}

function escapeAttr(html) {
  // For JSX string expressions html={"..."}: collapse newlines, escape backslashes and double quotes
  return html.replace(/\n/g, ' ').replace(/\s{2,}/g, ' ').replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

// ── Generate MDX for a single component ────────────────────
function generateMdx(slug, comp, ex) {
  const lines = [];
  const category = comp.category || 'primitives';
  const guidance = categoryGuidance[category] || categoryGuidance.primitives;

  // ## Overview
  lines.push(`## Overview`);
  lines.push('');
  lines.push(comp.description || `The ${comp.name} component.`);
  lines.push('');

  // Preview
  if (ex && ex.preview) {
    const previewProps = [`html={"${escapeAttr(ex.preview)}"}`, `label="${comp.name}"`];
    if (ex.interaction) {
      const intStr = JSON.stringify(ex.interaction).replace(/'/g, "\\'");
      previewProps.push(`interaction={${intStr}}`);
    }
    lines.push(`<Preview ${previewProps.join(' ')} />`);
    lines.push('');
  }

  // ## Variants
  const hasVariants = (ex && Object.keys(ex.variants).length > 0) || (comp.variants && comp.variants.length > 0);
  if (hasVariants && ex && Object.keys(ex.variants).length > 0) {
    lines.push(`## Variants`);
    lines.push('');
    for (const [name, html] of Object.entries(ex.variants)) {
      const label = name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, ' ');
      lines.push(`### ${label}`);
      lines.push('');
      lines.push(`<Preview html={"${escapeAttr(html)}"} label="${label}" />`);
      lines.push('');
    }
  }

  // ## Sizes
  if (ex && Object.keys(ex.sizes).length > 0) {
    lines.push(`## Sizes`);
    lines.push('');
    const allSizesHtml = Object.values(ex.sizes).join(' ');
    lines.push(`<Preview html={"${escapeAttr(allSizesHtml)}"} label="Sizes" />`);
    lines.push('');

    lines.push(`| Class | Size |`);
    lines.push(`|-------|------|`);
    for (const name of Object.keys(ex.sizes)) {
      const cls = name === 'default' ? '*(default)*' : `\`.${comp.selector?.replace('.', '')}--${name}\``;
      lines.push(`| ${cls} | ${name.charAt(0).toUpperCase() + name.slice(1)} |`);
    }
    lines.push('');
  }

  // ## Usage Guidelines (DoDont)
  lines.push(`## Usage Guidelines`);
  lines.push('');
  lines.push(`<DoDont>`);
  lines.push(`  <Do>${guidance.doText}</Do>`);
  lines.push(`  <Dont>${guidance.dontText}</Dont>`);
  lines.push(`</DoDont>`);
  lines.push('');

  // ## Accessibility
  const a11y = getA11yNotes(slug, comp);
  lines.push(`## Accessibility`);
  lines.push('');
  lines.push(`<Callout type="${guidance.calloutType}">`);
  lines.push(`  ${guidance.callout}`);
  lines.push(`</Callout>`);
  lines.push('');
  for (const note of a11y) {
    lines.push(`- ${note}`);
  }
  lines.push('');

  // ## Dependencies
  if (comp.dependencies && comp.dependencies.length > 0) {
    lines.push(`## Dependencies`);
    lines.push('');
    lines.push('This component uses:');
    lines.push('');
    for (const dep of comp.dependencies) {
      const depName = components[dep]?.name || dep;
      lines.push(`- [${depName}](/components/${dep})`);
    }
    lines.push('');
  }

  // ## API Reference
  lines.push(`## API Reference`);
  lines.push('');
  lines.push(`<PropTable>`);
  lines.push(`  <tr><td>\`${comp.selector}\`</td><td>class</td><td>—</td><td>Base ${comp.name.toLowerCase()} styles</td></tr>`);
  if (comp.variants && comp.variants.length > 0) {
    for (const v of comp.variants) {
      if (v === 'default') continue;
      const cls = `${comp.selector}--${v}`;
      lines.push(`  <tr><td>\`${cls}\`</td><td>modifier</td><td>—</td><td>${v.charAt(0).toUpperCase() + v.slice(1).replace(/-/g, ' ')} variant</td></tr>`);
    }
  }
  if (comp.sizes && comp.sizes.length > 0) {
    for (const s of comp.sizes) {
      if (s === 'default') continue;
      const cls = `${comp.selector}--${s}`;
      lines.push(`  <tr><td>\`${cls}\`</td><td>modifier</td><td>—</td><td>${s.charAt(0).toUpperCase() + s.slice(1)} size</td></tr>`);
    }
  }
  lines.push(`</PropTable>`);
  lines.push('');

  return lines.join('\n');
}

// ── Main ───────────────────────────────────────────────────
mkdirSync(OUT_DIR, { recursive: true });

const slugs = Object.keys(components);
const alreadyExist = ['button', 'modal', 'product-card']; // hand-written MDX
let created = 0;
let skipped = 0;

for (const slug of slugs) {
  if (alreadyExist.includes(slug)) {
    skipped++;
    continue;
  }

  const comp = components[slug];
  const ex = examples[slug] || null;
  const mdx = generateMdx(slug, comp, ex);
  const outPath = resolve(OUT_DIR, `${slug}.mdx`);

  writeFileSync(outPath, mdx, 'utf-8');
  created++;
}

console.log(`✓ Generated ${created} MDX files, skipped ${skipped} (hand-written)`);
console.log(`  Output: ${OUT_DIR}`);

// ── Generate content/index.ts ──────────────────────────────
const indexLines = [
  `import { type ComponentType, lazy } from 'react';`,
  ``,
  `// eslint-disable-next-line @typescript-eslint/no-explicit-any`,
  `type MdxComponent = ComponentType<any>;`,
  ``,
  `/**`,
  ` * MDX content registry — auto-generated + hand-written pages.`,
  ` *`,
  ` * To add rich docs for a component, create \`content/components/<slug>.mdx\``,
  ` * and add the lazy import here. Components without an entry fall back to`,
  ` * the auto-generated template.`,
  ` */`,
  `const mdxPages: Record<string, () => Promise<{ default: MdxComponent }>> = {`,
];

for (const slug of slugs) {
  indexLines.push(`  '${slug}': () => import('./components/${slug}.mdx'),`);
}

indexLines.push(`};`);
indexLines.push(``);
indexLines.push(`const cache: Record<string, MdxComponent> = {};`);
indexLines.push(``);
indexLines.push(`/**`);
indexLines.push(` * Returns a lazy React component for the MDX page, or null if none exists.`);
indexLines.push(` */`);
indexLines.push(`export function getMdxPage(slug: string): MdxComponent | null {`);
indexLines.push(`  if (!mdxPages[slug]) return null;`);
indexLines.push(`  if (!cache[slug]) {`);
indexLines.push(`    cache[slug] = lazy(mdxPages[slug]);`);
indexLines.push(`  }`);
indexLines.push(`  return cache[slug];`);
indexLines.push(`}`);
indexLines.push(``);
indexLines.push(`/** Check if a component has a custom MDX page. */`);
indexLines.push(`export function hasMdxPage(slug: string): boolean {`);
indexLines.push(`  return slug in mdxPages;`);
indexLines.push(`}`);
indexLines.push(``);

const indexPath = resolve(SITE, 'src', 'content', 'index.ts');
writeFileSync(indexPath, indexLines.join('\n'), 'utf-8');
console.log(`✓ Updated content/index.ts with ${slugs.length} entries`);
