import fs from 'node:fs';
import path from 'node:path';

export function componentCompositionCss(slug, context, ancestry = new Set()) {
  if (context.compositionCss.has(slug)) {
    return context.compositionCss.get(slug);
  }

  if (ancestry.has(slug)) {
    return '';
  }

  const component = context.registry.components?.[slug];
  if (!component) {
    return '';
  }

  const nextAncestry = new Set(ancestry).add(slug);
  const sourcePath = path.join(context.rootDir, component.file ?? '');
  const sourceCss = fs.existsSync(sourcePath) ? fs.readFileSync(sourcePath, 'utf8') : '';
  const dependencyCss = (component.dependencies ?? [])
    .map((dependency) => componentCompositionCss(dependency, context, nextAncestry))
    .filter(Boolean);
  const css = [sourceCss, ...dependencyCss].join('\n');
  context.compositionCss.set(slug, css);
  return css;
}

