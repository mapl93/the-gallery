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

  function formatWithDelimiters(cents, precision = 2, thousands = ',', decimal = '.') {
    const fixed = (cents / 100).toFixed(precision);
    const [integer, fraction] = fixed.split('.');
    const grouped = integer.replace(/\B(?=(\d{3})+(?!\d))/g, thousands);
    return precision > 0 ? `${grouped}${decimal}${fraction}` : grouped;
  }

  function formatCurrency(cents, form) {
    const moneyFormat = String(form.dataset.moneyFormat || '');
    const placeholder = moneyFormat.match(/\{\{\s*([a-z_]+)\s*\}\}/i)?.[1];
    if (placeholder) {
      let value;
      if (placeholder === 'amount_no_decimals') value = formatWithDelimiters(cents, 0);
      else if (placeholder === 'amount_with_comma_separator') value = formatWithDelimiters(cents, 2, '.', ',');
      else if (placeholder === 'amount_no_decimals_with_comma_separator') value = formatWithDelimiters(cents, 0, '.', ',');
      else if (placeholder === 'amount_with_apostrophe_separator') value = formatWithDelimiters(cents, 2, "'", '.');
      else if (placeholder === 'amount_with_space_separator') value = formatWithDelimiters(cents, 2, ' ', ',');
      else if (placeholder === 'amount_no_decimals_with_space_separator') value = formatWithDelimiters(cents, 0, ' ', ',');
      else value = formatWithDelimiters(cents);
      return moneyFormat.replace(/\{\{\s*[a-z_]+\s*\}\}/i, value);
    }

    const locale = form.dataset.locale || document.documentElement.lang || 'es';
    const currency = form.dataset.currency || 'ARS';
    try {
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        currencyDisplay: 'narrowSymbol',
      }).format(cents / 100);
    } catch {
      return String(cents / 100);
    }
  }

  function updateProductTotal(input) {
    if (!(input instanceof HTMLInputElement)) return;
    const form = input.closest('[data-product-form]');
    const output = form?.querySelector('[data-product-total]');
    if (!(form instanceof HTMLFormElement) || !(output instanceof HTMLElement)) return;
    const unitPrice = Number(form.dataset.unitPriceCents);
    const quantity = input.valueAsNumber;
    if (!Number.isFinite(unitPrice) || !Number.isFinite(quantity)) return;
    output.textContent = formatCurrency(Math.round(unitPrice * quantity), form);
  }

  function selectDetail(root, key, moveFocus = false) {
    const details = root.querySelector('[data-product-details]');
    if (!(details instanceof HTMLElement)) return;
    const tabs = Array.from(details.querySelectorAll('[data-product-detail-tab]'));
    const panels = Array.from(details.querySelectorAll('[data-product-detail-panel]'));
    const activeTab = tabs.find((tab) => tab.dataset.productDetailTab === key);
    if (!(activeTab instanceof HTMLButtonElement)) return;

    tabs.forEach((tab) => {
      const selected = tab === activeTab;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });
    panels.forEach((panel) => {
      panel.hidden = panel.dataset.productDetailPanel !== key;
    });
    if (moveFocus) activeTab.focus();
  }

  function selectMeasurementUnit(root, key) {
    const measurement = root.querySelector('[data-product-measurement]');
    if (!(measurement instanceof HTMLElement)) return;
    measurement.querySelectorAll('[data-product-unit]').forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.productUnit === key));
    });
    measurement.querySelectorAll('[data-product-unit-panel]').forEach((panel) => {
      panel.hidden = panel.dataset.productUnitPanel !== key;
    });
  }

  function enhance(root) {
    if (!(root instanceof HTMLElement)
        || !root.matches('[data-main-product]')
        || root.dataset.productSurfaceEnhanced === 'true') return;

    const sectionId = String(root.dataset.sectionId || '').trim();
    const status = root.querySelector('[data-product-update-status]');
    if (!sectionId || !String(root.dataset.productUrl || '').trim() || !(status instanceof HTMLElement)) return;

    let controller = null;
    let requestSequence = 0;
    let mediaTrack = null;
    let mediaScrollFrame = 0;

    function syncMediaPagination() {
      mediaScrollFrame = 0;
      if (!(mediaTrack instanceof HTMLElement)) return;
      const items = Array.from(mediaTrack.querySelectorAll('[data-editorial-media-item]'));
      if (items.length === 0) return;
      const trackCenter = mediaTrack.scrollLeft + mediaTrack.clientWidth / 2;
      let activeIndex = 0;
      let nearestDistance = Number.POSITIVE_INFINITY;
      items.forEach((item, index) => {
        const itemCenter = item.offsetLeft + item.clientWidth / 2;
        const distance = Math.abs(itemCenter - trackCenter);
        if (distance < nearestDistance) {
          nearestDistance = distance;
          activeIndex = index;
        }
      });
      root.querySelectorAll('[data-editorial-media-dot]').forEach((dot) => {
        if (Number(dot.dataset.editorialMediaDot) === activeIndex) dot.setAttribute('aria-current', 'true');
        else dot.removeAttribute('aria-current');
      });
    }

    function handleMediaScroll() {
      if (mediaScrollFrame) return;
      mediaScrollFrame = window.requestAnimationFrame(syncMediaPagination);
    }

    function enhanceRender(scope) {
      window.TheGallery?.enhanceQuantities?.(scope);
      const nextTrack = scope.querySelector('[data-editorial-media-track]');
      if (nextTrack !== mediaTrack) {
        mediaTrack?.removeEventListener('scroll', handleMediaScroll);
        mediaTrack = nextTrack instanceof HTMLElement ? nextTrack : null;
        mediaTrack?.addEventListener('scroll', handleMediaScroll, { passive: true });
      }
      scope.querySelectorAll('[data-product-form] [data-qty-input]').forEach(updateProductTotal);
      syncMediaPagination();
    }

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
        enhanceRender(incomingRender);

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
      if (event.target instanceof HTMLInputElement && event.target.matches('[data-product-form] [data-qty-input]')) {
        updateProductTotal(event.target);
      }
      const input = event.target instanceof Element
        ? event.target.closest('[data-variant-selector] input[data-option-value-id]')
        : null;
      if (input instanceof HTMLInputElement && root.contains(input)) requestForOptions(input);
    }

    function handleInput(event) {
      if (event.target instanceof HTMLInputElement && event.target.matches('[data-product-form] [data-qty-input]')) {
        updateProductTotal(event.target);
      }
    }

    function handleClick(event) {
      const target = event.target instanceof Element ? event.target : null;
      const detailTab = target?.closest('[data-product-detail-tab]');
      if (detailTab instanceof HTMLButtonElement && root.contains(detailTab)) {
        selectDetail(root, detailTab.dataset.productDetailTab, false);
        return;
      }

      const unitButton = target?.closest('[data-product-unit]');
      if (unitButton instanceof HTMLButtonElement && root.contains(unitButton)) {
        selectMeasurementUnit(root, unitButton.dataset.productUnit);
        return;
      }

      const mediaDot = target?.closest('[data-editorial-media-dot]');
      if (!(mediaDot instanceof HTMLButtonElement) || !root.contains(mediaDot)) return;
      const index = Number(mediaDot.dataset.editorialMediaDot);
      const item = root.querySelector(`[data-editorial-media-item][data-media-index="${index}"]`);
      const track = item?.closest('[data-editorial-media-track]');
      if (!(item instanceof HTMLElement) || !(track instanceof HTMLElement)) return;
      const left = item.offsetLeft - (track.clientWidth - item.clientWidth) / 2;
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      track.scrollTo({ left, behavior: reducedMotion ? 'auto' : 'smooth' });
    }

    function handleKeydown(event) {
      const tab = event.target instanceof Element
        ? event.target.closest('[data-product-detail-tab]')
        : null;
      if (!(tab instanceof HTMLButtonElement) || !root.contains(tab)) return;
      const tabs = Array.from(root.querySelectorAll('[data-product-detail-tab]'));
      const current = tabs.indexOf(tab);
      let next = null;
      if (event.key === 'ArrowRight') next = (current + 1) % tabs.length;
      else if (event.key === 'ArrowLeft') next = (current - 1 + tabs.length) % tabs.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = tabs.length - 1;
      if (next === null) return;
      event.preventDefault();
      selectDetail(root, tabs[next].dataset.productDetailTab, true);
    }

    function handlePopState() {
      const url = new URL(window.location.href);
      url.searchParams.set('section_id', sectionId);
      renderFrom(url);
    }

    enhanceRender(root);
    root.addEventListener('change', handleChange);
    root.addEventListener('input', handleInput);
    root.addEventListener('click', handleClick);
    root.addEventListener('keydown', handleKeydown);
    window.addEventListener('popstate', handlePopState);
    entries.set(root, {
      cleanup() {
        controller?.abort();
        if (mediaScrollFrame) window.cancelAnimationFrame(mediaScrollFrame);
        mediaTrack?.removeEventListener('scroll', handleMediaScroll);
        root.removeEventListener('change', handleChange);
        root.removeEventListener('input', handleInput);
        root.removeEventListener('click', handleClick);
        root.removeEventListener('keydown', handleKeydown);
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
