import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8'),json=p=>JSON.parse(read(p));
const payload=json('output/figma/pilot.tokens.json'),manifest=json('platforms/figma/pilot/manifest.json'),evidence=json('platforms/figma/pilot/evidence.json');
assert.equal(manifest.fileKey,payload.config.fileKey);
assert.equal(new Set(Object.values(manifest.variableIds)).size,payload.variables.length,'Duplicate/missing variable identities');
assert.deepEqual(Object.keys(manifest.variableIds).sort(),payload.variables.map(v=>v.path).sort(),'Identity inventory differs from source projection');
for(const [file,hash]of Object.entries(payload.sourceHashes)) assert.equal(crypto.createHash('sha256').update(read(file)).digest('hex'),hash,'Stale projection: '+file);
assert.deepEqual(manifest.sourceHashes,payload.sourceHashes,'Manifest evidence is for another source snapshot');
assert.deepEqual(evidence.sourceHashes,payload.sourceHashes);
const vars=Object.fromEntries(payload.variables.map(v=>[v.path,v]));
const resolve=(p,mode,chain=[])=>{assert(!chain.includes(p),'Alias cycle');const v=vars[p];assert(v,'Broken alias '+p);const value=v.modes[mode]??v.modes.Default;return value?.alias?resolve(value.alias,mode,[...chain,p]):value;};
for(const v of payload.variables)for(const mode of Object.keys(v.modes))assert.notEqual(resolve(v.path,mode),undefined,v.path+'/'+mode);
for(const mode of ['Mobile','Tablet','Desktop','XL']){
 assert.equal(resolve('motion.opacity.disabled',mode),50,'Figma opacity must be percent');
 assert.equal(resolve('component.input.labelGap',mode),4);
 assert.equal(resolve('component.input.messageGap',mode),4);
 assert.equal(resolve('component.button.minHeight',mode),46);
}
assert.equal(evidence.validation.reduce((n,v)=>n+v.variables,0),payload.variables.length);
assert(evidence.validation.every(v=>v.errors.length===0));
assert.deepEqual(evidence.baseline,evidence.restored,'Update did not restore original identities/geometry');
for(const [key,form]of Object.entries(evidence.changed.forms)){
 assert.deepEqual(form.fields.map(f=>[f.id,f.label,f.content]),evidence.baseline.forms[key].fields.map(f=>[f.id,f.label,f.content]),'Instance overrides changed');
 assert(form.fields.every(f=>f.labelGap===8&&f.messageGap===8),'Gap update did not propagate');
 assert(form.alignment.every(c=>c.height===46&&c.y===form.alignment[0].y),'Adjacent control alignment failed');
}
for(const [kind,c]of Object.entries(manifest.components)){
 assert.equal(Object.keys(c.variantIds).length,kind==='button'?30:20);
 assert.equal(new Set(Object.values(c.variantIds)).size,Object.keys(c.variantIds).length);
}
console.log('Figma pilot projection and recorded evidence valid: 154 variables, 90 variants, stable IDs, 4 → 8 → 4 px. This command does not query Figma.');
