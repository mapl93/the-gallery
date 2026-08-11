import type { ReactNode } from 'react';
import { editorialMedia } from './editorialMedia';

export type DimensionsFixtureUnit = 'cm' | 'in';

export interface DimensionsMeasurement {
  key: string;
  term: string;
  value: string;
}

interface DimensionsArtworkProps {
  id: string;
  className?: string;
  visual?: ReactNode;
  measurements: readonly DimensionsMeasurement[];
  unitControls?: ReactNode;
}

const fixtureSets: Record<DimensionsFixtureUnit, readonly DimensionsMeasurement[]> = {
  cm: [
    { key: 'height', term: 'Height', value: '12\u00a0cm' },
    { key: 'maximum-diameter', term: 'Maximum diameter', value: '24\u00a0cm' },
    { key: 'foot-diameter', term: 'Foot diameter', value: '10\u00a0cm' },
  ],
  in: [
    { key: 'height', term: 'Height', value: '4.7\u00a0in' },
    { key: 'maximum-diameter', term: 'Maximum diameter', value: '9.4\u00a0in' },
    { key: 'foot-diameter', term: 'Foot diameter', value: '3.9\u00a0in' },
  ],
};

export function buildDimensionsFixture(unit: DimensionsFixtureUnit = 'cm') {
  return fixtureSets[unit].map((measurement) => ({ ...measurement }));
}

export function DimensionsFixtureVisual({
  measurements,
}: {
  measurements: readonly DimensionsMeasurement[];
}) {
  const byKey = new Map(measurements.map((measurement) => [measurement.key, measurement]));
  const height = byKey.get('height');
  const diameter = byKey.get('maximum-diameter');

  return (
    <>
      <img
        src={editorialMedia.tableware}
        alt="Nested ceramic bowls on a studio table"
        width="1800"
        height="2700"
      />
      <div className="dimensions__annotations" aria-hidden="true">
        {height && (
          <span className="dimensions__label dimensions__label--height">
            {height.term} · {height.value}
          </span>
        )}
        {diameter && (
          <span className="dimensions__label dimensions__label--diameter">
            {diameter.term} · {diameter.value}
          </span>
        )}
      </div>
    </>
  );
}

export default function DimensionsArtwork({
  id,
  className = '',
  visual,
  measurements,
  unitControls,
}: DimensionsArtworkProps) {
  const validMeasurements = measurements.filter((measurement) => (
    measurement.key.trim() && measurement.term.trim() && measurement.value.trim()
  ));

  if (!validMeasurements.length) return null;

  const classes = ['dimensions', visual ? 'dimensions--with-visual' : '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} id={id}>
      {visual && <figure className="dimensions__visual">{visual}</figure>}
      <div className="dimensions__content">
        {unitControls}
        <dl className="dimensions__table" id={`${id}-measurements`}>
          {validMeasurements.map((measurement) => (
            <div className="dimensions__measurement" key={measurement.key}>
              <dt>{measurement.term}</dt>
              <dd><bdi className="dimensions__value">{measurement.value}</bdi></dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
