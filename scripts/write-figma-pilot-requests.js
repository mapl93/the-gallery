import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const payload=JSON.parse(read('output/figma/pilot.tokens.json'));
const manifest=JSON.parse(read('platforms/figma/pilot/manifest.json'));
assert.equal(payload.config.fileKey,manifest.fileKey);
const folder='platforms/figma/pilot/';
const ids={collections:manifest.collections,variableIds:manifest.variableIds};
const setIds=Object.fromEntries(Object.entries(manifest.components).map(([k,v])=>[k,v.setId]));
const all=Object.fromEntries(payload.variables.map(v=>[v.path,v]));
const write=(name,code)=>{assert(code.length<=50000,name+' exceeds Figma request limit');fs.writeFileSync(path.join(root,'output/figma',name+'.js'),code+'\n');};
for(const collection of ['Primitives','Colors','Metrics']){
  const paths=new Set();
  function include(p){if(paths.has(p))return;paths.add(p);for(const v of Object.values(all[p].modes))if(v?.alias)include(v.alias);}
  payload.variables.filter(v=>v.collection===collection).forEach(v=>include(v.path));
  const variables=[...paths].map(p=>{const {values,resolved,...v}=all[p];return v.collection===collection?v:{path:v.path,name:v.name,collection:v.collection,type:v.type,modes:{}};});
  const previous={collections:ids.collections,variableIds:Object.fromEntries([...paths].map(p=>[p,ids.variableIds[p]]))};
  write('sync-'+collection.toLowerCase(),read(folder+'sync-variables.js')+'\nreturn await syncGalleryPilotVariables('+JSON.stringify({config:{namespace:payload.config.namespace},variables})+','+JSON.stringify(collection)+','+JSON.stringify(previous)+');');
  const validation={variables:payload.variables.filter(v=>v.collection===collection).map(({path,name,collection,type,modes,css,cssExpression})=>({path,name,collection,type,modes,css,cssExpression}))};
  write('validate-'+collection.toLowerCase(),read(folder+'validate-in-figma.js')+'\nreturn await validateGalleryPilot('+JSON.stringify(validation)+','+JSON.stringify(ids)+','+JSON.stringify(manifest.styles)+','+JSON.stringify(setIds)+');');
}
write('sync-styles',read(folder+'sync-styles.js')+'\nreturn await syncGalleryPilotStyles('+JSON.stringify(ids.variableIds)+');');
write('sync-geometry',read(folder+'design-helpers.js')+'\n'+read(folder+'sync-component-geometry.js')+'\nconst g=await galleryPilotContext('+JSON.stringify(ids)+','+JSON.stringify(manifest.styles)+');return await syncGalleryPilotComponentGeometry(g,'+JSON.stringify(setIds)+');');
console.log('Prepared 5 update requests and 3 read-only Figma validation requests in output/figma.');
