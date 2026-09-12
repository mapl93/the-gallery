import fs from 'node:fs';
import path from 'node:path';

// ADR 0269: Prose is an explicitly composed foundation, not a registry component.
function foundationalCompositionCss(slug, context) {
  const contractPath = path.join(context.rootDir, 'components/contracts', `${slug}.contract.json`);
  if (!fs.existsSync(contractPath)) return '';
  const contract = JSON.parse(fs.readFileSync(contractPath, 'utf8'));
  if (!contract.anatomy?.some((part) => part.required === true && part.className === '.prose')) return '';
  const foundationPath = context.registry.base?.foundations?.file;
  if (!foundationPath) throw new Error('Required Prose foundation is absent from registry.base');
  const css = fs.readFileSync(path.join(context.rootDir, foundationPath), 'utf8');
  const start = css.indexOf('/* Public Prose contract');
  const end = css.indexOf('/* End public Prose contract. */', start);
  if (start < 0 || end < start) throw new Error('Required Prose source boundary is missing');
  return css.slice(start, end);
}

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
  const css = [foundationalCompositionCss(slug, context), sourceCss, ...dependencyCss].join('\n');
  context.compositionCss.set(slug, css);
  return css;
}

