// Source-compiler CSS contains one custom-property declaration per line.
// Compare authored expressions, never resolved values: different aliases can
// resolve equally today and still respond differently to consumer overrides.
export function tokenDeclarationMap(declarations, label) {
  const entries = new Map();
  for (const declaration of declarations) {
    const match = declaration.match(/^(--[a-zA-Z0-9_-]+):\s*(.*?);(?:\s*\/\*.*\*\/)?$/);
    if (!match) throw new Error(`${label}: unsupported token declaration: ${declaration}`);
    const [, name, value] = match;
    if (entries.has(name)) throw new Error(`${label}: duplicate declaration ${name}`);
    entries.set(name, { value: value.trim(), declaration });
  }
  if (!entries.size) throw new Error(`${label}: empty token matrix`);
  return entries;
}

export function changedTokenDeclarations(current, previous, label) {
  if (previous) {
    // Matrices describe the same public API. Disappearing declarations must not
    // silently inherit stale values; source/API changes require explicit handling.
    const missing = [...previous.keys()].filter((name) => !current.has(name));
    const added = [...current.keys()].filter((name) => !previous.has(name));
    if (missing.length || added.length) throw new Error(`${label}: token inventory changed between viewports (missing: ${missing.join(', ')}; added: ${added.join(', ')})`);
  }
  return [...current.entries()]
    .filter(([name, entry]) => !previous || previous.get(name).value !== entry.value)
    .map(([, entry]) => entry.declaration);
}
