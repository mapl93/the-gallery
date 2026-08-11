/** Generated from components/js/theme.js: File upload. */
import { enhanceMatches, expose, register } from './core.js';

/* ---- File upload ---- */
function enhanceFileUpload(root) {
  if (!(root instanceof HTMLElement) || !root.classList.contains('file-upload')) return;
  if (root.dataset.fileUploadEnhanced === 'true') return;

  const input = root.querySelector('.file-upload__input');
  const status = root.querySelector('.file-upload__status');
  if (!(input instanceof HTMLInputElement) || input.type !== 'file') return;

  const emptyStatus = status instanceof HTMLElement
    ? status.dataset.emptyLabel || status.textContent?.trim() || ''
    : '';

  function syncStatus() {
    const hasSelection = Boolean(input.files && input.files.length > 0);
    root.classList.toggle('file-upload--selected', hasSelection);
    if (!(status instanceof HTMLElement)) return;
    const nextStatus = hasSelection
      ? Array.from(input.files, (file) => file.name).join(', ')
      : emptyStatus;
    if (status.textContent !== nextStatus) status.textContent = nextStatus;
  }

  let dragDepth = 0;
  function includesFiles(event) {
    if (!(event instanceof DragEvent) || !event.dataTransfer) return false;
    const types = Array.from(event.dataTransfer.types || []);
    return types.length === 0 || types.includes('Files');
  }

  root.addEventListener('dragenter', (event) => {
    if (input.disabled || !includesFiles(event)) return;
    dragDepth += 1;
    root.classList.add('file-upload--dragover');
  });
  root.addEventListener('dragover', (event) => {
    if (input.disabled || !includesFiles(event)) return;
    root.classList.add('file-upload--dragover');
  });
  root.addEventListener('dragleave', () => {
    dragDepth = Math.max(0, dragDepth - 1);
    if (dragDepth === 0) root.classList.remove('file-upload--dragover');
  });
  root.addEventListener('drop', () => {
    dragDepth = 0;
    root.classList.remove('file-upload--dragover');
  });
  root.addEventListener('dragend', () => {
    dragDepth = 0;
    root.classList.remove('file-upload--dragover');
  });
  input.addEventListener('input', syncStatus);
  input.addEventListener('change', syncStatus);
  input.form?.addEventListener('reset', () => window.setTimeout(syncStatus, 0));

  syncStatus();
  root.dataset.fileUploadEnhanced = 'true';
}

function enhanceFileUploads(scope = document) {
  enhanceMatches(scope, '.file-upload', enhanceFileUpload);
}

expose({ enhanceFileUploads });
register({ id: 'file-upload', enhance: enhanceFileUploads });
