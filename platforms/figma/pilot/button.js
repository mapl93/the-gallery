async function createGalleryPilotButton(g, iconIds, expand = false) {
  const p=await g.page('Gallery Pilot · Button');
  const existing=p.children.find(n=>n.type==='COMPONENT_SET'&&n.name==='Gallery Pilot/Button');
  if(existing)return {setId:existing.id,variants:existing.children.length,alreadyExists:true};
  const doc=await g.document(p,'Button','Default size · 5 variants × 6 independent interaction states.\nEdit Label and the two independent icon slots. Colors, padding, radius, border, type and density are linked to repo tokens. Busy is a static preview of the leading loading placement.\nSmall / Large, icon-only layout and native activation behavior remain outside this bounded Figma pilot. Full width uses Figma Fill container. Source: components/contracts/button.contract.json and components/css/primitives.css.');
  let base=p.children.find(n=>n.type==='COMPONENT'&&n.name==='Variant=primary, State=default');
  const arrow=await figma.getNodeByIdAsync(iconIds['Arrow right']);
  function colorIcon(n,color){for(const v of n.findAll(c=>'strokes' in c&&Array.isArray(c.strokes)&&c.strokes.length)){v.strokes=v.strokes.map(s=>s.type==='SOLID'?figma.variables.setBoundVariableForPaint(s,'color',g.vars[color]):s);g.track(v);}}
  if(!base){
    base=g.track(figma.createComponent());base.name='Variant=primary, State=default';base.layoutMode='HORIZONTAL';base.resize(140,46);base.primaryAxisSizingMode='AUTO';base.counterAxisSizingMode='AUTO';base.primaryAxisAlignItems='CENTER';base.counterAxisAlignItems='CENTER';base.clipsContent=false;base.strokesIncludedInLayout=true;base.strokeAlign='INSIDE';
    for(const f of ['paddingLeft','paddingRight'])g.bind(base,f,'component.button.padding.x');
    for(const f of ['paddingTop','paddingBottom'])g.bind(base,f,'component.button.padding.y');
    g.bind(base,'itemSpacing','component.button.gap');g.bind(base,'minHeight','component.button.minHeight');g.bind(base,'strokeWeight','component.button.borderWidth');g.radius(base,'component.button.radius');
    base.fills=[g.paint('component.button.primary.background.default')];base.strokes=[g.paint('component.button.primary.border')];
    for(const side of ['leading','trailing']){
      const slot=g.frame(side+'IconSlot','HORIZONTAL');slot.resize(17,20);slot.layoutSizingHorizontal='FIXED';slot.layoutSizingVertical='FIXED';g.bind(slot,'width','adapter.button.opticalSlotSize');g.bind(slot,'height','component.button.iconSize');
      const icon=g.track(arrow.createInstance());slot.appendChild(icon);icon.name=side+'Icon';icon.layoutPositioning='ABSOLUTE';g.bind(icon,'width','component.button.iconSize');g.bind(icon,'height','component.button.iconSize');icon.x=side==='leading'?slot.width-icon.width:0;icon.y=0;icon.constraints={horizontal:side==='leading'?'MAX':'MIN',vertical:'MIN'};colorIcon(icon,'component.button.primary.text');slot.visible=false;
      if(side==='leading')base.appendChild(slot);else base.appendChild(slot);
    }
    const label=await g.text('label','Button','Button',base,'component.button.primary.text');base.insertChild(1,label);
    const spinner=g.track(figma.createEllipse());spinner.name='spinner';base.insertChild(1,spinner);spinner.resize(20,20);g.bind(spinner,'width','component.button.iconSize');g.bind(spinner,'height','component.button.iconSize');spinner.fills=[];spinner.strokes=[g.paint('component.button.primary.text')];g.bind(spinner,'strokeWeight','component.button.spinnerWidth');spinner.strokeAlign='INSIDE';spinner.arcData={startingAngle:0,endingAngle:Math.PI*1.5,innerRadius:1};spinner.visible=false;
    base.x=doc.x;base.y=doc.y+doc.height+40;
  }
  if(!expand)return {baseId:base.id,docId:doc.id,affectedIds:g.affected};
  const nodes=[];
  const variants=['primary','secondary','outline','link','danger'];const states=['default','hover','active','focusVisible','disabled','busy'];
  for(const variant of variants)for(const state of states){
    const n=variant==='primary'&&state==='default'?base:g.track(base.clone());if(n!==base)n.findAll(()=>true).forEach(c=>g.track(c));n.name=`Variant=${variant}, State=${state}`;
    const raw=state==='hover'||state==='active'?state:'default';const fill=`component.button.${variant}.background.${raw}`;const bg=g.vars[fill]?fill:`component.button.${variant}.background.hover`;
    n.fills=[g.paint(bg)];n.strokes=[g.paint(`component.button.${variant}.border`)];const text=`component.button.${variant}.text`;
    const label=n.findOne(c=>c.name==='label');label.fills=[g.paint(text)];
    for(const side of ['leading','trailing'])colorIcon(n.findOne(c=>c.name===side+'Icon'),text);
    const spinner=n.findOne(c=>c.name==='spinner');spinner.strokes=[g.paint(text)];spinner.visible=state==='busy';
    if(state==='disabled')g.bind(n,'opacity','motion.opacity.disabled');
    // Focus outline geometry is applied by sync-component-geometry.js.
    if(variant==='link'){
      for(const f of ['paddingLeft','paddingRight','paddingTop','paddingBottom','minHeight'])g.bind(n,f,'dimension.0');
      await label.setTextStyleIdAsync(g.styles['Button/Link']);
      for(const side of ['leading','trailing']){const slot=n.findOne(c=>c.name===side+'IconSlot');g.bind(slot,'width','component.button.iconSize');n.findOne(c=>c.name===side+'Icon').x=0;}
    }
    nodes.push(n);
  }
  const set=g.track(figma.combineAsVariants(nodes,p));set.name='Gallery Pilot/Button';set.description='Labeled Button at default density. Variant and State are independent. Source: components/contracts/button.contract.json; CSS: components/css/primitives.css. Pilot, unpublished.';
  const labelKey=set.addComponentProperty('Label','TEXT','Button');
  const showLeading=set.addComponentProperty('Show leading icon','BOOLEAN',false),showTrailing=set.addComponentProperty('Show trailing icon','BOOLEAN',false);
  const leadingKey=set.addComponentProperty('Leading icon','INSTANCE_SWAP',arrow.id),trailingKey=set.addComponentProperty('Trailing icon','INSTANCE_SWAP',arrow.id);
  for(const n of nodes){n.findOne(c=>c.name==='label').componentPropertyReferences={characters:labelKey};const busy=n.variantProperties.State==='busy';
    const leading=n.findOne(c=>c.name==='leadingIconSlot');if(!busy)leading.componentPropertyReferences={visible:showLeading};
    n.findOne(c=>c.name==='trailingIconSlot').componentPropertyReferences={visible:showTrailing};
    n.findOne(c=>c.name==='leadingIcon').componentPropertyReferences={mainComponent:leadingKey};n.findOne(c=>c.name==='trailingIcon').componentPropertyReferences={mainComponent:trailingKey};
  }
  // Variant board geometry is documentation, not component spacing.
  set.resizeWithoutConstraints(1180,600);set.x=doc.x;set.y=doc.y+doc.height+40;set.fills=[g.paint('color.surface.primary')];g.mode(set);
  nodes.forEach((n,i)=>{n.x=40+(i%6)*185;n.y=40+Math.floor(i/6)*105;});
  return {setId:set.id,variants:nodes.length,properties:set.componentPropertyDefinitions,variantIds:Object.fromEntries(nodes.map(n=>[n.name,n.id])),affectedIds:g.affected};
}
