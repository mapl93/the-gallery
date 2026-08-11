import crypto from 'node:crypto';
import fs from 'node:fs';
import http from 'node:http';
import net from 'node:net';
import os from 'node:os';
import path from 'node:path';
import { spawn, spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const host = '127.0.0.1';
const port = 4173;
const evidenceUrl = `http://${host}:${port}`;
const browserSession = 'gallery-refinement';
const stateKey = crypto.createHash('sha256').update(repoRoot).digest('hex').slice(0, 12);
const statePath = path.join(os.tmpdir(), `the-gallery-evidence-${stateKey}.json`);
const command = process.argv[2] ?? 'status';
const playwrightCommandTimeoutMs = 5000;

function readState() {
  try {
    return JSON.parse(fs.readFileSync(statePath, 'utf8'));
  } catch (error) {
    if (error?.code !== 'ENOENT') {
      console.warn(`Evidence resource state is unreadable: ${error.message}`);
    }
    return null;
  }
}

function clearState(ownerToken) {
  const state = readState();
  if (!state || (ownerToken && state.ownerToken !== ownerToken)) return;
  fs.rmSync(statePath, { force: true });
}

function processAlive(pid) {
  if (!Number.isInteger(pid) || pid <= 0) return false;
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

function processGroupAlive(processGroupId) {
  if (!Number.isInteger(processGroupId) || processGroupId <= 0) return false;
  try {
    process.kill(-processGroupId, 0);
    return true;
  } catch {
    return false;
  }
}

function getProcessStart(pid) {
  if (!processAlive(pid)) return null;
  const result = spawnSync('ps', ['-p', String(pid), '-o', 'lstart='], {
    encoding: 'utf8',
  });
  return result.status === 0 ? result.stdout.trim() || null : null;
}

function isRecordedServer(state) {
  if (!state || state.repoRoot !== repoRoot || state.port !== port) return false;
  if (processAlive(state.serverPid)) {
    const currentStart = getProcessStart(state.serverPid);
    return !state.processStart || !currentStart || currentStart === state.processStart;
  }
  return processGroupAlive(state.processGroupId);
}

function probeHttp(timeoutMs = 800) {
  return new Promise((resolve) => {
    const request = http.get(evidenceUrl, (response) => {
      response.resume();
      resolve({ responsive: true, statusCode: response.statusCode });
    });
    request.setTimeout(timeoutMs, () => request.destroy());
    request.on('error', () => resolve({ responsive: false, statusCode: null }));
  });
}

function probePort(timeoutMs = 500) {
  return new Promise((resolve) => {
    const socket = net.createConnection({ host, port });
    const finish = (listening) => {
      socket.destroy();
      resolve(listening);
    };
    socket.setTimeout(timeoutMs);
    socket.once('connect', () => finish(true));
    socket.once('timeout', () => finish(false));
    socket.once('error', () => finish(false));
  });
}

function cachedPlaywrightCliCandidates() {
  const cacheRoot = path.join(os.homedir(), '.npm', '_npx');
  try {
    return fs.readdirSync(cacheRoot, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => path.join(cacheRoot, entry.name, 'node_modules', '.bin', 'playwright-cli'))
      .filter((candidate) => fs.existsSync(candidate))
      .sort((left, right) => fs.statSync(right).mtimeMs - fs.statSync(left).mtimeMs);
  } catch {
    return [];
  }
}

function playwrightExecutable() {
  const pathCandidates = (process.env.PATH ?? '')
    .split(path.delimiter)
    .filter(Boolean)
    .map((directory) => path.join(directory, 'playwright-cli'));
  const candidates = [
    process.env.TG_PLAYWRIGHT_CLI,
    path.join(repoRoot, 'site', 'node_modules', '.bin', 'playwright-cli'),
    ...pathCandidates,
    ...cachedPlaywrightCliCandidates(),
    path.join(process.env.CODEX_HOME ?? path.join(os.homedir(), '.codex'), 'skills', 'playwright', 'scripts', 'playwright_cli.sh'),
  ].filter(Boolean);
  return candidates.find((candidate) => fs.existsSync(candidate)) ?? null;
}

function runPlaywrightCli(args, options = {}) {
  const executable = playwrightExecutable();
  if (!executable) return null;
  return spawnSync(executable, args, {
    encoding: 'utf8',
    timeout: playwrightCommandTimeoutMs,
    killSignal: 'SIGKILL',
    ...options,
  });
}

function listBrowserSessions() {
  const executable = playwrightExecutable();
  if (!executable) {
    return { available: false, output: '', hasOwnedSession: false, status: null };
  }
  const result = runPlaywrightCli(['list']);
  const output = `${result.stdout ?? ''}${result.stderr ?? ''}`.trim();
  const timedOut = result.error?.code === 'ETIMEDOUT';
  return {
    available: !timedOut,
    output,
    hasOwnedSession: !timedOut && output.includes(browserSession),
    status: result.status,
    timedOut,
  };
}

function closeOwnedBrowserSession() {
  const browser = listBrowserSessions();
  if (!browser.available) {
    console.warn(
      browser.timedOut
        ? `Playwright CLI status exceeded ${playwrightCommandTimeoutMs}ms; browser cleanup could not be certified.`
        : 'Playwright CLI is unavailable; browser cleanup could not be checked.',
    );
    return false;
  }
  if (!browser.hasOwnedSession) {
    console.log(`Playwright session '${browserSession}': already closed`);
    return true;
  }
  const result = runPlaywrightCli([`-s=${browserSession}`, 'close'], {
    stdio: 'inherit',
  });
  return result?.status === 0 && !listBrowserSessions().hasOwnedSession;
}

function signalRecordedServer(state, signal) {
  if (!isRecordedServer(state)) return false;
  try {
    process.kill(-state.processGroupId, signal);
    return true;
  } catch (error) {
    if (error?.code !== 'ESRCH') {
      console.warn(`Could not send ${signal} to the managed evidence server: ${error.message}`);
    }
    return false;
  }
}

function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function waitForServerExit(state, timeoutMs) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (!isRecordedServer(state)) return true;
    await sleep(100);
  }
  return !isRecordedServer(state);
}

async function stopRecordedServer() {
  const state = readState();
  if (!state) {
    console.log('Managed Gallery evidence server: already stopped');
    return true;
  }
  if (!isRecordedServer(state)) {
    console.log('Managed Gallery evidence server: stale ownership record removed');
    clearState(state.ownerToken);
    return true;
  }

  signalRecordedServer(state, 'SIGINT');
  if (!(await waitForServerExit(state, 2500))) {
    signalRecordedServer(state, 'SIGTERM');
  }
  if (!(await waitForServerExit(state, 1500))) {
    signalRecordedServer(state, 'SIGKILL');
  }
  const stopped = await waitForServerExit(state, 500);
  if (stopped) clearState(state.ownerToken);
  console.log(`Managed Gallery evidence server: ${stopped ? 'stopped' : 'still running'}`);
  return stopped;
}

async function status() {
  const state = readState();
  const managedServer = isRecordedServer(state);
  const [httpStatus, portListening] = await Promise.all([probeHttp(), probePort()]);
  const browser = listBrowserSessions();

  if (state && !managedServer) clearState(state.ownerToken);

  console.log(`Gallery evidence URL: ${httpStatus.responsive ? `responsive (${httpStatus.statusCode})` : 'not responsive'}`);
  console.log(`Port ${port}: ${portListening ? 'in use' : 'free'}`);
  console.log(`Managed server: ${managedServer ? `running (pid ${state.serverPid})` : 'stopped'}`);
  console.log(
    `Playwright session '${browserSession}': ${
      !browser.available ? 'wrapper unavailable' : browser.hasOwnedSession ? 'open' : 'closed'
    }`,
  );
  if (browser.available && browser.output && browser.output !== '(no browsers)') {
    console.log(`Playwright sessions:\n${browser.output}`);
  }

  return { state, managedServer, httpStatus, portListening, browser };
}

async function serve() {
  const existingState = readState();
  if (isRecordedServer(existingState)) {
    console.log(`Reusing managed Gallery evidence server at ${evidenceUrl} (pid ${existingState.serverPid}).`);
    return;
  }
  if (existingState) clearState(existingState.ownerToken);

  let [httpStatus, portListening] = await Promise.all([probeHttp(), probePort()]);
  if (httpStatus.responsive || portListening) {
    await sleep(150);
    [httpStatus, portListening] = await Promise.all([probeHttp(), probePort()]);
  }
  if (httpStatus.responsive && portListening) {
    console.log(`Reusing pre-existing server at ${evidenceUrl}; it is not owned by this command.`);
    return;
  }
  if (portListening) {
    throw new Error(`Port ${port} is occupied by a non-responsive process; refusing to start another server.`);
  }

  const ownerToken = crypto.randomUUID();
  const child = spawn(
    'npm',
    ['--prefix', 'site', 'run', 'dev', '--', '--host', host, '--port', String(port), '--strictPort'],
    {
      cwd: repoRoot,
      detached: true,
      env: { ...process.env, TG_EVIDENCE_OWNER: ownerToken },
      stdio: 'inherit',
    },
  );

  const state = {
    version: 1,
    repoRoot,
    ownerToken,
    launcherPid: process.pid,
    serverPid: child.pid,
    processGroupId: child.pid,
    processStart: null,
    host,
    port,
    startedAt: new Date().toISOString(),
  };
  state.processStart = getProcessStart(child.pid);
  fs.writeFileSync(statePath, `${JSON.stringify(state, null, 2)}\n`, { mode: 0o600 });

  let shuttingDown = false;
  const shutdown = async (signal) => {
    if (shuttingDown) return;
    shuttingDown = true;
    signalRecordedServer(state, signal);
    if (!(await waitForServerExit(state, 2500))) signalRecordedServer(state, 'SIGTERM');
  };

  process.on('SIGINT', () => void shutdown('SIGINT'));
  process.on('SIGTERM', () => void shutdown('SIGTERM'));

  const exitCode = await new Promise((resolve, reject) => {
    child.once('error', reject);
    child.once('exit', (code, signal) => resolve(signal ? 0 : (code ?? 0)));
  });
  clearState(ownerToken);
  if (listBrowserSessions().available) closeOwnedBrowserSession();
  process.exitCode = exitCode;
}

async function cleanup() {
  const browserClosed = closeOwnedBrowserSession();
  const serverStopped = await stopRecordedServer();
  const result = await status();
  const clean = browserClosed && serverStopped && !result.managedServer && !result.browser.hasOwnedSession;
  if (!clean) process.exitCode = 1;
}

async function assertClean() {
  const result = await status();
  const wrapperReady = result.browser.available;
  const clean = wrapperReady && !result.managedServer && !result.browser.hasOwnedSession;
  if (!wrapperReady) {
    console.error('Cannot certify cleanup because the Playwright CLI wrapper is unavailable.');
  }
  if (!clean) {
    console.error('Evidence resources are not clean. Run `npm run evidence:cleanup`.');
    process.exitCode = 1;
  } else {
    console.log('Evidence resource gate: clean');
  }
}

try {
  if (command === 'serve') await serve();
  else if (command === 'cleanup') await cleanup();
  else if (command === 'assert-clean') await assertClean();
  else if (command === 'status') await status();
  else throw new Error(`Unknown command '${command}'. Use serve, status, cleanup, or assert-clean.`);
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
}
