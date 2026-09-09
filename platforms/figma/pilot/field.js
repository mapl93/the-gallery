async function createGalleryPilotField(g, iconIds, kind, expand=false) {
  const title={input:'Input',select:'Select',textarea:'Textarea'}[kind];
  const p=await g.page('Gallery Pilot · '+title);
  const existing=p.children.find(n=>n.type==='COMPONENT_SET'&&n.name==='Gallery Pilot/'+title);
  if(existing)return {setId:existing.id,variants:existing.children.length,alreadyExists:true};
  const doc=await g.document(p,title,`4 validation variants × ${kind==='select'?'5':'5'} independent field states.\nLabel, content, required marker and supporting message are editable. Label gap and message gap remain independent variables shared across Input, Select and Textarea.\n${kind==='textarea'?'This pilot shows the CSS 120 px minimum; native resize and line-bound behavior belong to the browser.':kind==='select'?'The open preview composes a separate option panel. Native option navigation, dismissal and value semantics belong to the browser.':'Leading and trailing icons are independent passive slots.'}\nSource: components/contracts/${kind}.contract.json and components/css/primitives.css.`);
  const [arrow,mail,chevron]=await Promise.all(['Arrow right','Mail','Chevron down'].map(n=>figma.getNodeByIdAsync(iconIds[n])));
  if(kind==='select'){doc.x=100;doc.y=100;}
  const setName='Variant=default, State=default';let base=p.children.find(n=>n.type==='COMPONENT'&&n.name===setName);
  function colorIcon(n,color){for(const v of n.findAll(c=>'strokes' in c&&Array.isArray(c.strokes)&&c.strokes.length)){v.strokes=v.strokes.map(s=>s.type==='SOLID'?figma.variables.setBoundVariableForPaint(s,'color',g.vars[color]):s);g.track(v);}}
  if(!base){
    base=g.track(figma.createComponent());base.name=setName;base.layoutMode='VERTICAL';base.resize(320,90);base.layoutSizingHorizontal='FIXED';base.layoutSizingVertical='HUG';base.fills=[];base.clipsContent=false;base.itemSpacing=0;
    const labelWrap=g.frame('labelSpacing','VERTICAL',base);labelWrap.layoutSizingHorizontal='FILL';g.bind(labelWrap,'paddingBottom','component.input.labelGap');
    const labelRow=g.frame('labelRow','HORIZONTAL',labelWrap);labelRow.counterAxisAlignItems='CENTER';labelRow.itemSpacing=3.5;
    await g.text('label','Label','Field/Label',labelRow,'color.text.secondary');
    const required=g.frame('required','HORIZONTAL',labelRow);required.resize(7,20);required.layoutSizingHorizontal='FIXED';required.layoutSizingVertical='FIXED';required.visible=false;
    const star=await g.text('requiredGlyph','*','Field/Label',required,'color.field.required');star.layoutPositioning='ABSOLUTE';star.x=0;star.y=1.4;
    const field=g.frame('field',kind==='textarea'?'VERTICAL':'HORIZONTAL',base);field.resize(320,46);field.layoutSizingHorizontal='FILL';field.layoutSizingVertical='HUG';field.strokesIncludedInLayout=true;field.strokeAlign='INSIDE';field.counterAxisAlignItems=kind==='textarea'?'MIN':'CENTER';field.fills=[g.paint('color.surface.primary')];field.strokes=[g.paint('adapter.input.default.border')];g.bind(field,'strokeWeight','component.input.borderWidth');g.radius(field,'radius.md');
    for(const f of ['paddingLeft','paddingRight'])g.bind(field,f,'component.input.padding.x');for(const f of ['paddingTop','paddingBottom'])g.bind(field,f,'component.input.padding.y');g.bind(field,'itemSpacing',kind==='select'?'component.select.indicatorGap':'component.input.iconGap');
    if(kind==='textarea')field.minHeight=120;
    if(kind==='input'){
      const icon=g.track(mail.createInstance());field.appendChild(icon);icon.name='leadingIcon';g.bind(icon,'width','component.input.iconSize');g.bind(icon,'height','component.input.iconSize');icon.visible=false;colorIcon(icon,'color.text.secondary');
    }
    const value=await g.text('value',kind==='select'?'Choose an option':kind==='textarea'?'Your message':'Your value','Field/Value',field);value.resize(240,24);value.textAutoResize=kind==='textarea'?'HEIGHT':'NONE';value.layoutSizingHorizontal='FILL';if(kind==='textarea')value.layoutSizingVertical='HUG';
    if(kind==='input'||kind==='select'){
      const icon=g.track((kind==='select'?chevron:arrow).createInstance());field.appendChild(icon);icon.name=kind==='select'?'indicator':'trailingIcon';g.bind(icon,'width',kind==='select'?'component.select.indicatorSize':'component.input.iconSize');g.bind(icon,'height',kind==='select'?'component.select.indicatorSize':'component.input.iconSize');if(kind==='input')icon.visible=false;colorIcon(icon,'color.text.secondary');
    }
    const messageWrap=g.frame('messageSpacing','VERTICAL',base);messageWrap.layoutSizingHorizontal='FILL';g.bind(messageWrap,'paddingTop','component.input.messageGap');messageWrap.visible=false;
    const message=await g.text('message','Supporting message','Field/Message',messageWrap,'color.text.secondary');message.resize(320,16);message.textAutoResize='HEIGHT';message.layoutSizingHorizontal='FILL';message.layoutSizingVertical='HUG';
    base.x=doc.x;base.y=doc.y+doc.height+40;
  }
  if(!expand)return {baseId:base.id,docId:doc.id,affectedIds:g.affected};
  const nodes=[],variants=['default','error','success','warning'],states=kind==='select'?['default','hover','focusVisible','disabled','open']:['default','hover','focusVisible','disabled','readOnly'];
  for(const variant of variants)for(const state of states){
    const n=variant==='default'&&state==='default'?base:g.track(base.clone());if(n!==base)n.findAll(()=>true).forEach(c=>g.track(c));n.name=`Variant=${variant}, State=${state}`;
    const field=n.findOne(c=>c.name==='field'),label=n.findOne(c=>c.name==='label'),value=n.findOne(c=>c.name==='value'),message=n.findOne(c=>c.name==='message');
    const family=kind==='select'?'select':'input';let border=variant==='default'?'adapter.input.default.border':`adapter.${family}.${variant}.border`;
    if(state==='hover'&&variant==='default')border='color.border.strong';
    if(state==='focusVisible'&&variant==='default')border='adapter.input.default.focusBorder';
    if(state==='open'&&variant==='default')border='color.border.strong';
    const copy=variant==='default'?'color.text.secondary':`adapter.${family}.${variant}.copy`;
    label.fills=[g.paint(copy)];message.fills=[g.paint(copy)];
    for(const icon of field.findAllWithCriteria({types:['INSTANCE']}))colorIcon(icon,variant==='default'?'color.text.secondary':`adapter.${family}.${variant}.border`);
    if(state==='disabled'){border='color.border.default';field.fills=[g.paint('color.surface.secondary')];value.fills=[g.paint('adapter.field.disabledText')];g.bind(field,'opacity','motion.opacity.disabled');}
    field.strokes=[g.paint(border)];
    // Focus outline geometry is applied by sync-component-geometry.js.
    if(state==='open'){
      const indicator=n.findOne(c=>c.name==='indicator');indicator.rotation=180;
      const panelSource=p.children.find(c=>c.type==='COMPONENT'&&c.name==='Gallery Pilot/Utilities/Select panel');if(!panelSource)throw new Error('Create the Select panel first.');
      const overlay=g.frame('panelPlacement','VERTICAL',field);overlay.layoutPositioning='ABSOLUTE';overlay.resize(320,150);overlay.layoutSizingHorizontal='FIXED';overlay.layoutSizingVertical='HUG';g.bind(overlay,'paddingTop','component.select.panelGap');
      const panel=g.track(panelSource.createInstance());overlay.appendChild(panel);panel.name='options';panel.layoutSizingHorizontal='FILL';overlay.x=0;overlay.y=field.height;overlay.constraints={horizontal:'STRETCH',vertical:'MAX'};
    }
    nodes.push(n);
  }
  const set=g.track(figma.combineAsVariants(nodes,p));set.name='Gallery Pilot/'+title;set.description=`Editable ${title} pilot. Variant and State are independent. Source: components/contracts/${kind}.contract.json. Native form semantics remain in the target implementation.`;
  const labelKey=set.addComponentProperty('Label','TEXT','Label'),valueKey=set.addComponentProperty('Content','TEXT',kind==='select'?'Choose an option':kind==='textarea'?'Your message':'Your value'),messageKey=set.addComponentProperty('Message','TEXT','Supporting message'),requiredKey=set.addComponentProperty('Required','BOOLEAN',false),showMessage=set.addComponentProperty('Show message','BOOLEAN',false);
  let leadingKey,trailingKey,showLeading,showTrailing;
  if(kind==='input'){showLeading=set.addComponentProperty('Show leading icon','BOOLEAN',false);showTrailing=set.addComponentProperty('Show trailing icon','BOOLEAN',false);leadingKey=set.addComponentProperty('Leading icon','INSTANCE_SWAP',mail.id);trailingKey=set.addComponentProperty('Trailing icon','INSTANCE_SWAP',arrow.id);}
  for(const n of nodes){n.findOne(c=>c.name==='label').componentPropertyReferences={characters:labelKey};n.findOne(c=>c.name==='value').componentPropertyReferences={characters:valueKey};n.findOne(c=>c.name==='message').componentPropertyReferences={characters:messageKey};n.findOne(c=>c.name==='required').componentPropertyReferences={visible:requiredKey};n.findOne(c=>c.name==='messageSpacing').componentPropertyReferences={visible:showMessage};
    if(kind==='input'){n.findOne(c=>c.name==='leadingIcon').componentPropertyReferences={visible:showLeading,mainComponent:leadingKey};n.findOne(c=>c.name==='trailingIcon').componentPropertyReferences={visible:showTrailing,mainComponent:trailingKey};}
  }
  set.resizeWithoutConstraints(1860,kind==='input'?720:1180);set.x=doc.x;set.y=doc.y+doc.height+40;set.fills=[g.paint('color.surface.primary')];g.mode(set);nodes.forEach((n,i)=>{n.x=40+(i%5)*360;n.y=40+Math.floor(i/5)*(kind==='input'?155:280);});
  return {setId:set.id,variants:nodes.length,properties:set.componentPropertyDefinitions,variantIds:Object.fromEntries(nodes.map(n=>[n.name,n.id])),affectedIds:g.affected};
}
