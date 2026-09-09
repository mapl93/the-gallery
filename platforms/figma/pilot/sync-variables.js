// Figma Plugin API function. Invoke with the generated pilot payload.
// Adapted from the Figma library skill's collection/semantic-token helpers.
// Two passes preserve aliases, and exact collection/name matching preserves IDs.
async function syncGalleryPilotVariables(payload, onlyCollection, previous = {}) {
  const prefix = payload.config.namespace;
  const definitions = { Primitives: ['Default'], Colors: ['Light', 'Dark'], Metrics: ['Mobile', 'Tablet', 'Desktop', 'XL'] };
  const collections = await figma.variables.getLocalVariableCollectionsAsync();
  const existing = await figma.variables.getLocalVariablesAsync();
  if (onlyCollection && !definitions[onlyCollection]) throw new Error('Unknown collection '+onlyCollection);
  for (const t of payload.variables.filter(t => !onlyCollection || t.collection === onlyCollection)) {
    if (!Array.isArray(t.scopes) || !t.modes || !(t.css || t.cssExpression)) throw new Error('Incomplete projection '+t.path);
  }
  const owned = {}, createdIds = [], updatedIds = [], variableIds = {};
  for (const [key, modes] of Object.entries(definitions)) {
    const name = `${prefix} · ${key}`;
    const matches = collections.filter(c => c.name === name);
    if (matches.length > 1) throw new Error(`Ambiguous collection ${name}`);
    let c = matches[0];
    if (previous.collections?.[key] && c?.id !== previous.collections[key].id) throw new Error('Collection identity changed: '+name);
    if (!c && (!onlyCollection || onlyCollection === key)) {
      c = figma.variables.createVariableCollection(name);
      c.renameMode(c.modes[0].modeId, modes[0]);
      for (const mode of modes.slice(1)) c.addMode(mode);
      createdIds.push(c.id);
    }
    if (!c) continue;
    if (JSON.stringify(c.modes.map(m => m.name)) !== JSON.stringify(modes)) throw new Error(`Unexpected modes: ${name}`);
    owned[key] = c;
  }
  const variables = {};
  for (const t of payload.variables) {
    const c = owned[t.collection];
    if (!c) continue;
    const matches = existing.filter(v => v.variableCollectionId === c.id && v.name === t.name);
    if (matches.length > 1) throw new Error(`Ambiguous variable ${t.name}`);
    let v = matches[0];
    const previousId = previous.variableIds?.[t.path];
    if (previousId) {
      const known = existing.find(v => v.id === previousId);
      if (!known || known.variableCollectionId !== c.id || (v && v.id !== previousId)) throw new Error('Variable identity conflict: '+t.path);
      v = known;
    }
    if (!v && (!onlyCollection || onlyCollection === t.collection)) {
      v = figma.variables.createVariable(t.name, c, t.type);
      createdIds.push(v.id);
    }
    if (!v) continue;
    if (v.resolvedType !== t.type) throw new Error(`Incompatible type: ${t.name}`);
    variables[t.path] = v;
    variableIds[t.path] = v.id;
  }
  const families = payload.variables.filter(t => t.sourceType === 'fontFamily').flatMap(t => Object.values(t.modes)).filter(v => typeof v === 'string');
  for (const family of [...new Set(families)]) await figma.loadFontAsync({ family, style: 'Regular' });
  for (const t of payload.variables) {
    if (onlyCollection && onlyCollection !== t.collection) continue;
    const c = owned[t.collection], v = variables[t.path];
    v.name = t.name;
    for (const [name, value] of Object.entries(t.modes)) {
      const mode = c.modes.find(m => m.name === name);
      if (value?.alias && !variables[value.alias]) throw new Error(`Missing alias ${value.alias}`);
      v.setValueForMode(mode.modeId, value?.alias ? figma.variables.createVariableAlias(variables[value.alias]) : value);
    }
    v.scopes = t.scopes;
    v.setVariableCodeSyntax('WEB', t.cssExpression ?? `var(${t.css})`);
    v.description = `${t.description ? t.description + '\n' : ''}Repo: ${t.sourceFile} → ${t.path}. ${t.sourceType === 'dimension' ? 'Figma number in px; rem uses the documented 16 px projection.' : t.sourceType === 'fontFamily' ? 'First CSS family; fallback stack remains in code.' : ''}`;
    if (t.derived) v.hiddenFromPublishing = true;
    updatedIds.push(v.id);
  }
  return { createdIds, updatedIds, variableIds, collections: Object.fromEntries(Object.entries(owned).map(([k, c]) => [k, { id: c.id, modes: c.modes }])) };
}
