(function () {
  'use strict';

  class GalleryDiscountField extends HTMLElement {
    connectedCallback() {
      if (this.abortController) return;

      this.form = this.querySelector('[data-discount-form]');
      this.inputRoot = this.querySelector('[data-discount-input]');
      this.input = this.querySelector('[data-discount-code]');
      this.message = this.querySelector('[data-discount-message]');
      this.applyButton = this.querySelector('[data-discount-apply]');
      this.list = this.querySelector('[data-discount-codes]');
      this.template = this.querySelector('[data-discount-code-template]');
      this.status = this.querySelector('[data-discount-status]');
      this.codes = [];

      if (!this.form || !this.inputRoot || !this.input || !this.message ||
          !this.applyButton || !this.list || !this.template || !this.status) return;

      this.abortController = new AbortController();
      const signal = this.abortController.signal;
      this.form.addEventListener('submit', (event) => this.apply(event), { signal });
      this.list.addEventListener('click', (event) => this.remove(event), { signal });
      this.hydrate();
    }

    disconnectedCallback() {
      this.abortController?.abort();
      this.abortController = null;
    }

    get actions() {
      return window.Shopify?.actions;
    }

    async hydrate() {
      if (typeof this.actions?.getCart !== 'function') {
        this.showError(this.dataset.unavailableMessage);
        this.applyButton.disabled = true;
        return;
      }

      this.setBusy(true);
      try {
        const result = await this.actions.getCart();
        this.renderCodes(result?.cart);
      } catch (error) {
        if (error?.name !== 'AbortError') this.showError(this.dataset.unavailableMessage);
      } finally {
        this.setBusy(false);
      }
    }

    confirmedCodes(cart) {
      if (!Array.isArray(cart?.discountCodes)) return [];

      return cart.discountCodes.reduce((codes, entry) => {
        const code = typeof entry?.code === 'string' ? entry.code.trim() : '';
        const duplicate = codes.some((current) => current.toLocaleLowerCase() === code.toLocaleLowerCase());
        if (code && entry.applicable !== false && !duplicate) codes.push(code);
        return codes;
      }, []);
    }

    renderCodes(cart) {
      this.codes = this.confirmedCodes(cart);
      this.list.replaceChildren();

      this.codes.forEach((code) => {
        const item = this.template.content.firstElementChild.cloneNode(true);
        const value = item.querySelector('[data-discount-code-value]');
        const remove = item.querySelector('[data-discount-remove]');
        value.textContent = code;
        remove.dataset.code = code;
        remove.setAttribute('aria-label', this.interpolate(this.dataset.removeLabelTemplate, code));
        this.list.append(item);
      });

      this.list.hidden = this.codes.length === 0;
    }

    interpolate(template, code) {
      return String(template || '').replace('__CODE__', code);
    }

    setBusy(busy, removalButton) {
      this.applyButton.disabled = busy;
      this.applyButton.toggleAttribute('aria-busy', busy);
      if (removalButton) {
        removalButton.disabled = busy;
        removalButton.toggleAttribute('aria-busy', busy);
      }
    }

    showError(message) {
      const visibleMessage = String(message || this.dataset.errorMessage || '').trim();
      this.inputRoot.classList.toggle('input--error', Boolean(visibleMessage));
      this.input.toggleAttribute('aria-invalid', Boolean(visibleMessage));
      this.message.textContent = visibleMessage;
      this.message.hidden = !visibleMessage;
    }

    announce(message, assertive) {
      this.status.setAttribute('role', assertive ? 'alert' : 'status');
      this.status.textContent = String(message || '');
    }

    responseError(result) {
      return result?.userErrors?.[0]?.message || result?.warnings?.[0]?.message || '';
    }

    async apply(event) {
      event.preventDefault();
      const candidate = this.input.value.trim();

      if (!candidate) {
        this.showError(this.dataset.emptyMessage);
        this.input.focus();
        return;
      }

      if (typeof this.actions?.updateCart !== 'function') {
        this.showError(this.dataset.unavailableMessage);
        return;
      }

      const requestedCodes = this.codes.some(
        (code) => code.toLocaleLowerCase() === candidate.toLocaleLowerCase()
      ) ? this.codes : [...this.codes, candidate];

      this.showError('');
      this.announce('');
      this.setBusy(true);

      try {
        const result = await this.actions.updateCart({ discountCodes: requestedCodes });
        this.renderCodes(result?.cart);
        const error = this.responseError(result);
        const applied = this.codes.some(
          (code) => code.toLocaleLowerCase() === candidate.toLocaleLowerCase()
        );

        if (error || !applied) {
          this.showError(error || this.dataset.errorMessage);
          this.input.focus();
          return;
        }

        this.input.value = '';
        this.announce(this.interpolate(this.dataset.appliedTemplate, candidate), false);
      } catch (error) {
        if (error?.name !== 'AbortError') this.showError(this.dataset.errorMessage);
      } finally {
        this.setBusy(false);
      }
    }

    async remove(event) {
      const button = event.target.closest('[data-discount-remove]');
      if (!button || !this.list.contains(button)) return;

      const removedCode = button.dataset.code || '';
      if (!removedCode || typeof this.actions?.updateCart !== 'function') return;

      const requestedCodes = this.codes.filter(
        (code) => code.toLocaleLowerCase() !== removedCode.toLocaleLowerCase()
      );
      this.showError('');
      this.announce('');
      this.setBusy(true, button);

      try {
        const result = await this.actions.updateCart({ discountCodes: requestedCodes });
        this.renderCodes(result?.cart);
        const error = this.responseError(result);
        const removed = !this.codes.some(
          (code) => code.toLocaleLowerCase() === removedCode.toLocaleLowerCase()
        );

        if (error || !removed) {
          this.announce(error || this.dataset.errorMessage, true);
          return;
        }

        this.announce(this.interpolate(this.dataset.removedTemplate, removedCode), false);
        this.input.focus();
      } catch (error) {
        if (error?.name !== 'AbortError') this.announce(this.dataset.errorMessage, true);
      } finally {
        this.setBusy(false);
      }
    }
  }

  if (!customElements.get('tg-discount-field')) {
    customElements.define('tg-discount-field', GalleryDiscountField);
  }
})();
