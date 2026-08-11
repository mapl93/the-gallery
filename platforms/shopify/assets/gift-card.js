(function () {
  'use strict';

  function selectVisibleCode(code) {
    var selection = window.getSelection();
    var range = document.createRange();

    range.selectNodeContents(code);
    selection.removeAllRanges();
    selection.addRange(range);
  }

  function initializeCopy() {
    var button = document.querySelector('[data-gift-card-copy]');
    var code = document.querySelector('[data-gift-card-code]');
    var status = document.getElementById('gift-card-copy-status');

    if (!button || !code || !status) return;

    button.addEventListener('click', function () {
      var visibleCode = code.textContent.trim();
      var clipboard = navigator.clipboard;

      if (clipboard && typeof clipboard.writeText === 'function') {
        clipboard.writeText(visibleCode).then(function () {
          status.textContent = button.dataset.successMessage;
        }).catch(function () {
          selectVisibleCode(code);
          status.textContent = button.dataset.fallbackMessage;
        });
        return;
      }

      selectVisibleCode(code);
      status.textContent = button.dataset.fallbackMessage;
    });
  }

  function initializeQrCode() {
    var target = document.querySelector('[data-gift-card-qr]');
    var identifier = target && target.dataset.giftCardQr;

    if (!target || !identifier || typeof window.QRCode !== 'function') return;

    new window.QRCode(target, {
      text: identifier,
      width: 120,
      height: 120
    });
  }

  function initializePrint() {
    var button = document.querySelector('[data-gift-card-print]');

    if (!button) return;
    button.addEventListener('click', function () {
      window.print();
    });
  }

  initializeCopy();
  initializeQrCode();
  initializePrint();
})();
