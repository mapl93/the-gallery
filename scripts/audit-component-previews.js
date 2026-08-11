import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const mdxDir = path.join(repoRoot, 'site', 'src', 'content', 'components');
const componentPreviewPath = path.join(repoRoot, 'site', 'src', 'components', 'ComponentPreview.tsx');
const componentCssDir = path.join(repoRoot, 'components', 'css');
const reportPath = path.join(repoRoot, 'docs', 'reports', 'component-preview-static-audit.md');

const statePatterns = [
  /\bis-open\b/,
  /\bis-visible\b/,
  /\b[a-z0-9_-]+--open\b/,
  /\b[a-z0-9_-]+--visible\b/,
  /\baria-hidden=["']false["']/,
  /\bdata-open(?:\s|=|>)/,
  /\bdata-visible(?:\s|=|>)/
];

function walk(dir, predicate) {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((entry) => {
      const filePath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        return walk(filePath, predicate);
      }
      return predicate(filePath) ? [filePath] : [];
    })
    .sort();
}

function relative(filePath) {
  return path.relative(repoRoot, filePath);
}

function lineForOffset(source, offset) {
  return source.slice(0, offset).split('\n').length;
}

function readQuoted(source, start) {
  const quote = source[start];
  let value = '';
  let escaped = false;

  for (let index = start + 1; index < source.length; index += 1) {
    const char = source[index];
    if (escaped) {
      value += `\\${char}`;
      escaped = false;
      continue;
    }
    if (char === '\\') {
      escaped = true;
      continue;
    }
    if (char === quote) {
      return { value, end: index + 1 };
    }
    value += char;
  }

  return { value, end: source.length };
}

function extractHtml(block) {
  const htmlIndex = block.indexOf('html=');
  if (htmlIndex === -1) {
    return '';
  }

  let index = htmlIndex + 'html='.length;
  while (/\s/.test(block[index])) index += 1;

  if (block[index] === '"' || block[index] === "'") {
    return readQuoted(block, index).value;
  }

  if (block[index] === '{') {
    index += 1;
    while (/\s/.test(block[index])) index += 1;
    if (block[index] === '"' || block[index] === "'") {
      return readQuoted(block, index).value;
    }
  }

  return '';
}

function extractInteraction(block) {
  const interactionIndex = block.indexOf('interaction=');
  if (interactionIndex === -1) {
    return '';
  }

  let index = interactionIndex + 'interaction='.length;
  while (/\s/.test(block[index])) index += 1;

  if (block[index] !== '{') {
    return '';
  }

  let depth = 0;
  let quote = null;
  let escaped = false;

  for (let current = index; current < block.length; current += 1) {
    const char = block[current];

    if (quote) {
      if (escaped) {
        escaped = false;
      } else if (char === '\\') {
        escaped = true;
      } else if (char === quote) {
        quote = null;
      }
      continue;
    }

    if (char === '"' || char === "'") {
      quote = char;
      continue;
    }

    if (char === '{') {
      depth += 1;
      continue;
    }

    if (char === '}') {
      depth -= 1;
      if (depth === 0) {
        return block.slice(index, current + 1);
      }
    }
  }

  return block.slice(index);
}

function extractPreviews(source) {
  const previews = [];
  const previewPattern = /<Preview\b/g;
  let match;

  while ((match = previewPattern.exec(source))) {
    const start = match.index;
    let index = previewPattern.lastIndex;
    let quote = null;
    let escaped = false;
    let braceDepth = 0;

    for (; index < source.length; index += 1) {
      const char = source[index];
      const next = source[index + 1];

      if (quote) {
        if (escaped) {
          escaped = false;
        } else if (char === '\\') {
          escaped = true;
        } else if (char === quote) {
          quote = null;
        }
        continue;
      }

      if (char === '"' || char === "'") {
        quote = char;
        continue;
      }

      if (char === '{') {
        braceDepth += 1;
        continue;
      }

      if (char === '}') {
        braceDepth = Math.max(0, braceDepth - 1);
        continue;
      }

      if (braceDepth === 0 && char === '/' && next === '>') {
        previews.push({
          block: source.slice(start, index + 2),
          offset: start
        });
        previewPattern.lastIndex = index + 2;
        break;
      }
    }
  }

  return previews;
}

function normalizeHtml(html) {
  return html
    .replace(/\\"/g, '"')
    .replace(/\\'/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&times;/g, 'x');
}

function propValue(source, name) {
  const match = source.match(new RegExp(`["']?${name}["']?\\s*:\\s*["']([^"']+)["']`));
  return match?.[1];
}

function attrValue(html, name) {
  const match = html.match(new RegExp(`${name}=["']([^"']+)["']`));
  return match?.[1];
}

function previewLabel(block) {
  const match = block.match(/label\s*=\s*["']([^"']+)["']/);
  return match?.[1] ?? 'Preview';
}

function previewLayout(block) {
  const match = block.match(/layout\s*=\s*["']([^"']+)["']/);
  return match?.[1] ?? 'default';
}

function selectorExists(html, selector) {
  return selector
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean)
    .every((part) => simpleSelectorExists(html, part));
}

function simpleSelectorExists(html, selector) {
  if (selector === '') return false;

  const attributeMatches = [...selector.matchAll(/\[([a-zA-Z0-9_-]+)(?:=["']?([^"'\]]+)["']?)?\]/g)];
  if (attributeMatches.length > 0) {
    return attributeMatches.every(([, attr, value]) => {
      const attrPattern = new RegExp(`\\b${attr}(?:\\s*=\\s*["'][^"']*["']|\\s*=\\s*[^\\s>]+|\\b)`);
      if (!attrPattern.test(html)) return false;
      if (!value) return true;
      return new RegExp(`\\b${attr}\\s*=\\s*["']${escapeRegExp(value)}["']`).test(html);
    });
  }

  const classMatches = [...selector.matchAll(/\.([a-zA-Z0-9_-]+)/g)].map((match) => match[1]);
  if (classMatches.length > 0) {
    return classMatches.every((className) => classExists(html, className));
  }

  const idMatch = selector.match(/^#([a-zA-Z0-9_-]+)/);
  if (idMatch) {
    return new RegExp(`\\bid=["']${escapeRegExp(idMatch[1])}["']`).test(html);
  }

  return html.includes(selector.replace(/^['"]|['"]$/g, ''));
}

function classExists(html, className) {
  const classPattern = /class=["']([^"']+)["']/g;
  let match;
  while ((match = classPattern.exec(html))) {
    const classes = match[1].split(/\s+/);
    if (classes.includes(className)) {
      return true;
    }
  }
  return false;
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function hasOpenState(html) {
  return statePatterns.some((pattern) => pattern.test(html));
}

function hasCanonicalRuntimeInteraction(html) {
  return ['combobox', 'datepicker'].some((className) => classExists(html, className));
}

function hasTrigger(html, interaction) {
  const triggerSelector = propValue(interaction, 'triggerSelector') ?? attrValue(html, 'data-preview-trigger-selector') ?? '[data-preview-trigger]';
  return selectorExists(html, triggerSelector);
}

function hasClose(html, interaction) {
  const closeSelector = propValue(interaction, 'closeSelector') ?? attrValue(html, 'data-preview-close-selector');
  if (!closeSelector) {
    return true;
  }
  return selectorExists(html, closeSelector);
}

function issue(severity, file, line, label, message) {
  return {
    severity,
    file: relative(file),
    line,
    label,
    message
  };
}

function auditMdx() {
  const issues = [];
  const mdxFiles = walk(mdxDir, (filePath) => filePath.endsWith('.mdx'));
  let previewCount = 0;
  let interactiveCount = 0;

  mdxFiles.forEach((filePath) => {
    const source = fs.readFileSync(filePath, 'utf8');
    const previews = extractPreviews(source);
    previewCount += previews.length;

    previews.forEach((preview, index) => {
      const block = preview.block;
      const html = normalizeHtml(extractHtml(block));
      const interaction = extractInteraction(block);
      const hasInteraction = Boolean(interaction.trim()) || html.includes('data-preview-selector=');
      const hasRuntimeInteraction = hasCanonicalRuntimeInteraction(html);
      const label = previewLabel(block);
      const layout = previewLayout(block);
      const line = lineForOffset(source, preview.offset);

      if (hasInteraction) {
        interactiveCount += 1;
        const selector = propValue(interaction, 'selector') ?? attrValue(html, 'data-preview-selector');
        const toggle = propValue(interaction, 'toggle') ?? attrValue(html, 'data-preview-toggle');

        if (!selector) {
          issues.push(issue('error', filePath, line, label, 'Interactive preview is missing a target selector.'));
        } else if (!selectorExists(html, selector)) {
          issues.push(issue('error', filePath, line, label, `Interactive target selector does not match preview HTML: ${selector}`));
        }

        if (!toggle) {
          issues.push(issue('error', filePath, line, label, 'Interactive preview is missing a toggle class or attribute.'));
        }

        if (!hasTrigger(html, interaction)) {
          issues.push(issue('error', filePath, line, label, 'Interactive preview has no in-canvas trigger control.'));
        }

        if (!hasClose(html, interaction)) {
          issues.push(issue('warning', filePath, line, label, 'Interactive preview declares a close selector that does not match preview HTML.'));
        }

        if (
          index === 0
          && /startVisible["']?\s*:\s*true/.test(interaction)
          && !['anchored', 'overlay'].includes(layout)
        ) {
          issues.push(issue('warning', filePath, line, label, 'Primary interactive preview starts open; prefer closed with an in-canvas trigger.'));
        }

        return;
      }

      if (hasRuntimeInteraction) {
        interactiveCount += 1;
      }

      if (html.includes('data-preview-trigger')) {
        issues.push(issue('error', filePath, line, label, 'Preview has a data-preview-trigger but no interaction config.'));
      }

      if (
        index === 0
        && hasOpenState(html)
        && !html.includes('data-preview-static-artwork')
        && !hasRuntimeInteraction
      ) {
        issues.push(issue('error', filePath, line, label, 'Primary preview is rendered in an open/visible state without direct interaction.'));
      } else if (index > 0 && hasOpenState(html)) {
        issues.push(issue('info', filePath, line, label, 'Variant preview uses an open/visible state. Keep only if this is intentionally static documentation.'));
      }
    });
  });

  return {
    issues,
    mdxFiles: mdxFiles.length,
    previewCount,
    interactiveCount
  };
}

function auditPreviewShell() {
  const source = fs.readFileSync(componentPreviewPath, 'utf8');
  const issues = [];

  if (source.includes('docs-preview__tab--trigger')) {
    issues.push(issue('error', componentPreviewPath, 1, 'ComponentPreview', 'Header-level interaction trigger still exists.'));
  }

  return issues;
}

function auditCss() {
  const issues = [];
  const cssFiles = walk(componentCssDir, (filePath) => filePath.endsWith('.css'));
  let hardcodedMotionCount = 0;

  cssFiles.forEach((filePath) => {
    const source = fs.readFileSync(filePath, 'utf8');
    const rulePattern = /([^{}@]+)\{([^{}]+)\}/g;
    let match;

    while ((match = rulePattern.exec(source))) {
      const selector = match[1].trim().replace(/\s+/g, ' ');
      const body = match[2];
      const line = lineForOffset(source, match.index);
      const isFullSurfaceNativeFileInput = /\.file-upload__input\b/.test(selector)
        && /position\s*:\s*absolute/.test(body)
        && /inset\s*:\s*0/.test(body)
        && /width\s*:\s*100%/.test(body)
        && /height\s*:\s*100%/.test(body)
        && /cursor\s*:\s*pointer/.test(body);

      if (
        /opacity\s*:\s*0(?:\s*!important)?\s*(?:;|$)/.test(body) &&
        !/pointer-events\s*:/.test(body) &&
        !/visibility\s*:/.test(body) &&
        !isFullSurfaceNativeFileInput &&
        !/from\s*$|to\s*$|^\d+%$/.test(selector) &&
        !/\.opacity-0\b/.test(selector)
      ) {
        issues.push(issue('warning', filePath, line, selector, 'Rule sets opacity: 0 without pointer-events or visibility. It may block preview clicks while hidden.'));
      }

      const hardcodedMotion = body.match(/\b(?:animation|transition|animation-delay|transition-delay)[^;]*\b\d+(?:\.\d+)?(?:ms|s)\b/g);
      if (hardcodedMotion) {
        hardcodedMotionCount += hardcodedMotion.length;
      }
    }
  });

  return {
    issues,
    hardcodedMotionCount
  };
}

function tableRows(issues) {
  if (issues.length === 0) {
    return '_None._';
  }

  return [
    '| Severity | File | Line | Preview/Selector | Issue |',
    '| --- | --- | ---: | --- | --- |',
    ...issues.map((entry) =>
      `| ${entry.severity} | \`${entry.file}\` | ${entry.line} | ${entry.label.replaceAll('|', '\\|')} | ${entry.message.replaceAll('|', '\\|')} |`
    )
  ].join('\n');
}

const mdxAudit = auditMdx();
const shellIssues = auditPreviewShell();
const cssAudit = auditCss();
const allIssues = [...shellIssues, ...mdxAudit.issues, ...cssAudit.issues];
const errorCount = allIssues.filter((entry) => entry.severity === 'error').length;
const warningCount = allIssues.filter((entry) => entry.severity === 'warning').length;
const infoCount = allIssues.filter((entry) => entry.severity === 'info').length;

const report = `# Component Preview Static Audit

Generated by \`npm run audit:previews:static\`.

## Summary

- MDX component files audited: ${mdxAudit.mdxFiles}
- Preview blocks audited: ${mdxAudit.previewCount}
- Interactive previews detected: ${mdxAudit.interactiveCount}
- Errors: ${errorCount}
- Warnings: ${warningCount}
- Info notes: ${infoCount}
- CSS hardcoded motion declarations observed: ${cssAudit.hardcodedMotionCount}

## Errors

${tableRows(allIssues.filter((entry) => entry.severity === 'error'))}

## Warnings

${tableRows(allIssues.filter((entry) => entry.severity === 'warning'))}

## Info

${tableRows(allIssues.filter((entry) => entry.severity === 'info'))}

## Notes

- Errors are likely preview UX bugs and should be fixed before browser smoke testing.
- Warnings need human review; some static open-state variants are acceptable documentation examples.
- Hardcoded CSS motion declarations are counted so motion-token migration can be planned separately from preview interactivity.
`;

fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, report);

console.log(
  [
    `Audited ${mdxAudit.previewCount} previews across ${mdxAudit.mdxFiles} MDX files.`,
    `Found ${errorCount} errors, ${warningCount} warnings, ${infoCount} info notes.`,
    `Report: ${relative(reportPath)}`
  ].join('\n')
);
