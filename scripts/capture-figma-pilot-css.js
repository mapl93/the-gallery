// Run only in a bounded browser evidence phase. Uses the already installed CLI.
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const cli = process.env.TG_PLAYWRIGHT_CLI;
assert(cli, 'Set TG_PLAYWRIGHT_CLI to the existing playwright-cli executable.');
const read = p => fs.readFileSync(path.join(root, p), 'utf8');
const css = read('components/css/primitives.css');
const block = selector => { const start = css.indexOf(selector + ' {'); assert(start >= 0, selector); return css.slice(start, css.indexOf('}', start)); };
const decl = (selector, variable) => { const m = block(selector).match(new RegExp(variable + ': ([^;]+);')); assert(m, variable); return m[1]; };
const expressions = {
  'adapter.input.default.border': decl('.input', '--_input-border'),
  'adapter.input.default.focusBorder': decl('.input__field:focus-visible', '--_input-border'),
  'adapter.field.disabledText': 'var(--color-text-disabled)',
  'adapter.field.focusRing': 'var(--color-border-focus-subtle)',
};
for (const family of ['input', 'select']) for (const variant of ['error', 'success', 'warning']) {
  for (const [role, property] of [['border', '--_input-border'], ['copy', '--_input-label']]) {
    let value = decl(`.${family}--${variant}`, property);
    value = value.replace('var(--_select-semantic-boundary-weight)', decl('.select', '--_select-semantic-boundary-weight'))
      .replace('var(--_select-semantic-copy-weight)', decl('.select', '--_select-semantic-copy-weight'));
    expressions[`adapter.${family}.${variant}.${role}`] = value;
  }
}
const html = `<style>${read('platforms/web/tokens.css')}\n${css}\n*{box-sizing:border-box}body{padding:32px} .fixture{width:320px;margin:20px}</style><div class="fixture input"><label class="input__label input__label--required">Email</label><input class="input__field" placeholder="you@example.com"><span class="input__message">Supporting message</span></div><button class="btn">Continue</button>`;
const code = `async (page) => {
  await page.setViewportSize({width:1200,height:800});
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.setContent(${JSON.stringify(html)});
  const expressions=${JSON.stringify(expressions)};
  const result={expressions,themes:{},geometry:{}};
  for(const theme of ['light','dark']) {
    await page.locator('html').evaluate((el,t)=>el.dataset.theme=t,theme);
    result.themes[theme]=await page.evaluate((expressions)=>{
      const canvas=document.createElement('canvas');canvas.width=canvas.height=1;
      const ctx=canvas.getContext('2d',{colorSpace:'srgb',willReadFrequently:true});
      const probe=document.createElement('span');document.body.append(probe);
      const values={};
      for(const [name,expression] of Object.entries(expressions)) {
        probe.style.color=expression;
        const computed=getComputedStyle(probe).color;
        ctx.clearRect(0,0,1,1);ctx.fillStyle=computed;ctx.fillRect(0,0,1,1);
        const [r,g,b,a]=ctx.getImageData(0,0,1,1).data;
        values[name]={rgba:{r:r/255,g:g/255,b:b/255,a:a/255},computed};
      }
      probe.remove();return values;
    },expressions);
    result.geometry[theme]=await page.evaluate(()=>Object.fromEntries(['.input__field','.btn'].map(s=>{const e=document.querySelector(s),c=getComputedStyle(e);return [s,{height:e.getBoundingClientRect().height,paddingX:c.paddingLeft,paddingY:c.paddingTop,fontSize:c.fontSize,lineHeight:c.lineHeight,border:c.borderWidth}]})));
  }
  return result;
}`;
const run = spawnSync(cli, ['-s=gallery-refinement', 'run-code', code], { encoding: 'utf8', maxBuffer: 4e6 });
assert.equal(run.status, 0, run.stderr || run.stdout);
const result = run.stdout.match(/### Result\s*\n([\s\S]+?)\n### Ran/);
if (!result) fs.writeFileSync(path.join(root, 'output/figma/capture-error.log'), run.stdout);
assert(result, 'No structured browser result; see output/figma/capture-error.log.');
const capture = JSON.parse(result[1]);
capture.sourceHashes = Object.fromEntries(['components/css/primitives.css', 'platforms/web/tokens.css'].map(p => [p, crypto.createHash('sha256').update(read(p)).digest('hex')]));
fs.mkdirSync(path.join(root, 'output/figma'), { recursive: true });
fs.writeFileSync(path.join(root, 'output/figma/pilot.css.json'), JSON.stringify(capture, null, 2) + '\n');
console.log(JSON.stringify({ derivedColors: Object.keys(expressions).length, ...JSON.parse(result[1]).geometry }, null, 2));
