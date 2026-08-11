import { Children, type ReactNode } from 'react';
import DataTableArtwork from './DataTableArtwork';
import ModalArtwork from './ModalArtwork';

export type SizeChartFixtureUnit = 'metric' | 'imperial';

export interface SizeChartFixtureRow {
  key: string;
  size: string;
  width: string;
  height: string;
}

export interface SizeChartFixture {
  caption: string;
  rows: readonly SizeChartFixtureRow[];
}

interface SizeChartArtworkProps {
  id: string;
  triggerLabel: string;
  title: string;
  dismissLabel: string;
  open: boolean;
  chart: ReactNode;
  onOpenChange: (open: boolean) => void;
  closeIcon?: ReactNode;
  unitControls?: ReactNode;
  notes?: ReactNode;
  className?: string;
  overlayClassName?: string;
  dialogClassName?: string;
}

const fixtureSets: Record<SizeChartFixtureUnit, SizeChartFixture> = {
  metric: {
    caption: 'Framed textile measurements by size',
    rows: [
      { key: 'small', size: 'S', width: '24\u00a0cm', height: '18\u00a0cm' },
      { key: 'medium', size: 'M', width: '28\u00a0cm', height: '22\u00a0cm' },
      { key: 'large', size: 'L', width: '32\u00a0cm', height: '26\u00a0cm' },
    ],
  },
  imperial: {
    caption: 'Framed textile measurements by size',
    rows: [
      { key: 'small', size: 'S', width: '9.4\u00a0in', height: '7.1\u00a0in' },
      { key: 'medium', size: 'M', width: '11\u00a0in', height: '8.7\u00a0in' },
      { key: 'large', size: 'L', width: '12.6\u00a0in', height: '10.2\u00a0in' },
    ],
  },
};

export function buildSizeChartFixture(unit: SizeChartFixtureUnit = 'metric'): SizeChartFixture {
  const fixture = fixtureSets[unit];
  return {
    caption: fixture.caption,
    rows: fixture.rows.map((row) => ({ ...row })),
  };
}

export function SizeChartFixtureTable({
  fixture,
  scrollLabel,
}: {
  fixture: SizeChartFixture;
  scrollLabel: string;
}) {
  const validRows = fixture.rows.filter((row) => (
    row.key.trim() && row.size.trim() && row.width.trim() && row.height.trim()
  ));

  if (!fixture.caption.trim() || validRows.length === 0) return null;

  return (
    <DataTableArtwork
      caption={fixture.caption}
      wrapperLabel={scrollLabel}
      wrapperClassName="size-chart__chart"
    >
      <thead>
        <tr>
          <th scope="col">Size</th>
          <th scope="col">Width</th>
          <th scope="col">Height</th>
        </tr>
      </thead>
      <tbody>
        {validRows.map((row) => (
          <tr key={row.key}>
            <th scope="row"><bdi>{row.size}</bdi></th>
            <td><bdi>{row.width}</bdi></td>
            <td><bdi>{row.height}</bdi></td>
          </tr>
        ))}
      </tbody>
    </DataTableArtwork>
  );
}

export default function SizeChartArtwork({
  id,
  triggerLabel,
  title,
  dismissLabel,
  open,
  chart,
  onOpenChange,
  closeIcon,
  unitControls,
  notes,
  className = '',
  overlayClassName = '',
  dialogClassName = '',
}: SizeChartArtworkProps) {
  const valid = id.trim()
    && triggerLabel.trim()
    && title.trim()
    && dismissLabel.trim()
    && Children.count(chart) > 0;

  if (!valid) return null;

  return (
    <div className={['size-chart', className].filter(Boolean).join(' ')}>
      <ModalArtwork
        id={id}
        title={title}
        open={open}
        dismissLabel={dismissLabel}
        triggerLabel={triggerLabel}
        onOpenChange={onOpenChange}
        closeIcon={closeIcon}
        triggerClassName="btn--link size-chart__trigger"
        overlayClassName={['size-chart__overlay', overlayClassName].filter(Boolean).join(' ')}
        className={['size-chart__dialog', dialogClassName].filter(Boolean).join(' ')}
        bodyClassName="size-chart__content"
        initialFocus="title"
      >
        {unitControls}
        {chart}
        {Children.count(notes) > 0 && <div className="size-chart__notes">{notes}</div>}
      </ModalArtwork>
    </div>
  );
}
