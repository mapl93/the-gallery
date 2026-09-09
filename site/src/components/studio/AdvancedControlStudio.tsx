import { useEffect, useId, useMemo, useRef, useState, type CSSProperties, type ClipboardEvent, type KeyboardEvent, type ReactElement } from 'react';
import { CalendarDays, Check, ChevronLeft, ChevronRight, Search, Upload } from 'lucide-react';
import type { ComponentContract, ContractProperty } from '../../lib/contracts';
import type { StudioControl, StudioDefinition } from '../../lib/studio';
import StudioInspector, {
  type StudioPropertyValue,
  type StudioPropertyValues,
  type StudioSlotIconValues,
} from './StudioInspector';
import SegmentedControlArtwork from './SegmentedControlArtwork';
import PasswordInputArtwork, {
  type PasswordInputArtworkStrength,
  type PasswordInputArtworkVariant,
} from './PasswordInputArtwork';
import SwitchArtwork, {
  type SwitchArtworkSize,
  type SwitchArtworkVariant,
} from './SwitchArtwork';
import FileUploadArtwork from './FileUploadArtwork';

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
  if (slug === 'switch') return { label: 'Available for purchase', name: 'available', value: 'yes', checked: false };
  if (slug === 'slider') return { label: 'Opacity', mode: 'single', variant: 'default', value: 60, upperValue: 80, min: 0, max: 100, step: 1, name: 'opacity', upperName: 'opacityMax' };
  if (slug === 'color-picker') return { groupLabel: 'Glaze color', label: 'Celadon', value: 'celadon', name: 'glaze', checked: true };
  if (slug === 'file-upload') return {
    label: 'Choose or drop artwork images',
    hint: 'PNG, JPG, or WebP',
    emptyStatus: 'No files selected.',
    name: 'artwork-images',
    accept: 'image/png,image/jpeg,image/webp',
    capture: 'none',
  };
  if (slug === 'pin-input') return {
    label: 'Verification code',
    name: 'verificationCode',
    description: 'Enter the six-digit code.',
    feedback: '',
    required: true,
    readOnly: false,
  };
  if (slug === 'tags-input') return {
    label: 'Materials',
    selectedValues: true,
    inputValue: '',
    placeholder: 'Add material',
    description: 'Press Enter to add one material.',
    feedback: '',
    required: false,
    readOnly: false,
    disabled: false,
    invalid: false,
  };
  if (slug === 'segmented-control') return { groupLabel: 'Gallery view', label: 'Grid', name: 'gallery-view', value: 'grid', checked: true, required: false, disabled: false, optionDisabled: false };
  if (slug === 'number-input') return { value: 1, min: 0, max: 10, step: 1, name: 'editionCount', accessibleLabel: 'Edition count', decrementLabel: 'Decrease edition count', incrementLabel: 'Increase edition count' };
  if (slug === 'combobox') return { label: 'Artwork', value: '', placeholder: 'Search artworks', open: true, name: 'artwork', autocomplete: 'off' };
  if (slug === 'date-picker') return {
    label: 'Exhibition date',
    value: '2026-07-12',
    open: true,
    name: 'exhibitionDate',
    placeholder: 'YYYY-MM-DD',
    autocomplete: 'off',
  };
  if (slug === 'password-input') return { value: 'Gallery2026!', visible: false, strength: 'good', strengthText: 'Good password strength', name: 'newPassword', autocomplete: 'new-password' };
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
  const [selectedFileName, setSelectedFileName] = useState('');
  const [pin, setPin] = useState(['2', '0', '', '', '', '']);
  const [tags, setTags] = useState(['Stoneware', 'Celadon']);
  const [tagStatus, setTagStatus] = useState('');
  const [segment, setSegment] = useState('grid');
  const [comboHighlighted, setComboHighlighted] = useState(-1);
  const [monthOffset, setMonthOffset] = useState(0);
  const [focusedDate, setFocusedDate] = useState('2026-07-12');
  const [previewState, setPreviewState] = useState('default');
  const pinRefs = useRef<Array<HTMLInputElement | null>>([]);
  const pinInputId = useId();
  const tagsInputFieldRef = useRef<HTMLInputElement | null>(null);
  const tagsInputRootRef = useRef<HTMLDivElement | null>(null);
  const tagsInputId = useId();

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
    setSelectedFileName('');
    setPin(['2', '0', '', '', '', '']);
    setTags(['Stoneware', 'Celadon']);
    setTagStatus('');
    setSegment('grid');
    setComboHighlighted(-1);
    setMonthOffset(0);
    setFocusedDate('2026-07-12');
    setPreviewState('default');
  }

  function feedback() {
    if (!message) return null;
    const className = variant === 'error' ? 'field__error' : variant === 'success' ? 'field__success' : 'field__warning';
    return <span className={`field__feedback ${className}`} id={describedBy}>{message}</span>;
  }

  function handleStateChange(state: string) {
    setPreviewState(state);
    if (contract.slug === 'tags-input') {
      setValues((current) => ({
        ...current,
        disabled: state === 'disabled',
        readOnly: state === 'readOnly',
        selectedValues: state === 'empty' ? true : current.selectedValues,
      }));
      if (state === 'empty') setTags([]);
      requestAnimationFrame(() => {
        if (state === 'removeFocusVisible') {
          tagsInputRootRef.current?.querySelector<HTMLButtonElement>('.tag__remove')?.focus();
        } else if (state === 'focusVisible') {
          tagsInputFieldRef.current?.focus();
        } else {
          tagsInputRootRef.current?.querySelector<HTMLElement>(':focus')?.blur();
        }
      });
      return;
    }
    if (contract.slug !== 'switch') return;

    setValues((current) => ({
      ...current,
      checked: state === 'checked'
        ? true
        : state === 'requiredInvalid'
          ? false
          : state === 'default'
            ? false
          : current.checked,
      disabled: state === 'disabled',
      required: state === 'requiredInvalid' ? true : current.required,
    }));
  }

  function renderSwitch() {
    const semantic = variant === 'error' || variant === 'success' || variant === 'warning';
    const focused = previewState === 'focusVisible';
    const controlToken = semantic
      ? `--color-input-${variant}-unfocused-inner-border`
      : previewState === 'hover'
        ? '--color-input-default-hover-inner-border'
        : '--color-border-default';
    const controlColor = semantic
      ? `color-mix(in srgb, var(${controlToken}) 70%, var(--color-text-primary))`
      : `var(${controlToken})`;
    const focusToken = semantic
      ? `--color-input-${variant}-focused-outer-border`
      : '--color-input-default-focused-outer-border';
    const trackStyle: CSSProperties = {
      borderColor: previewState === 'hover' || focused ? controlColor : undefined,
      backgroundColor: values.checked === true && semantic ? controlColor : undefined,
      outline: focused ? `4px solid var(${focusToken})` : undefined,
      outlineOffset: focused ? 0 : undefined,
    };
    return (
      <div className="docs-studio__field-fixture">
        <SwitchArtwork
          label={String(values.label || '')}
          size={String(values.size || 'default') as SwitchArtworkSize}
          variant={String(values.variant || 'default') as SwitchArtworkVariant}
          checked={values.checked === true}
          disabled={values.disabled === true}
          required={values.required === true}
          name={String(values.name || '')}
          value={String(values.value || 'on')}
          invalid={invalid}
          describedBy={describedBy}
          dataState={previewState}
          trackStyle={trackStyle}
          onChange={(event) => {
            setValues((current) => ({ ...current, checked: event.target.checked }));
            setPreviewState(event.target.checked ? 'checked' : 'default');
          }}
        />
        {feedback()}
      </div>
    );
  }

  function renderSlider() {
    const authoredMin = Number(values.min ?? 0);
    const authoredMax = Number(values.max ?? 100);
    const min = Math.min(authoredMin, authoredMax);
    const max = Math.max(authoredMin, authoredMax);
    const step = Math.max(Number(values.step ?? 1), 0.01);
    const value = Math.min(max, Math.max(min, Number(values.value ?? min)));
    const span = Math.max(max - min, 1);
    const singleStyle = { '--_slider-progress': `${((value - min) / span) * 100}%` } as CSSProperties;
    if (values.mode === 'range') {
      const lower = Math.max(min, Math.min(value, max));
      const upper = Math.max(lower, Math.min(max, Number(values.upperValue ?? max)));
      const rangeStyle = {
        '--_slider-range-start': `${((lower - min) / span) * 100}%`,
        '--_slider-range-end': `${((upper - min) / span) * 100}%`,
      } as CSSProperties;
      return (
        <div className="slider docs-studio__preview-slider" data-slider-enhanced="true" data-validation={variant === 'default' ? undefined : variant}>
          <div className="slider__label"><span>{String(values.label || '')}</span><span className="slider__value">{lower}–{upper}</span></div>
          <div className="range-slider" data-range-slider-enhanced="true" data-validation={variant === 'default' ? undefined : variant} style={rangeStyle}>
            <div className="range-slider__track" />
            <div className="range-slider__fill" />
            <input className="range-slider__input" data-range-lower type="range" min={min} max={max} step={step} value={lower} name={String(values.name || '') || undefined} disabled={values.disabled === true} aria-label={`Minimum ${String(values.label || 'value')}`} aria-invalid={invalid || undefined} aria-describedby={describedBy} onChange={(event) => setValues((current) => ({ ...current, value: Math.min(Number(event.target.value), Number(current.upperValue ?? max)) }))} />
            <input className="range-slider__input" data-range-upper type="range" min={min} max={max} step={step} value={upper} name={String(values.upperName || '') || undefined} disabled={values.disabled === true} aria-label={`Maximum ${String(values.label || 'value')}`} aria-invalid={invalid || undefined} aria-describedby={describedBy} onChange={(event) => setValues((current) => ({ ...current, upperValue: Math.max(Number(event.target.value), Number(current.value ?? min)) }))} />
          </div>
          {feedback()}
        </div>
      );
    }
    return (
      <div className="slider docs-studio__preview-slider" data-slider-enhanced="true" data-validation={variant === 'default' ? undefined : variant} style={singleStyle}>
        <label className="slider__label" htmlFor="studio-slider"><span>{String(values.label || '')}</span><span className="slider__value">{value}</span></label>
        <div className="slider__track">
          <input id="studio-slider" className="slider__input" type="range" min={min} max={max} step={step} value={value} name={String(values.name || '') || undefined} disabled={values.disabled === true} aria-invalid={invalid || undefined} aria-describedby={describedBy} onChange={(event) => setValues((current) => ({ ...current, value: Number(event.target.value) }))} />
        </div>
        {feedback()}
      </div>
    );
  }

  function renderColorPicker() {
    const colors = [
      { name: String(values.label || 'Celadon'), value: String(values.value || 'celadon'), fixtureClass: 'tg-preview-swatch--celadon' },
      { name: 'Ash', value: 'ash', fixtureClass: 'tg-preview-swatch--ash' },
      { name: 'Porcelain', value: 'porcelain', fixtureClass: 'tg-preview-swatch--porcelain' },
      { name: 'Ink', value: 'ink', fixtureClass: 'tg-preview-swatch--ink' },
    ];
    const rootClass = ['color-picker', variantClass(contract, values.variant)].filter(Boolean).join(' ');
    const swatchSize = sizeClass(contract, values.size);
    return (
      <div className="docs-studio__field-fixture">
        <fieldset className={rootClass} aria-describedby={describedBy}>
          <legend className={`color-picker__legend${values.required === true ? ' color-picker__legend--required' : ''}`}>{String(values.groupLabel || '')}</legend>
          <div className="color-picker__options">
            {colors.map((color, index) => (
              <label className={['color-swatch', swatchSize].filter(Boolean).join(' ')} key={color.value}>
                <input className="color-swatch__input" type="radio" name={String(values.name || 'studio-glaze')} value={color.value} checked={selectedColor === index} required={values.required === true} disabled={values.disabled === true} aria-invalid={invalid || undefined} onChange={() => { setSelectedColor(index); setValues((current) => ({ ...current, checked: index === 0 })); }} />
                <span className={`color-swatch__fill ${color.fixtureClass}`} />
                <span className="color-swatch__check"><Check aria-hidden="true" /></span>
                <span className="color-swatch__label">{color.name}</span>
              </label>
            ))}
          </div>
        </fieldset>
        {feedback()}
      </div>
    );
  }

  function renderFileUpload() {
    const capture = values.capture === 'user' || values.capture === 'environment' ? values.capture : undefined;
    return (
      <div className="docs-studio__field-fixture docs-studio__preview-file-wrap">
        <FileUploadArtwork
          id="studio-file-upload"
          className="docs-studio__preview-file-upload"
          label={String(values.label || '')}
          hint={String(values.hint || '')}
          emptyStatus={String(values.emptyStatus || '')}
          name={String(values.name || '')}
          accept={String(values.accept || '')}
          capture={capture}
          multiple={values.multiple === true}
          required={values.required === true}
          disabled={values.disabled === true}
          invalid={invalid}
          variant={String(values.variant || 'default') as 'default' | 'error' | 'success' | 'warning'}
          selectedFileNames={selectedFileName}
          describedBy={describedBy}
          icon={<Upload className="file-upload__icon" aria-hidden="true" />}
          onChange={(event) => setSelectedFileName(
            event.target.files
              ? Array.from(event.target.files, (file) => file.name).join(', ')
              : '',
          )}
        />
        {feedback()}
      </div>
    );
  }

  function setPinCell(index: number, nextValue: string) {
    const next = nextValue.replace(/\D/g, '').slice(-1);
    setPin((current) => current.map((value, cellIndex) => cellIndex === index ? next : value));
    if (next && index < pin.length - 1) pinRefs.current[index + 1]?.focus();
  }

  function pinKeyDown(event: KeyboardEvent<HTMLInputElement>, index: number) {
    const root = event.currentTarget.closest('.pin-input');
    const rtl = root ? getComputedStyle(root).direction === 'rtl' : false;
    const previousKey = rtl ? 'ArrowRight' : 'ArrowLeft';
    const nextKey = rtl ? 'ArrowLeft' : 'ArrowRight';
    if (event.key === 'Backspace' && !pin[index] && index > 0) {
      event.preventDefault();
      pinRefs.current[index - 1]?.focus();
    } else if (event.key === previousKey && index > 0) {
      event.preventDefault();
      pinRefs.current[index - 1]?.focus();
    } else if (event.key === nextKey && index < pin.length - 1) {
      event.preventDefault();
      pinRefs.current[index + 1]?.focus();
    }
  }

  function pinPaste(event: ClipboardEvent<HTMLInputElement>, requestedStart: number) {
    event.preventDefault();
    const next = event.clipboardData.getData('text').replace(/\D/g, '').slice(0, pin.length).split('');
    if (next.length === 0) return;
    const start = next.length >= pin.length ? 0 : requestedStart;
    const last = Math.min(start + next.length - 1, pin.length - 1);
    setPin((current) => current.map((value, index) => (
      index >= start && index <= last ? next[index - start] : value
    )));
    pinRefs.current[Math.min(last + 1, pin.length - 1)]?.focus();
  }

  function renderPinInput() {
    const semanticVariant = ['error', 'success', 'warning'].includes(variant) ? variant : '';
    const classes = ['field', 'pin-input', variantClass(contract, values.variant), semanticVariant ? `field--${semanticVariant}` : '', 'docs-studio__preview-pin'].filter(Boolean).join(' ');
    const labelId = `${pinInputId}-label`;
    const description = String(values.description || '').trim();
    const authoredFeedback = String(values.feedback || '').trim();
    const currentFeedback = authoredFeedback || message || '';
    const descriptionId = `${pinInputId}-description`;
    const feedbackId = `${pinInputId}-feedback`;
    const pinDescribedBy = [String(values.describedBy || '').trim(), description ? descriptionId : '', currentFeedback ? feedbackId : ''].filter(Boolean).join(' ') || undefined;
    const complete = pin.every((value) => value.length === 1);
    const feedbackClass = variant === 'error'
      ? 'field__feedback field__error'
      : variant === 'success'
        ? 'field__feedback field__success'
        : 'field__feedback field__warning';
    return (
      <div className="docs-studio__field-fixture">
        <div className={classes} role="group" aria-labelledby={labelId} aria-describedby={pinDescribedBy} data-pin-input data-pin-input-enhanced="true" data-complete={String(complete)}>
          <span className={`field__label pin-input__legend${values.required === true ? ' field__label--required' : ''}`} id={labelId}>{String(values.label || '')}</span>
          <div className="field__control pin-input__fields">
            {pin.map((value, index) => (
              <input className={`pin-input__field${value ? ' pin-input__field--filled' : ''}`} key={index} ref={(element) => { pinRefs.current[index] = element; }} type="text" inputMode="numeric" pattern="[0-9]*" autoComplete={index === 0 ? 'one-time-code' : 'off'} maxLength={1} name={String(values.name || '')} value={value} required={values.required === true} disabled={values.disabled === true} readOnly={values.readOnly === true} aria-label={`Code character ${index + 1} of ${pin.length}`} aria-invalid={invalid || undefined} aria-describedby={pinDescribedBy} onChange={(event) => setPinCell(index, event.target.value)} onKeyDown={(event) => pinKeyDown(event, index)} onPaste={(event) => pinPaste(event, index)} />
            ))}
          </div>
          {description && <span className="field__description" id={descriptionId}>{description}</span>}
          {currentFeedback && <span className={feedbackClass} id={feedbackId}>{currentFeedback}</span>}
        </div>
      </div>
    );
  }

  function focusTagsInput() {
    requestAnimationFrame(() => tagsInputFieldRef.current?.focus());
  }

  function commitTag() {
    if (values.disabled === true || values.readOnly === true) return;
    const next = String(values.inputValue || '').trim();
    if (!next) return;
    if (tags.includes(next)) {
      setTagStatus(`${next} is already added.`);
      focusTagsInput();
      return;
    }
    setTags((current) => [...current, next]);
    setValues((current) => ({ ...current, inputValue: '' }));
    setTagStatus(`${next} added. ${tags.length + 1} materials selected.`);
    focusTagsInput();
  }

  function removeTag(tag: string) {
    if (values.disabled === true || values.readOnly === true) return;
    setTags((current) => current.filter((item) => item !== tag));
    setTagStatus(`${tag} removed. ${Math.max(tags.length - 1, 0)} materials selected.`);
    focusTagsInput();
  }

  function renderTagsInput() {
    const variantName = String(values.variant || 'default');
    const classes = ['field', 'tags-input', variantClass(contract, values.variant), 'docs-studio__preview-tags'].filter(Boolean).join(' ');
    const description = String(values.description || '').trim();
    const authoredFeedback = String(values.feedback || '').trim();
    const currentFeedback = authoredFeedback || message || '';
    const descriptionId = `${tagsInputId}-description`;
    const feedbackId = `${tagsInputId}-feedback`;
    const describedBy = [description ? descriptionId : '', currentFeedback ? feedbackId : ''].filter(Boolean).join(' ') || undefined;
    const feedbackClass = variantName === 'error'
      ? 'field__feedback field__error'
      : variantName === 'success'
        ? 'field__feedback field__success'
        : variantName === 'warning'
          ? 'field__feedback field__warning'
          : 'field__feedback';
    const rootStyle = previewState === 'hover'
      ? { '--_tags-border': 'var(--_tags-hover-border)', '--_tags-bg': 'var(--_tags-hover-bg)' } as CSSProperties
      : undefined;
    return (
      <div className="docs-studio__field-fixture docs-studio__preview-tags-wrap">
        <div className={classes} ref={tagsInputRootRef} style={rootStyle} data-studio-state={previewState}>
          <label className={`field__label${values.required === true ? ' field__label--required' : ''}`} htmlFor={`${tagsInputId}-field`}>{String(values.label || '')}</label>
          <div className="field__control tags-input__control" style={previewState === 'focusVisible' ? {
            '--_tags-border': 'var(--_tags-focus-border)',
            outlineColor: 'var(--_tags-focus-ring)',
          } as CSSProperties : undefined} onClick={(event) => {
            if (!(event.target as HTMLElement).closest('button')) tagsInputFieldRef.current?.focus();
          }}>
            {values.selectedValues === true && <ul className="tags-input__values" aria-label="Selected materials">
              {tags.map((tag) => (
                <li className="tags-input__item" key={tag}>
                  <span className="tag">
                    <span className="tag__label">{tag}</span>
                    {values.readOnly !== true && <button className="tag__remove" type="button" aria-label={`Remove ${tag} material`} disabled={values.disabled === true} onClick={(event) => { event.stopPropagation(); removeTag(tag); }} />}
                  </span>
                </li>
              ))}
            </ul>}
            <input
              id={`${tagsInputId}-field`}
              ref={tagsInputFieldRef}
              className="tags-input__field"
              type="text"
              value={String(values.inputValue || '')}
              placeholder={String(values.placeholder || '')}
              disabled={values.disabled === true}
              readOnly={values.readOnly === true}
              aria-required={values.required === true || undefined}
              aria-invalid={invalid || undefined}
              aria-describedby={describedBy}
              onChange={(event) => setValues((current) => ({ ...current, inputValue: event.target.value }))}
              onKeyDown={(event) => {
                if (event.key !== 'Enter' || event.nativeEvent.isComposing) return;
                event.preventDefault();
                commitTag();
              }}
            />
          </div>
          {description && <span className="field__description" id={descriptionId}>{description}</span>}
          {currentFeedback && <span className={feedbackClass} id={feedbackId}>{currentFeedback}</span>}
          <span className="tags-input__status" role="status" aria-atomic="true">{tagStatus}</span>
        </div>
      </div>
    );
  }

  function renderSegmented() {
    const firstValue = String(values.value || 'grid');
    const options = [
      { label: String(values.label || 'Grid'), value: firstValue },
      { label: 'List', value: 'list' },
      { label: 'Compact', value: 'compact' },
    ];
    return (
      <div className="docs-studio__field-fixture">
        <SegmentedControlArtwork
          groupLabel={String(values.groupLabel || '')}
          name={String(values.name || 'gallery-view')}
          options={options.map((option, index) => ({
            ...option,
            disabled: values.optionDisabled === true && index === 1,
          }))}
          value={segment}
          variant={variant}
          required={values.required === true}
          disabled={values.disabled === true}
          describedBy={describedBy}
          invalid={invalid}
          onValueChange={(nextValue) => {
            const index = options.findIndex((option) => option.value === nextValue);
            setSegment(nextValue);
            setValues((current) => ({ ...current, checked: index === 0 }));
          }}
        />
        {feedback()}
      </div>
    );
  }

  function renderNumberInput() {
    const min = typeof values.min === 'number' ? values.min : null;
    const max = typeof values.max === 'number' ? values.max : null;
    const step = typeof values.step === 'number' ? values.step : 1;
    const value = typeof values.value === 'number' ? values.value : null;
    const unavailable = values.disabled === true || values.readOnly === true;
    const fieldId = 'number-demo';
    const classes = ['number-input', variantClass(contract, values.variant)].filter(Boolean).join(' ');
    return (
      <div className="field docs-studio__field-fixture">
        <label className={`field__label${values.required === true ? ' field__label--required' : ''}`} htmlFor={fieldId}>{String(values.accessibleLabel || '')}</label>
        <div className={classes}>
          <button className="number-input__btn number-input__btn--decrement" type="button" aria-label={String(values.decrementLabel || '')} aria-controls={fieldId} disabled={unavailable || (value !== null && min !== null && value <= min)}><span aria-hidden="true">−</span></button>
          <input className="number-input__field" id={fieldId} name={String(values.name || '') || undefined} type="number" value={value ?? ''} min={min ?? undefined} max={max ?? undefined} step={step} disabled={values.disabled === true} readOnly={values.readOnly === true} required={values.required === true} aria-label={String(values.accessibleLabel || '')} aria-invalid={invalid || undefined} aria-describedby={describedBy} onChange={(event) => {
            const nextValue = event.currentTarget.value === '' ? null : event.currentTarget.valueAsNumber;
            setValues((current) => ({ ...current, value: nextValue }));
          }} />
          <button className="number-input__btn number-input__btn--increment" type="button" aria-label={String(values.incrementLabel || '')} aria-controls={fieldId} disabled={unavailable || (value !== null && max !== null && value >= max)}><span aria-hidden="true">+</span></button>
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
      setComboHighlighted(-1);
    };
    const keyDown = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setValues((current) => ({ ...current, open: true }));
        setComboHighlighted((current) => filtered.length ? Math.min(current + 1, filtered.length - 1) : -1);
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        setValues((current) => ({ ...current, open: true }));
        setComboHighlighted((current) => filtered.length ? (current < 0 ? filtered.length - 1 : Math.max(current - 1, 0)) : -1);
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
        <label className={`field__label${values.required === true ? ' field__label--required' : ''}`} htmlFor="studio-combobox">{String(values.label || '')}</label>
        <div className={classes} data-combobox-enhanced="true">
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
            name={String(values.name || '') || undefined}
            placeholder={String(values.placeholder || '')}
            autoComplete={String(values.autocomplete || 'off')}
            disabled={values.disabled === true}
            required={values.required === true}
            onClick={() => setValues((current) => ({ ...current, open: true }))}
            onChange={(event) => { setValues((current) => ({ ...current, value: event.target.value, open: true })); setComboHighlighted(-1); }}
            onBlur={(event) => {
              const related = event.relatedTarget;
              if (!(related instanceof Node) || !event.currentTarget.parentElement?.contains(related)) {
                setValues((current) => ({ ...current, open: false }));
                setComboHighlighted(-1);
              }
            }}
            onKeyDown={keyDown}
          />
          <div className="combobox__listbox" id="studio-combobox-listbox" role="listbox" aria-label="Artwork results">
            {filtered.length ? filtered.map((option, index) => {
              const selected = option === values.value;
              return (
                <div
                  className="combobox__option"
                  id={`studio-combobox-option-${index}`}
                  role="option"
                  tabIndex={-1}
                  data-value={option}
                  aria-selected={selected}
                  data-highlighted={comboHighlighted === index || undefined}
                  key={option}
                  onPointerDown={(event) => event.preventDefault()}
                  onPointerMove={() => setComboHighlighted(index)}
                  onClick={() => selectOption(option)}
                >
                  <span>{option}</span>
                  <Check className="combobox__check" aria-hidden="true" />
                </div>
              );
            }) : <div className="combobox__empty" role="status">No artworks found.</div>}
          </div>
        </div>
        {feedback()}
      </div>
    );
  }

  function renderDatePicker() {
    const parseIso = (value: StudioPropertyValue) => {
      const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(value || ''));
      if (!match) return null;
      const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
      return date.getFullYear() === Number(match[1])
        && date.getMonth() === Number(match[2]) - 1
        && date.getDate() === Number(match[3])
        ? date
        : null;
    };
    const iso = (date: Date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    const shiftDateMonth = (date: Date, amount: number) => {
      const target = new Date(date.getFullYear(), date.getMonth() + amount, 1);
      const last = new Date(target.getFullYear(), target.getMonth() + 1, 0).getDate();
      return new Date(target.getFullYear(), target.getMonth(), Math.min(date.getDate(), last));
    };
    const min = parseIso(values.min);
    const max = parseIso(values.max);
    const unavailable = (date: Date) => Boolean((min && date < min) || (max && date > max));
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
    const open = values.open === true && values.disabled !== true;
    const classes = ['datepicker', variantClass(contract, values.variant), open ? 'datepicker--open' : null, 'docs-studio__preview-datepicker'].filter(Boolean).join(' ');
    const weekdays = [
      ['Sunday', 'Sun'], ['Monday', 'Mon'], ['Tuesday', 'Tue'], ['Wednesday', 'Wed'],
      ['Thursday', 'Thu'], ['Friday', 'Fri'], ['Saturday', 'Sat'],
    ];
    const selectedDate = parseIso(values.value);
    const today = new Date(2026, 6, 12);
    const focusValue = parseIso(focusedDate);
    const currentFocus = focusValue && cells.some((cell) => iso(cell.date) === iso(focusValue)) && !unavailable(focusValue)
      ? focusValue
      : cells.find((cell) => selectedDate && iso(cell.date) === iso(selectedDate) && !unavailable(cell.date))?.date
        || cells.find((cell) => iso(cell.date) === iso(today) && !unavailable(cell.date))?.date
        || cells.find((cell) => !cell.outside && !unavailable(cell.date))?.date
        || cells.find((cell) => !unavailable(cell.date))?.date;
    const focusDay = (date: Date, target?: HTMLElement) => {
      if (unavailable(date)) return;
      setFocusedDate(iso(date));
      setMonthOffset((date.getFullYear() - 2026) * 12 + date.getMonth() - 6);
      window.requestAnimationFrame(() => {
        const root = target?.closest('.datepicker') || document.querySelector('.docs-studio__preview-datepicker');
        const button = root?.querySelector(`[data-date="${iso(date)}"]`);
        if (button instanceof HTMLButtonElement) button.focus();
      });
    };
    const openCalendar = (focus = false) => {
      if (values.disabled === true || values.readOnly === true) return;
      const candidate = selectedDate && !unavailable(selectedDate) ? selectedDate : currentFocus;
      if (candidate) {
        setFocusedDate(iso(candidate));
        setMonthOffset((candidate.getFullYear() - 2026) * 12 + candidate.getMonth() - 6);
      }
      setValues((current) => ({ ...current, open: true }));
      if (focus && candidate) focusDay(candidate);
    };
    const closeCalendar = () => setValues((current) => ({ ...current, open: false }));
    const selectDate = (date: Date) => {
      if (unavailable(date)) return;
      setFocusedDate(iso(date));
      setValues((current) => ({ ...current, value: iso(date), open: false }));
    };
    const keyDown = (event: KeyboardEvent<HTMLButtonElement>, date: Date) => {
      const rtl = getComputedStyle(event.currentTarget).direction === 'rtl';
      let target: Date | null = null;
      if (event.key === 'ArrowLeft') target = new Date(date.getFullYear(), date.getMonth(), date.getDate() + (rtl ? 1 : -1));
      else if (event.key === 'ArrowRight') target = new Date(date.getFullYear(), date.getMonth(), date.getDate() + (rtl ? -1 : 1));
      else if (event.key === 'ArrowUp') target = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7);
      else if (event.key === 'ArrowDown') target = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7);
      else if (event.key === 'Home') target = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay());
      else if (event.key === 'End') target = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 6 - date.getDay());
      else if (event.key === 'PageUp' || event.key === 'PageDown') {
        const direction = event.key === 'PageUp' ? -1 : 1;
        target = shiftDateMonth(date, event.shiftKey ? direction * 12 : direction);
      } else if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        selectDate(date);
        return;
      } else if (event.key === 'Escape') {
        event.preventDefault();
        closeCalendar();
        window.requestAnimationFrame(() => document.getElementById('studio-datepicker')?.focus());
        return;
      }
      if (target) {
        event.preventDefault();
        focusDay(target, event.currentTarget);
      }
    };
    return (
      <div className="field docs-studio__field-fixture">
        <label className={`field__label${values.required === true ? ' field__label--required' : ''}`} htmlFor="studio-datepicker">{String(values.label || '')}</label>
        <div className={classes} data-datepicker-enhanced="true" data-today="2026-07-12">
          <input
            className="datepicker__input"
            id="studio-datepicker"
            type="text"
            inputMode="numeric"
            value={String(values.value || '')}
            name={String(values.name || '') || undefined}
            placeholder={String(values.placeholder || '')}
            autoComplete={String(values.autocomplete || 'off')}
            disabled={values.disabled === true}
            required={values.required === true}
            readOnly={values.readOnly === true}
            data-min={String(values.min || '') || undefined}
            data-max={String(values.max || '') || undefined}
            role="combobox"
            aria-haspopup="dialog"
            aria-autocomplete="none"
            aria-expanded={open}
            aria-controls="studio-datepicker-calendar"
            aria-invalid={invalid || undefined}
            aria-describedby={describedBy}
            onChange={(event) => {
              const date = parseIso(event.target.value);
              setValues((current) => ({ ...current, value: event.target.value }));
              if (date) {
                setFocusedDate(iso(date));
                setMonthOffset((date.getFullYear() - 2026) * 12 + date.getMonth() - 6);
              }
            }}
            onKeyDown={(event) => {
              if (event.key === 'ArrowDown') { event.preventDefault(); openCalendar(true); }
              else if (event.key === 'Escape' && open) { event.preventDefault(); closeCalendar(); }
            }}
          />
          <button
            className="datepicker__trigger"
            type="button"
            aria-label={selectedDate ? `Change date, ${selectedDate.toLocaleDateString('en', { dateStyle: 'long' })}` : 'Choose date'}
            aria-controls="studio-datepicker-calendar"
            disabled={values.disabled === true || values.readOnly === true}
            onClick={() => open ? closeCalendar() : openCalendar(true)}
          >
            <CalendarDays aria-hidden="true" />
          </button>
          <div className="datepicker__calendar" id="studio-datepicker-calendar" role="dialog" aria-label="Choose date" hidden={!open}>
            <div className="datepicker__header">
              <span className="datepicker__month-year" id="studio-datepicker-month" aria-live="polite">{month.toLocaleDateString('en', { month: 'long', year: 'numeric' })}</span>
              <div className="datepicker__nav">
                <button className="datepicker__nav-btn" type="button" data-datepicker-previous aria-label="Previous month" disabled={Boolean(min && new Date(year, monthIndex, 0) < min)} onClick={() => focusDay(shiftDateMonth(currentFocus || month, -1))}><ChevronLeft aria-hidden="true" /></button>
                <button className="datepicker__nav-btn" type="button" data-datepicker-next aria-label="Next month" disabled={Boolean(max && new Date(year, monthIndex + 1, 1) > max)} onClick={() => focusDay(shiftDateMonth(currentFocus || month, 1))}><ChevronRight aria-hidden="true" /></button>
              </div>
            </div>
            <div className="datepicker__grid" role="grid" aria-labelledby="studio-datepicker-month">
              <div className="datepicker__weekdays" role="row">
                {weekdays.map(([full, short]) => <span className="datepicker__weekday" role="columnheader" key={full}><abbr title={full}>{short}</abbr></span>)}
              </div>
              {Array.from({ length: 6 }, (_, week) => (
                <div className="datepicker__week" role="row" key={week}>
                  {cells.slice(week * 7, week * 7 + 7).map((cell) => {
                    const dateValue = iso(cell.date);
                    const selected = dateValue === values.value;
                    const isToday = dateValue === iso(today);
                    const disabled = unavailable(cell.date);
                    return (
                      <button
                        className={['datepicker__day', cell.outside ? 'datepicker__day--outside' : null, selected ? 'datepicker__day--selected' : null, isToday ? 'datepicker__day--today' : null].filter(Boolean).join(' ')}
                        type="button"
                        role="gridcell"
                        data-date={dateValue}
                        aria-label={cell.date.toLocaleDateString('en', { dateStyle: 'full' })}
                        aria-selected={selected}
                        aria-current={isToday ? 'date' : undefined}
                        disabled={disabled}
                        tabIndex={!disabled && currentFocus && dateValue === iso(currentFocus) ? 0 : -1}
                        key={dateValue}
                        onClick={() => selectDate(cell.date)}
                        onKeyDown={(event) => keyDown(event, cell.date)}
                      >
                        {cell.day}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
        {feedback()}
      </div>
    );
  }

  function renderPasswordInput() {
    const visible = values.visible === true;
    const strength = String(values.strength || 'none') as PasswordInputArtworkStrength;
    return (
      <div className="field docs-studio__field-fixture">
        <label className={`field__label${values.required === true ? ' field__label--required' : ''}`} htmlFor="password-demo">Create password</label>
        <PasswordInputArtwork
          id="password-demo"
          className="docs-studio__preview-password"
          variant={variant as PasswordInputArtworkVariant}
          value={String(values.value || '')}
          visible={visible}
          name={String(values.name || '')}
          placeholder={String(values.placeholder || '')}
          autoComplete={String(values.autocomplete || 'current-password')}
          disabled={values.disabled === true}
          readOnly={values.readOnly === true}
          required={values.required === true}
          describedBy={describedBy}
          strength={strength}
          strengthText={String(values.strengthText || '')}
          dataState={previewState}
          onChange={(event) => setValues((current) => ({ ...current, value: event.target.value }))}
          onVisibleChange={(nextVisible) => setValues((current) => ({ ...current, visible: nextVisible }))}
        />
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
    'semantic-border': variant === 'error' || variant === 'success' || variant === 'warning'
      ? `--color-input-${variant}-unfocused-inner-border`
      : null,
    'label-color': variant === 'error' || variant === 'success' || variant === 'warning'
      ? `--color-input-${variant}-unfocused-label`
      : '--color-text-primary',
    'focus-ring': variant === 'error' || variant === 'success' || variant === 'warning'
      ? `--color-input-${variant}-focused-outer-border`
      : '--color-input-default-focused-outer-border',
    radius: contract.tokens.public.radius?.[0] ?? null,
  };

  return (
    <div className="docs-studio">
      <h1 className="docs-studio__title">{contract.name}</h1>
      <div className="docs-studio__workspace">
        <StudioInspector definition={definition} contract={contract} values={values} slotIconValues={emptySlotIcons} stateValue={previewState} tokenValues={tokenValues} activeTokens={activeTokens} onPropertiesChange={(next) => {
          setValues((current) => ({ ...current, ...next }));
          if (contract.slug === 'switch' && typeof next.checked === 'boolean') {
            setPreviewState(next.checked ? 'checked' : 'default');
          }
        }} onSlotIconChange={() => undefined} onStateChange={handleStateChange} onTokenChange={(token, value) => setTokenOverrides((current) => ({ ...current, [token]: value }))} onReset={reset} />
        <section className="docs-studio__stage" aria-label={`${contract.name} preview`} style={tokenOverrides as CSSProperties}>
          <div className="docs-studio__stage-inner">{renderers[contract.slug]()}</div>
        </section>
      </div>
    </div>
  );
}
