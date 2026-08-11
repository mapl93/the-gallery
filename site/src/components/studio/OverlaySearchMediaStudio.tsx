import { useEffect, useId, useMemo, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import { FileText, PackageSearch, Search, Settings, X } from 'lucide-react';
import type { ComponentContract, ContractProperty } from '../../lib/contracts';
import type { StudioControl, StudioDefinition } from '../../lib/studio';
import StudioInspector, {
  type StudioPropertyValue,
  type StudioPropertyValues,
  type StudioSlotIconValues,
} from './StudioInspector';
import { editorialImage } from './editorialMedia';
import LightboxArtwork from './LightboxArtwork';

interface OverlaySearchMediaStudioProps {
  contract: ComponentContract;
  definition: StudioDefinition;
}

const emptySlotIcons: StudioSlotIconValues = { leading: '', trailing: '' };

const commandFixtures = [
  { id: 'find-artwork', label: 'Find artwork', icon: PackageSearch },
  { id: 'exhibition-notes', label: 'Open exhibition notes', icon: FileText },
  { id: 'studio-settings', label: 'Studio settings', icon: Settings },
  { id: 'export-catalogue', label: 'Export catalogue', icon: FileText, disabled: true },
];
const lightboxFixtures = [
  { id: 'celadon', src: editorialImage(0), alt: 'Stoneware vessel with satin celadon glaze', caption: 'Celadon Study No. 4', className: 'docs-studio__lightbox-artwork docs-studio__lightbox-artwork--1' },
  { id: 'ash', src: editorialImage(1), alt: 'Hand-thrown vessel with warm ash glaze', caption: 'Ash Glaze Study No. 2', className: 'docs-studio__lightbox-artwork docs-studio__lightbox-artwork--2' },
  { id: 'porcelain', src: editorialImage(2), alt: 'Porcelain vessel with a cool translucent finish', caption: 'Porcelain Study No. 7', className: 'docs-studio__lightbox-artwork docs-studio__lightbox-artwork--3' },
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
    values.alt = lightboxFixtures[0].alt;
    values.caption = lightboxFixtures[0].caption;
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
  const [committedQuery, setCommittedQuery] = useState(String(initialValues.query || ''));
  const [imageIndex, setImageIndex] = useState(0);
  const commandRefs = useRef<Array<HTMLDivElement | null>>([]);
  const commandTriggerRef = useRef<HTMLButtonElement | null>(null);
  const commandDialogRef = useRef<HTMLDivElement | null>(null);
  const commandInputRef = useRef<HTMLInputElement | null>(null);
  const commandPreviousFocusRef = useRef<HTMLElement | null>(null);
  const composingRef = useRef(false);
  const commandTitleId = useId();
  const commandResultsId = useId();
  const commandGroupLabelId = useId();

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
  const query = committedQuery.toLocaleLowerCase();
  const visibleCommands = useMemo(() => commandFixtures.filter((command) => (
    command.label.toLocaleLowerCase().includes(query)
  )), [query]);
  const tokenValues = { ...baseTokenValues, ...tokenOverrides };

  useEffect(() => {
    if (contract.slug !== 'command-palette' || composingRef.current) return;
    setCommittedQuery(String(values.query || ''));
  }, [contract.slug, values.query]);

  useEffect(() => {
    if (contract.slug !== 'command-palette') return;
    const firstEnabled = visibleCommands.findIndex((command) => !command.disabled);
    if (!visibleCommands[highlightedCommand] || visibleCommands[highlightedCommand]?.disabled) {
      setHighlightedCommand(firstEnabled);
    }
  }, [contract.slug, highlightedCommand, visibleCommands]);

  useEffect(() => {
    if (contract.slug !== 'command-palette' || !open) return undefined;
    const active = document.activeElement as HTMLElement | null;
    if (active && active !== document.body && !commandDialogRef.current?.contains(active)) {
      commandPreviousFocusRef.current = active;
    }
    const frame = requestAnimationFrame(() => commandInputRef.current?.focus());
    return () => cancelAnimationFrame(frame);
  }, [contract.slug, open]);

  useEffect(() => {
    if (contract.slug !== 'command-palette') return undefined;
    const toggleShortcut = (event: globalThis.KeyboardEvent) => {
      if (event.key.toLocaleLowerCase() !== 'k' || (!event.metaKey && !event.ctrlKey) || event.altKey) return;
      const target = event.target as HTMLElement | null;
      const editable = target?.matches('input, textarea, select, [contenteditable="true"]');
      if (editable && target !== commandInputRef.current) return;
      event.preventDefault();
      if (open) closeCommandPalette();
      else openCommandPalette();
    };
    document.addEventListener('keydown', toggleShortcut);
    return () => document.removeEventListener('keydown', toggleShortcut);
  }, [contract.slug, open]);

  function setOpen(next: boolean) {
    setValues((current) => ({ ...current, open: next }));
    setHighlightedCommand(0);
  }

  function reset() {
    setValues({ ...initialValues });
    setHighlightedCommand(0);
    setCommittedQuery(String(initialValues.query || ''));
    setImageIndex(0);
    setTokenOverrides({});
  }

  function openCommandPalette() {
    const active = document.activeElement as HTMLElement | null;
    if (active && active !== document.body && !commandDialogRef.current?.contains(active)) {
      commandPreviousFocusRef.current = active;
    }
    setOpen(true);
  }

  function closeCommandPalette() {
    setOpen(false);
    requestAnimationFrame(() => {
      const previous = commandPreviousFocusRef.current;
      if (previous?.isConnected && previous !== document.body) previous.focus();
      else commandTriggerRef.current?.focus();
    });
  }

  function executeCommand(index: number) {
    if (index < 0 || visibleCommands[index]?.disabled) return;
    closeCommandPalette();
  }

  function commandKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    const enabled = visibleCommands.map((command, index) => ({ command, index })).filter(({ command }) => !command.disabled);
    if (!enabled.length) return;
    const currentEnabledIndex = Math.max(0, enabled.findIndex(({ index }) => index === highlightedCommand));
    let next = highlightedCommand;
    if (event.key === 'ArrowDown') next = enabled[(currentEnabledIndex + 1) % enabled.length].index;
    else if (event.key === 'ArrowUp') next = enabled[(currentEnabledIndex - 1 + enabled.length) % enabled.length].index;
    else if (event.key === 'Home') next = enabled[0].index;
    else if (event.key === 'End') next = enabled[enabled.length - 1].index;
    else if (event.key === 'Enter') {
      event.preventDefault();
      executeCommand(highlightedCommand);
      return;
    } else return;
    event.preventDefault();
    setHighlightedCommand(next);
    commandRefs.current[next]?.scrollIntoView({ block: 'nearest' });
  }

  function commandDialogKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Escape') {
      event.preventDefault();
      closeCommandPalette();
      return;
    }
    if (event.key !== 'Tab') return;
    const focusables = Array.from(commandDialogRef.current?.querySelectorAll<HTMLElement>(
      'button:not(:disabled), input:not(:disabled), [tabindex]:not([tabindex="-1"])',
    ) ?? []).filter((element) => element.getClientRects().length > 0);
    if (!focusables.length) return;
    const current = focusables.indexOf(document.activeElement as HTMLElement);
    const next = event.shiftKey
      ? (current <= 0 ? focusables.length - 1 : current - 1)
      : (current === focusables.length - 1 ? 0 : current + 1);
    event.preventDefault();
    focusables[next]?.focus();
  }

  function renderCommandPalette() {
    if (!open) {
      return (
        <button className="btn" type="button" ref={commandTriggerRef} onClick={openCommandPalette}>
          Open command palette
        </button>
      );
    }
    return (
      <div
        className="modal-overlay command-palette command-palette--open docs-studio__preview-command-palette"
        aria-hidden="false"
        onPointerDown={(event) => {
          if (event.target === event.currentTarget) closeCommandPalette();
        }}
      >
        <div
          className="modal command-palette__panel"
          ref={commandDialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={commandTitleId}
          onKeyDown={commandDialogKeyDown}
        >
          <h2 className="modal__title visually-hidden" id={commandTitleId}>Command palette</h2>
          <div className="command-palette__input-wrapper">
            <Search className="command-palette__search-icon" aria-hidden="true" />
            <input
              className="command-palette__input"
              ref={commandInputRef}
              type="text"
              role="combobox"
              aria-label="Search commands"
              aria-autocomplete="list"
              aria-expanded="true"
              aria-controls={commandResultsId}
              aria-activedescendant={visibleCommands[highlightedCommand] && !visibleCommands[highlightedCommand].disabled ? `studio-command-${visibleCommands[highlightedCommand].id}` : undefined}
              placeholder="Search commands"
              value={String(values.query || '')}
              onChange={(event) => {
                setValues((current) => ({ ...current, query: event.target.value }));
                if (!composingRef.current) setCommittedQuery(event.target.value);
                setHighlightedCommand(0);
              }}
              onCompositionStart={() => { composingRef.current = true; }}
              onCompositionEnd={(event) => {
                composingRef.current = false;
                setCommittedQuery(event.currentTarget.value);
                setHighlightedCommand(0);
              }}
              onKeyDown={commandKeyDown}
            />
            <button className="close-btn command-palette__close" type="button" aria-label="Close command palette" onClick={closeCommandPalette}>
              <X className="close-btn__icon" aria-hidden="true" />
            </button>
          </div>
          <p className="command-palette__status visually-hidden" role="status" aria-live="polite" aria-atomic="true">
            {visibleCommands.length ? '' : 'No commands found.'}
          </p>
          <div className="command-palette__results" id={commandResultsId} role="listbox" aria-label="Commands">
            {visibleCommands.length ? (
              <div className="command-palette__group" role="group" aria-labelledby={commandGroupLabelId}>
                <div className="command-palette__group-label" id={commandGroupLabelId}>Gallery</div>
                {visibleCommands.map((command, index) => {
                  const Icon = command.icon;
                  return (
                    <div
                      className="command-palette__item"
                      id={`studio-command-${command.id}`}
                      role="option"
                      tabIndex={-1}
                      aria-selected={highlightedCommand === index && !command.disabled}
                      aria-disabled={command.disabled || undefined}
                      key={command.label}
                      ref={(element) => { commandRefs.current[index] = element; }}
                      data-disabled={command.disabled || undefined}
                      data-highlighted={highlightedCommand === index && !command.disabled || undefined}
                      onPointerMove={() => { if (!command.disabled) setHighlightedCommand(index); }}
                      onClick={() => executeCommand(index)}
                    >
                      <Icon className="command-palette__item-icon" aria-hidden="true" />
                      <span className="command-palette__item-text">{command.label}</span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="command-palette__empty">No commands found.</div>
            )}
          </div>
          <div className="command-palette__footer"><span>↑↓ Navigate · Enter select</span><span>Esc close</span></div>
        </div>
      </div>
    );
  }

  function openLightbox() {
    setOpen(true);
  }

  function closeLightbox() {
    setOpen(false);
  }

  function selectLightboxImage(id: string) {
    const next = lightboxFixtures.findIndex((fixture) => fixture.id === id);
    if (next < 0 || next === imageIndex) return;
    const fixture = lightboxFixtures[next];
    setImageIndex(next);
    setValues((current) => ({ ...current, alt: fixture.alt, caption: fixture.caption }));
  }

  function renderLightbox() {
    if (!open) return <button className="btn" type="button" onClick={openLightbox}>Open lightbox</button>;
    const images = lightboxFixtures.map((fixture, index) => index === imageIndex ? {
      ...fixture,
      alt: String(values.alt || ''),
      caption: String(values.caption || '').trim(),
    } : fixture);
    return (
      <LightboxArtwork
        images={images}
        currentId={lightboxFixtures[imageIndex].id}
        open
        loop={values.loop === true}
        title="Artwork viewer"
        className="docs-studio__preview-lightbox"
        onCurrentIdChange={selectLightboxImage}
        onOpenChange={(next) => { if (!next) closeLightbox(); }}
      />
    );
  }

  const activeTokens: Record<string, string | null> = contract.slug === 'command-palette'
    ? {
        surface: '--color-surface-primary',
        hover: '--color-surface-secondary',
        border: '--color-border-subtle',
        focus: '--color-border-focus',
        text: '--color-text-primary',
        secondary: '--color-text-secondary',
        muted: '--color-text-disabled',
        radius: '--radius-lg',
        shadow: '--shadow-2xl',
        overlay: '--opacity-overlay',
        'body-size': '--typo-body-size',
        caption: '--typo-caption-size',
        spacing: '--space-layout-element-gap',
        'touch-target': '--space-layout-touch-target',
        transition: '--transition-fast',
      }
    : {
        radius: '--radius-sm',
        spacing: '--space-layout-element-gap',
        'body-size': '--typo-body-size',
        'body-small': '--typo-body-sm-size',
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
