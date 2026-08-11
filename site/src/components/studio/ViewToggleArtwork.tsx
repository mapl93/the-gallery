import { Grid2X2, List } from 'lucide-react';
import SegmentedControlArtwork from './SegmentedControlArtwork';

export type ViewToggleValue = 'grid' | 'list';

interface ViewToggleArtworkProps {
  className?: string;
  groupLabel: string;
  name: string;
  gridLabel: string;
  listLabel: string;
  activeView: ViewToggleValue;
  disabled?: boolean;
  onViewChange: (value: ViewToggleValue) => void;
}

export default function ViewToggleArtwork({
  className = '',
  groupLabel,
  name,
  gridLabel,
  listLabel,
  activeView,
  disabled = false,
  onViewChange,
}: ViewToggleArtworkProps) {
  const normalizedGroupLabel = groupLabel.trim();
  const normalizedName = name.trim();
  const normalizedGridLabel = gridLabel.trim();
  const normalizedListLabel = listLabel.trim();

  if (!normalizedGroupLabel || !normalizedName || !normalizedGridLabel || !normalizedListLabel) return null;

  const currentView: ViewToggleValue = activeView === 'list' ? 'list' : 'grid';

  const optionClassNames = {
    itemClassName: 'view-toggle__item',
    inputClassName: 'view-toggle__input',
    labelClassName: 'view-toggle__label',
  };

  return (
    <SegmentedControlArtwork
      className={['view-toggle', className].filter(Boolean).join(' ')}
      groupLabel={normalizedGroupLabel}
      name={normalizedName}
      legendClassName="view-toggle__legend"
      optionsClassName="view-toggle__options"
      options={[
        {
          ...optionClassNames,
          label: normalizedGridLabel,
          value: 'grid',
          content: (
            <>
              <Grid2X2 className="view-toggle__icon" aria-hidden="true" />
              <span className="view-toggle__text" dir="auto">{normalizedGridLabel}</span>
            </>
          ),
        },
        {
          ...optionClassNames,
          label: normalizedListLabel,
          value: 'list',
          content: (
            <>
              <List className="view-toggle__icon" aria-hidden="true" />
              <span className="view-toggle__text" dir="auto">{normalizedListLabel}</span>
            </>
          ),
        },
      ]}
      value={currentView}
      disabled={disabled}
      onValueChange={(value) => {
        if (value === 'grid' || value === 'list') onViewChange(value);
      }}
    />
  );
}

export const viewToggleFixture = {
  groupLabel: 'Collection view',
  name: 'collection-view',
  gridLabel: 'Grid',
  listLabel: 'List',
  activeView: 'grid' as ViewToggleValue,
  disabled: false,
};
