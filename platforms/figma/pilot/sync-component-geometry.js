// Small geometry transforms that Figma variables cannot express as arithmetic.
async function syncGalleryPilotComponentGeometry(g, setIds) {
  for (const [kind,id] of Object.entries(setIds)) {
    const set=await figma.getNodeByIdAsync(id);
    for(const n of set.children) {
      const {Variant:variant,State:state}=n.variantProperties;
      if(kind==='button') {
        const label=n.findOne(c=>c.name==='label');
        if(variant==='link'){await label.setTextStyleIdAsync(g.styles['Button/Link']);g.track(label);}
        for(const side of ['leading','trailing']){
          const icon=n.findOne(c=>c.name===side+'Icon'),slot=icon.parent;
          icon.x=side==='leading'&&variant!=='link'?slot.width-icon.width:0;
          icon.constraints={horizontal:side==='leading'&&variant!=='link'?'MAX':'MIN',vertical:'MIN'};g.track(icon);
        }
        const spinner=n.findOne(c=>c.name==='spinner');spinner.arcData={startingAngle:0,endingAngle:Math.PI*1.5,innerRadius:1};g.track(spinner);
      }
      if(state!=='focusVisible'&&!(kind==='select'&&state==='open'&&variant!=='default'))continue;
      const target=kind==='button'?n:n.findOne(c=>c.name==='field');
      // An outline is represented by an actual stroke. Zero-blur expanded shadows
      // carried spread metadata but failed the native PNG visual check.
      target.effects=[];g.track(target);
      let ring=target.children.find(c=>c.name==='focusRing');
      if(!ring){ring=g.track(figma.createRectangle());target.appendChild(ring);ring.name='focusRing';}else g.track(ring);
      ring.layoutPositioning='ABSOLUTE';ring.fills=[];ring.strokeAlign='INSIDE';
      const path=kind==='button'?'component.button':'component.input';
      const spread=g.vars[kind==='button'?'adapter.button.focusOuterSpread':'adapter.input.focusOuterSpread'].resolveForConsumer(target).value;
      ring.resize(target.width+2*spread,target.height+2*spread);ring.x=-spread;ring.y=-spread;ring.constraints={horizontal:'STRETCH',vertical:'STRETCH'};
      g.bind(ring,'strokeWeight',path+'.focusRingWidth');
      ring.cornerRadius=(typeof target.topLeftRadius==='number'?target.topLeftRadius:0)+spread;
      ring.strokes=[g.paint(kind==='button'?'color.text.primary':variant==='default'?'adapter.field.focusRing':'color.feedback.'+variant+'.background')];
    }
  }
  return {affectedIds:g.affected};
}
