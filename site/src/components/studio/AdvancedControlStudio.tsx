import { useEffect, useMemo, useRef, useState, type CSSProperties, type ChangeEvent, type ClipboardEvent, type KeyboardEvent, type ReactElement } from 'react';
import { Check, ChevronLeft, ChevronRight, Eye, EyeOff, Minus, Plus, Search, Upload, X } from 'lucide-react';
import type { ComponentContract, ContractProperty } from '../../lib/contracts';
import type { StudioControl, StudioDefinition } from '../../lib/studio';
import StudioInspector, {
  type StudioPropertyValue,
  type StudioPropertyValues,
  type StudioSlotIconValues,
} from './StudioInspector';

interface AdvancedControlStudioProps {
  contract: ComponentContract;
  definition: StudioDefinition;
}

const emptySlotIcons: StudioSlotIconValues = { leading: '', trailing: '' };
const validationMessages: Record<string, string> = {
  error: 'Review this value before continuing.',
  success: 'This value is ready.',
  warning: 'This value may need attention.',
};

function defaultValue(contract: ComponentContract, property: ContractProperty): StudioPropertyValue {
  if ('defaultValue' in property) return property.defaultValue ?? null;
  if (property.type === 'boolean' || property.type === 'slot') return false;
  if (property.type === 'number') return null;
  if (property.type === 'enum') {
    const source = property.valuesFrom === 'variants'
      ? contract.variants
      : property.valuesFrom === 'sizes'
        ? contract.sizes
        : null;
    return source?.find((option) => option.default)?.name ?? property.values?.[0] ?? null;
  }
  return '';
}

function resolveTokens(control: StudioControl, contract: ComponentContract): string[] {
  if (!control.tokens) return [];
  const category = contract.tokens.public[control.tokens.category] ?? [];
  if (control.tokens.names) return control.tokens.names;
  const pattern = new RegExp(control.tokens.match ?? '$^');
  return category.filter((token) => pattern.test(token));
}

function fixtureValues(slug: string): StudioPropertyValues {
  if (slug === 'switch') return { label: 'Available for purchase', name: 'available', checked: true };
  if (slug === 'slider') return { label: 'Opacity', mode: 'single', variant: 'default', value: 60, min: 0, max: 100, step: 1 };
  if (slug === 'color-picker') return { label: 'Celadon', name: 'glaze', checked: true };
  if (slug === 'file-upload') return { accept: 'image/*' };
  if (slug === 'tags-input') return { placeholder: 'Add material' };
  if (slug === 'segmented-control') return { label: 'Grid', name: 'view', value: 'grid', checked: true };
  if (slug === 'number-input') return { value: 1, min: 0, max: 10, step: 1 };
  if (slug === 'combobox') return { value: '', placeholder: 'Search artworks', open: true };
  if (slug === 'date-picker') return { value: '2026-07-12', open: true };
  if (slug === 'password-input') return { value: 'Gallery2026', visible: false, strength: 'good', autocomplete: 'current-password' };
  return {};
}

function variantClass(contract: ComponentContract, value: StudioPropertyValue): string | null {
  return contract.variants.find((variant) => variant.name === value)?.className?.replace(/^\./, '') ?? null;
}

function sizeClass(contract: ComponentContract, value: StudioPropertyValue): string | null {
  return contract.sizes.find((size) => size.name === value)?.className?.replace(/^\./, '') ?? null;
}

export default function AdvancedControlStudio({ contract, definition }: AdvancedControlStudioProps) {
  const initialValues = useMemo<StudioPropertyValues>(() => ({
    ...Object.fromEntries((contract.properties ?? []).map((property) => [property.name, defaultValue(contract, property)])),
    ...fixtureValues(contract.slug),
  }), [contract]);
  const studioTokens = useMemo(() => [...new Set(definition.groups.flatMap((group) => (
    group.controls.flatMap((control) => resolveTokens(control, contract))
  )))], [definition, contract]);
  const [values, setValues] = useState<StudioPropertyValues>(initialValues);
  const [baseTokenValues, setBaseTokenValues] = useState<Record<string, string>>({});
  const [tokenOverrides, setTokenOverrides] = useState<Record<string, string>>({});
  const [selectedColor, setSelectedColor] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState('');
  const [pin, setPin] = useState(['2', '0', '', '', '', '']);
  const [tags, setTags] = useState(['Stoneware', 'Celadon']);
  const [tagDraft, setTagDraft] = useState('');
  const [segment, setSegment] = useState('grid');
  const [comboHighlighted, setComboHighlighted] = useState(0);
  const [monthOffset, setMonthOffset] = useState(0);
  const pinRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    const read = () => {
      const computed = getComputedStyle(document.documentElement);
      setBaseTokenValues(Object.fromEntries(studioTokens.map((token) => (
        [token, computed.getPropertyValue(token).trim()]
      ))));
    };
    const observer = new MutationObserver(read);
    read();
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, [studioTokens]);

  useEffect(() => {
    if (contract.slug === 'color-picker') setSelectedColor(values.checked === false ? 1 : 0);
    if (contract.slug === 'segmented-control') {
      setSegment(values.checked === false ? 'list' : String(values.value || 'grid'));
    }
  }, [contract.slug, values.checked, values.value]);

  const tokenValues = { ...baseTokenValues, ...tokenOverrides };
  const variant = String(values.variant || 'default');
  const message = validationMessages[variant];
  const describedBy = String(values.describedBy || '') || (message ? `studio-${contract.slug}-message` : undefined);
  const invalid = variant === 'error' || values.invalid === true;

  function reset() {
    setValues({ ...initialValues });
    setTokenOverrides({});
    setSelectedColor(0);
    setDragActive(false);
    setSelectedFileName('');
    setPin(['2', '0', '', '', '', '']);
    setTags(['Stoneware', 'Celadon']);
    setTagDraft('');
    setSegment('grid');
    setComboHighlighted(0);
    setMonthOffset(0);
  }

  function feedback() {
    if (!message) return null;
    const className = variant === 'error' ? 'field__error' : variant === 'success' ? 'field__success' : 'field__warning';
    return <span className={className} id={describedBy} role={invalid ? 'alert' : undefined}>{message}</span>;
  }

  function renderSwitch() {
    const classes = ['switch', variantClass(contract, values.variant), sizeClass(contract, values.size)].filter(Boolean).join(' ');
    return (
      <div className="docs-studio__field-fixture">
        <label className={classes}>
          <input
            className="switch__input"
            type="checkbox"
            role="switch"
            checked={values.checked === true}
            disabled={values.disabled === true}
            required={values.required === true}
            name={String(values.name || '')}
            aria-invalid={invalid || undefined}
            aria-describedby={describedBy}
            onChange={(event) => setValues((current) => ({ ...current, checked: event.target.checked }))}
          />
          <span className="switch__track"><span className="switch__thumb" /></span>
          <span className="switch__label">{String(values.label || '')}</span>
        </label>
        {feedback()}
      </div>
    );
  }

  function renderSlider() {
    const min = Number(values.min ?? 0);
    const max = Number(values.max ?? 100);
    const step = Number(values.step ?? 1);
    const value = Math.min(max, Math.max(min, Number(values.value ?? min)));
    if (values.mode === 'range') {
      const lower = Math.max(min, Math.min(value, max));
      const upper = Math.max(lower, Math.min(max, Math.max(value + step * 20, min)));
      const span = Math.max(max - min, 1);
      return (
        <div className="slider docs-studio__preview-slider" data-validation={variant === 'default' ? undefined : variant}>
          <div className="slider__label"><span>{String(values.label || '')}</span><span className="slider__value">{lower}–{upper}</span></div>
          <div className="range-slider" data-validation={variant === 'default' ? undefined : variant}>
            <div className="range-slider__track" />
            <div className="range-slider__fill" style={{ left: `${((lower - min) / span) * 100}%`, right: `${100 - ((upper - min) / span) * 100}%` }} />
            <input className="range-slider__input" type="range" min={min} max={max} step={step} value={lower} disabled={values.disabled === true} aria-label="Minimum opacity" aria-invalid={invalid || undefined} aria-describedby={describedBy} readOnly />
            <input className="range-slider__input" type="range" min={min} max={max} step={step} value={upper} disabled={values.disabled === true} aria-label="Maximum opacity" aria-invalid={invalid || undefined} aria-describedby={describedBy} readOnly />
          </div>
          {feedback()}
        </div>
      );
    }
    return (
      <div className="slider docs-studio__preview-slider" data-validation={variant === 'default' ? undefined : variant}>
        <label className="slider__label" htmlFor="studio-slider"><span>{String(values.label || '')}</span><span className="slider__value">{value}</span></label>
        <div className="slider__track">
          <input id="studio-slider" className="slider__input" type="range" min={min} max={max} step={step} value={value} disabled={values.disabled === true} aria-invalid={invalid || undefined} aria-describedby={describedBy} onChange={(event) => setValues((current) => ({ ...current, value: Number(event.target.value) }))} />
        </div>
        {feedback()}
      </div>
    );
  }

  function renderColorPicker() {
    const colors = [
      { name: String(values.label || 'Celadon'), value: '#7f9b8f' },
      { name: 'Ash', value: '#8b8177' },
      { name: 'Porcelain', value: '#d8e0e5' },
      { name: 'Ink', value: '#242424' },
    ];
    const rootClass = ['color-picker', variantClass(contract, values.variant)].filter(Boolean).join(' ');
    const swatchSize = sizeClass(contract, values.size);
    return (
      <div className="docs-studio__field-fixture">
        <div className={rootClass} role="radiogroup" aria-label="Glaze color" aria-describedby={describedBy}>
          {colors.map((color, index) => (
            <label className={['color-swatch', swatchSize].filter(Boolean).join(' ')} key={color.name}>
              <input className="color-swatch__input" type="radio" name={String(values.name || 'studio-glaze')} checked={selectedColor === index} disabled={values.disabled === true} aria-label={color.name} aria-invalid={invalid || undefined} aria-describedby={describedBy} onChange={() => { setSelectedColor(index); setValues((current) => ({ ...current, checked: index === 0 })); }} />
              <span className="color-swatch__fill" style={{ backgroundColor: color.value }} />
              <span className="color-swatch__check"><Check aria-hidden="true" /></span>
            </label>
          ))}
        </div>
        {feedback()}
      </div>
    );
  }

  function renderFileUpload() {
    const classes = ['file-upload', variantClass(contract, values.variant), dragActive ? 'file-upload--dragover' : null].filter(Boolean).join(' ');
    function fileChanged(event: ChangeEvent<HTMLInputElement>) {
      setSelectedFileName(event.target.files?.[0]?.name ?? '');
    }
    return (
      <div className="docs-studio__field-fixture docs-studio__preview-file-wrap">
        <label className={`${classes} docs-studio__preview-file-upload`} onDragEnter={() => setDragActive(true)} onDragOver={(event) => { event.preventDefault(); setDragActive(true); }} onDragLeave={() => setDragActive(false)} onDrop={(event) => { event.preventDefault(); setDragActive(false); }}>
          <input className="file-upload__input" type="file" accept={String(values.accept || '') || undefined} multiple={values.multiple === true} disabled={values.disabled === true} aria-invalid={invalid || undefined} aria-describedby={describedBy} onChange={fileChanged} />
          <Upload className="file-upload__icon" aria-hidden="true" />
          <div className="file-upload__text">Choose or drop artwork images</div>
          <div className="file-upload__hint">{selectedFileName || 'PNG, JPG, or WebP'}</div>
        </label>
        {feedback()}
      </div>
    );
  }

  function setPinCell(index: number, nextValue: string) {
    const next = nextValue.slice(-1);
    setPin((current) => current.map((value, cellIndex) => cellIndex === index ? next : value));
    if (next && index < pin.length - 1) pinRefs.current[index + 1]?.focus();
  }

  function pinKeyDown(event: KeyboardEvent<HTMLInputElement>, index: number) {
    if (event.key === 'Backspace' && !pin[index] && index > 0) pinRefs.current[index - 1]?.focus();
    if (event.key === 'ArrowLeft' && index > 0) pinRefs.current[index - 1]?.focus();
    if (event.key === 'ArrowRight' && index < pin.length - 1) pinRefs.current[index + 1]?.focus();
  }

  function pinPaste(event: ClipboardEvent<HTMLInputElement>) {
    event.preventDefault();
    const next = event.clipboardData.getData('text').replace(/\s/g, '').slice(0, pin.length).split('');
    setPin(pin.map((_, index) => next[index] ?? ''));
    pinRefs.current[Math.min(next.length, pin.length - 1)]?.focus();
  }

  function renderPinInput() {
    const classes = ['pin-input', variantClass(contract, values.variant), 'docs-studio__preview-pin'].filter(Boolean).join(' ');
    return (
      <div className="docs-studio__field-fixture">
        <div className={classes} aria-label="Verification code">
          {pin.map((value, index) => (
            <input className={`pin-input__field${value ? ' pin-input__field--filled' : ''}`} key={index} ref={(element) => { pinRefs.current[index] = element; }} type="text" inputMode="numeric" autoComplete={index === 0 ? 'one-time-code' : 'off'} maxLength={1} value={value} disabled={values.disabled === true} aria-label={`Digit ${index + 1}`} aria-invalid={invalid || undefined} aria-describedby={describedBy} onChange={(event) => setPinCell(index, event.target.value)} onKeyDown={(event) => pinKeyDown(event, index)} onPaste={pinPaste} />
          ))}
        </div>
        {feedback()}
      </div>
    );
  }

  function commitTag() {
    const next = tagDraft.trim().replace(/,$/, '');
    if (next && !tags.includes(next)) setTags((current) => [...current, next]);
    setTagDraft('');
  }

  function renderTagsInput() {
    const classes = ['tags-input', variantClass(contract, values.variant), 'docs-studio__preview-tags'].filter(Boolean).join(' ');
    return (
      <div className="docs-studio__field-fixture docs-studio__preview-tags-wrap">
        <div className={classes} onClick={() => document.getElementById('studio-tags-field')?.focus()}>
          {tags.map((tag) => (
            <span className="tags-input__tag" key={tag}>{tag}<button className="tags-input__remove" type="button" aria-label={`Remove ${tag}`} disabled={values.disabled === true} onClick={(event) => { event.stopPropagation(); setTags((current) => current.filter((item) => item !== tag)); }}><X aria-hidden="true" /></button></span>
          ))}
          <input id="studio-tags-field" className="tags-input__field" type="text" value={tagDraft} placeholder={String(values.placeholder || '')} disabled={values.disabled === true} aria-invalid={invalid || undefined} aria-describedby={describedBy} onChange={(event) => setTagDraft(event.target.value)} onBlur={commitTag} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ',') { event.preventDefault(); commitTag(); } else if (event.key === 'Backspace' && !tagDraft) setTags((current) => current.slice(0, -1)); }} />
        </div>
        {feedback()}
      </div>
    );
  }

  function renderSegmented() {
    const classes = ['segmented', variantClass(contract, values.variant), 'docs-studio__preview-segmented'].filter(Boolean).join(' ');
    const firstValue = String(values.value || 'grid');
    const options = [
      { label: String(values.label || 'Grid'), value: firstValue },
      { label: 'List', value: 'list' },
      { label: 'Compact', value: 'compact' },
    ];
    return (
      <div className="docs-studio__field-fixture">
        <div className={classes} role="radiogroup" aria-label="Gallery view" aria-describedby={describedBy}>
          {options.map((option, index) => (
            <label className="segmented__item" key={`${option.value}-${index}`}>
              <input className="segmented__input" type="radio" name={String(values.name || 'studio-view')} value={option.value} checked={segment === option.value} disabled={values.disabled === true} aria-invalid={invalid || undefined} aria-describedby={describedBy} onChange={() => { setSegment(option.value); setValues((current) => ({ ...current, checked: index === 0 })); }} />
              <span className="segmented__label">{option.label}</span>
            </label>
          ))}
        </div>
        {feedback()}
      </div>
    );
  }

  function renderNumberInput() {
    const min = Number(values.min ?? 0);
    const max = Number(values.max ?? 10);
    const step = Number(values.step ?? 1);
    const value = Number(values.value ?? min);
    const setValue = (next: number) => setValues((current) => ({ ...current, value: Math.min(max, Math.max(min, next)) }));
    const classes = ['number-input', variantClass(contract, values.variant)].filter(Boolean).join(' ');
    return (
      <div className="docs-studio__field-fixture">
        <div className={classes}>
          <button className="number-input__btn" type="button" aria-label="Decrease" disabled={values.disabled === true || value <= min} onClick={() => setValue(value - step)}><Minus aria-hidden="true" /></button>
          <input className="number-input__field" type="number" value={value} min={min} max={max} step={step} disabled={values.disabled === true} aria-label="Quantity" aria-invalid={invalid || undefined} aria-describedby={describedBy} onChange={(event) => setValue(Number(event.target.value))} />
          <button className="number-input__btn" type="button" aria-label="Increase" disabled={values.disabled === true || value >= max} onClick={() => setValue(value + step)}><Plus aria-hidden="true" /></button>
        </div>
        {feedback()}
      </div>
    );
  }

  function renderCombobox() {
    const options = ['Ceramic study', 'Celadon vessel', 'Porcelain bowl', 'Stoneware vase', 'Terracotta form'];
    const query = String(values.value || '').toLocaleLowerCase();
    const filtered = options.filter((option) => option.toLocaleLowerCase().includes(query));
    const open = values.open === true && values.disabled !== true;
    const classes = ['combobox', variantClass(contract, values.variant), open ? 'combobox--open' : null, 'docs-studio__preview-combobox'].filter(Boolean).join(' ');
    const selectOption = (option: string) => {
      setValues((current) => ({ ...current, value: option, open: false }));
      setComboHighlighted(0);
    };
    const keyDown = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setValues((current) => ({ ...current, open: true }));
        setComboHighlighted((current) => filtered.length ? (current + 1) % filtered.length : 0);
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        setValues((current) => ({ ...current, open: true }));
        setComboHighlighted((current) => filtered.length ? (current - 1 + filtered.length) % filtered.length : 0);
      } else if (event.key === 'Home' && open) {
        event.preventDefault();
        setComboHighlighted(0);
      } else if (event.key === 'End' && open) {
        event.preventDefault();
        setComboHighlighted(Math.max(filtered.length - 1, 0));
      } else if (event.key === 'Enter' && open && filtered[comboHighlighted]) {
        event.preventDefault();
        selectOption(filtered[comboHighlighted]);
      } else if (event.key === 'Escape') {
        event.preventDefault();
        setValues((current) => ({ ...current, open: false }));
      }
    };
    return (
      <div className="field docs-studio__field-fixture">
        <label className={`field__label${values.required === true ? ' field__label--required' : ''}`} htmlFor="studio-combobox">Artwork</label>
        <div className={classes}>
          <Search className="docs-studio__combobox-search" aria-hidden="true" />
          <input
            className="combobox__input docs-studio__combobox-input"
            id="studio-combobox"
            type="text"
            role="combobox"
            aria-autocomplete="list"
            aria-expanded={open}
            aria-controls="studio-combobox-listbox"
            aria-activedescendant={open && filtered[comboHighlighted] ? `studio-combobox-option-${comboHighlighted}` : undefined}
            aria-invalid={invalid || undefined}
            aria-describedby={describedBy}
            value={String(values.value || '')}
            placeholder={String(values.placeholder || '')}
            disabled={values.disabled === true}
            required={values.required === true}
            onClick={() => setValues((current) => ({ ...current, open: true }))}
            onChange={(event) => { setValues((current) => ({ ...current, value: event.target.value, open: true })); setComboHighlighted(0); }}
            onKeyDown={keyDown}
          />
          <div className="combobox__listbox" id="studio-combobox-listbox" role="listbox" aria-label="Artwork results">
            {filtered.length ? filtered.map((option, index) => {
              const selected = option === values.value;
              return (
                <button
                  className="combobox__option"
                  id={`studio-combobox-option-${index}`}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  data-highlighted={comboHighlighted === index || undefined}
                  key={option}
                  onPointerMove={() => setComboHighlighted(index)}
                  onClick={() => selectOption(option)}
                >
                  <span>{option}</span>
                  {selected && <Check className="combobox__check" aria-hidden="true" />}
                </button>
              );
            }) : <div className="combobox__empty">No artworks found.</div>}
          </div>
        </div>
        {feedback()}
      </div>
    );
  }

  function renderDatePicker() {
    const month = new Date(2026, 6 + monthOffset, 1);
    const year = month.getFullYear();
    const monthIndex = month.getMonth();
    const firstWeekday = new Date(year, monthIndex, 1).getDay();
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    const daysInPreviousMonth = new Date(year, monthIndex, 0).getDate();
    const cells = Array.from({ length: 42 }, (_, index) => {
      const offsetDay = index - firstWeekday + 1;
      if (offsetDay < 1) return { day: daysInPreviousMonth + offsetDay, outside: true, date: new Date(year, monthIndex - 1, daysInPreviousMonth + offsetDay) };
      if (offsetDay > daysInMonth) return { day: offsetDay - daysInMonth, outside: true, date: new Date(year, monthIndex + 1, offsetDay - daysInMonth) };
      return { day: offsetDay, outside: false, date: new Date(year, monthIndex, offsetDay) };
    });
    const iso = (date: Date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    const open = values.open === true && values.disabled !== true;
    const classes = ['datepicker', variantClass(contract, values.variant), open ? 'datepicker--open' : null, 'docs-studio__preview-datepicker'].filter(Boolean).join(' ');
    const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    return (
      <div className="field docs-studio__field-fixture">
        <label className={`field__label${values.required === true ? ' field__label--required' : ''}`} htmlFor="studio-datepicker">Exhibition date</label>
        <div className={classes}>
          <input
            className="datepicker__input"
            id="studio-datepicker"
            type="text"
            inputMode="numeric"
            value={String(values.value || '')}
            disabled={values.disabled === true}
            required={values.required === true}
            readOnly
            aria-haspopup="grid"
            aria-expanded={open}
            aria-controls="studio-datepicker-calendar"
            aria-invalid={invalid || undefined}
            aria-describedby={describedBy}
            onClick={() => setValues((current) => ({ ...current, open: !open }))}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setValues((current) => ({ ...current, open: !open })); }
              if (event.key === 'Escape') { event.preventDefault(); setValues((current) => ({ ...current, open: false })); }
            }}
          />
          <div className="datepicker__calendar" id="studio-datepicker-calendar">
            <div className="datepicker__header">
              <span className="datepicker__month-year" aria-live="polite">{month.toLocaleDateString('en', { month: 'long', year: 'numeric' })}</span>
              <div className="datepicker__nav">
                <button className="datepicker__nav-btn" type="button" aria-label="Previous month" onClick={() => setMonthOffset((current) => current - 1)}><ChevronLeft aria-hidden="true" /></button>
                <button className="datepicker__nav-btn" type="button" aria-label="Next month" onClick={() => setMonthOffset((current) => current + 1)}><ChevronRight aria-hidden="true" /></button>
              </div>
            </div>
            <div className="datepicker__weekdays" aria-hidden="true">{weekdays.map((day) => <span key={day}>{day}</span>)}</div>
            <div className="datepicker__grid" role="grid" aria-label={month.toLocaleDateString('en', { month: 'long', year: 'numeric' })}>
              {cells.map((cell) => {
                const dateValue = iso(cell.date);
                const selected = dateValue === values.value;
                const today = dateValue === '2026-07-12';
                return (
                  <button
                    className={['datepicker__day', cell.outside ? 'datepicker__day--outside' : null, selected ? 'datepicker__day--selected' : null, today ? 'datepicker__day--today' : null].filter(Boolean).join(' ')}
                    type="button"
                    role="gridcell"
                    aria-selected={selected}
                    aria-current={today ? 'date' : undefined}
                    key={dateValue}
                    onClick={() => setValues((current) => ({ ...current, value: dateValue, open: false }))}
                  >
                    {cell.day}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        {feedback()}
      </div>
    );
  }

  function renderPasswordInput() {
    const visible = values.visible === true;
    const strength = String(values.strength || 'good');
    const StrengthIcon = visible ? EyeOff : Eye;
    const classes = ['password-input', variantClass(contract, values.variant), 'docs-studio__preview-password'].filter(Boolean).join(' ');
    return (
      <div className="field docs-studio__field-fixture">
        <label className={`field__label${values.required === true ? ' field__label--required' : ''}`} htmlFor="studio-password">Password</label>
        <div className={classes}>
          <input
            className="password-input__field"
            id="studio-password"
            type={visible ? 'text' : 'password'}
            value={String(values.value || '')}
            placeholder={String(values.placeholder || '')}
            autoComplete={String(values.autocomplete || 'current-password')}
            disabled={values.disabled === true}
            required={values.required === true}
            aria-invalid={invalid || undefined}
            aria-describedby={describedBy || 'studio-password-strength'}
            onChange={(event) => setValues((current) => ({ ...current, value: event.target.value }))}
          />
          <button className="password-input__toggle" type="button" aria-label={visible ? 'Hide password' : 'Show password'} aria-pressed={visible} disabled={values.disabled === true} onClick={() => setValues((current) => ({ ...current, visible: !visible }))}>
            <StrengthIcon aria-hidden="true" />
          </button>
        </div>
        <div className="password-strength" id="studio-password-strength" data-strength={strength} aria-live="polite">
          {Array.from({ length: 4 }, (_, index) => <span className="password-strength__bar" key={index} />)}
        </div>
        <span className="password-strength__text">{strength.charAt(0).toUpperCase() + strength.slice(1)} password strength</span>
        {feedback()}
      </div>
    );
  }

  const renderers: Record<string, () => ReactElement> = {
    switch: renderSwitch,
    slider: renderSlider,
    'color-picker': renderColorPicker,
    'file-upload': renderFileUpload,
    'pin-input': renderPinInput,
    'tags-input': renderTagsInput,
    'segmented-control': renderSegmented,
    'number-input': renderNumberInput,
    combobox: renderCombobox,
    'date-picker': renderDatePicker,
    'password-input': renderPasswordInput,
  };

  const activeTokens: Record<string, string | null> = {
    'default-border': '--color-input-default-unfocused-inner-border',
    'default-focus': '--color-input-default-focused-outer-border',
    'error-border': variant === 'error' ? '--color-input-error-unfocused-inner-border' : null,
    'error-focus': variant === 'error' ? '--color-input-error-focused-outer-border' : null,
    'success-border': variant === 'success' ? '--color-input-success-unfocused-inner-border' : null,
    'success-focus': variant === 'success' ? '--color-input-success-focused-outer-border' : null,
    'warning-border': variant === 'warning' ? '--color-input-warning-unfocused-inner-border' : null,
    'warning-focus': variant === 'warning' ? '--color-input-warning-focused-outer-border' : null,
    surface: '--color-surface-primary',
    'active-surface': '--color-button-primary-bg-default',
    radius: contract.tokens.public.radius?.[0] ?? null,
  };

  return (
    <div className="docs-studio">
      <h1 className="docs-studio__title">{contract.name}</h1>
      <div className="docs-studio__workspace">
        <StudioInspector definition={definition} contract={contract} values={values} slotIconValues={emptySlotIcons} stateValue="default" tokenValues={tokenValues} activeTokens={activeTokens} onPropertiesChange={(next) => setValues((current) => ({ ...current, ...next }))} onSlotIconChange={() => undefined} onStateChange={() => undefined} onTokenChange={(token, value) => setTokenOverrides((current) => ({ ...current, [token]: value }))} onReset={reset} />
        <section className="docs-studio__stage" aria-label={`${contract.name} preview`} style={tokenOverrides as CSSProperties}>
          <div className="docs-studio__stage-inner">{renderers[contract.slug]()}</div>
        </section>
      </div>
    </div>
  );
}
