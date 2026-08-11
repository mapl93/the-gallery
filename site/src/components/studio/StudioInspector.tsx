import { useId } from 'react';
import { RotateCcw } from 'lucide-react';
import type { ComponentContract, ContractProperty } from '../../lib/contracts';
import type { StudioControl, StudioDefinition } from '../../lib/studio';
import { getStudioLucideIcon, studioLucideIcons } from './lucideCatalogue';

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
    .replace(/^--(?:color|space|radius|typo|transition|easing)-/, '')
    .replace(/-/g, '/');
}

function splitNumericValue(value: string): { number: string; unit: string } {
  const match = value.trim().match(/^(-?(?:\d+|\d*\.\d+))([a-z%]+)$/i);
  return match ? { number: match[1], unit: match[2] } : { number: value, unit: '' };
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
      return (
        <div
          className="segmented docs-studio__segmented"
          role="radiogroup"
          aria-label={control.label}
          style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}
        >
          {options.map((option) => {
            const optionId = `${id}-${option}`;
            return (
              <label className="segmented__item docs-studio__segment" key={option} htmlFor={optionId}>
                <input
                  id={optionId}
                  className="segmented__input"
                  type="radio"
                  name={id}
                  value={option}
                  checked={values[property.name] === option}
                  onChange={() => onPropertiesChange({ [property.name]: option })}
                />
                <span className="segmented__label docs-studio__segment-label">
                  {control.optionLabels?.[option] ?? humanize(option)}
                </span>
              </label>
            );
          })}
        </div>
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

    if (control.kind === 'token-pair') {
      return (
        <div className="docs-studio__token-pair">
          {tokens.map((token, index) => {
            const current = splitNumericValue(tokenValues[token] ?? '');
            return (
              <label className="docs-studio__number-field" key={token} htmlFor={`${id}-${index}`}>
                <span aria-hidden="true">{index === 0 ? 'X' : 'Y'}</span>
                <input
                  id={`${id}-${index}`}
                  type="text"
                  inputMode="decimal"
                  value={current.number}
                  aria-label={`${control.label} ${index === 0 ? 'horizontal' : 'vertical'}`}
                  onChange={(event) => onTokenChange(
                    token,
                    `${event.target.value}${current.unit}`
                  )}
                />
              </label>
            );
          })}
        </div>
      );
    }

    if (control.kind === 'token') {
      const token = tokens[0];
      const current = splitNumericValue(tokenValues[token] ?? '');
      return (
        <label className="docs-studio__token-field" htmlFor={id}>
          <input
            id={id}
            type="text"
            inputMode="decimal"
            value={current.number}
            aria-label={control.label}
            onChange={(event) => onTokenChange(token, `${event.target.value}${current.unit}`)}
          />
          <span title={token}>{formatTokenName(token)}</span>
        </label>
      );
    }

    if (control.kind === 'token-swatch') {
      const token = activeTokens[control.id] ?? null;
      const value = token ? tokenValues[token] ?? '' : 'transparent';
      const transparent = value.trim() === 'transparent' || !token;
      return (
        <div className="docs-studio__swatch-field" data-transparent={transparent || undefined}>
          <input
            id={id}
            type="color"
            value={toColorInputValue(value)}
            aria-label={`Change ${control.label.toLowerCase()} color`}
            disabled={!token}
            onInput={(event) => {
              if (token) onTokenChange(token, event.currentTarget.value);
            }}
          />
          <span title={token ?? 'No public token for this combination'}>
            {token ? formatTokenName(token) : 'transparent'}
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
                const groupedControl = control.kind === 'segmented'
                  || control.kind === 'collection'
                  || control.kind === 'token-pair';
                return (
                  <div className="docs-studio__control-group" key={control.id}>
                    <div className="docs-studio__control">
                      {groupedControl
                        ? <span>{control.label}</span>
                        : <label htmlFor={id}>{control.label}</label>}
                      <div className="docs-studio__control-value">
                        {control.properties
                          ? renderPropertyControl(control)
                          : renderTokenControl(control)}
                      </div>
                    </div>
                    {renderSlotIconControls(control)}
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
    </aside>
  );
}
