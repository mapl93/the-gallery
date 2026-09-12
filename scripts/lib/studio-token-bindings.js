// Match the literal component-to-renderer map already used by Studio.
// No second component inventory or token list is maintained here.
export function studioRendererNames(source) {
  const body = source.match(/const studioRenderers[^=]*=\s*\{([\s\S]*?)\n\};/)?.[1] ?? '';
  return new Map([...body.matchAll(/^\s*(?:'([^']+)'|([a-z][a-z0-9-]*)):\s*(\w+),?$/gmi)]
    .map((match) => [match[1] ?? match[2], match[3]]));
}

// MarketingStudio's activeTokens mapping is static: it selects tokens[0].
// State-aware renderers (e.g. Button) may deliberately select among many roles.
export function staticSwatchBindingError(renderer, kind, tokens) {
  if (renderer !== 'MarketingStudio' || kind !== 'token-swatch' || tokens.length === 1) return null;
  return 'MarketingStudio selects only the first swatch token; use separate one-token controls so every listed role is editable';
}
