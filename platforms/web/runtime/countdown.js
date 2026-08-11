/** Generated from components/js/theme.js: Countdown. */
import { enhanceMatches, expose, register } from './core.js';

/* ---- Countdown ---- */
const countdownUnitOrder = ['days', 'hours', 'minutes', 'seconds'];
const countdownUnitMilliseconds = {
  days: 86400000,
  hours: 3600000,
  minutes: 60000,
  seconds: 1000,
};
const countdownUnitNames = {
  days: 'day',
  hours: 'hour',
  minutes: 'minute',
  seconds: 'second',
};
const countdownDeadlinePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2}(?:\.\d{1,3})?)?(?:Z|[+-]\d{2}:\d{2})$/;
const countdownEntries = new Map();
let countdownTimer = 0;

function countdownLocale(root) {
  return root.lang
    || root.closest('[lang]')?.getAttribute('lang')
    || document.documentElement.lang
    || navigator.language
    || 'en';
}

function countdownUnits(root) {
  const requested = String(root.dataset.countdownUnits || 'days-hours-minutes-seconds')
    .split('-')
    .filter(Boolean);
  const selected = countdownUnitOrder.filter((unit) => requested.includes(unit));
  return selected.length > 0 ? selected : [...countdownUnitOrder];
}

function parseCountdownDeadline(value) {
  const source = String(value || '').trim();
  if (!countdownDeadlinePattern.test(source)) return null;
  const dateParts = source.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2}))?/);
  if (!dateParts) return null;
  const [, yearText, monthText, dayText, hourText, minuteText, secondText = '0'] = dateParts;
  const year = Number(yearText);
  const month = Number(monthText);
  const day = Number(dayText);
  const hour = Number(hourText);
  const minute = Number(minuteText);
  const second = Number(secondText);
  const daysInMonth = month >= 1 && month <= 12
    ? new Date(Date.UTC(year, month, 0)).getUTCDate()
    : 0;
  if (day < 1 || day > daysInMonth || hour > 23 || minute > 59 || second > 59) return null;
  const parsed = Date.parse(source);
  return Number.isFinite(parsed) ? parsed : null;
}

function countdownElements(root) {
  const items = new Map();
  root.querySelectorAll('[data-countdown-unit]').forEach((item) => {
    if (!(item instanceof HTMLElement)) return;
    const unit = item.dataset.countdownUnit;
    if (!countdownUnitOrder.includes(unit) || items.has(unit)) return;
    items.set(unit, {
      item,
      number: item.querySelector('.countdown__number'),
      label: item.querySelector('.countdown__label'),
      separator: item.querySelector('.countdown__separator'),
    });
  });
  return {
    display: root.querySelector('.countdown__display'),
    fallback: root.querySelector('.countdown__fallback'),
    announcement: root.querySelector('.countdown__announcement'),
    items,
  };
}

function countdownNumberFormatter(locale, options = {}) {
  try {
    return new Intl.NumberFormat(locale, options);
  } catch (_) {
    return new Intl.NumberFormat('en', options);
  }
}

function countdownListFormatter(locale) {
  try {
    return new Intl.ListFormat(locale, { style: 'long', type: 'conjunction' });
  } catch (_) {
    return { format: (values) => values.join(', ') };
  }
}

function formatCountdownUnit(locale, unit, value) {
  const options = {
    style: 'unit',
    unit: countdownUnitNames[unit],
    unitDisplay: 'long',
    useGrouping: false,
  };
  const formatter = countdownNumberFormatter(locale, options);
  const phrase = formatter.format(value);
  const unitPart = formatter.formatToParts(value).find((part) => part.type === 'unit')?.value;
  return {
    phrase,
    label: unitPart || unit,
    number: countdownNumberFormatter(locale, {
      minimumIntegerDigits: 2,
      useGrouping: false,
    }).format(value),
  };
}

function countdownValues(remaining, units) {
  const smallest = units[units.length - 1];
  const smallestMilliseconds = countdownUnitMilliseconds[smallest];
  let cursor = remaining > 0
    ? Math.ceil(remaining / smallestMilliseconds) * smallestMilliseconds
    : 0;
  const values = {};

  units.forEach((unit) => {
    const unitMilliseconds = countdownUnitMilliseconds[unit];
    values[unit] = Math.floor(cursor / unitMilliseconds);
    cursor %= unitMilliseconds;
  });

  return { values, smallestMilliseconds };
}

function invalidateCountdown(entry) {
  const { root, elements } = entry;
  root.dataset.countdownState = 'invalid';
  root.removeAttribute('role');
  root.removeAttribute('aria-label');
  if (elements.display instanceof HTMLElement) elements.display.hidden = true;
  if (elements.fallback instanceof HTMLElement) elements.fallback.hidden = false;
  if (elements.announcement instanceof HTMLElement) elements.announcement.textContent = '';
  entry.lastState = 'invalid';
  entry.expiredNotified = false;
}

function configureCountdown(entry) {
  entry.deadline = parseCountdownDeadline(entry.root.getAttribute('datetime'));
  entry.units = countdownUnits(entry.root);
  entry.locale = countdownLocale(entry.root);
  entry.elements = countdownElements(entry.root);
  entry.expiredNotified = false;
  entry.lastState = null;

  if (entry.deadline === null || entry.elements.items.size === 0) {
    invalidateCountdown(entry);
    return false;
  }

  entry.root.dataset.countdownEnhanced = 'true';
  return true;
}

function renderCountdown(entry, now = Date.now()) {
  const { root, deadline, units, locale, elements } = entry;
  if (deadline === null || !root.isConnected) return Number.POSITIVE_INFINITY;

  const remaining = Math.max(0, deadline - now);
  const state = remaining > 0 ? 'running' : 'expired';
  const { values, smallestMilliseconds } = countdownValues(remaining, units);
  const phrases = [];

  countdownUnitOrder.forEach((unit) => {
    const parts = elements.items.get(unit);
    if (!parts) return;
    const selectedIndex = units.indexOf(unit);
    const selected = selectedIndex >= 0;
    parts.item.hidden = !selected;
    if (parts.separator instanceof HTMLElement) parts.separator.hidden = !selected || selectedIndex === 0;
    if (!selected) return;

    const formatted = formatCountdownUnit(locale, unit, values[unit]);
    if (parts.number instanceof HTMLElement) parts.number.textContent = formatted.number;
    if (parts.label instanceof HTMLElement) parts.label.textContent = formatted.label;
    phrases.push(formatted.phrase);
  });

  root.dataset.countdownState = state;
  root.setAttribute('role', 'timer');
  root.setAttribute('aria-label', countdownListFormatter(locale).format(phrases));
  if (elements.display instanceof HTMLElement) elements.display.hidden = false;
  if (elements.fallback instanceof HTMLElement) elements.fallback.hidden = true;

  if (state === 'running') {
    if (elements.announcement instanceof HTMLElement) elements.announcement.textContent = '';
    entry.expiredNotified = false;
  } else if (entry.lastState === 'running' && !entry.expiredNotified) {
    const announcement = String(root.dataset.countdownExpiredAnnouncement || '').trim();
    if (announcement && elements.announcement instanceof HTMLElement) {
      elements.announcement.textContent = announcement;
    }
    root.dispatchEvent(new CustomEvent('countdownexpire', {
      bubbles: true,
      detail: {
        deadline: new Date(deadline).toISOString(),
        state: 'expired',
      },
    }));
    entry.expiredNotified = true;
  }

  entry.lastState = state;
  if (state === 'expired') return Number.POSITIVE_INFINITY;

  const remainder = remaining % smallestMilliseconds;
  return Math.max(20, (remainder || smallestMilliseconds) + 20);
}

function clearCountdownTimer() {
  if (!countdownTimer) return;
  window.clearTimeout(countdownTimer);
  countdownTimer = 0;
}

function scheduleCountdowns({ render = false } = {}) {
  clearCountdownTimer();
  if (document.hidden) return;

  const now = Date.now();
  let nextDelay = Number.POSITIVE_INFINITY;
  countdownEntries.forEach((entry, root) => {
    if (!root.isConnected) {
      countdownEntries.delete(root);
      return;
    }
    const delay = render ? renderCountdown(entry, now) : (() => {
      if (entry.deadline === null || entry.lastState === 'expired') return Number.POSITIVE_INFINITY;
      const remaining = Math.max(0, entry.deadline - now);
      const smallest = entry.units[entry.units.length - 1];
      const unitMilliseconds = countdownUnitMilliseconds[smallest];
      const remainder = remaining % unitMilliseconds;
      return Math.max(20, (remainder || unitMilliseconds) + 20);
    })();
    nextDelay = Math.min(nextDelay, delay);
  });

  if (Number.isFinite(nextDelay)) {
    countdownTimer = window.setTimeout(() => scheduleCountdowns({ render: true }), nextDelay);
  }
}

function enhanceCountdown(root) {
  if (!(root instanceof HTMLElement) || !root.matches('[data-countdown]')) return;
  let entry = countdownEntries.get(root);
  if (!entry) {
    entry = {
      root,
      deadline: null,
      units: [...countdownUnitOrder],
      locale: 'en',
      elements: countdownElements(root),
      lastState: null,
      expiredNotified: false,
    };
    countdownEntries.set(root, entry);
  }

  if (configureCountdown(entry)) renderCountdown(entry);
  scheduleCountdowns();
}

function enhanceCountdowns(scope = document) {
  enhanceMatches(scope, '[data-countdown]', enhanceCountdown);
}

function refreshCountdowns() {
  countdownEntries.forEach((entry) => {
    if (entry.root.isConnected && configureCountdown(entry)) renderCountdown(entry);
  });
  scheduleCountdowns();
}

document.addEventListener('visibilitychange', () => {
  if (document.hidden) clearCountdownTimer();
  else scheduleCountdowns({ render: true });
});
window.addEventListener('pageshow', () => scheduleCountdowns({ render: true }));
window.addEventListener('focus', () => scheduleCountdowns({ render: true }));

expose({ enhanceCountdowns, refreshCountdowns });
register({
  id: 'countdown',
  enhance: enhanceCountdowns,
  attributes: ['datetime', 'data-countdown-units', 'data-countdown-expired-announcement', 'lang'],
  onAttribute: (target, attributeName) => {
    if (target instanceof HTMLElement && target.matches('[data-countdown]')) enhanceCountdown(target);
    else if (attributeName === 'lang') refreshCountdowns();
  },
  cleanup: () => scheduleCountdowns(),
});
