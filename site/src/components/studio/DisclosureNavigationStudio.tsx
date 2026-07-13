import { useEffect, useMemo, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import { ChevronDown } from 'lucide-react';
import type { ComponentContract, ContractProperty } from '../../lib/contracts';
import type { StudioControl, StudioDefinition } from '../../lib/studio';
import StudioInspector, {
  type StudioPropertyValue,
  type StudioPropertyValues,
  type StudioSlotIconValues,
} from './StudioInspector';

interface DisclosureNavigationStudioProps {
  contract: ComponentContract;
  definition: StudioDefinition;
}

const emptySlotIcons: StudioSlotIconValues = { leading: '', trailing: '' };

const accordionItems = [
  ['Materials', 'Stoneware clay, mineral glaze, and hand-finished details.'],
  ['Dimensions', 'Twenty-four centimeters high and eighteen centimeters wide.'],
  ['Care', 'Clean with a soft damp cloth and avoid abrasive products.'],
];

const tabItems = [
  ['Overview', 'A hand-thrown vessel shaped through a slow, iterative studio process.'],
  ['Details', 'Satin celadon glaze, signed base, and one-of-one variation.'],
  ['Shipping', 'Packed in the studio and dispatched within three business days.'],
];

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
  if (slug === 'tooltip') return { label: 'View material details' };
  if (slug === 'accordion') return { expanded: true };
  if (slug === 'tabs') return { selected: true };
  if (slug === 'breadcrumb') return { label: 'Breadcrumb', currentLabel: 'Stoneware vessel' };
  return {};
}

export default function DisclosureNavigationStudio({
  contract,
  definition,
}: DisclosureNavigationStudioProps) {
  const initialValues = useMemo<StudioPropertyValues>(() => ({
    ...Object.fromEntries((contract.properties ?? []).map((property) => (
      [property.name, defaultValue(contract, property)]
    ))),
    ...fixtureValues(contract.slug),
  }), [contract]);
  const studioTokens = useMemo(() => [...new Set(definition.groups.flatMap((group) => (
    group.controls.flatMap((control) => resolveTokens(control, contract))
  )))], [definition, contract]);
  const [values, setValues] = useState<StudioPropertyValues>(initialValues);
  const [baseTokenValues, setBaseTokenValues] = useState<Record<string, string>>({});
  const [tokenOverrides, setTokenOverrides] = useState<Record<string, string>>({});
  const [expandedItems, setExpandedItems] = useState<boolean[]>([true, false, false]);
  const [activeTab, setActiveTab] = useState(1);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

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
    if (contract.slug === 'accordion') {
      setExpandedItems((current) => [values.expanded === true, ...current.slice(1)]);
    }
    if (contract.slug === 'tabs') setActiveTab(values.selected === true ? 1 : 0);
  }, [contract.slug, values.expanded, values.selected]);

  const tokenValues = { ...baseTokenValues, ...tokenOverrides };

  function setProperties(next: StudioPropertyValues) {
    setValues((current) => ({ ...current, ...next }));
  }

  function reset() {
    setValues({ ...initialValues });
    setExpandedItems([true, false, false]);
    setActiveTab(1);
    setTokenOverrides({});
  }

  function toggleAccordion(index: number) {
    setExpandedItems((current) => {
      const next = current.map((expanded, itemIndex) => itemIndex === index ? !expanded : expanded);
      if (index === 0) setValues((valuesCurrent) => ({ ...valuesCurrent, expanded: next[0] }));
      return next;
    });
  }

  function selectTab(index: number) {
    setActiveTab(index);
    setValues((current) => ({ ...current, selected: index === 1 }));
  }

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex = index;
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabItems.length;
    else if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabItems.length) % tabItems.length;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = tabItems.length - 1;
    else return;
    event.preventDefault();
    selectTab(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  }

  function renderPreview() {
    if (contract.slug === 'tooltip') {
      return (
        <button className="btn btn--outline tooltip docs-studio__preview-tooltip" type="button" aria-label={String(values.label || '')}>
          Material details
        </button>
      );
    }

    if (contract.slug === 'accordion') {
      return (
        <div className="accordion docs-studio__preview-accordion">
          {accordionItems.map(([title, content], index) => {
            const expanded = expandedItems[index];
            const triggerId = `studio-accordion-trigger-${index}`;
            const panelId = `studio-accordion-panel-${index}`;
            return (
              <div className="accordion__item" key={title}>
                <button
                  className="accordion__trigger"
                  id={triggerId}
                  type="button"
                  aria-expanded={expanded}
                  aria-controls={panelId}
                  onClick={() => toggleAccordion(index)}
                >
                  <span>{title}</span>
                  <ChevronDown className="accordion__icon" aria-hidden="true" />
                </button>
                <div className="accordion__panel" id={panelId} role="region" aria-labelledby={triggerId}>
                  <div className="accordion__panel-inner">
                    <div className="accordion__content">{content}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    if (contract.slug === 'tabs') {
      return (
        <div className="tabs docs-studio__preview-tabs">
          <div className="tabs__list" role="tablist" aria-label="Artwork details">
            {tabItems.map(([label], index) => (
              <button
                className="tabs__tab"
                id={`studio-tab-${index}`}
                key={label}
                ref={(element) => { tabRefs.current[index] = element; }}
                type="button"
                role="tab"
                aria-selected={activeTab === index}
                aria-controls={`studio-panel-${index}`}
                tabIndex={activeTab === index ? 0 : -1}
                onClick={() => selectTab(index)}
                onKeyDown={(event) => handleTabKeyDown(event, index)}
              >
                {label}
              </button>
            ))}
          </div>
          {tabItems.map(([label, content], index) => (
            <div
              className="tabs__panel"
              id={`studio-panel-${index}`}
              key={label}
              role="tabpanel"
              aria-labelledby={`studio-tab-${index}`}
              hidden={activeTab !== index}
            >
              <p>{content}</p>
            </div>
          ))}
        </div>
      );
    }

    return (
      <nav className="breadcrumb docs-studio__preview-breadcrumb" aria-label={String(values.label || 'Breadcrumb')}>
        <span className="breadcrumb__item"><a className="breadcrumb__link" href="#studio-home">Home</a></span>
        <span className="breadcrumb__separator" aria-hidden="true">/</span>
        <span className="breadcrumb__item"><a className="breadcrumb__link" href="#studio-collection">Collection</a></span>
        <span className="breadcrumb__separator" aria-hidden="true">/</span>
        <span className="breadcrumb__current" aria-current="page">{String(values.currentLabel || '')}</span>
      </nav>
    );
  }

  const activeTokens: Record<string, string | null> = contract.slug === 'tooltip'
    ? {
        surface: '--color-surface-statement',
        text: '--color-text-inverse',
        radius: '--radius-sm',
        transition: '--transition-fast',
        typography: '--typo-body-size',
      }
    : contract.slug === 'accordion'
      ? {
          surface: '--color-surface-primary',
          hover: '--color-surface-secondary',
          text: '--color-text-primary',
          secondary: '--color-text-secondary',
          border: '--color-border-subtle',
          focus: '--color-border-focus',
          radius: '--radius-md',
          spacing: '--space-layout-element-gap',
        }
      : contract.slug === 'tabs'
        ? {
            text: '--color-text-secondary',
            hover: '--color-text-primary',
            'selected-color': '--color-text-accent',
            border: '--color-border-subtle',
            focus: '--color-border-focus',
            spacing: '--space-layout-element-gap',
          }
        : {
            text: '--color-text-secondary',
            hover: '--color-text-accent',
            separator: '--color-text-disabled',
            current: '--color-text-primary',
            spacing: '--space-layout-element-gap',
          };

  return (
    <div className="docs-studio">
      <h1 className="docs-studio__title">{contract.name}</h1>
      <div className="docs-studio__workspace">
        <StudioInspector
          definition={definition}
          contract={contract}
          values={values}
          slotIconValues={emptySlotIcons}
          stateValue="default"
          tokenValues={tokenValues}
          activeTokens={activeTokens}
          onPropertiesChange={setProperties}
          onSlotIconChange={() => undefined}
          onStateChange={() => undefined}
          onTokenChange={(token, value) => setTokenOverrides((current) => ({ ...current, [token]: value }))}
          onReset={reset}
        />

        <section
          className="docs-studio__stage"
          aria-label={`${contract.name} preview`}
          style={tokenOverrides as CSSProperties}
        >
          <div className="docs-studio__stage-inner">{renderPreview()}</div>
        </section>
      </div>
    </div>
  );
}
