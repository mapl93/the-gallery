/**
 * The Gallery Shopify product coordinator.
 *
 * Target-native only: resolves granular option values through Shopify's Section
 * Rendering API and atomically replaces one bounded product render region.
 */
(function () {
  'use strict';

  if (window.TheGalleryProductCoordinator) return;

  const entries = new Map();

  function enhance(root) {
    if (!(root instanceof HTMLElement)
        || !root.matches('[data-main-product]')
        || root.dataset.productSurfaceEnhanced === 'true') return;

    const sectionId = String(root.dataset.sectionId || '').trim();
    const status = root.querySelector('[data-product-update-status]');
    if (!sectionId || !String(root.dataset.productUrl || '').trim() || !(status instanceof HTMLElement)) return;

    let controller = null;
    let requestSequence = 0;

    function optionValueIds() {
      const groups = Array.from(root.querySelectorAll('[data-variant-selector] fieldset[data-option-position]'));
      const values = groups.map((group) => group.querySelector('input[data-option-value-id]:checked'));
      if (values.length === 0 || values.some((input) => !(input instanceof HTMLInputElement))) return [];
      return values.map((input) => input.dataset.optionValueId).filter(Boolean);
    }

    function restoreOptionFocus(position, valueId) {
      if (!position || !valueId) return;
      const next = Array.from(root.querySelectorAll('input[data-option-position][data-option-value-id]')).find((input) => (
        input instanceof HTMLInputElement
        && input.dataset.optionPosition === position
        && input.dataset.optionValueId === valueId
      ));
      next?.focus();
    }

    async function renderFrom(requestUrl, options = {}) {
      controller?.abort();
      controller = new AbortController();
      const sequence = requestSequence + 1;
      requestSequence = sequence;
      root.setAttribute('aria-busy', 'true');

      try {
        const response = await fetch(requestUrl, {
          headers: { 'X-Requested-With': 'XMLHttpRequest' },
          signal: controller.signal,
        });
        if (!response.ok) throw new Error(`Product section request failed: ${response.status}`);

        const responseDocument = new DOMParser().parseFromString(await response.text(), 'text/html');
        const incomingRoot = responseDocument.querySelector('[data-main-product]');
        const incomingRender = incomingRoot?.querySelector('[data-product-render]');
        const currentRender = root.querySelector('[data-product-render]');
        if (!(incomingRoot instanceof HTMLElement)
            || !(incomingRender instanceof HTMLElement)
            || !(currentRender instanceof HTMLElement)) {
          throw new Error('Product section response is missing its canonical render boundary.');
        }
        if (!root.isConnected || sequence !== requestSequence) return;

        currentRender.replaceWith(incomingRender);
        root.dataset.currentVariantId = incomingRoot.dataset.currentVariantId || '';
        root.dataset.currentMarketId = incomingRoot.dataset.currentMarketId || root.dataset.currentMarketId || '';
        root.dataset.productUrl = incomingRoot.dataset.productUrl || root.dataset.productUrl || '';
        root.dataset.productUpdateMessage = incomingRoot.dataset.productUpdateMessage || '';
        root.dataset.productUpdateError = incomingRoot.dataset.productUpdateError || root.dataset.productUpdateError || '';
        window.TheGallery?.enhanceProductGalleries?.(incomingRender);

        const variantId = root.dataset.currentVariantId;
        if (options.updateHistory) {
          const visibleUrl = new URL(options.productUrl || window.location.href, window.location.origin);
          visibleUrl.searchParams.delete('section_id');
          if (variantId) {
            visibleUrl.searchParams.set('variant', variantId);
            visibleUrl.searchParams.delete('option_values');
          } else if (options.optionIds?.length) {
            visibleUrl.searchParams.delete('variant');
            visibleUrl.searchParams.set('option_values', options.optionIds.join(','));
          }
          window.history.replaceState({}, '', visibleUrl);
        }

        status.textContent = root.dataset.productUpdateMessage || '';
        restoreOptionFocus(options.focusPosition, options.focusValueId);
        root.dispatchEvent(new CustomEvent('tg:product-variant-change', {
          bubbles: true,
          detail: {
            variantId: variantId || null,
            marketId: root.dataset.currentMarketId || null,
            optionValueIds: options.optionIds || [],
            productUrl: root.dataset.productUrl || null,
          },
        }));
      } catch (error) {
        if (error?.name !== 'AbortError' && root.isConnected) {
          status.textContent = root.dataset.productUpdateError || 'Product information could not be updated.';
        }
      } finally {
        if (sequence === requestSequence) root.removeAttribute('aria-busy');
      }
    }

    function requestForOptions(input) {
      const ids = optionValueIds();
      if (ids.length === 0) return;
      const productUrl = String(input.dataset.productUrl || root.dataset.productUrl || '').trim();
      if (!productUrl) return;
      const url = new URL(productUrl, window.location.origin);
      if (url.origin !== window.location.origin) return;
      url.searchParams.set('option_values', ids.join(','));
      url.searchParams.set('section_id', sectionId);
      renderFrom(url, {
        optionIds: ids,
        productUrl,
        updateHistory: true,
        focusPosition: input.dataset.optionPosition,
        focusValueId: input.dataset.optionValueId,
      });
    }

    function handleChange(event) {
      const input = event.target instanceof Element
        ? event.target.closest('[data-variant-selector] input[data-option-value-id]')
        : null;
      if (input instanceof HTMLInputElement && root.contains(input)) requestForOptions(input);
    }

    function handlePopState() {
      const url = new URL(window.location.href);
      url.searchParams.set('section_id', sectionId);
      renderFrom(url);
    }

    root.addEventListener('change', handleChange);
    window.addEventListener('popstate', handlePopState);
    entries.set(root, {
      cleanup() {
        controller?.abort();
        root.removeEventListener('change', handleChange);
        window.removeEventListener('popstate', handlePopState);
      },
    });
    root.dataset.productSurfaceEnhanced = 'true';
  }

  function enhanceAll(scope = document) {
    if (scope instanceof Element && scope.matches('[data-main-product]')) enhance(scope);
    scope.querySelectorAll?.('[data-main-product]').forEach(enhance);
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

  window.TheGalleryProductCoordinator = { enhance: enhanceAll, cleanup };
})();
