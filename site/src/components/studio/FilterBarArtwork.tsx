import CheckboxArtwork from './CheckboxArtwork';
import SegmentedControlArtwork from './SegmentedControlArtwork';

export type FilterBarMode = 'single' | 'multiple';

export interface FilterBarOption {
  label: string;
  value: string;
  disabled?: boolean;
}

interface FilterBarArtworkProps {
  label: string;
  name: string;
  options: readonly FilterBarOption[];
  selectedValues: readonly string[];
  mode?: FilterBarMode;
  disabled?: boolean;
  describedBy?: string;
  className?: string;
  onSelectedValuesChange?: (selectedValues: string[]) => void;
  onCommitRequest?: (selectedValues: string[]) => void;
}

function validOptions(options: readonly FilterBarOption[]) {
  const seen = new Set<string>();

  return options.filter((option) => {
    const label = option.label.trim();
    const value = option.value.trim();
    if (!label || !value || seen.has(value)) return false;
    seen.add(value);
    return true;
  });
}

export default function FilterBarArtwork({
  label,
  name,
  options,
  selectedValues,
  mode = 'single',
  disabled = false,
  describedBy,
  className = '',
  onSelectedValuesChange,
  onCommitRequest,
}: FilterBarArtworkProps) {
  const normalizedLabel = label.trim();
  const normalizedName = name.trim();
  const normalizedOptions = validOptions(options);
  const selectedSet = new Set(selectedValues);
  const normalizedSelection = normalizedOptions
    .filter((option) => selectedSet.has(option.value))
    .map((option) => option.value);
  const selection = mode === 'single'
    ? normalizedSelection.slice(0, 1)
    : normalizedSelection;
  const classes = [
    'filter-bar',
    `filter-bar--${mode}`,
    className,
  ].filter(Boolean).join(' ');

  if (!normalizedLabel || !normalizedName || normalizedOptions.length < 2) return null;

  function commit(nextSelection: string[]) {
    onSelectedValuesChange?.(nextSelection);
    onCommitRequest?.(nextSelection);
  }

  if (mode === 'single') {
    return (
      <SegmentedControlArtwork
        className={classes}
        groupLabel={normalizedLabel}
        name={normalizedName}
        options={normalizedOptions}
        value={selection[0] ?? ''}
        disabled={disabled}
        describedBy={describedBy}
        onValueChange={(value) => commit([value])}
      />
    );
  }

  return (
    <fieldset
      className={classes}
      disabled={disabled}
      aria-describedby={describedBy}
    >
      <legend className="filter-bar__legend">{normalizedLabel}</legend>
      <div className="filter-bar__options">
        {normalizedOptions.map((option) => (
          <CheckboxArtwork
            className="filter-bar__choice"
            inputClassName="filter-bar__input"
            labelClassName="filter-bar__label"
            label={option.label}
            name={normalizedName}
            value={option.value}
            checked={selection.includes(option.value)}
            disabled={option.disabled}
            onChange={(event) => {
              const nextSet = new Set(selection);
              if (event.currentTarget.checked) nextSet.add(option.value);
              else nextSet.delete(option.value);
              commit(normalizedOptions
                .filter((candidate) => nextSet.has(candidate.value))
                .map((candidate) => candidate.value));
            }}
            key={option.value}
          />
        ))}
      </div>
    </fieldset>
  );
}

export const filterBarFixtureOptions: readonly FilterBarOption[] = [
  { label: 'Studio notes', value: 'studio-notes' },
  { label: 'Materials', value: 'materials' },
  { label: 'Process', value: 'process' },
  { label: 'Exhibitions', value: 'exhibitions' },
];
