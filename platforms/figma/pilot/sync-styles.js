async function syncGalleryPilotStyles(variableIds) {
  const entries = await Promise.all(Object.entries(variableIds).map(async ([k,id]) => [k,await figma.variables.getVariableByIdAsync(id)]));
  const vars = Object.fromEntries(entries);
  await Promise.all(['Regular','Medium','Semi Bold'].map(style => figma.loadFontAsync({family:'Inter',style})));
  const existing = await figma.getLocalTextStylesAsync();
  const styles = {}, affectedIds = [];
  const specs = [
    ['Button','Semi Bold','component.button.fontSize','component.button.fontWeight','adapter.button.lineHeightPx'],
    ['Button/Link','Semi Bold','component.button.fontSize','component.button.fontWeight','adapter.button.lineHeightPx'],
    ['Field/Label','Medium','typography.body.small.size','component.input.labelFontWeight','typography.body.small.lineHeight'],
    ['Field/Value','Regular','typography.body.default.size','font.weight.regular','typography.body.default.lineHeight'],
    ['Field/Message','Regular','typography.body.caption.size','font.weight.regular','typography.body.caption.lineHeight'],
    ['Select/Selected option','Semi Bold','typography.body.default.size','component.select.optionSelectedWeight','typography.body.default.lineHeight'],
  ];
  for (const [role,fontStyle,size,weight,lineHeight] of specs) {
    const name = 'Gallery Pilot/'+role;
    const matches = existing.filter(s => s.name === name);
    if (matches.length > 1) throw new Error('Ambiguous style '+name);
    const s = matches[0] ?? figma.createTextStyle();
    if (matches[0]) await figma.loadFontAsync(s.fontName);
    s.name=name; s.fontName={family:'Inter',style:fontStyle}; s.letterSpacing={unit:'PIXELS',value:0};
    s.textDecoration=role==='Button/Link'?'UNDERLINE':'NONE';
    s.setBoundVariable('fontFamily',vars['font.family.sans']);
    s.setBoundVariable('fontSize',vars[size]);
    s.setBoundVariable('fontWeight',vars[weight]);
    s.lineHeight={unit:'PIXELS',value:24};
    s.setBoundVariable('lineHeight',vars[lineHeight]);
    s.description='Repo form typography. Every font family, size, weight and line height is bound to the pilot variable projection.';
    styles[role]=s.id; affectedIds.push(s.id);
  }
  const effects = await figma.getLocalEffectStylesAsync();
  const name='Gallery Pilot/Select/Panel shadow';
  const matches=effects.filter(s=>s.name===name);
  if(matches.length>1)throw new Error('Ambiguous effect '+name);
  const effectStyle=matches[0]??figma.createEffectStyle();effectStyle.name=name;
  let shadow={type:'DROP_SHADOW',color:{r:0,g:0,b:0,a:0.1},offset:{x:0,y:10},radius:15,spread:-3,visible:true,blendMode:'NORMAL'};
  for(const [field,p] of [['color','color'],['offsetX','x'],['offsetY','y'],['radius','blur'],['spread','spread']]) shadow=figma.variables.setBoundVariableForEffect(shadow,field,vars['shadow.lg.'+p]);
  effectStyle.effects=[shadow];effectStyle.description='Composes shadow.lg.*; no additional elevation is added to the controls.';
  styles['Select/Panel shadow']=effectStyle.id;affectedIds.push(effectStyle.id);
  return {styles,affectedIds};
}
