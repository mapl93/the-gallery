import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mergeTokenSources } from './token-source-merge.js';

test('token merging rejects dangerous group, token and scalar keys at any depth', () => {
  for (const key of ['__proto__', 'constructor', 'prototype']) {
    for (const value of [true, { securityProbe: true }, { $type: 'number', $value: 1 }]) {
      const source = JSON.parse(JSON.stringify({ [key]: value }));
      assert.throws(() => mergeTokenSources({}, source), /Unsafe token source key/);
      assert.throws(() => mergeTokenSources({}, { color: source }), /Unsafe token source key/);
      assert.equal(Object.prototype.securityProbe, undefined);
    }
  }
});

test('token merging never recurses into inherited target groups', () => {
  const inherited = { color: { original: true } };
  const target = Object.create(inherited);
  mergeTokenSources(target, { color: { brand: { $type: 'color', $value: '#123456' } } });
  assert.deepEqual(inherited, { color: { original: true } });
  assert.equal(Object.hasOwn(target, 'color'), true);
  assert.equal(target.color.brand.$value, '#123456');
});

test('ordinary overrides preserve references, siblings and source ownership', () => {
  const source = { $description: 'metadata', color: { brand: { $type: 'color', $value: '{color.base}' } } };
  const target = { color: { base: { $type: 'color', $value: '#123456' } } };
  mergeTokenSources(target, source);
  assert.equal(target.color.base.$value, '#123456');
  assert.equal(target.color.brand.$value, '{color.base}');
  assert.equal(Object.hasOwn(target, '$description'), false);
  target.color.brand.$value = '#ffffff';
  assert.equal(source.color.brand.$value, '{color.base}');
});
