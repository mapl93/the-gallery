import { useEffect, useMemo, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import { ArrowLeft, ArrowRight, FileText, PackageSearch, Search, Settings, X } from 'lucide-react';
import type { ComponentContract, ContractProperty } from '../../lib/contracts';
import type { StudioControl, StudioDefinition } from '../../lib/studio';
import StudioInspector, {
  type StudioPropertyValue,
  type StudioPropertyValues,
  type StudioSlotIconValues,
} from './StudioInspector';
import { editorialImage } from './editorialMedia';

interface OverlaySearchMediaStudioProps {
  contract: ComponentContract;
  definition: StudioDefinition;
}

const emptySlotIcons: StudioSlotIconValues = { leading: '', trailing: '' };

const commandFixtures = [
  { label: 'Find artwork', shortcut: 'G A', icon: PackageSearch },
  { label: 'Open exhibition notes', shortcut: 'G N', icon: FileText },
  { label: 'Studio settings', shortcut: 'G S', icon: Settings },
];

function defaultValue(contract: ComponentContract, property: ContractProperty): StudioPropertyValue {
  if ('defaultValue' in property) return property.defaultValue ?? null;
  if (property.type === 'boolean' || property.type === 'slot') return false;
  if (property.type === 'number') return null;
  return '';
}

function resolveTokens(control: StudioControl, contract: ComponentContract): string[] {
  if (!control.tokens) return [];
  const category = contract.tokens.public[control.tokens.category] ?? [];
  if (control.tokens.names) return control.tokens.names;
  const pattern = new RegExp(control.tokens.match ?? '$^');
  return category.filter((token) => pattern.test(token));
}

function initialFixtureValues(contract: ComponentContract): StudioPropertyValues {
  const values = Object.fromEntries((contract.properties ?? []).map((property) => (
    [property.name, defaultValue(contract, property)]
  ))) as StudioPropertyValues;
  values.open = true;
  if (contract.slug === 'lightbox') {
    values.alt = 'Stoneware vessel with satin celadon glaze';
    values.caption = 'Celadon Study No. 4';
  }
  return values;
}

export default function OverlaySearchMediaStudio({ contract, definition }: OverlaySearchMediaStudioProps) {
  const initialValues = useMemo(() => initialFixtureValues(contract), [contract]);
  const studioTokens = useMemo(() => [...new Set(definition.groups.flatMap((group) => (
    group.controls.flatMap((control) => resolveTokens(control, contract))
  )))], [definition, contract]);
  const [values, setValues] = useState<StudioPropertyValues>(initialValues);
  const [baseTokenValues, setBaseTokenValues] = useState<Record<string, string>>({});
  const [tokenOverrides, setTokenOverrides] = useState<Record<string, string>>({});
  const [highlightedCommand, setHighlightedCommand] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const commandRefs = useRef<Array<HTMLButtonElement | null>>([]);

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

  const open = values.open === true;
  const query = String(values.query || '').toLocaleLowerCase();
  const visibleCommands = commandFixtures.filter((command) => command.label.toLocaleLowerCase().includes(query));
  const tokenValues = { ...baseTokenValues, ...tokenOverrides };

  function setOpen(next: boolean) {
    setValues((current) => ({ ...current, open: next }));
    setHighlightedCommand(0);
  }

  function reset() {
    setValues({ ...initialValues });
    setHighlightedCommand(0);
    setImageIndex(0);
    setTokenOverrides({});
  }

  function commandKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (!visibleCommands.length) return;
    let next = highlightedCommand;
    if (event.key === 'ArrowDown') next = (highlightedCommand + 1) % visibleCommands.length;
    else if (event.key === 'ArrowUp') next = (highlightedCommand - 1 + visibleCommands.length) % visibleCommands.length;
    else if (event.key === 'Enter') {
      event.preventDefault();
      setOpen(false);
      return;
    } else if (event.key === 'Escape') {
      event.preventDefault();
      setOpen(false);
      return;
    } else return;
    event.preventDefault();
    setHighlightedCommand(next);
    commandRefs.current[next]?.scrollIntoView({ block: 'nearest' });
  }

  function renderCommandPalette() {
    if (!open) return <button className="btn" type="button" onClick={() => setOpen(true)}>Open command palette</button>;
    return (
      <div className="command-palette command-palette--open docs-studio__preview-command-palette" role="dialog" aria-modal="true" aria-labelledby="studio-command-title">
        <div className="command-palette__panel">
          <h2 className="docs-studio__sr-only" id="studio-command-title">Command palette</h2>
          <div className="command-palette__input-wrapper">
            <Search className="command-palette__search-icon" aria-hidden="true" />
            <input
              className="command-palette__input"
              type="text"
              role="combobox"
              aria-expanded="true"
              aria-controls="studio-command-results"
              aria-activedescendant={visibleCommands[highlightedCommand] ? `studio-command-${highlightedCommand}` : undefined}
              placeholder="Search commands"
              value={String(values.query || '')}
              onChange={(event) => {
                setValues((current) => ({ ...current, query: event.target.value }));
                setHighlightedCommand(0);
              }}
              onKeyDown={commandKeyDown}
            />
          </div>
          <div className="command-palette__results" id="studio-command-results" role="listbox" aria-label="Commands">
            {visibleCommands.length ? (
              <>
                <div className="command-palette__group-label">Gallery</div>
                {visibleCommands.map((command, index) => {
                  const Icon = command.icon;
                  return (
                    <button
                      className="command-palette__item"
                      id={`studio-command-${index}`}
                      type="button"
                      role="option"
                      aria-selected={highlightedCommand === index}
                      key={command.label}
                      ref={(element) => { commandRefs.current[index] = element; }}
                      data-highlighted={highlightedCommand === index || undefined}
                      onPointerMove={() => setHighlightedCommand(index)}
                      onClick={() => setOpen(false)}
                    >
                      <Icon className="command-palette__item-icon" aria-hidden="true" />
                      <span className="command-palette__item-text">{command.label}</span>
                      <span className="command-palette__item-shortcut">{command.shortcut}</span>
                    </button>
                  );
                })}
              </>
            ) : (
              <div className="command-palette__empty">No commands found.</div>
            )}
          </div>
          <div className="command-palette__footer"><span>Navigate with arrows</span><span>Enter to select</span></div>
        </div>
      </div>
    );
  }

  function moveImage(direction: number) {
    setImageIndex((current) => (current + direction + 3) % 3);
  }

  function renderLightbox() {
    if (!open) return <button className="btn" type="button" onClick={() => setOpen(true)}>Open lightbox</button>;
    return (
      <div className="lightbox lightbox--open docs-studio__preview-lightbox" role="dialog" aria-modal="true" aria-labelledby="studio-lightbox-caption">
        <div className="lightbox__content docs-studio__lightbox-content">
          <img
            className={`lightbox__image docs-studio__lightbox-artwork docs-studio__lightbox-artwork--${imageIndex + 1}`}
            src={editorialImage(imageIndex)}
            alt={String(values.alt || '')}
          />
        </div>
        <button className="lightbox__close close-btn" type="button" aria-label="Close lightbox" onClick={() => setOpen(false)}>
          <X className="close-btn__icon" aria-hidden="true" />
        </button>
        <button className="lightbox__nav lightbox__nav--prev icon-btn" type="button" aria-label="Previous image" onClick={() => moveImage(-1)}>
          <ArrowLeft className="icon-btn__icon" aria-hidden="true" />
        </button>
        <button className="lightbox__nav lightbox__nav--next icon-btn" type="button" aria-label="Next image" onClick={() => moveImage(1)}>
          <ArrowRight className="icon-btn__icon" aria-hidden="true" />
        </button>
        <div className="lightbox__counter" aria-live="polite">{imageIndex + 1} / 3</div>
        <div className="lightbox__caption" id="studio-lightbox-caption">{String(values.caption || '')}</div>
      </div>
    );
  }

  const activeTokens: Record<string, string | null> = contract.slug === 'command-palette'
    ? {
        surface: '--color-surface-primary',
        hover: '--color-surface-secondary',
        border: '--color-border-subtle',
        text: '--color-text-primary',
        secondary: '--color-text-secondary',
        muted: '--color-text-disabled',
        radius: '--radius-lg',
        shadow: '--shadow-2xl',
        overlay: '--opacity-overlay',
      }
    : {
        text: '--color-text-inverse',
        radius: '--radius-sm',
        transition: '--transition-base',
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
          onPropertiesChange={(next) => setValues((current) => ({ ...current, ...next }))}
          onSlotIconChange={() => undefined}
          onStateChange={() => undefined}
          onTokenChange={(token, value) => setTokenOverrides((current) => ({ ...current, [token]: value }))}
          onReset={reset}
        />
        <section className="docs-studio__stage docs-studio__stage--overlay" aria-label={`${contract.name} preview`} style={tokenOverrides as CSSProperties}>
          <div className="docs-studio__stage-inner">{contract.slug === 'command-palette' ? renderCommandPalette() : renderLightbox()}</div>
        </section>
      </div>
    </div>
  );
}
