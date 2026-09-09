import { createHash } from 'node:crypto';
import { existsSync, lstatSync, readFileSync } from 'node:fs';
import { dirname, relative, resolve } from 'node:path';

export const INSTALL_FILE = 'tg.install.json';
export const hash = (content) => createHash('sha256').update(content).digest('hex');

// Refuse links instead of following them into consumer files outside this path.
export function inspectFile(file, cwd) {
  let cursor = file;
  while (cursor !== cwd && cursor !== dirname(cursor)) {
    let stat;
    try { stat = lstatSync(cursor); } catch (error) { if (error.code !== 'ENOENT') throw error; }
    if (stat) {
      if (stat.isSymbolicLink()) throw new Error(`Refusing symbolic link: ${relative(cwd, cursor)}`);
      if (cursor === file && !stat.isFile()) throw new Error(`Expected a regular file: ${relative(cwd, cursor)}`);
      if (cursor !== file && !stat.isDirectory()) throw new Error(`Expected a directory: ${relative(cwd, cursor)}`);
    }
    cursor = dirname(cursor);
  }
  return existsSync(file) ? readFileSync(file) : null;
}

export function loadInstallState(cwd) {
  const content = inspectFile(resolve(cwd, INSTALL_FILE), cwd);
  if (!content) return { version: 1, files: {} };
  const state = JSON.parse(content);
  if (state.version !== 1 || !state.files || Array.isArray(state.files)) {
    throw new Error(`Unsupported or invalid ${INSTALL_FILE}; preserve it and review before installing.`);
  }
  for (const [file, entry] of Object.entries(state.files)) {
    if (!entry || !/^[a-f0-9]{64}$/.test(entry.upstreamHash) || typeof entry.source !== 'string') {
      throw new Error(`Invalid provenance for ${file} in ${INSTALL_FILE}.`);
    }
  }
  return state;
}

export function planInstall({ cwd, files, state, packageVersion }) {
  const destinations = new Set([resolve(cwd, 'tg.config.json'), resolve(cwd, INSTALL_FILE)]);
  return files.map((file) => {
    const destination = resolve(file.destination);
    if (destinations.has(destination)) throw new Error(`Install destination collision: ${destination}`);
    destinations.add(destination);
    const key = relative(cwd, destination);
    const local = inspectFile(destination, cwd);
    const upstreamHash = hash(file.content);
    const localHash = local === null ? null : hash(local);
    const previous = state.files[key];
    let status;
    if (localHash === upstreamHash) status = 'unchanged';
    else if (local === null) status = previous ? 'removed' : 'new';
    else if (!previous || previous.source !== file.source) status = 'untracked';
    else if (localHash === previous.upstreamHash) status = 'update';
    else if (upstreamHash === previous.upstreamHash) status = 'preserve';
    else status = 'conflict';
    return {
      ...file, destination, key, local, localHash, status,
      conflict: ['conflict', 'untracked', 'removed'].includes(status),
      provenance: status === 'preserve' ? previous : { source: file.source, upstreamHash, packageVersion },
    };
  });
}

// A single comparison hunk, trimmed to three context lines. No Git executable or
// temporary files are required, including for the generated runtime entry.
export function contentDiff(local, upstream, file) {
  const before = (local ?? Buffer.from('')).toString('utf8').split('\n');
  const after = upstream.toString('utf8').split('\n');
  let start = 0;
  while (start < before.length && start < after.length && before[start] === after[start]) start++;
  let endBefore = before.length;
  let endAfter = after.length;
  while (endBefore > start && endAfter > start && before[endBefore - 1] === after[endAfter - 1]) {
    endBefore--; endAfter--;
  }
  const contextStart = Math.max(0, start - 3);
  const contextEnd = Math.min(3, before.length - endBefore);
  return [
    `--- local/${file}`, `+++ upstream/${file}`,
    `@@ -${contextStart + 1},${endBefore - contextStart + contextEnd} +${contextStart + 1},${endAfter - contextStart + contextEnd} @@`,
    ...before.slice(contextStart, start).map((line) => ` ${line}`),
    ...before.slice(start, endBefore).map((line) => `-${line}`),
    ...after.slice(start, endAfter).map((line) => `+${line}`),
    ...before.slice(endBefore, endBefore + contextEnd).map((line) => ` ${line}`),
  ].join('\n');
}
