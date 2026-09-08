import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import type { ComponentContract, ContractProperty } from '../../lib/contracts';
import type { StudioControl, StudioDefinition } from '../../lib/studio';
import { editorialMedia } from './editorialMedia';
import StudioInspector, {
  type StudioPropertyValue,
  type StudioPropertyValues,
  type StudioSlotIconValues,
} from './StudioInspector';

interface CardStudioProps {
  contract: ComponentContract;
  definition: StudioDefinition;
}

const emptySlotIcons: StudioSlotIconValues = { leading: '', trailing: '' };

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

function variantClass(contract: ComponentContract, value: StudioPropertyValue): string | null {
  return contract.variants.find((option) => option.name === value)?.className?.replace(/^\./, '') ?? null;
}

export default function CardStudio({ contract, definition }: CardStudioProps) {
  const initialValues = useMemo<StudioPropertyValues>(() => Object.fromEntries(
    (contract.properties ?? []).map((property) => [property.name, defaultValue(contract, property)])
  ), [contract]);
  const studioTokens = useMemo(() => [...new Set(definition.groups.flatMap((group) => (
    group.controls.flatMap((control) => resolveTokens(control, contract))
  )))], [definition, contract]);
  const [values, setValues] = useState<StudioPropertyValues>(initialValues);
  const [previewState, setPreviewState] = useState('default');
  const [baseTokenValues, setBaseTokenValues] = useState<Record<string, string>>({});
  const [tokenOverrides, setTokenOverrides] = useState<Record<string, string>>({});

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

  const variant = String(values.variant || 'default');
  const classes = ['card', variantClass(contract, values.variant), 'docs-studio__preview-card']
    .filter(Boolean)
    .join(' ');
  const tokenValues = { ...baseTokenValues, ...tokenOverrides };
  const previewStyle: CSSProperties = previewState === 'hover' && variant !== 'flat'
    ? {
        boxShadow: variant === 'elevated' ? 'var(--shadow-lg)' : 'var(--shadow-md)',
        transform: 'translateY(-2px)',
      }
    : {};

  function reset() {
    setValues({ ...initialValues });
    setPreviewState('default');
    setTokenOverrides({});
  }

  return (
    <div className="docs-studio">
      <h1 className="docs-studio__title">{contract.name}</h1>
      <div className="docs-studio__workspace">
        <StudioInspector
          definition={definition}
          contract={contract}
          values={values}
          slotIconValues={emptySlotIcons}
          stateValue={previewState}
          tokenValues={tokenValues}
          activeTokens={{
            surface: '--color-surface-primary',
            border: variant === 'flat' ? null : '--color-border-subtle',
            radius: '--radius-md',
            'default-shadow': variant === 'default' && previewState === 'default' ? '--shadow-sm' : null,
            'elevated-shadow': (
              (variant === 'elevated' && previewState === 'default')
              || (variant === 'default' && previewState === 'hover')
            ) ? '--shadow-md' : null,
            'hover-shadow': variant === 'elevated' && previewState === 'hover' ? '--shadow-lg' : null,
            'content-padding': '--tg-space-component-xs',
            transition: '--transition-base',
          }}
          onPropertiesChange={(next) => setValues((current) => ({ ...current, ...next }))}
          onSlotIconChange={() => undefined}
          onStateChange={setPreviewState}
          onTokenChange={(token, value) => setTokenOverrides((current) => ({ ...current, [token]: value }))}
          onReset={reset}
        />

        <section
          className="docs-studio__stage"
          aria-label={`${contract.name} preview`}
          style={tokenOverrides as CSSProperties}
        >
          <div className="docs-studio__stage-inner">
            <article
              className={classes}
              data-studio-state={previewState}
              style={previewStyle}
            >
              <div className="card__media docs-studio__card-media">
                <img
                  src={editorialMedia.texturedVase}
                  alt="Close view of a tall, ribbed ceramic vase in low light"
                  width={1800}
                  height={2700}
                />
              </div>
              <div className="card__body">
                <h3 className="docs-studio__card-title">Ribbed ceramic vessel</h3>
                <p className="docs-studio__card-copy">Hand-finished form with a deep mineral glaze.</p>
              </div>
              <footer className="card__footer">
                <span className="docs-studio__card-meta">Gallery study, 2026</span>
              </footer>
            </article>
          </div>
        </section>
      </div>
    </div>
  );
}
