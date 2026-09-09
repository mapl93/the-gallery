import { useEffect, useId, useState, type ReactNode } from 'react';
import { RotateCcw } from 'lucide-react';
import type { ComponentContract, ContractProperty } from '../../lib/contracts';
import type { StudioControl, StudioDefinition } from '../../lib/studio';
import { getStudioLucideIcon, studioLucideIcons } from './lucideCatalogue';
import SegmentedControlArtwork from './SegmentedControlArtwork';
import { parseStudioColor, serializeStudioColor } from '../../lib/studioColor';

export type StudioPropertyValue = string | string[] | boolean | number | null;
export type StudioPropertyValues = Record<string, StudioPropertyValue>;
export interface StudioSlotIconValues {
  leading: string;
  trailing: string;
}

interface StudioInspectorProps {
  definition: StudioDefinition;
  contract: ComponentContract;
  values: StudioPropertyValues;
  slotIconValues: StudioSlotIconValues;
  stateValue: string;
  tokenValues: Record<string, string>;
  activeTokens: Record<string, string | null>;
  fixtureControlsByGroup?: Partial<Record<string, ReactNode>>;
  onPropertiesChange: (values: StudioPropertyValues) => void;
  onSlotIconChange: (slot: keyof StudioSlotIconValues, iconName: string) => void;
  onStateChange: (state: string) => void;
  onTokenChange: (token: string, value: string) => void;
  onReset: () => void;
}

function humanize(value: string): string {
  const spaced = value.replace(/([a-z0-9])([A-Z])/g, '$1 $2').replace(/-/g, ' ');
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

function propertyOptions(contract: ComponentContract, property: ContractProperty): string[] {
  if (property.values) return property.values;
  if (property.valuesFrom === 'variants') return contract.variants.map((option) => option.name);
  if (property.valuesFrom === 'sizes') return contract.sizes.map((option) => option.name);
  return [];
}

function fieldValue(value: StudioPropertyValue): string {
  return typeof value === 'string' ? value : '';
}

function normalizedNumber(value: number, property: ContractProperty): number {
  let next = value;
  if (typeof property.minimum === 'number') next = Math.max(property.minimum, next);
  if (typeof property.maximum === 'number') next = Math.min(property.maximum, next);
  if (typeof property.step === 'number') {
    const base = property.minimum ?? 0;
    next = base + Math.round((next - base) / property.step) * property.step;
    next = Number(next.toFixed(10));
  }
  if (typeof property.minimum === 'number') next = Math.max(property.minimum, next);
  if (typeof property.maximum === 'number') next = Math.min(property.maximum, next);
  return next;
}

function formatTokenName(token: string): string {
  return token
    .replace(/^--/, '')
    .replace(/^tg-/, '')
    .replace(/^(?:color|space|radius|shadow|typo|transition|easing)-/, '')
    .replace(/-/g, '/');
}

const supportedCssUnits = new Set([
  '%', 'cap', 'ch', 'cm', 'cqb', 'cqh', 'cqi', 'cqmax', 'cqmin', 'cqw', 'deg',
  'dvh', 'dvw', 'em', 'ex', 'fr', 'grad', 'ic', 'in', 'lh', 'lvh', 'lvw', 'mm',
  'ms', 'pc', 'pt', 'px', 'rad', 'rem', 'rlh', 's', 'svh', 'svw', 'turn', 'vb',
  'vh', 'vi', 'vmax', 'vmin', 'vw',
]);

function inferredTokenUnit(token: string): string | null {
  if (/(?:transition|duration)/.test(token) && !token.includes('motion-transition')) return 'ms';
  if (/(?:radius|space|size|line-height|padding|margin|gap|offset|width|height|target)/.test(token)) return 'px';
  if (/(?:opacity|weight|scale|z-index|^--z-)/.test(token)) return '';
  return null;
}

function splitNumericValue(token: string, value: string): { number: string; unit: string } | null {
  const normalized = value.trim();
  const match = normalized.match(/^(-?(?:\d+|\d*\.\d+))([a-z%]*)$/i);
  const inferredUnit = inferredTokenUnit(token);

  if (!match) {
    return normalized === '' && inferredUnit !== null
      ? { number: '', unit: inferredUnit }
      : null;
  }

  const authoredUnit = match[2].toLowerCase();
  const unit = authoredUnit === '' ? '' : supportedCssUnits.has(authoredUnit)
    ? authoredUnit
    : inferredUnit ?? '';
  return { number: match[1], unit };
}

function authoredNumber(value: string): string | null {
  return value.trim().match(/^(-?(?:\d+|\d*\.\d+))(?:[a-z%]+)?$/i)?.[1] ?? null;
}

interface StudioTokenInputProps {
  id: string;
  label: string;
  token: string;
  value: string;
  onChange: (value: string) => void;
}

function StudioTokenInput({ id, label, token, value, onChange }: StudioTokenInputProps) {
  const numeric = splitNumericValue(token, value);
  const externalValue = numeric?.number ?? value;
  const [draft, setDraft] = useState(externalValue);

  useEffect(() => {
    setDraft(externalValue);
  }, [externalValue, token]);

  function commit(nextDraft: string) {
    if (!numeric) {
      onChange(nextDraft);
      return;
    }

    const nextNumber = authoredNumber(nextDraft);
    if (nextNumber === null) {
      setDraft(externalValue);
      return;
    }

    setDraft(nextNumber);
    onChange(`${nextNumber}${numeric.unit}`);
  }

  return (
    <input
      id={id}
      type="text"
      inputMode={numeric ? 'decimal' : undefined}
      value={draft}
      aria-label={label}
      onChange={(event) => {
        const nextDraft = event.target.value;
        setDraft(nextDraft);
        if (numeric && authoredNumber(nextDraft) !== null) commit(nextDraft);
      }}
      onBlur={() => commit(draft)}
      onKeyDown={(event) => {
        if (event.key === 'Enter') event.currentTarget.blur();
        if (event.key === 'Escape') {
          setDraft(externalValue);
          event.currentTarget.blur();
        }
      }}
    />
  );
}

function toColorInputValue(value: string): string {
  const normalized = value.trim();
  const shortHex = normalized.match(/^#([0-9a-f]{3})$/i);
  if (shortHex) {
    return `#${shortHex[1].split('').map((character) => character + character).join('')}`;
  }
  if (/^#[0-9a-f]{6}$/i.test(normalized)) return normalized;

  const rgb = normalized.match(/^rgba?\((\d+)[, ]+(\d+)[, ]+(\d+)/i);
  if (rgb) {
    return `#${rgb.slice(1, 4).map((channel) => Number(channel).toString(16).padStart(2, '0')).join('')}`;
  }

  return '#000000';
}

interface StudioShadowLength {
  number: string;
  unit: string;
}

interface StudioShadowValue {
  inset: boolean;
  x: StudioShadowLength;
  y: StudioShadowLength;
  blur: StudioShadowLength;
  spread: StudioShadowLength;
  color: string;
  opacity: string;
}

type StudioShadowLengthName = 'x' | 'y' | 'blur' | 'spread';

function normalizedHexColor(value: string): string | null {
  const normalized = value.trim().replace(/^#/, '');
  if (/^[0-9a-f]{3}$/i.test(normalized)) {
    return `#${normalized.split('').map((character) => character + character).join('')}`.toLowerCase();
  }
  return /^[0-9a-f]{6}$/i.test(normalized) ? `#${normalized.toLowerCase()}` : null;
}

function shadowColorParts(value: string): { color: string; opacity: string } {
  const normalized = value.trim();
  const hexWithAlpha = normalized.match(/^#([0-9a-f]{8})$/i);
  if (hexWithAlpha) {
    const opacity = Math.round((parseInt(hexWithAlpha[1].slice(6), 16) / 255) * 100);
    return { color: `#${hexWithAlpha[1].slice(0, 6).toLowerCase()}`, opacity: String(opacity) };
  }

  if (/^rgba?\(/i.test(normalized)) {
    const channels = normalized.match(/-?(?:\d*\.\d+|\d+)%?/g) ?? [];
    if (channels.length >= 3) {
      const channel = (index: number) => Math.max(0, Math.min(255, Number(channels[index])));
      const color = `#${[channel(0), channel(1), channel(2)]
        .map((part) => Math.round(part).toString(16).padStart(2, '0'))
        .join('')}`;
      const alpha = channels[3]
        ? (channels[3].endsWith('%') ? Number(channels[3].slice(0, -1)) : Number(channels[3]) * 100)
        : 100;
      return { color, opacity: String(Math.max(0, Math.min(100, Math.round(alpha * 100) / 100))) };
    }
  }

  return { color: toColorInputValue(normalized), opacity: '100' };
}

function parseShadowValue(value: string): StudioShadowValue | null {
  const length = '(-?(?:\\d+|\\d*\\.\\d+))([a-z%]*)';
  const match = value.trim().match(new RegExp(
    `^(inset\\s+)?${length}\\s+${length}\\s+${length}\\s+${length}\\s+(.+)$`,
    'i'
  ));
  if (!match) return null;

  const part = (numberIndex: number): StudioShadowLength => ({
    number: match[numberIndex],
    unit: match[numberIndex + 1].toLowerCase() || 'px',
  });
  const color = shadowColorParts(match[10]);
  return {
    inset: Boolean(match[1]),
    x: part(2),
    y: part(4),
    blur: part(6),
    spread: part(8),
    color: color.color,
    opacity: color.opacity,
  };
}

function serializeShadowValue(value: StudioShadowValue): string {
  const length = (part: StudioShadowLength) => `${part.number}${part.unit}`;
  const normalizedColor = normalizedHexColor(value.color) ?? '#000000';
  const channels = [
    parseInt(normalizedColor.slice(1, 3), 16),
    parseInt(normalizedColor.slice(3, 5), 16),
    parseInt(normalizedColor.slice(5, 7), 16),
  ];
  const opacity = Math.max(0, Math.min(100, Number(value.opacity)));
  const alpha = Number((opacity / 100).toFixed(3));
  return [
    value.inset ? 'inset' : '',
    length(value.x),
    length(value.y),
    length(value.blur),
    length(value.spread),
    `rgba(${channels.join(', ')}, ${alpha})`,
  ].filter(Boolean).join(' ');
}

interface StudioBoundedNumberInputProps {
  id: string;
  label: string;
  value: string;
  minimum?: number;
  maximum?: number;
  disabled?: boolean;
  onChange: (value: string) => void;
}

function StudioBoundedNumberInput({
  id,
  label,
  value,
  minimum,
  maximum,
  disabled = false,
  onChange,
}: StudioBoundedNumberInputProps) {
  const [draft, setDraft] = useState(value);

  useEffect(() => setDraft(value), [value]);

  function commit(nextDraft: string) {
    const authored = authoredNumber(nextDraft);
    if (authored === null) {
      setDraft(value);
      return;
    }
    let numeric = Number(authored);
    if (typeof minimum === 'number') numeric = Math.max(minimum, numeric);
    if (typeof maximum === 'number') numeric = Math.min(maximum, numeric);
    const normalized = String(numeric);
    setDraft(normalized);
    onChange(normalized);
  }

  return (
    <input
      id={id}
      type="text"
      inputMode="decimal"
      disabled={disabled}
      aria-label={label}
      value={draft}
      onChange={(event) => {
        const nextDraft = event.target.value;
        setDraft(nextDraft);
        if (authoredNumber(nextDraft) !== null) commit(nextDraft);
      }}
      onBlur={() => commit(draft)}
      onKeyDown={(event) => {
        if (event.key === 'Enter') event.currentTarget.blur();
        if (event.key === 'Escape') {
          setDraft(value);
          event.currentTarget.blur();
        }
      }}
    />
  );
}

interface StudioShadowColorInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}

function StudioShadowColorInput({ id, label, value, onChange }: StudioShadowColorInputProps) {
  const [draft, setDraft] = useState(value);

  useEffect(() => setDraft(value), [value]);

  function commit(nextDraft: string) {
    const normalized = normalizedHexColor(nextDraft);
    if (!normalized) {
      setDraft(value);
      return;
    }
    setDraft(normalized);
    onChange(normalized);
  }

  return (
    <>
      <input
        className="docs-studio__shadow-color-swatch"
        type="color"
        value={value}
        aria-label={`Pick ${label.toLowerCase()}`}
        onInput={(event) => onChange(event.currentTarget.value)}
      />
      <input
        id={id}
        className="docs-studio__shadow-color-text"
        type="text"
        value={draft}
        aria-label={label}
        spellCheck="false"
        onChange={(event) => {
          const nextDraft = event.target.value;
          setDraft(nextDraft);
          if (normalizedHexColor(nextDraft)) commit(nextDraft);
        }}
        onBlur={() => commit(draft)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') event.currentTarget.blur();
          if (event.key === 'Escape') {
            setDraft(value);
            event.currentTarget.blur();
          }
        }}
      />
    </>
  );
}

interface StudioShadowEditorProps {
  id: string;
  label: string;
  token: string;
  value: string;
  shadow: StudioShadowValue;
  onChange: (value: string) => void;
}

function StudioShadowEditor({ id, label, token, value, shadow, onChange }: StudioShadowEditorProps) {
  function changeLength(name: StudioShadowLengthName, number: string) {
    onChange(serializeShadowValue({
      ...shadow,
      [name]: { ...shadow[name], number },
    }));
  }

  function changeColor(color: string) {
    onChange(serializeShadowValue({ ...shadow, color }));
  }

  function changeOpacity(opacity: string) {
    onChange(serializeShadowValue({ ...shadow, opacity }));
  }

  const lengthFields: Array<{
    name: StudioShadowLengthName;
    label: string;
    minimum?: number;
  }> = [
    { name: 'x', label: 'X' },
    { name: 'y', label: 'Y' },
    { name: 'blur', label: 'Blur', minimum: 0 },
    { name: 'spread', label: 'Spread' },
  ];

  return (
    <fieldset className="docs-studio__shadow-editor">
      <legend className="visually-hidden">{label}</legend>
      <div className="docs-studio__shadow-header">
        <span
          className="docs-studio__shadow-sample"
          aria-hidden="true"
          style={{ boxShadow: value }}
        />
        <span className="docs-studio__token-name" title={token}>{formatTokenName(token)}</span>
      </div>
      {lengthFields.map((field) => (
        <label className="docs-studio__shadow-field" key={field.name} htmlFor={`${id}-${field.name}`}>
          <span className="docs-studio__shadow-field-label">{field.label}</span>
          <StudioBoundedNumberInput
            id={`${id}-${field.name}`}
            label={`${label} ${field.label}`}
            value={shadow[field.name].number}
            minimum={field.minimum}
            onChange={(number) => changeLength(field.name, number)}
          />
          <span className="docs-studio__token-unit">{shadow[field.name].unit}</span>
        </label>
      ))}
      <div className="docs-studio__shadow-field">
        <label className="docs-studio__shadow-field-label" htmlFor={`${id}-color`}>Color</label>
        <StudioShadowColorInput
          id={`${id}-color`}
          label={`${label} color`}
          value={shadow.color}
          onChange={changeColor}
        />
      </div>
      <label className="docs-studio__shadow-field" htmlFor={`${id}-opacity`}>
        <span className="docs-studio__shadow-field-label">Opacity</span>
        <StudioBoundedNumberInput
          id={`${id}-opacity`}
          label={`${label} opacity`}
          value={shadow.opacity}
          minimum={0}
          maximum={100}
          onChange={changeOpacity}
        />
        <span className="docs-studio__token-unit">%</span>
      </label>
    </fieldset>
  );
}

function getSlotComposition(
  control: StudioControl,
  contract: ComponentContract,
  values: StudioPropertyValues
): string {
  const properties = (control.properties ?? [])
    .map((name) => contract.properties?.find((property) => property.name === name))
    .filter((property): property is ContractProperty => Boolean(property));
  const slots = properties.filter((property) => property.type === 'slot');
  const boolean = properties.find((property) => property.type === 'boolean');

  if (boolean && values[boolean.name] === true) return 'icon-only';
  const leading = slots[0] ? values[slots[0].name] === true : false;
  const trailing = slots[1] ? values[slots[1].name] === true : false;
  if (leading && trailing) return 'both';
  if (leading) return 'leading';
  if (trailing) return 'trailing';
  return 'none';
}

function slotCompositionValues(
  control: StudioControl,
  contract: ComponentContract,
  composition: string
): StudioPropertyValues {
  const properties = (control.properties ?? [])
    .map((name) => contract.properties?.find((property) => property.name === name))
    .filter((property): property is ContractProperty => Boolean(property));
  const slots = properties.filter((property) => property.type === 'slot');
  const boolean = properties.find((property) => property.type === 'boolean');
  const next: StudioPropertyValues = {};

  for (const property of properties) next[property.name] = false;
  if (slots[0] && ['leading', 'both', 'icon-only'].includes(composition)) next[slots[0].name] = true;
  if (slots[1] && ['trailing', 'both'].includes(composition)) next[slots[1].name] = true;
  if (boolean) next[boolean.name] = composition === 'icon-only';
  return next;
}

interface StudioIconPickerProps {
  id: string;
  value: string;
  allowNone?: boolean;
  onChange: (iconName: string) => void;
}

function StudioIconPicker({ id, value, allowNone = false, onChange }: StudioIconPickerProps) {
  const Icon = getStudioLucideIcon(value);
  return (
    <div className="docs-studio__icon-field">
      {Icon && <Icon className="docs-studio__icon-preview" aria-hidden="true" />}
      <select
        id={id}
        className="select__field docs-studio__select docs-studio__icon-select"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {allowNone && <option value="">None</option>}
        {studioLucideIcons.map((option) => (
          <option key={option.name} value={option.name}>{option.label}</option>
        ))}
      </select>
    </div>
  );
}

export default function StudioInspector({
  definition,
  contract,
  values,
  slotIconValues,
  stateValue,
  tokenValues,
  activeTokens,
  fixtureControlsByGroup,
  onPropertiesChange,
  onSlotIconChange,
  onStateChange,
  onTokenChange,
  onReset,
}: StudioInspectorProps) {
  const baseId = useId();
  const propertiesByName = Object.fromEntries(
    (contract.properties ?? []).map((property) => [property.name, property])
  ) as Record<string, ContractProperty>;

  function renderPropertyControl(control: StudioControl) {
    const propertyName = control.properties?.[0];
    const property = propertyName ? propertiesByName[propertyName] : undefined;
    const id = `${baseId}-${control.id}`;

    if (control.kind === 'text' && property) {
      return (
        <input
          id={id}
          className="input__field docs-studio__input"
          type="text"
          value={fieldValue(values[property.name])}
          onChange={(event) => onPropertiesChange({ [property.name]: event.target.value })}
        />
      );
    }

    if (control.kind === 'collection' && property?.type === 'string-list') {
      const selectedValues = Array.isArray(values[property.name])
        ? values[property.name] as string[]
        : [];
      return (
        <span id={id} className="docs-studio__collection-value">
          {selectedValues.length > 0 ? selectedValues.join(', ') : 'None'}
        </span>
      );
    }

    if (control.kind === 'number' && property) {
      const value = values[property.name];
      return (
        <input
          id={id}
          className="input__field docs-studio__input"
          type="number"
          inputMode="numeric"
          min={property.minimum}
          max={property.maximum}
          step={property.step ?? 1}
          value={typeof value === 'number' ? value : ''}
          placeholder={property.unsetBehavior ? 'None' : undefined}
          onChange={(event) => {
            if (event.target.value === '') {
              onPropertiesChange({ [property.name]: null });
              return;
            }
            const parsed = Number(event.target.value);
            onPropertiesChange({
              [property.name]: Number.isFinite(parsed)
                ? normalizedNumber(parsed, property)
                : null,
            });
          }}
        />
      );
    }

    if (control.kind === 'select' && property) {
      const options = propertyOptions(contract, property);
      return (
        <select
          id={id}
          className="select__field docs-studio__select"
          value={fieldValue(values[property.name])}
          onChange={(event) => onPropertiesChange({
            [property.name]: event.target.value || null,
          })}
        >
          {property.unsetBehavior && <option value="">Auto</option>}
          {options.map((option) => (
            <option key={option} value={option}>
              {control.optionLabels?.[option] ?? humanize(option)}
            </option>
          ))}
        </select>
      );
    }

    if (control.kind === 'segmented' && property) {
      const options = propertyOptions(contract, property);
      if (options.length > 4) {
        return (
          <select
            id={id}
            className="select__field docs-studio__select"
            value={fieldValue(values[property.name])}
            onChange={(event) => onPropertiesChange({
              [property.name]: event.target.value || null,
            })}
          >
            {options.map((option) => (
              <option key={option} value={option}>
                {control.optionLabels?.[option] ?? humanize(option)}
              </option>
            ))}
          </select>
        );
      }

      return (
        <SegmentedControlArtwork
          className="docs-studio__segmented"
          groupLabel={control.label}
          legendClassName="visually-hidden"
          name={id}
          options={options.map((option) => ({
            label: control.optionLabels?.[option] ?? humanize(option),
            value: option,
            itemClassName: 'docs-studio__segment',
            labelClassName: 'docs-studio__segment-label',
          }))}
          value={fieldValue(values[property.name])}
          optionsClassName="docs-studio__segmented-options"
          onValueChange={(value) => onPropertiesChange({ [property.name]: value })}
        />
      );
    }

    if (control.kind === 'state') {
      return (
        <select
          id={id}
          className="select__field docs-studio__select"
          value={stateValue}
          onChange={(event) => onStateChange(event.target.value)}
        >
          {contract.states.map((state) => (
            <option key={state.name} value={state.name}>
              {control.optionLabels?.[state.name] ?? humanize(state.name)}
            </option>
          ))}
        </select>
      );
    }

    if (control.kind === 'icon' && property?.type === 'slot' && control.iconCatalogue) {
      return (
        <StudioIconPicker
          id={id}
          value={slotIconValues.leading}
          allowNone={!property.required}
          onChange={(iconName) => {
            onSlotIconChange('leading', iconName);
            onPropertiesChange({ [property.name]: Boolean(iconName) });
          }}
        />
      );
    }

    if (control.kind === 'slot-composition') {
      const controlledProperties = (control.properties ?? [])
        .map((name) => contract.properties?.find((property) => property.name === name))
        .filter((property): property is ContractProperty => Boolean(property));
      const simpleSlot = controlledProperties.length === 1
        && controlledProperties[0].type === 'slot'
        && !control.iconCatalogue;

      if (simpleSlot) {
        const slot = controlledProperties[0];
        return (
          <label className="switch switch--sm docs-studio__switch" htmlFor={id}>
            <input
              id={id}
              className="switch__input"
              type="checkbox"
              checked={slot.required || values[slot.name] === true}
              disabled={slot.required}
              onChange={(event) => onPropertiesChange({ [slot.name]: event.target.checked })}
            />
            <span className="switch__track" aria-hidden="true">
              <span className="switch__thumb" />
            </span>
          </label>
        );
      }

      const composition = getSlotComposition(control, contract, values);
      const supportsIconOnly = (control.properties ?? []).some((name) => (
        contract.properties?.find((property) => property.name === name)?.type === 'boolean'
      ));
      return (
        <select
          id={id}
          className="select__field docs-studio__select"
          value={composition}
          onChange={(event) => onPropertiesChange(
            slotCompositionValues(control, contract, event.target.value)
          )}
        >
          <option value="none">None</option>
          <option value="leading">Leading</option>
          <option value="trailing">Trailing</option>
          <option value="both">Both</option>
          {supportsIconOnly && <option value="icon-only">Icon only</option>}
        </select>
      );
    }

    if (control.kind === 'toggle' && property) {
      return (
        <label className="switch switch--sm docs-studio__switch" htmlFor={id}>
          <input
            id={id}
            className="switch__input"
            type="checkbox"
            checked={values[property.name] === true}
            onChange={(event) => onPropertiesChange({ [property.name]: event.target.checked })}
          />
          <span className="switch__track" aria-hidden="true">
            <span className="switch__thumb" />
          </span>
        </label>
      );
    }

    return null;
  }

  function renderTokenControl(control: StudioControl) {
    const id = `${baseId}-${control.id}`;
    const tokens = control.tokens?.names ?? [];

    if (control.kind === 'token' && control.tokens?.category === 'shadow') {
      const token = tokens[0];
      const value = tokenValues[token] ?? '';
      const shadow = parseShadowValue(value);
      if (shadow) {
        return (
          <StudioShadowEditor
            id={id}
            label={control.label}
            token={token}
            value={value}
            shadow={shadow}
            onChange={(nextValue) => onTokenChange(token, nextValue)}
          />
        );
      }
    }

    if (control.kind === 'token-pair') {
      return (
        <div className="docs-studio__token-pair">
          {tokens.map((token, index) => {
            const value = tokenValues[token] ?? '';
            const numeric = splitNumericValue(token, value);
            return (
              <label className="docs-studio__number-field" key={token} htmlFor={`${id}-${index}`}>
                <span aria-hidden="true">{index === 0 ? 'X' : 'Y'}</span>
                <StudioTokenInput
                  id={`${id}-${index}`}
                  label={`${control.label} ${index === 0 ? 'horizontal' : 'vertical'}`}
                  token={token}
                  value={value}
                  onChange={(nextValue) => onTokenChange(token, nextValue)}
                />
                {numeric?.unit && <span className="docs-studio__token-unit">{numeric.unit}</span>}
              </label>
            );
          })}
        </div>
      );
    }

    if (control.kind === 'token') {
      const token = tokens[0];
      const value = tokenValues[token] ?? '';
      const numeric = splitNumericValue(token, value);
      return (
        <label className="docs-studio__token-field" htmlFor={id}>
          <StudioTokenInput
            id={id}
            label={control.label}
            token={token}
            value={value}
            onChange={(nextValue) => onTokenChange(token, nextValue)}
          />
          <span className="docs-studio__token-name" title={token}>{formatTokenName(token)}</span>
          {numeric?.unit && <span className="docs-studio__token-unit">{numeric.unit}</span>}
        </label>
      );
    }

    if (control.kind === 'token-swatch') {
      // Explicit state mappings (including null) win. A fixed one-token swatch
      // can otherwise resolve directly from metadata without renderer glue.
      const token = Object.prototype.hasOwnProperty.call(activeTokens, control.id)
        ? activeTokens[control.id]
        : tokens.length === 1 ? tokens[0] : null;
      const value = token ? tokenValues[token] ?? '' : 'transparent';
      const color = parseStudioColor(value);
      if (token && !color) {
        return (
          <label className="docs-studio__token-field docs-studio__color-expression" htmlFor={id}>
            <span className="docs-studio__color-chip" aria-hidden="true">
              <span className="docs-studio__color-sample" style={{ backgroundColor: value }} />
            </span>
            <StudioTokenInput id={id} label={`${control.label} color`} token={token} value={value}
              onChange={(nextValue) => onTokenChange(token, nextValue)} />
            <span className="docs-studio__token-name" title={token}>{formatTokenName(token)}</span>
          </label>
        );
      }
      const opacity = Number(((color?.alpha ?? 0) * 100).toFixed(6));
      return (
        <div className="docs-studio__swatch-field">
          <span className="docs-studio__color-chip">
            <span className="docs-studio__color-sample" aria-hidden="true" style={{ backgroundColor: value }} />
            <input
              id={id}
              type="color"
              value={color?.hex ?? '#000000'}
              aria-label={`Change ${control.label.toLowerCase()} color`}
              disabled={!token}
              onInput={(event) => {
                const next = parseStudioColor(event.currentTarget.value);
                if (token && color && next) {
                  onTokenChange(token, serializeStudioColor({ ...next, alpha: color.alpha }));
                }
              }}
            />
          </span>
          <span className="docs-studio__token-name" title={token ?? 'No public token for this combination'}>
            {token ? formatTokenName(token) : 'transparent'}
          </span>
          <span className="docs-studio__color-opacity">
            <StudioBoundedNumberInput
              id={`${id}-opacity`}
              label={`${control.label} opacity`}
              value={String(opacity)}
              minimum={0}
              maximum={100}
              disabled={!token}
              onChange={(nextOpacity) => {
                if (token && color && Number(nextOpacity) !== opacity) {
                  onTokenChange(token, serializeStudioColor({ ...color, alpha: Number(nextOpacity) / 100 }));
                }
              }}
            />
            <span className="docs-studio__token-unit">%</span>
          </span>
        </div>
      );
    }

    return null;
  }

  function renderSlotIconControls(control: StudioControl) {
    if (control.kind !== 'slot-composition' || !control.iconCatalogue) return null;

    const composition = getSlotComposition(control, contract, values);
    const showLeading = ['leading', 'both', 'icon-only'].includes(composition);
    const showTrailing = ['trailing', 'both'].includes(composition);

    return (
      <>
        {showLeading && (
          <div className="docs-studio__control">
            <label htmlFor={`${baseId}-${control.id}-leading`}>
              {composition === 'icon-only' ? 'Icon' : 'Leading'}
            </label>
            <div className="docs-studio__control-value">
              <StudioIconPicker
                id={`${baseId}-${control.id}-leading`}
                value={slotIconValues.leading}
                onChange={(iconName) => onSlotIconChange('leading', iconName)}
              />
            </div>
          </div>
        )}
        {showTrailing && (
          <div className="docs-studio__control">
            <label htmlFor={`${baseId}-${control.id}-trailing`}>Trailing</label>
            <div className="docs-studio__control-value">
              <StudioIconPicker
                id={`${baseId}-${control.id}-trailing`}
                value={slotIconValues.trailing}
                onChange={(iconName) => onSlotIconChange('trailing', iconName)}
              />
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <aside className="docs-studio__inspector" aria-label={`${contract.name} customization`}>
      <header className="docs-studio__inspector-header">
        <h2>Customize</h2>
        <button
          className="docs-studio__reset"
          type="button"
          aria-label="Reset customization"
          title="Reset customization"
          onClick={onReset}
        >
          <RotateCcw aria-hidden="true" />
        </button>
      </header>

      <div className="docs-studio__sections">
        {definition.groups.map((group) => {
          const controls = group.controls.filter((control) => {
            if (!control.visibleWhen) return true;
            return values[control.visibleWhen.property] === control.visibleWhen.equals;
          });
          if (controls.length === 0) return null;

          return (
            <section className="docs-studio__section" key={group.id}>
              <h3>{group.label}</h3>
              <div className="docs-studio__controls">
                {controls.map((control) => {
                  const id = `${baseId}-${control.id}`;
                  const propertyName = control.properties?.[0];
                  const property = propertyName ? propertiesByName[propertyName] : undefined;
                  const segmentedOptionCount = control.kind === 'segmented' && property
                    ? propertyOptions(contract, property).length
                    : 0;
                  const segmentedRendersAsSelect = control.kind === 'segmented'
                    && segmentedOptionCount > 4;
                  const groupedControl = (
                    control.kind === 'segmented' && !segmentedRendersAsSelect
                  ) || control.kind === 'collection'
                    || control.kind === 'token-pair'
                    || control.tokens?.category === 'shadow';
                  return (
                    <div className="docs-studio__control-group" key={control.id}>
                      <div className="docs-studio__control">
                        {groupedControl
                          ? (
                            <span aria-hidden={(
                              control.kind === 'segmented' || control.tokens?.category === 'shadow'
                            ) ? 'true' : undefined}>
                              {control.label}
                            </span>
                          )
                          : <label htmlFor={id}>{control.label}</label>}
                        <div className="docs-studio__control-value">
                          {control.kind === 'state' || control.properties
                            ? renderPropertyControl(control)
                            : renderTokenControl(control)}
                        </div>
                      </div>
                      {renderSlotIconControls(control)}
                    </div>
                  );
                })}
                {fixtureControlsByGroup?.[group.id]}
              </div>
            </section>
          );
        })}
      </div>
    </aside>
  );
}
