export type TokenTheme = 'light' | 'dark';
export type TokenViewport = 'mobile' | 'tablet' | 'desktop' | 'xl';
type TokenLayer = 'primitives' | 'semantics' | 'components';
export interface Token {
  path: string;
  type: string;
  definition: unknown;
  resolved: unknown;
  layer: TokenLayer;
  source: string;
  baseSource: string;
  description: string;
}

const files = import.meta.glob<Record<string, unknown>>(
  '../../../tokens/source/{primitives,semantics,components,modes}/*.tokens.json',
  { eager: true, import: 'default' }
);
const layers: TokenLayer[] = ['primitives', 'semantics', 'components'];
function object(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

/** Same file precedence as build-token-source.js; values remain in source units. */
export function getTokens(theme: TokenTheme = 'light', viewport: TokenViewport = 'desktop'): Token[] {
  const inventory = new Map<string, Omit<Token, 'resolved'>>();
  const paths = [
    ...layers.flatMap((layer) => Object.keys(files).filter((path) => path.includes(`/${layer}/`)).sort()),
    `../../../tokens/source/modes/theme.${theme}.tokens.json`,
    `../../../tokens/source/modes/viewport.${viewport}.tokens.json`,
  ];
  function visit(node: Record<string, unknown>, source: string, prefix = '', inheritedType = '') {
    const type = typeof node.$type === 'string' ? node.$type : inheritedType;
    for (const [key, value] of Object.entries(node)) {
      if (key.startsWith('$') || !object(value)) continue;
      const path = prefix ? `${prefix}.${key}` : key;
      if ('$value' in value) {
        const previous = inventory.get(path);
        const layer = layers.find((item) => source.includes(`/${item}/`)) ?? previous?.layer;
        if (!layer) throw new Error(`Mode overrides unknown token: ${path}`);
        inventory.set(path, {
          path, type: typeof value.$type === 'string' ? value.$type : type,
          definition: value.$value, layer, source,
          baseSource: previous?.baseSource ?? source,
          description: typeof value.$description === 'string' ? value.$description : previous?.description ?? '',
        });
      } else visit(value, source, path, type);
    }
  }
  for (const path of paths) {
    if (!files[path]) throw new Error(`Missing canonical token file: ${path}`);
    visit(files[path], path.replace('../../../', ''));
  }
  function resolve(value: unknown, seen: string[]): unknown {
    if (typeof value === 'string') {
      const alias = value.match(/^\{([^{}]+)\}$/);
      if (alias) {
        const path = alias[1];
        if (seen.includes(path)) throw new Error(`Circular token reference: ${[...seen, path].join(' → ')}`);
        const token = inventory.get(path);
        if (!token) throw new Error(`Missing token reference: ${path}`);
        return resolve(token.definition, [...seen, path]);
      }
      return value.replace(/\{([^{}]+)\}/g, (_, path: string) => formatTokenValue(resolve(`{${path}}`, seen)));
    }
    if (Array.isArray(value)) return value.map((entry) => resolve(entry, seen));
    if (object(value)) return Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, resolve(entry, seen)]));
    return value;
  }
  return [...inventory.values()].map((token) => ({ ...token, resolved: resolve(token.definition, [token.path]) }))
    .sort((a, b) => a.path.localeCompare(b.path));
}

export function formatTokenValue(value: unknown): string {
  return typeof value === 'string' ? value : JSON.stringify(value);
}
