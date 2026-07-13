import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const spikeDir = path.join(rootDir, 'spikes', 'dtcg');
const buildDir = path.join(spikeDir, 'build');
const sourcePath = path.join(spikeDir, 'tokens', 'core.tokens.json');

function read(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function readJson(filePath) {
  return JSON.parse(read(filePath));
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function assertIncludes(filePath, expected) {
  const source = read(filePath);
  assert(
    source.includes(expected),
    `${path.relative(rootDir, filePath)} does not include expected text: ${expected}`
  );
}

const source = readJson(sourcePath);

assert(source.color.gray['900'].$type === 'color', 'source color token must use DTCG $type');
assert(source.color.gray['900'].$value === '#171717', 'source color token must use DTCG $value');
assert(
  source.color.surface.primary.$value === '{color.gray.0}',
  'source semantic token must keep DTCG alias syntax'
);

const cssPath = path.join(buildDir, 'css', 'tokens.css');
const jsPath = path.join(buildDir, 'js', 'tokens.js');
const figmaPath = path.join(buildDir, 'figma', 'tokens.source.dtcg.json');
const resolvedJsonPath = path.join(buildDir, 'figma', 'tokens.resolved.json');
const swiftPath = path.join(buildDir, 'swift', 'GalleryTokens.swift');
const composePath = path.join(buildDir, 'compose', 'GalleryTokens.kt');

for (const filePath of [cssPath, jsPath, figmaPath, resolvedJsonPath, swiftPath, composePath]) {
  assert(fs.existsSync(filePath), `${path.relative(rootDir, filePath)} was not generated`);
}

assertIncludes(cssPath, '--tg-color-gray-900: #171717;');
assertIncludes(cssPath, '--tg-color-surface-primary: var(--tg-color-gray-0);');
assertIncludes(cssPath, '--tg-space-button-padding-x: var(--tg-space-scale-4);');

assertIncludes(jsPath, 'export const TgColorGray900 = "#171717";');
assertIncludes(jsPath, 'export const TgSpaceButtonPaddingX = "1rem";');

const figma = readJson(figmaPath);
assert(
  figma.color.gray['900'].$value === '#171717',
  'Figma/DTCG output should preserve $value'
);
assert(
  figma.color.surface.primary.$value === '{color.gray.0}',
  'Figma/DTCG output should preserve semantic aliases'
);

const resolvedJson = readJson(resolvedJsonPath);
assert(
  resolvedJson.color.surface.primary === '#ffffff',
  'Resolved JSON output should show Style Dictionary can resolve semantic aliases'
);

assertIncludes(swiftPath, 'public enum GalleryTokens');
assertIncludes(swiftPath, 'public static let tgColorGray900 = UIColor');
assertIncludes(swiftPath, 'public static let tgSpaceButtonPaddingX = CGFloat(16.00)');

assertIncludes(composePath, 'package com.thegallery.tokens');
assertIncludes(composePath, 'object GalleryTokens');
assertIncludes(composePath, 'val tgColorGray900 = Color');
assertIncludes(composePath, 'val tgSpaceButtonPaddingX = 16.00.dp');

console.log('DTCG spike validated: CSS, JS, Figma JSON, Swift, and Compose outputs generated successfully.');
