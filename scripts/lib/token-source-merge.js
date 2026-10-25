const unsafeKeys = new Set(['__proto__', 'constructor', 'prototype']);

export function isUnsafeTokenSourceKey(key) {
  return unsafeKeys.has(key);
}

function isObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function isToken(value) {
  return isObject(value) && Object.prototype.hasOwnProperty.call(value, '$value');
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

export function mergeTokenSources(target, source) {
  for (const [key, value] of Object.entries(source)) {
    if (key.startsWith('$')) continue;
    if (isUnsafeTokenSourceKey(key)) {
      throw new Error(`Unsafe token source key "${key}"`);
    }

    if (isToken(value)) {
      target[key] = clone(value);
    } else if (isObject(value)) {
      if (!Object.prototype.hasOwnProperty.call(target, key) || !isObject(target[key]) || isToken(target[key])) {
        target[key] = {};
      }
      mergeTokenSources(target[key], value);
    } else {
      target[key] = clone(value);
    }
  }
  return target;
}
