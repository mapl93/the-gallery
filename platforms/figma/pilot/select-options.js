async function createGalleryPilotSelectOptions(g,iconIds){
  const p=await g.page('Gallery Pilot · Select');
  const existing=p.children.find(n=>n.type==='COMPONENT'&&n.name==='Gallery Pilot/Utilities/Select panel');
  if(existing)return {panelId:existing.id,alreadyExists:true};
  const check=await figma.getNodeByIdAsync(iconIds.Check);const options=[];
  for(const state of ['default','hover','highlighted','selected','disabled']){
    const n=g.track(figma.createComponent());n.name='State='+state;n.layoutMode='HORIZONTAL';n.resize(310,44);n.layoutSizingHorizontal='FIXED';n.layoutSizingVertical='HUG';n.counterAxisAlignItems='CENTER';n.primaryAxisAlignItems='SPACE_BETWEEN';n.fills=[g.paint(['hover','highlighted'].includes(state)?'color.surface.secondary':'color.transparent')];g.radius(n,'radius.sm');g.bind(n,'minHeight','component.select.optionMinHeight');
    for(const f of ['paddingLeft','paddingRight'])g.bind(n,f,'component.select.optionPadding.x');for(const f of ['paddingTop','paddingBottom'])g.bind(n,f,'component.select.optionPadding.y');
    await g.text('label','Option',state==='selected'?'Select/Selected option':'Field/Value',n,state==='disabled'?'adapter.field.disabledText':'color.text.primary');
    const icon=g.track(check.createInstance());n.appendChild(icon);icon.name='check';g.bind(icon,'width','component.select.indicatorSize');g.bind(icon,'height','component.select.indicatorSize');icon.visible=state==='selected';options.push(n);
  }
  const set=g.track(figma.combineAsVariants(options,p));set.name='Gallery Pilot/Utilities/Select option';set.description='Option anatomy composed by Select; selected, highlighted and disabled appearances remain independent of field validation.';const key=set.addComponentProperty('Label','TEXT','Option');for(const o of options)o.findOne(n=>n.name==='label').componentPropertyReferences={characters:key};set.resizeWithoutConstraints(390,360);set.x=2100;set.y=100;g.mode(set);options.forEach((o,i)=>{o.x=40;o.y=24+i*64;});
  const panel=g.track(figma.createComponent());panel.name='Gallery Pilot/Utilities/Select panel';panel.layoutMode='VERTICAL';panel.resize(320,142);panel.layoutSizingHorizontal='FIXED';panel.layoutSizingVertical='HUG';panel.itemSpacing=0;panel.strokesIncludedInLayout=true;panel.strokeAlign='INSIDE';g.bind(panel,'strokeWeight','component.select.panelBorderWidth');g.bind(panel,'maxHeight','component.select.panelMaxHeight');g.bind(panel,'maxWidth','component.select.panelMaxWidth');g.radius(panel,'radius.md');panel.fills=[g.paint('color.surface.primary')];panel.strokes=[g.paint('color.border.default')];
  for(const f of ['paddingTop','paddingBottom','paddingLeft','paddingRight'])g.bind(panel,f,'component.select.panelPadding');
  const effect=await figma.getLocalEffectStylesAsync();await panel.setEffectStyleIdAsync(effect.find(s=>s.name==='Gallery Pilot/Select/Panel shadow').id);
  for(const [label,state]of [['General enquiry','selected'],['Commission','highlighted'],['Press','default']]){const option=g.track(options.find(n=>n.name==='State='+state).createInstance());panel.appendChild(option);option.setProperties({[key]:label});option.layoutSizingHorizontal='FILL';}
  panel.x=2540;panel.y=100;
  return {optionSetId:set.id,panelId:panel.id,optionIds:Object.fromEntries(options.map(n=>[n.name,n.id])),affectedIds:g.affected};
}
