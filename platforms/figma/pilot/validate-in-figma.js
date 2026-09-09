async function validateGalleryPilot(payload, ids, styleIds, setIds) {
  const errors=[];const variables=await figma.variables.getLocalVariablesAsync();
  const collections=await figma.variables.getLocalVariableCollectionsAsync();
  const almost=(a,b)=>typeof a==='number'&&typeof b==='number'?Math.abs(a-b)<0.00001:a&&b&&typeof a==='object'&&typeof b==='object'?Object.keys(a).length===Object.keys(b).length&&Object.keys(a).every(k=>almost(a[k],b[k])):a===b;
  for(const t of payload.variables){
    const c=ids.collections[t.collection],matches=variables.filter(v=>v.variableCollectionId===c.id&&v.name===t.name);
    if(matches.length!==1){errors.push(t.path+': count '+matches.length);continue;}
    const v=matches[0];if(v.id!==ids.variableIds[t.path]||v.resolvedType!==t.type)errors.push(t.path+': identity/type');
    for(const [mode,value]of Object.entries(t.modes)){const modeId=c.modes.find(m=>m.name===mode).modeId;const expected=value?.alias?{type:'VARIABLE_ALIAS',id:ids.variableIds[value.alias]}:value;if(!almost(v.valuesByMode[modeId],expected))errors.push(t.path+'/'+mode+': value/alias');}
    const syntax=t.cssExpression??'var('+t.css+')';if(v.codeSyntax.WEB!==syntax)errors.push(t.path+': code syntax');
    if(v.scopes.includes('ALL_SCOPES'))errors.push(t.path+': unrestricted scope');
  }
  const counts={};const bindings={};
  for(const [kind,id]of Object.entries(setIds)){
    const set=await figma.getNodeByIdAsync(id);counts[kind]=set.children.length;
    if(counts[kind]!==(kind==='button'?30:20))errors.push(kind+': variants');
    for(const n of set.children){
      const {State:state,Variant:variant}=n.variantProperties;
      const target=kind==='button'?n:n.findOne(c=>c.name==='field');
      if(kind==='button'&&variant==='link'&&n.findOne(c=>c.name==='label').textDecoration!=='UNDERLINE')errors.push(n.id+': Link underline');
      if(state==='disabled'&&!almost(target.opacity,0.5))errors.push(n.id+': disabled opacity');
      if(state==='focusVisible'||kind==='select'&&state==='open'&&variant!=='default'){
        const ring=target.findOne(c=>c.name==='focusRing');
        const expected=ids.variableIds[(kind==='button'?'component.button':'component.input')+'.focusRingWidth'];
        if(!ring||!['strokeTopWeight','strokeBottomWeight','strokeLeftWeight','strokeRightWeight'].every(f=>ring.boundVariables[f]?.id===expected))errors.push(n.id+': missing focus outline binding');
      }
      if(kind!=='button'){
        for(const [name,field,path]of [['labelSpacing','paddingBottom','component.input.labelGap'],['messageSpacing','paddingTop','component.input.messageGap']]){
          const node=n.findOne(c=>c.name===name);if(node.boundVariables[field]?.id!==ids.variableIds[path])errors.push(n.id+': '+name);
        }
      }
    }
    bindings[kind]={variantAxis:set.componentPropertyDefinitions.Variant.variantOptions,stateAxis:set.componentPropertyDefinitions.State.variantOptions};
  }
  const styles=await figma.getLocalTextStylesAsync(),effects=await figma.getLocalEffectStylesAsync();
  for(const [role,id]of Object.entries(styleIds)){const s=[...styles,...effects].find(s=>s.id===id);if(!s)errors.push(role+': style ID missing');else if(s.type==='TEXT')for(const f of ['fontFamily','fontSize','fontWeight','lineHeight'])if(!s.boundVariables[f])errors.push(role+': '+f);}
  return {errors,variables:payload.variables.length,totalVariables:variables.length,legacyVariables:variables.filter(v=>!Object.values(ids.collections).some(c=>c.id===v.variableCollectionId)).length,collections:collections.filter(c=>Object.values(ids.collections).some(x=>x.id===c.id)).map(c=>({id:c.id,name:c.name,modes:c.modes.map(m=>m.name)})),counts,bindings,styleIds};
}
