import assert from 'node:assert/strict';
import test from 'node:test';
import { changedTokenDeclarations, tokenDeclarationMap } from './lib/responsive-token-declarations.js';

const matrix = (lines) => tokenDeclarationMap(lines, 'fixture');

test('each independent theme retains a complete base including aliases', () => {
  const lines = ['--tg-color: #fff;', '--color: var(--tg-color);'];
  assert.deepEqual(changedTokenDeclarations(matrix(lines), undefined, 'light'), lines);
  assert.deepEqual(changedTokenDeclarations(matrix(lines), undefined, 'dark'), lines);
});

test('unchanged decisions and aliases disappear from responsive blocks', () => {
  const before = matrix(['--gap: 4px;', '--heading: 28px;', '--public: var(--heading);']);
  const after = matrix(['--gap: 4px;', '--heading: 36px;', '--public: var(--heading);']);
  assert.deepEqual(changedTokenDeclarations(after, before, 'tablet'), ['--heading: 36px;']);
  assert.deepEqual(changedTokenDeclarations(after, after, 'desktop'), []);
});

test('a later viewport returning to the base value must emit a reset', () => {
  const mobile = matrix(['--gap: 4px;']);
  const tablet = matrix(['--gap: 8px;']);
  assert.deepEqual(changedTokenDeclarations(mobile, tablet, 'desktop'), ['--gap: 4px;']);
});

test('distinct alias expressions stay distinct even if their defaults resolve equally', () => {
  const before = matrix(['--a: 4px;', '--b: 4px;', '--gap: var(--a);']);
  const after = matrix(['--a: 4px;', '--b: 4px;', '--gap: var(--b);']);
  assert.deepEqual(changedTokenDeclarations(after, before, 'tablet'), ['--gap: var(--b);']);
});

test('description-only changes do not create responsive values', () => {
  const before = matrix(['--gap: 4px; /** Original description. */']);
  const after = matrix(['--gap: 4px; /** Different description. */']);
  assert.deepEqual(changedTokenDeclarations(after, before, 'tablet'), []);
});

test('preserves quoted values, composites, units and importance', () => {
  const before = matrix(['--font: "A; B", serif;', '--shadow: 0 1px 2px rgb(0 0 0 / .2);', '--gap: 4px;']);
  const after = matrix(['--font: "A; B", serif;', '--shadow: 0 1px 2px rgb(0 0 0 / .2);', '--gap: .25rem !important;']);
  assert.deepEqual(changedTokenDeclarations(after, before, 'tablet'), ['--gap: .25rem !important;']);
});

test('rejects duplicate, empty and unsupported source declarations', () => {
  assert.throws(() => matrix(['--a: 1;', '--a: 2;']), /duplicate/);
  assert.throws(() => matrix([]), /empty/);
  assert.throws(() => matrix(['color: red;']), /unsupported/);
});

test('missing or new properties across viewport matrices fail explicitly', () => {
  const before = matrix(['--gap: 4px;', '--color: red;']);
  assert.throws(() => changedTokenDeclarations(matrix(['--gap: 4px;']), before, 'tablet'), /missing: --color/);
  assert.throws(() => changedTokenDeclarations(matrix(['--gap: 4px;', '--color: red;', '--new: 1;']), before, 'tablet'), /added: --new/);
});
