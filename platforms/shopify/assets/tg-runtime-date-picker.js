/** Generated from components/js/theme.js: Date picker. */
import { enhanceMatches, expose, register } from './tg-runtime-core.js';

/* ---- Date picker ---- */
function parseIsoDate(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value || '');
  if (!match) return null;
  const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  return date.getFullYear() === Number(match[1])
    && date.getMonth() === Number(match[2]) - 1
    && date.getDate() === Number(match[3])
    ? date
    : null;
}

function isoDate(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function dateAt(year, month, day) {
  return new Date(year, month, day);
}

function sameDate(first, second) {
  return Boolean(first && second && isoDate(first) === isoDate(second));
}

function enhanceDatepicker(root) {
  if (!(root instanceof HTMLElement)
      || !root.classList.contains('datepicker')
      || root.dataset.datepickerEnhanced === 'true') return;
  const input = root.querySelector('.datepicker__input');
  const trigger = root.querySelector('.datepicker__trigger');
  const calendar = root.querySelector('.datepicker__calendar');
  const monthLabel = root.querySelector('.datepicker__month-year');
  const previous = root.querySelector('[data-datepicker-previous]');
  const next = root.querySelector('[data-datepicker-next]');
  const grid = root.querySelector('.datepicker__grid');
  if (!(input instanceof HTMLInputElement)
      || !(trigger instanceof HTMLButtonElement)
      || !(calendar instanceof HTMLElement)
      || !(monthLabel instanceof HTMLElement)
      || !(previous instanceof HTMLButtonElement)
      || !(next instanceof HTMLButtonElement)
      || !(grid instanceof HTMLElement)) return;

  const fieldId = input.id || nextSelectId('datepicker');
  const calendarId = calendar.id || `${fieldId}-calendar`;
  const monthId = monthLabel.id || `${calendarId}-month`;
  const locale = root.lang || input.lang || document.documentElement.lang || navigator.language || 'en';
  const monthFormatter = new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' });
  const dayFormatter = new Intl.DateTimeFormat(locale, { dateStyle: 'full' });
  const weekdayLong = new Intl.DateTimeFormat(locale, { weekday: 'long' });
  const weekdayShort = new Intl.DateTimeFormat(locale, { weekday: 'short' });
  const authoredToday = parseIsoDate(root.dataset.today);
  const today = authoredToday || new Date();
  let selected = parseIsoDate(input.value);
  let displayed = dateAt((selected || today).getFullYear(), (selected || today).getMonth(), 1);
  let focusDate = selected || today;
  let min = null;
  let max = null;
  let keyboardActivating = false;

  input.id = fieldId;
  input.setAttribute('role', 'combobox');
  input.setAttribute('aria-haspopup', 'dialog');
  input.setAttribute('aria-autocomplete', 'none');
  input.setAttribute('aria-controls', calendarId);
  trigger.type = 'button';
  trigger.setAttribute('aria-controls', calendarId);
  calendar.id = calendarId;
  calendar.setAttribute('role', 'dialog');
  calendar.setAttribute('aria-label', calendar.getAttribute('aria-label') || 'Choose date');
  monthLabel.id = monthId;
  monthLabel.setAttribute('aria-live', 'polite');
  grid.setAttribute('role', 'grid');
  grid.setAttribute('aria-labelledby', monthId);

  function bound(attribute) {
    return parseIsoDate(input.getAttribute(`data-${attribute}`) || input.getAttribute(attribute));
  }

  function unavailable(date) {
    return Boolean((min && date < min) || (max && date > max));
  }

  function dayButton(date) {
    return grid.querySelector(`[data-date="${isoDate(date)}"]`);
  }

  function focusRenderedDay() {
    const button = dayButton(focusDate);
    if (button instanceof HTMLButtonElement) button.focus();
  }

  function updateTrigger() {
    trigger.disabled = input.disabled || input.readOnly;
    trigger.setAttribute('aria-label', selected
      ? `Change date, ${new Intl.DateTimeFormat(locale, { dateStyle: 'long' }).format(selected)}`
      : 'Choose date');
  }

  function moveFocus(date) {
    if (unavailable(date)) return;
    const current = dayButton(focusDate);
    focusDate = date;
    if (date.getFullYear() === displayed.getFullYear()
        && date.getMonth() === displayed.getMonth()) {
      const nextButton = dayButton(date);
      if (current instanceof HTMLButtonElement) current.tabIndex = -1;
      if (nextButton instanceof HTMLButtonElement) {
        nextButton.tabIndex = 0;
        nextButton.focus();
        return;
      }
    }
    displayed = dateAt(date.getFullYear(), date.getMonth(), 1);
    render();
    focusRenderedDay();
  }

  function selectDate(date) {
    if (unavailable(date)) return;
    input.value = isoDate(date);
    selected = date;
    displayed = dateAt(date.getFullYear(), date.getMonth(), 1);
    focusDate = date;
    updateTrigger();
    input.focus();
    close(false);
    input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
    input.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
  }

  function handleDayKeydown(event, date) {
    const rtl = getComputedStyle(root).direction === 'rtl';
    let target = null;
    if (event.key === 'ArrowLeft') target = dateAt(date.getFullYear(), date.getMonth(), date.getDate() + (rtl ? 1 : -1));
    else if (event.key === 'ArrowRight') target = dateAt(date.getFullYear(), date.getMonth(), date.getDate() + (rtl ? -1 : 1));
    else if (event.key === 'ArrowUp') target = dateAt(date.getFullYear(), date.getMonth(), date.getDate() - 7);
    else if (event.key === 'ArrowDown') target = dateAt(date.getFullYear(), date.getMonth(), date.getDate() + 7);
    else if (event.key === 'Home') target = dateAt(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay());
    else if (event.key === 'End') target = dateAt(date.getFullYear(), date.getMonth(), date.getDate() + 6 - date.getDay());
    else if (event.key === 'PageUp' || event.key === 'PageDown') {
      const delta = event.key === 'PageUp' ? -1 : 1;
      const months = event.shiftKey ? delta * 12 : delta;
      const last = dateAt(date.getFullYear(), date.getMonth() + months + 1, 0).getDate();
      target = dateAt(date.getFullYear(), date.getMonth() + months, Math.min(date.getDate(), last));
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      keyboardActivating = true;
      return;
    } else if (event.key === 'Escape') {
      event.preventDefault();
      close(true);
      return;
    }
    if (target) {
      event.preventDefault();
      moveFocus(target);
    }
  }

  const weekdays = document.createElement('div');
  weekdays.className = 'datepicker__weekdays';
  weekdays.setAttribute('role', 'row');
  for (let day = 0; day < 7; day += 1) {
    const heading = document.createElement('span');
    const abbreviation = document.createElement('abbr');
    const date = dateAt(2023, 0, day + 1);
    heading.className = 'datepicker__weekday';
    heading.setAttribute('role', 'columnheader');
    abbreviation.title = weekdayLong.format(date);
    abbreviation.textContent = weekdayShort.format(date);
    heading.append(abbreviation);
    weekdays.append(heading);
  }

  function render() {
    min = bound('min');
    max = bound('max');
    monthLabel.textContent = monthFormatter.format(displayed);

    const first = dateAt(displayed.getFullYear(), displayed.getMonth(), 1);
    const start = dateAt(first.getFullYear(), first.getMonth(), 1 - first.getDay());
    const renderedDays = [];
    for (let index = 0; index < 42; index += 1) {
      renderedDays.push(dateAt(start.getFullYear(), start.getMonth(), start.getDate() + index));
    }
    if (!renderedDays.some((date) => sameDate(date, focusDate)) || unavailable(focusDate)) {
      focusDate = renderedDays.find((date) => sameDate(date, selected) && !unavailable(date))
        || renderedDays.find((date) => sameDate(date, today) && !unavailable(date))
        || renderedDays.find((date) => date.getMonth() === displayed.getMonth() && !unavailable(date))
        || renderedDays.find((date) => !unavailable(date))
        || displayed;
    }

    const weeks = Array.from({ length: 6 }, (_, weekIndex) => {
      const week = document.createElement('div');
      week.className = 'datepicker__week';
      week.setAttribute('role', 'row');
      renderedDays.slice(weekIndex * 7, weekIndex * 7 + 7).forEach((date) => {
        const button = document.createElement('button');
        const isSelected = sameDate(date, selected);
        const isToday = sameDate(date, today);
        button.className = [
          'datepicker__day',
          date.getMonth() !== displayed.getMonth() ? 'datepicker__day--outside' : '',
          isSelected ? 'datepicker__day--selected' : '',
          isToday ? 'datepicker__day--today' : '',
        ].filter(Boolean).join(' ');
        button.type = 'button';
        button.setAttribute('role', 'gridcell');
        button.dataset.date = isoDate(date);
        button.textContent = String(date.getDate());
        button.setAttribute('aria-label', dayFormatter.format(date));
        button.setAttribute('aria-selected', String(isSelected));
        if (isToday) button.setAttribute('aria-current', 'date');
        button.disabled = unavailable(date);
        button.tabIndex = sameDate(date, focusDate) && !button.disabled ? 0 : -1;
        week.append(button);
      });
      return week;
    });

    grid.replaceChildren(weekdays, ...weeks);
    const previousEnd = dateAt(displayed.getFullYear(), displayed.getMonth(), 0);
    const nextStart = dateAt(displayed.getFullYear(), displayed.getMonth() + 1, 1);
    previous.disabled = Boolean(min && previousEnd < min);
    next.disabled = Boolean(max && nextStart > max);
    updateTrigger();
  }

  function shiftMonth(delta) {
    const desired = focusDate.getDate();
    const targetMonth = dateAt(displayed.getFullYear(), displayed.getMonth() + delta, 1);
    const last = dateAt(targetMonth.getFullYear(), targetMonth.getMonth() + 1, 0).getDate();
    displayed = targetMonth;
    const candidate = dateAt(targetMonth.getFullYear(), targetMonth.getMonth(), Math.min(desired, last));
    if (!unavailable(candidate)) focusDate = candidate;
    render();
  }

  function open(focus = true) {
    if (input.disabled || input.readOnly) return;
    selected = parseIsoDate(input.value);
    if (selected) {
      displayed = dateAt(selected.getFullYear(), selected.getMonth(), 1);
      focusDate = selected;
    }
    render();
    root.classList.add('datepicker--open');
    calendar.hidden = false;
    input.setAttribute('aria-expanded', 'true');
    if (focus) focusRenderedDay();
  }

  function close(focusInput = false) {
    const active = document.activeElement;
    if (focusInput || calendar.contains(active)) {
      if (!input.disabled) input.focus();
      else if (active instanceof HTMLElement) active.blur();
    }
    root.classList.remove('datepicker--open');
    calendar.hidden = true;
    input.setAttribute('aria-expanded', 'false');
  }

  trigger.addEventListener('click', () => {
    if (root.classList.contains('datepicker--open')) close(true);
    else open(true);
  });
  previous.addEventListener('click', () => shiftMonth(-1));
  next.addEventListener('click', () => shiftMonth(1));
  grid.addEventListener('click', (event) => {
    if (keyboardActivating) return;
    const button = event.target instanceof Element ? event.target.closest('.datepicker__day') : null;
    const date = button && grid.contains(button) ? parseIsoDate(button.dataset.date) : null;
    if (date) selectDate(date);
  });
  grid.addEventListener('keydown', (event) => {
    const button = event.target instanceof Element ? event.target.closest('.datepicker__day') : null;
    const date = button && grid.contains(button) ? parseIsoDate(button.dataset.date) : null;
    if (date) handleDayKeydown(event, date);
  });
  grid.addEventListener('keyup', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    const button = event.target instanceof Element ? event.target.closest('.datepicker__day') : null;
    const date = button && grid.contains(button) ? parseIsoDate(button.dataset.date) : null;
    keyboardActivating = false;
    if (date) window.setTimeout(() => selectDate(date));
  });
  input.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      open(true);
    } else if (event.key === 'Escape' && root.classList.contains('datepicker--open')) {
      event.preventDefault();
      close(true);
    }
  });
  input.addEventListener('input', () => {
    selected = parseIsoDate(input.value);
    updateTrigger();
  });
  input.addEventListener('change', () => {
    selected = parseIsoDate(input.value);
    if (selected) {
      displayed = dateAt(selected.getFullYear(), selected.getMonth(), 1);
      focusDate = selected;
    }
    if (root.classList.contains('datepicker--open')) render();
    updateTrigger();
  });
  root.addEventListener('focusout', () => window.setTimeout(() => {
    if (!root.contains(document.activeElement)) close(false);
  }));
  document.addEventListener('pointerdown', (event) => {
    if (!event.composedPath().includes(root)) close(false);
  });
  input.form?.addEventListener('reset', () => window.setTimeout(() => {
    selected = parseIsoDate(input.value);
    displayed = dateAt((selected || today).getFullYear(), (selected || today).getMonth(), 1);
    focusDate = selected || today;
    render();
    close(false);
  }));
  new MutationObserver(() => {
    selected = parseIsoDate(input.value);
    render();
    if (input.disabled || input.readOnly) close(false);
  }).observe(input, {
    attributes: true,
    attributeFilter: ['data-max', 'data-min', 'disabled', 'readonly', 'value'],
  });

  root.dataset.datepickerEnhanced = 'true';
  render();
  if (root.classList.contains('datepicker--open') || input.getAttribute('aria-expanded') === 'true') open(false);
  else close(false);
}

function enhanceDatepickers(scope = document) {
  enhanceMatches(scope, '.datepicker', enhanceDatepicker);
}

expose({ enhanceDatepickers });
register({ id: 'date-picker', enhance: enhanceDatepickers });
