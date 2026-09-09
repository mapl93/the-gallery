// Composition fixtures are site-owned examples, not new component contracts.
async function buildGalleryPilotForm(g, setIds, wrappers, section) {
  const sets=Object.fromEntries(await Promise.all(Object.entries(setIds).map(async([k,id])=>[k,await figma.getNodeByIdAsync(id)])));
  function instance(kind,parent,props,variant='default',state='default') {
    const set=sets[kind], main=set.children.find(n=>n.variantProperties.Variant===(kind==='button'&&variant==='default'?'primary':variant)&&n.variantProperties.State===state);
    if(!main)throw new Error('Missing form variant '+kind);
    const n=g.track(main.createInstance());parent.appendChild(n);n.name=kind;
    const mapped={};for(const[k,v]of Object.entries(props)){const key=Object.keys(n.componentProperties).find(key=>key.split('#')[0]===k);if(!key)throw new Error('Missing property '+kind+'/'+k);mapped[key]=v;}n.setProperties(mapped);
    n.findAll(()=>true).forEach(c=>g.track(c));return n;
  }
  for(const [key,id]of Object.entries(wrappers)){
    const f=await figma.getNodeByIdAsync(id);if(f.children.some(c=>c.name===section))continue;
    const block=g.frame(section,'VERTICAL',f);block.layoutSizingHorizontal='FILL';g.bind(block,'itemSpacing','dimension.24');
    if(section==='fields'){
      const row=g.frame('details',key==='mobile'?'VERTICAL':'HORIZONTAL',block);row.layoutSizingHorizontal='FILL';g.bind(row,'itemSpacing','dimension.24');
      const name=instance('input',row,{Label:'Nombre',Content:'Tu nombre',Message:'El nombre con el que te responderemos.',Required:true,'Show message':true});name.layoutSizingHorizontal='FILL';
      const email=instance('input',row,{Label:'Email',Content:'tu@ejemplo.com',Message:'Lo usaremos solo para responder.',Required:true,'Show message':true,'Show leading icon':true});email.layoutSizingHorizontal='FILL';
      const subject=instance('select',block,{Label:'Asunto',Content:'Una pieza de la colección',Message:'Elige el tema más cercano a tu consulta.',Required:true,'Show message':true});subject.layoutSizingHorizontal='FILL';
      const message=instance('textarea',block,{Label:'Mensaje',Content:'Cuéntanos un poco más sobre tu idea.',Message:'Puedes incluir medidas, fechas o detalles de entrega.',Required:true,'Show message':true});message.layoutSizingHorizontal='FILL';
    }else if(section==='actions'){
      const row=g.frame('buttons','HORIZONTAL',block);row.layoutSizingHorizontal='FILL';row.primaryAxisAlignItems='MAX';g.bind(row,'itemSpacing','dimension.12');
      instance('button',row,{Label:'Limpiar'},'outline');instance('button',row,{Label:'Revisar consulta','Show trailing icon':true});
      const note=await g.text('status','Vista de diseño · no se envían datos.','Field/Message',block,'color.text.secondary');note.resize(f.width-f.paddingLeft-f.paddingRight,16);note.textAutoResize='HEIGHT';note.layoutSizingHorizontal='FILL';note.layoutSizingVertical='HUG';
    }else if(section==='alignment'){
      await g.text('reviewLabel','Comprobación de altura','Field/Label',block,'color.text.secondary');
      const row=g.frame('adjacent','HORIZONTAL',block);row.layoutSizingHorizontal='FILL';row.counterAxisAlignItems='MAX';g.bind(row,'itemSpacing','dimension.12');
      const field=instance('input',row,{Label:'Obra',Content:'Nombre de la pieza'});field.layoutSizingHorizontal='FILL';instance('button',row,{Label:'Consultar','Show trailing icon':true});
    }else throw new Error('Unknown section '+section);
  }
  return {affectedIds:g.affected};
}
