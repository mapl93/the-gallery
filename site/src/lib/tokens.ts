import primitives from '../../../tokens/Primitives_tokens.json';
import light from '../../../tokens/Light_tokens.json';

interface Token {
  path: string;
  value: string;
  type: string;
}

function flattenTokens(obj: Record<string, any>, prefix = ''): Token[] {
  const result: Token[] = [];
  for (const [key, val] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (val && typeof val === 'object' && 'value' in val) {
      result.push({ path, value: String(val.value), type: val.type || '' });
    } else if (val && typeof val === 'object') {
      result.push(...flattenTokens(val, path));
    }
  }
  return result;
}

export const primitiveTokens = flattenTokens(primitives);
export const semanticTokens = flattenTokens(light);
