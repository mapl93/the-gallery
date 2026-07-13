import type { KeyboardEvent } from 'react';

export type ComponentMode = 'exhibit' | 'studio';

interface ComponentModeSwitchProps {
  value: ComponentMode;
  onChange: (mode: ComponentMode) => void;
}

export default function ComponentModeSwitch({ value, onChange }: ComponentModeSwitchProps) {
  const modes: ComponentMode[] = ['exhibit', 'studio'];

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, mode: ComponentMode) {
    if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    const next = mode === 'exhibit' ? 'studio' : 'exhibit';
    onChange(next);
    document.getElementById(`component-view-${next}-tab`)?.focus();
  }

  return (
    <div className="docs-component-mode" role="tablist" aria-label="Component view">
      {modes.map((mode) => (
        <button
          id={`component-view-${mode}-tab`}
          key={mode}
          className={value === mode ? 'is-active' : undefined}
          type="button"
          role="tab"
          aria-selected={value === mode}
          aria-controls="component-view-panel"
          tabIndex={value === mode ? 0 : -1}
          onClick={() => onChange(mode)}
          onKeyDown={(event) => handleKeyDown(event, mode)}
        >
          {mode}
        </button>
      ))}
    </div>
  );
}
