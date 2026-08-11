import { useEffect, useId, useMemo, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import type { ComponentContract, ContractProperty } from '../../lib/contracts';
import type { StudioControl, StudioDefinition } from '../../lib/studio';
import AccordionArtwork from './AccordionArtwork';
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
  if (slug === 'tooltip') return { content: 'View material details', trigger: true, open: false };
  if (slug === 'accordion') return { items: true, expanded: true, disabled: false };
  if (slug === 'tabs') return {
    label: 'Artwork details',
    items: true,
    selected: true,
    activationMode: 'automatic',
    disabled: false,
  };
  if (slug === 'breadcrumb') return { label: 'Breadcrumb', currentLabel: 'Stoneware vessel' };
  return {};
}

export default function DisclosureNavigationStudio({
  contract,
  definition,
}: DisclosureNavigationStudioProps) {
  const uid = useId().replace(/:/g, '');
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
  const [tooltipDismissed, setTooltipDismissed] = useState(false);
  const [tooltipEngaged, setTooltipEngaged] = useState(false);
  const [expandedItems, setExpandedItems] = useState<boolean[]>([true, false, false]);
  const [activeTab, setActiveTab] = useState(1);
  const [rovingTab, setRovingTab] = useState(1);
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
    if (contract.slug === 'tabs') {
      const next = values.selected === true ? 1 : 0;
      setActiveTab(next);
      setRovingTab(next);
    }
  }, [contract.slug, values.expanded, values.selected]);

  useEffect(() => {
    if (contract.slug !== 'tabs' || values.disabled !== true) return;
    if (activeTab === 2) setActiveTab(0);
    if (rovingTab === 2) setRovingTab(activeTab === 2 ? 0 : activeTab);
  }, [activeTab, contract.slug, rovingTab, values.disabled]);

  useEffect(() => {
    if (contract.slug !== 'tooltip' || (!tooltipEngaged && values.open !== true)) return;
    const dismiss = (event: globalThis.KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      event.preventDefault();
      setTooltipDismissed(true);
    };
    window.addEventListener('keydown', dismiss);
    return () => window.removeEventListener('keydown', dismiss);
  }, [contract.slug, tooltipEngaged, values.open]);

  useEffect(() => {
    if (contract.slug === 'tooltip' && values.open === true) setTooltipDismissed(false);
  }, [contract.slug, values.open]);

  const tokenValues = { ...baseTokenValues, ...tokenOverrides };

  function setProperties(next: StudioPropertyValues) {
    setValues((current) => ({ ...current, ...next }));
  }

  function reset() {
    setValues({ ...initialValues });
    setTooltipDismissed(false);
    setTooltipEngaged(false);
    setExpandedItems([true, false, false]);
    setActiveTab(1);
    setRovingTab(1);
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
    setRovingTab(index);
  }

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const activationMode = String(values.activationMode || 'automatic');
    if ((event.key === 'Enter' || event.key === ' ') && activationMode === 'manual') {
      event.preventDefault();
      selectTab(index);
      return;
    }

    const enabledIndexes = tabItems
      .map((_, itemIndex) => itemIndex)
      .filter((itemIndex) => !(values.disabled === true && itemIndex === 2));
    const currentPosition = enabledIndexes.indexOf(index);
    const direction = getComputedStyle(event.currentTarget).direction;
    const forward = direction === 'rtl' ? -1 : 1;
    let nextPosition = currentPosition;
    if (event.key === 'ArrowRight') nextPosition = currentPosition + forward;
    else if (event.key === 'ArrowLeft') nextPosition = currentPosition - forward;
    else if (event.key === 'Home') nextPosition = 0;
    else if (event.key === 'End') nextPosition = enabledIndexes.length - 1;
    else return;
    event.preventDefault();
    const nextIndex = enabledIndexes[(nextPosition + enabledIndexes.length) % enabledIndexes.length];
    setRovingTab(nextIndex);
    if (activationMode === 'automatic') setActiveTab(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  }

  function renderPreview() {
    if (contract.slug === 'tooltip') {
      const contentId = `studio-tooltip-${uid}`;
      return (
        <span
          className={[
            'tooltip',
            'docs-studio__preview-tooltip',
            values.open === true ? 'is-open' : '',
            tooltipDismissed ? 'is-dismissed' : '',
          ].filter(Boolean).join(' ')}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
              setTooltipDismissed(false);
              setTooltipEngaged(false);
            }
          }}
          onFocusCapture={() => setTooltipEngaged(true)}
          onKeyDown={(event) => {
            if (event.key === 'Escape') {
              event.preventDefault();
              setTooltipDismissed(true);
            }
          }}
          onMouseEnter={() => setTooltipEngaged(true)}
          onMouseLeave={() => {
            setTooltipDismissed(false);
            setTooltipEngaged(false);
          }}
        >
          <button
            className="btn btn--outline tooltip__trigger"
            type="button"
            aria-describedby={contentId}
          >
            Material details
          </button>
          <span className="tooltip__content" id={contentId} role="tooltip">
            {String(values.content || '')}
          </span>
        </span>
      );
    }

    if (contract.slug === 'accordion') {
      return (
        <AccordionArtwork
          className="docs-studio__preview-accordion"
          idPrefix={`studio-accordion-${uid}`}
          items={accordionItems.map(([title, content], index) => ({
            key: title,
            title,
            content,
            disabled: index === 0 && values.disabled === true,
          }))}
          expandedItems={expandedItems}
          onToggle={toggleAccordion}
          headingLevel={3}
          regionPanels
        />
      );
    }

    if (contract.slug === 'tabs') {
      const activationMode = String(values.activationMode || 'automatic');
      return (
        <div className="tabs docs-studio__preview-tabs" data-activation={activationMode}>
          <div
            className="tabs__list"
            role="tablist"
            aria-label={String(values.label || '')}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setRovingTab(activeTab);
            }}
          >
            {tabItems.map(([label], index) => (
              <button
                className="tabs__tab"
                id={`studio-tab-${uid}-${index}`}
                key={label}
                ref={(element) => { tabRefs.current[index] = element; }}
                type="button"
                role="tab"
                aria-selected={activeTab === index}
                aria-controls={`studio-panel-${uid}-${index}`}
                tabIndex={rovingTab === index ? 0 : -1}
                disabled={values.disabled === true && index === 2}
                onClick={() => selectTab(index)}
                onFocus={() => {
                  setRovingTab(index);
                  if (activationMode === 'automatic') setActiveTab(index);
                }}
                onKeyDown={(event) => handleTabKeyDown(event, index)}
              >
                {label}
              </button>
            ))}
          </div>
          {tabItems.map(([label, content], index) => (
            <div
              className="tabs__panel"
              id={`studio-panel-${uid}-${index}`}
              key={label}
              role="tabpanel"
              aria-labelledby={`studio-tab-${uid}-${index}`}
              tabIndex={0}
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
        <ol className="breadcrumb__list">
          <li className="breadcrumb__item">
            <a className="breadcrumb__link" href="#studio-home">Home</a>
            <span className="breadcrumb__separator" aria-hidden="true">/</span>
          </li>
          <li className="breadcrumb__item">
            <a className="breadcrumb__link" href="#studio-collection">Collection</a>
            <span className="breadcrumb__separator" aria-hidden="true">/</span>
          </li>
          <li className="breadcrumb__item">
            <span className="breadcrumb__current" aria-current="page">{String(values.currentLabel || '')}</span>
          </li>
        </ol>
      </nav>
    );
  }

  const activeTokens: Record<string, string | null> = contract.slug === 'tooltip'
    ? {
        surface: '--color-surface-statement',
        text: '--color-text-primary',
        radius: '--radius-sm',
        transition: '--transition-fast',
        typography: '--typo-body-sm-size',
        'line-height': '--typo-body-sm-line-height',
        spacing: '--space-layout-element-gap',
      }
    : contract.slug === 'accordion'
      ? {
          surface: '--color-surface-primary',
          hover: '--color-surface-secondary',
          text: '--color-text-primary',
          secondary: '--color-text-secondary',
          'disabled-color': '--color-text-disabled',
          border: '--color-border-subtle',
          focus: '--color-border-focus',
          radius: '--radius-md',
          spacing: '--space-layout-element-gap',
          target: '--space-layout-touch-target',
        }
      : contract.slug === 'tabs'
        ? {
            text: '--color-text-secondary',
            hover: '--color-text-primary',
            'selected-color': '--color-text-accent',
            'disabled-color': '--color-text-disabled',
            border: '--color-border-subtle',
            focus: '--color-border-focus',
            spacing: '--space-layout-element-gap',
            target: '--space-layout-touch-target',
          }
        : {
            text: '--color-text-secondary',
            hover: '--color-text-accent',
            separator: '--color-text-disabled',
            current: '--color-text-primary',
            focus: '--color-border-focus',
            spacing: '--space-layout-element-gap',
            target: '--space-layout-touch-target',
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
