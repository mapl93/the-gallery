/**
 * The Gallery Shopify Gift Wrap coordinator.
 *
 * Target-native only: maps one canonical Checkbox request to one dedicated
 * sellable variant at quantity one, then reconciles every surface from an
 * authoritative Ajax Cart snapshot.
 */
(function () {
  'use strict';

  if (window.TheGalleryGiftWrap) return;

  const entries = new Map();

  function cartUrl(path) {
    const root = String(window.Shopify?.routes?.root || '/');
    return `${root.replace(/\/?$/, '/')}${path}`;
  }

  async function request(path, options = {}) {
    const { headers, ...requestOptions } = options;
    const response = await fetch(cartUrl(path), {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        ...(headers || {}),
      },
      ...requestOptions,
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) {
      const error = new Error(result.description || result.message || `Cart request failed: ${response.status}`);
      error.name = 'GiftWrapCartError';
      throw error;
    }
    return result;
  }

  function getCart(signal) {
    return request('cart.js', { method: 'GET', signal });
  }

  function matchingLines(cart, variantId) {
    if (!Array.isArray(cart?.items)) return [];
    return cart.items.filter((item) => String(item.variant_id ?? item.id) === variantId);
  }

  function enhance(root) {
    if (!(root instanceof HTMLElement)
        || !root.matches('[data-gift-wrap-target]')
        || root.dataset.giftWrapEnhanced === 'true') return;

    const input = root.querySelector('[data-gift-wrap-input]');
    const status = root.querySelector('[data-gift-wrap-status]');
    const variantId = String(root.dataset.giftWrapVariantId || '').trim();
    if (!(input instanceof HTMLInputElement) || !(status instanceof HTMLElement) || !/^\d+$/.test(variantId)) return;

    const addable = root.dataset.giftWrapAddable === 'true';
    let controller = null;
    let requestSequence = 0;

    function setBusy(busy) {
      root.toggleAttribute('aria-busy', busy);
      input.disabled = busy || (!addable && !input.checked);
    }

    function announce(message, assertive = false) {
      status.setAttribute('role', assertive ? 'alert' : 'status');
      status.classList.toggle('inline-error', assertive);
      status.classList.toggle('visually-hidden', !assertive);
      status.textContent = String(message || '');
    }

    function reconcile(cart) {
      const lines = matchingLines(cart, variantId);
      input.checked = lines.length > 0;
      root.dataset.giftWrapSelectedQuantity = String(
        lines.reduce((quantity, item) => quantity + Number(item.quantity || 0), 0)
      );
      setBusy(false);
      return lines;
    }

    async function updateExisting(lines, selected, signal) {
      const updates = {};
      lines.forEach((item, index) => {
        if (item.key) updates[item.key] = selected && index === 0 ? 1 : 0;
      });
      if (Object.keys(updates).length === 0) return;
      await request('cart/update.js', {
        method: 'POST',
        body: JSON.stringify({ updates }),
        signal,
      });
    }

    async function commit(requestedSelected) {
      controller?.abort();
      controller = new AbortController();
      const sequence = requestSequence + 1;
      requestSequence = sequence;
      const { signal } = controller;

      announce('');
      setBusy(true);

      try {
        const before = await getCart(signal);
        const lines = matchingLines(before, variantId);

        if (requestedSelected) {
          if (lines.length === 0) {
            await request('cart/add.js', {
              method: 'POST',
              body: JSON.stringify({ items: [{ id: Number(variantId), quantity: 1 }] }),
              signal,
            });
          } else if (lines.length !== 1 || Number(lines[0].quantity) !== 1) {
            await updateExisting(lines, true, signal);
          }
        } else if (lines.length > 0) {
          await updateExisting(lines, false, signal);
        }

        const confirmedCart = await getCart(signal);
        if (!root.isConnected || sequence !== requestSequence) return;
        reconcile(confirmedCart);

        if (input.checked !== requestedSelected) {
          throw new Error(root.dataset.errorMessage || 'Gift wrap state was not confirmed.');
        }

        announce(requestedSelected ? root.dataset.addedMessage : root.dataset.removedMessage);
        document.dispatchEvent(new CustomEvent('tg:cart-updated', {
          detail: { cart: confirmedCart, source: 'gift-wrap' },
        }));
      } catch (error) {
        if (error?.name === 'AbortError' || !root.isConnected || sequence !== requestSequence) return;
        try {
          reconcile(await getCart());
        } catch {
          input.checked = !requestedSelected;
          setBusy(false);
        }
        announce(root.dataset.errorMessage, true);
        input.focus();
      } finally {
        if (sequence === requestSequence) setBusy(false);
      }
    }

    function handleChange() {
      commit(input.checked);
    }

    function handleCartUpdated(event) {
      if (event.detail?.cart) reconcile(event.detail.cart);
    }

    input.addEventListener('change', handleChange);
    document.addEventListener('tg:cart-updated', handleCartUpdated);
    if (!addable && !input.checked) announce(root.dataset.unavailableMessage, true);
    root.dataset.giftWrapEnhanced = 'true';

    entries.set(root, {
      cleanup() {
        controller?.abort();
        input.removeEventListener('change', handleChange);
        document.removeEventListener('tg:cart-updated', handleCartUpdated);
      },
    });
  }

  function enhanceAll(scope = document) {
    if (scope instanceof Element && scope.matches('[data-gift-wrap-target]')) enhance(scope);
    scope.querySelectorAll?.('[data-gift-wrap-target]').forEach(enhance);
  }

  function cleanup() {
    entries.forEach((entry, root) => {
      if (root.isConnected) return;
      entry.cleanup();
      entries.delete(root);
    });
  }

  enhanceAll(document);
  const observer = new MutationObserver((records) => {
    records.forEach((record) => {
      record.addedNodes.forEach((node) => {
        if (node instanceof Element) enhanceAll(node);
      });
      if (record.removedNodes.length > 0) cleanup();
    });
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });

  window.TheGalleryGiftWrap = { enhance: enhanceAll, cleanup };
})();
