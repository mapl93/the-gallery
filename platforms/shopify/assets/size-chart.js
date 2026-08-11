(function () {
  'use strict';

  if (customElements.get('tg-size-chart')) return;

  let currentDialog = null;

  class GallerySizeChart extends HTMLElement {
    connectedCallback() {
      if (this.abortController) return;

      this.trigger = this.querySelector('[data-size-chart-trigger]');
      this.dialog = this.querySelector('[data-size-chart-dialog]');
      this.surface = this.querySelector('[data-size-chart-surface]');
      this.titleElement = this.querySelector('[data-size-chart-title]');
      this.closeButton = this.querySelector('[data-size-chart-close]');

      if (!(this.trigger instanceof HTMLButtonElement)
          || !(this.dialog instanceof HTMLDialogElement)
          || !(this.surface instanceof HTMLElement)
          || !(this.titleElement instanceof HTMLElement)
          || !(this.closeButton instanceof HTMLButtonElement)) return;

      this.abortController = new AbortController();
      const signal = this.abortController.signal;
      this.trigger.addEventListener('click', () => this.open(), { signal });
      this.closeButton.addEventListener('click', () => this.dialog.close(), { signal });
      this.dialog.addEventListener('click', (event) => this.handleBackdrop(event), { signal });
      this.dialog.addEventListener('close', () => this.syncClosedState(), { signal });
      this.addEventListener('change', (event) => this.changePresentation(event), { signal });
      this.syncPresentation();
    }

    disconnectedCallback() {
      this.abortController?.abort();
      this.abortController = null;
      if (currentDialog === this.dialog) {
        currentDialog = null;
        this.restoreScroll();
      }
    }

    open() {
      if (this.dialog.open) return;
      if (currentDialog?.open) currentDialog.close();
      currentDialog = this.dialog;
      this.returnFocus = document.activeElement instanceof HTMLElement
        ? document.activeElement
        : this.trigger;
      this.previousRootOverflow = document.documentElement.style.overflow;
      document.documentElement.style.overflow = 'hidden';
      this.dialog.showModal();
      this.dialog.setAttribute('aria-hidden', 'false');
      this.trigger.setAttribute('aria-expanded', 'true');
      this.titleElement.focus({ preventScroll: true });
    }

    handleBackdrop(event) {
      if (event.target === this.dialog) this.dialog.close();
    }

    syncClosedState() {
      this.dialog.setAttribute('aria-hidden', 'true');
      this.trigger.setAttribute('aria-expanded', 'false');
      if (currentDialog === this.dialog) currentDialog = null;
      this.restoreScroll();
      const focusTarget = this.returnFocus?.isConnected ? this.returnFocus : this.trigger;
      requestAnimationFrame(() => focusTarget?.focus({ preventScroll: true }));
    }

    restoreScroll() {
      if (typeof this.previousRootOverflow !== 'string') return;
      document.documentElement.style.overflow = this.previousRootOverflow;
      this.previousRootOverflow = undefined;
    }

    changePresentation(event) {
      const choice = event.target instanceof Element
        ? event.target.closest('[data-size-chart-choice]')
        : null;
      if (choice instanceof HTMLInputElement && choice.checked && this.contains(choice)) {
        this.syncPresentation(choice.value);
      }
    }

    syncPresentation(value) {
      const selected = String(value || this.querySelector('[data-size-chart-choice]:checked')?.value || 'primary');
      this.querySelectorAll('[data-size-chart-panel]').forEach((panel) => {
        panel.hidden = panel.getAttribute('data-size-chart-panel') !== selected;
      });
    }
  }

  customElements.define('tg-size-chart', GallerySizeChart);
})();
