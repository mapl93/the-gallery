import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const primitiveMotionPath = path.join(repoRoot, 'tokens', 'source', 'primitives', 'motion.tokens.json');
const semanticMotionPath = path.join(repoRoot, 'tokens', 'source', 'semantics', 'motion.tokens.json');
const webTokensPath = path.join(repoRoot, 'platforms', 'web', 'tokens.css');

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function readJson(filePath) {
  assert(fs.existsSync(filePath), `${path.relative(repoRoot, filePath)} does not exist`);
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function getPath(object, tokenPath) {
  return tokenPath.split('.').reduce((current, part) => current?.[part], object);
}

function assertToken(object, tokenPath, type) {
  const token = getPath(object, tokenPath);
  assert(token, `Missing ${tokenPath}`);
  assert(token.$type === type, `${tokenPath} should be $type "${type}"`);
  assert(Object.prototype.hasOwnProperty.call(token, '$value'), `${tokenPath} should define $value`);
  return token;
}

const primitiveMotion = readJson(primitiveMotionPath);
const semanticMotion = readJson(semanticMotionPath);

['instant', 'fast', 'base', 'slow', 'slower'].forEach((name) => {
  assertToken(primitiveMotion, `duration.${name}`, 'duration');
});

['linear', 'in', 'out', 'inOut'].forEach((name) => {
  assertToken(primitiveMotion, `curve.${name}`, 'cubicBezier');
});

['instant', 'micro', 'standard', 'moderate', 'emphasis'].forEach((name) => {
  assertToken(semanticMotion, `motion.duration.${name}`, 'duration');
});

['linear', 'standard', 'enter', 'exit', 'emphasis'].forEach((name) => {
  assertToken(semanticMotion, `motion.curve.${name}`, 'cubicBezier');
});

[
  'instant',
  'micro',
  'standard',
  'disclosure',
  'overlay-enter',
  'overlay-exit',
  'feedback',
  'media',
  'emphasis',
  'continuous'
].forEach((name) => {
  const token = assertToken(semanticMotion, `motion.transition.${name}`, 'transition');
  assert(token.$value.duration, `motion.transition.${name} must define duration`);
  assert(token.$value.delay, `motion.transition.${name} must define delay`);
  assert(token.$value.timingFunction, `motion.transition.${name} must define timingFunction`);
});

['hidden', 'subtle', 'disabled', 'scrim', 'visible'].forEach((name) => {
  assertToken(semanticMotion, `motion.opacity.${name}`, 'number');
});

assert(fs.existsSync(webTokensPath), 'platforms/web/tokens.css does not exist. Run npm run build:tokens:web first.');

const webTokens = fs.readFileSync(webTokensPath, 'utf8');

[
  '--tg-motion-duration-standard:',
  '--tg-motion-curve-enter:',
  '--tg-motion-transition-feedback:',
  '--tg-motion-transition-overlay-enter:',
  '--motion-duration-standard: var(--tg-motion-duration-standard);',
  '--motion-transition-feedback: var(--tg-motion-transition-feedback);',
  '--transition-base: var(--tg-motion-duration-standard);',
  '--transition-slower: var(--tg-motion-duration-emphasis);',
  '--easing-in: var(--tg-motion-curve-exit);',
  '--easing-out: var(--tg-motion-curve-enter);',
  '--opacity-overlay: var(--tg-motion-opacity-scrim);'
].forEach((expected) => {
  assert(webTokens.includes(expected), `platforms/web/tokens.css missing expected motion output: ${expected}`);
});

console.log('Validated motion token architecture: primitives, semantics, transitions, and web aliases.');
