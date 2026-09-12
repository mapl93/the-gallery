import test from 'node:test';
import assert from 'node:assert/strict';
import { studioRendererNames, staticSwatchBindingError } from './studio-token-bindings.js';

test('renderer scope follows both quoted and unquoted registered slugs', () => {
  const map = studioRendererNames("const studioRenderers: Registry = {\n  hero: MarketingStudio,\n  'hero-section': MarketingStudio,\n  button: ButtonStudio,\n};");
  assert.equal(map.get('hero-section'), 'MarketingStudio');
  assert.equal(map.get('hero'), 'MarketingStudio');
  assert.equal(map.get('button'), 'ButtonStudio');
  assert.equal(map.has('absent'), false);
});
test('rejects the former Testimonials group that hid secondary and accent roles', () => {
  assert.match(staticSwatchBindingError('MarketingStudio', 'token-swatch',
    ['--color-text-primary', '--color-text-secondary', '--color-text-accent']), /first swatch token/);
});
test('accepts independent static controls and rejects empty bindings', () => {
  assert.equal(staticSwatchBindingError('MarketingStudio', 'token-swatch', ['--color-text-secondary']), null);
  assert.match(staticSwatchBindingError('MarketingStudio', 'token-swatch', []), /editable/);
});
test('preserves state-aware color selection and actual paired controls', () => {
  assert.equal(staticSwatchBindingError('ButtonStudio', 'token-swatch', ['--default', '--hover']), null);
  assert.equal(staticSwatchBindingError('MarketingStudio', 'token-pair', ['--x', '--y']), null);
});

test('Blog static groups must expose all color roles and use matching editors', () => {
  assert.match(staticSwatchBindingError('BlogStudio', 'token-swatch', ['--primary', '--secondary'], 'color'), /first swatch token/);
  assert.match(staticSwatchBindingError('BlogStudio', 'token-swatch', ['--space'], 'spacing'), /require color/);
  assert.equal(staticSwatchBindingError('BlogStudio', 'token', ['--space'], 'spacing'), null);
  assert.equal(staticSwatchBindingError('BlogStudio', 'token-swatch', ['--secondary'], 'color'), null);
});

test('Storytelling selected filter border and text cannot hide behind its surface', () => {
  assert.match(staticSwatchBindingError('StorytellingStudio', 'token-swatch', ['--bg', '--border', '--text'], 'color'), /first swatch token/);
  assert.equal(staticSwatchBindingError('StorytellingStudio', 'token-swatch', ['--border'], 'color'), null);
});

test('Pages, Reviews and Cart static swatches expose each role', () => {
  for (const renderer of ['PagesStudio', 'ReviewsStudio', 'CartStudio']) {
    assert.match(staticSwatchBindingError(renderer, 'token-swatch', ['--primary', '--secondary'], 'color'), /first swatch token/);
    assert.equal(staticSwatchBindingError(renderer, 'token-swatch', ['--primary'], 'color'), null);
  }
});
