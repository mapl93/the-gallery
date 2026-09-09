// Helpers for the bounded Figma Plugin API projection, not canonical components.
async function galleryPilotContext(ids, styles) {
  figma.skipInvisibleInstanceChildren=false;
  await Promise.all(['Regular','Medium','Semi Bold','Bold'].map(style=>figma.loadFontAsync({family:'Inter',style})));
  const pairs=await Promise.all(Object.entries(ids.variableIds).map(async([p,id])=>[p,await figma.variables.getVariableByIdAsync(id)]));
  const vars=Object.fromEntries(pairs), affected=[];
  const track=n=>{affected.push(n.id);return n;};
  function paint(p){if(!vars[p])throw new Error('Missing variable '+p);return figma.variables.setBoundVariableForPaint({type:'SOLID',color:{r:0,g:0,b:0}},'color',vars[p]);}
  function bind(n,field,p){if(!vars[p])throw new Error('Missing variable '+p);n.setBoundVariable(field,vars[p]);}
  function radius(n,p){for(const f of ['topLeftRadius','topRightRadius','bottomLeftRadius','bottomRightRadius'])bind(n,f,p);}
  function frame(name,direction='VERTICAL',parent){const n=track(figma.createAutoLayout(direction));n.name=name;n.fills=[];n.clipsContent=false;n.resize(320,40);if(parent)parent.appendChild(n);n.layoutSizingHorizontal='HUG';n.layoutSizingVertical='HUG';return n;}
  async function text(name,value,role,parent,color='color.text.primary'){
    const n=track(figma.createText());n.name=name;n.fontName={family:'Inter',style:'Regular'};n.characters=value;
    if(styles[role])await n.setTextStyleIdAsync(styles[role]);
    n.fills=[paint(color)];if(parent)parent.appendChild(n);return n;
  }
  async function page(name){let p=figma.root.children.find(p=>p.name===name);if(!p){p=track(figma.createPage());p.name=name;}await figma.setCurrentPageAsync(p);return p;}
  function mode(n,theme='Light',viewport='Desktop'){
    for(const [key,name]of [['Colors',theme],['Metrics',viewport]])n.setExplicitVariableModeForCollection(ids.collections[key].id,ids.collections[key].modes.find(m=>m.name===name).modeId);
  }
  async function document(p,title,description){
    const existing=p.children.filter(n=>n.name==='Documentation');if(existing.length>1)throw new Error('Ambiguous documentation');if(existing.length)return existing[0];
    const n=frame('Documentation','VERTICAL',p);n.resize(1040,240);n.layoutSizingHorizontal='FIXED';n.layoutSizingVertical='HUG';n.paddingTop=n.paddingBottom=n.paddingLeft=n.paddingRight=40;n.itemSpacing=16;n.fills=[paint('color.surface.primary')];mode(n);n.x=Math.max(0,...p.children.filter(c=>c.id!==n.id).map(c=>c.x+c.width))+100;n.y=100;
    const h=await text('Title',title,null,n);h.fontName={family:'Inter',style:'Semi Bold'};h.fontSize=32;h.lineHeight={unit:'PIXELS',value:40};
    const body=await text('Description',description,'Field/Value',n,'color.text.secondary');body.resize(960,48);body.textAutoResize='HEIGHT';body.layoutSizingHorizontal='FIXED';body.layoutSizingVertical='HUG';
    return n;
  }
  function effect(color,spread){let e={type:'DROP_SHADOW',color:{r:0,g:0,b:0,a:1},offset:{x:0,y:0},radius:0,spread:typeof spread==='number'?spread:4,visible:true,blendMode:'NORMAL'};e=figma.variables.setBoundVariableForEffect(e,'color',vars[color]);if(typeof spread==='string')e=figma.variables.setBoundVariableForEffect(e,'spread',vars[spread]);return e;}
  return {vars,styles,affected,track,paint,bind,radius,frame,text,page,mode,document,effect};
}
