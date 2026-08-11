import type { ElementType } from 'react';
import {
  convertFiringRate,
  convertFiringTemperature,
  createFiringScheduleModel,
  resolveFiringScheduleView,
  type FiringScheduleActualSampleInput,
  type FiringScheduleActualStatus,
  type FiringScheduleActualSummaryInput,
  type FiringScheduleDisplayUnit,
  type FiringScheduleModel,
  type FiringScheduleSegment,
  type FiringScheduleSegmentInput,
  type FiringScheduleView,
} from '../../../../components/js/firing-schedule.js';
import DataTableArtwork from './DataTableArtwork';

type FiringScheduleHeadingLevel = 2 | 3 | 4 | 5 | 6;

interface FiringScheduleArtworkProps {
  id: string;
  title?: string;
  startingTemperatureCelsius: number;
  segments: readonly FiringScheduleSegmentInput[];
  actualSamples?: readonly FiringScheduleActualSampleInput[];
  actualSummaries?: readonly FiringScheduleActualSummaryInput[];
  view?: FiringScheduleView;
  displayUnit?: FiringScheduleDisplayUnit;
  actualStatus?: FiringScheduleActualStatus;
  headingLevel?: FiringScheduleHeadingLevel;
  locale?: string;
  className?: string;
}

export interface FiringScheduleFixture {
  startingTemperatureCelsius: number;
  segments: FiringScheduleSegmentInput[];
  actualSamples: FiringScheduleActualSampleInput[];
  actualSummaries: FiringScheduleActualSummaryInput[];
}

const fixture: FiringScheduleFixture = {
  startingTemperatureCelsius: 20,
  segments: [
    { segmentId: 'preheat', label: 'Preheat', rateCelsiusPerHour: 100, targetTemperatureCelsius: 200, holdSeconds: 1800 },
    { segmentId: 'bisque-ramp', label: 'Controlled ramp', rateCelsiusPerHour: 150, targetTemperatureCelsius: 600, holdSeconds: 0 },
    { segmentId: 'peak', label: 'Peak firing', rateCelsiusPerHour: 'full', estimatedRampSeconds: 10800, targetTemperatureCelsius: 1220, holdSeconds: 1200 },
    { segmentId: 'controlled-cool', label: 'Controlled cooling', rateCelsiusPerHour: 100, targetTemperatureCelsius: 900, holdSeconds: 0 },
  ],
  actualSamples: [
    { elapsedSeconds: 0, temperatureCelsius: 20 },
    { elapsedSeconds: 6600, temperatureCelsius: 198 },
    { elapsedSeconds: 8400, temperatureCelsius: 201 },
    { elapsedSeconds: 18100, temperatureCelsius: 594 },
    { elapsedSeconds: 29200, temperatureCelsius: 1213 },
    { elapsedSeconds: 30450, temperatureCelsius: 1211 },
    { elapsedSeconds: 42100, temperatureCelsius: 906 },
  ],
  actualSummaries: [
    { segmentId: 'preheat', durationSeconds: 6600, reachedTemperatureCelsius: 198, deviationCelsius: -2 },
    { segmentId: 'bisque-ramp', durationSeconds: 9700, reachedTemperatureCelsius: 594, deviationCelsius: -6 },
    { segmentId: 'peak', durationSeconds: 12350, reachedTemperatureCelsius: 1213, deviationCelsius: -7 },
    { segmentId: 'controlled-cool', durationSeconds: 11650, reachedTemperatureCelsius: 906, deviationCelsius: 6 },
  ],
};

export function buildFiringScheduleFixture(): FiringScheduleFixture {
  return {
    startingTemperatureCelsius: fixture.startingTemperatureCelsius,
    segments: fixture.segments.map((segment) => ({ ...segment })),
    actualSamples: fixture.actualSamples.map((sample) => ({ ...sample })),
    actualSummaries: fixture.actualSummaries.map((summary) => ({ ...summary })),
  };
}

function formatNumber(value: number, locale: string, fractionDigits = 0) {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: fractionDigits,
  }).format(value);
}

function temperatureUnit(displayUnit: FiringScheduleDisplayUnit) {
  return displayUnit === 'fahrenheit' ? '°F' : '°C';
}

function formatTemperature(value: number, displayUnit: FiringScheduleDisplayUnit, locale: string) {
  return `${formatNumber(convertFiringTemperature(value, displayUnit), locale)}\u00a0${temperatureUnit(displayUnit)}`;
}

function formatTemperatureDelta(value: number, displayUnit: FiringScheduleDisplayUnit, locale: string) {
  const converted = displayUnit === 'fahrenheit' ? value * 9 / 5 : value;
  const prefix = converted > 0 ? '+' : '';
  return `${prefix}${formatNumber(converted, locale)}\u00a0${temperatureUnit(displayUnit)}`;
}

function formatRate(value: number, displayUnit: FiringScheduleDisplayUnit, locale: string) {
  return `${formatNumber(convertFiringRate(value, displayUnit), locale)}\u00a0${temperatureUnit(displayUnit)}/h`;
}

function formatDuration(seconds: number, locale: string) {
  const roundedMinutes = Math.round(seconds / 60);
  const hours = Math.floor(roundedMinutes / 60);
  const minutes = roundedMinutes % 60;
  if (hours && minutes) return `${formatNumber(hours, locale)} h ${formatNumber(minutes, locale)} min`;
  if (hours) return `${formatNumber(hours, locale)} h`;
  return `${formatNumber(minutes, locale)} min`;
}

function segmentRate(segment: FiringScheduleSegment, displayUnit: FiringScheduleDisplayUnit, locale: string) {
  if (segment.rateCelsiusPerHour === 'full') {
    return `Full rate · estimated ${formatDuration(segment.rampSeconds, locale)}`;
  }
  return formatRate(segment.rateCelsiusPerHour, displayUnit, locale);
}

function chartGeometry(model: FiringScheduleModel) {
  const width = 720;
  const height = 320;
  const inset = { top: 20, right: 22, bottom: 48, left: 64 };
  const plotWidth = width - inset.left - inset.right;
  const plotHeight = height - inset.top - inset.bottom;
  const totalSeconds = Math.max(model.totalPlannedSeconds, model.totalActualSeconds, 1);
  const rawMinimum = Math.min(0, model.minimumTemperatureCelsius);
  const rawMaximum = Math.max(model.maximumTemperatureCelsius, rawMinimum + 100);
  const temperatureStep = rawMaximum > 1000 ? 250 : rawMaximum > 500 ? 100 : 50;
  const minimumCelsius = Math.floor(rawMinimum / temperatureStep) * temperatureStep;
  const maximumCelsius = Math.ceil(rawMaximum / temperatureStep) * temperatureStep;
  const temperatureRange = Math.max(maximumCelsius - minimumCelsius, 1);
  const x = (seconds: number) => inset.left + (seconds / totalSeconds) * plotWidth;
  const y = (celsius: number) => inset.top + (1 - ((celsius - minimumCelsius) / temperatureRange)) * plotHeight;
  const path = (points: readonly FiringScheduleActualSampleInput[]) => points
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${x(point.elapsedSeconds).toFixed(2)} ${y(point.temperatureCelsius).toFixed(2)}`)
    .join(' ');

  return {
    width,
    height,
    inset,
    x,
    y,
    path,
    totalSeconds,
    minimumCelsius,
    maximumCelsius,
    xTicks: Array.from({ length: 5 }, (_, index) => totalSeconds * index / 4),
    yTicks: Array.from({ length: 5 }, (_, index) => minimumCelsius + (maximumCelsius - minimumCelsius) * index / 4),
  };
}

function unavailableCell() {
  return <span aria-label="Not available">—</span>;
}

export default function FiringScheduleArtwork({
  id,
  title = 'Firing schedule',
  startingTemperatureCelsius,
  segments,
  actualSamples = [],
  actualSummaries = [],
  view,
  displayUnit = 'celsius',
  actualStatus = 'complete',
  headingLevel = 2,
  locale = 'en-US',
  className = '',
}: FiringScheduleArtworkProps) {
  const rootId = id.trim();
  const visibleTitle = title.trim();
  const model = createFiringScheduleModel({
    startingTemperatureCelsius,
    segments,
    actualSamples,
    actualSummaries,
  });

  if (!rootId || !model) return null;

  const hasActual = model.actualPoints.length > 0;
  const effectiveView = resolveFiringScheduleView(view, hasActual);
  const showPlanned = effectiveView !== 'actual';
  const showActual = hasActual && effectiveView !== 'planned';
  const geometry = chartGeometry(model);
  const Root = (visibleTitle ? 'section' : 'div') as ElementType;
  const Heading = `h${headingLevel}` as ElementType;
  const titleId = `${rootId}-title`;
  const chartTitleId = `${rootId}-chart-title`;
  const chartDescriptionId = `${rootId}-chart-description`;
  const tableCaption = `${visibleTitle || 'Firing schedule'} segments`;
  const actualBySegment = new Map(model.actualSummaries.map((summary) => [summary.segmentId, summary]));
  const visibleSeries = effectiveView === 'both' ? 'Planned and observed' : effectiveView === 'actual' ? 'Observed' : 'Planned';
  const maximumDisplayTemperature = formatTemperature(model.maximumTemperatureCelsius, displayUnit, locale);
  const totalDisplayTime = formatDuration(Math.max(model.totalPlannedSeconds, model.totalActualSeconds), locale);
  const largestDeviation = model.actualSummaries.reduce((largest, summary) => (
    Math.max(largest, Math.abs(summary.deviationCelsius))
  ), 0);
  const actualLifecycle = showActual
    ? ` Observed data is ${actualStatus === 'collecting' ? 'still collecting' : 'complete'}.`
    : '';
  const deviationSummary = showActual && largestDeviation > 0
    ? ` Largest segment deviation is ${formatTemperatureDelta(largestDeviation, displayUnit, locale)}.`
    : '';
  const chartSummary = `${visibleSeries} temperature over ${totalDisplayTime}, reaching up to ${maximumDisplayTemperature}.${actualLifecycle}${deviationSummary}`;

  return (
    <Root
      className={['firing-schedule', 'firing-info', className.trim() || null].filter(Boolean).join(' ')}
      aria-labelledby={visibleTitle ? titleId : undefined}
      data-view={effectiveView}
      data-display-unit={displayUnit}
      data-starting-temperature-celsius={model.startingTemperatureCelsius}
      data-actual-status={hasActual ? actualStatus : undefined}
    >
      {visibleTitle && (
        <header className="firing-schedule__header firing-info__header">
          <Heading className="firing-schedule__title firing-info__title" id={titleId} dir="auto">
            {visibleTitle}
          </Heading>
        </header>
      )}

      <p className="firing-schedule__summary">
        Starts at <bdi>{formatTemperature(model.startingTemperatureCelsius, displayUnit, locale)}</bdi>
        {' · '}Planned duration <bdi>{formatDuration(model.totalPlannedSeconds, locale)}</bdi>
        {showActual && <> · Observed series {actualStatus === 'collecting' ? 'collecting' : 'complete'}</>}
      </p>

      <figure className="firing-schedule__chart">
        <div className="firing-schedule__chart-scroll" tabIndex={0} aria-label="Firing schedule chart scroll area">
          <svg
            className="firing-schedule__plot"
            viewBox={`0 0 ${geometry.width} ${geometry.height}`}
            role="img"
            aria-labelledby={`${chartTitleId} ${chartDescriptionId}`}
            focusable="false"
          >
            <title id={chartTitleId}>{visibleSeries} firing temperature over elapsed time</title>
            <desc id={chartDescriptionId}>{chartSummary}</desc>
            <g className="firing-schedule__grid" aria-hidden="true">
              {geometry.yTicks.map((tick) => (
                <line key={`y-${tick}`} x1={geometry.inset.left} x2={geometry.width - geometry.inset.right} y1={geometry.y(tick)} y2={geometry.y(tick)} />
              ))}
              {geometry.xTicks.map((tick) => (
                <line key={`x-${tick}`} x1={geometry.x(tick)} x2={geometry.x(tick)} y1={geometry.inset.top} y2={geometry.height - geometry.inset.bottom} />
              ))}
            </g>
            <g className="firing-schedule__axes" aria-hidden="true">
              {geometry.yTicks.map((tick) => (
                <text key={`yl-${tick}`} x={geometry.inset.left - 10} y={geometry.y(tick) + 4} textAnchor="end">
                  {formatNumber(convertFiringTemperature(tick, displayUnit), locale)}
                </text>
              ))}
              {geometry.xTicks.map((tick) => (
                <text key={`xl-${tick}`} x={geometry.x(tick)} y={geometry.height - geometry.inset.bottom + 22} textAnchor="middle">
                  {formatNumber(tick / 3600, locale, 1)} h
                </text>
              ))}
              <text className="firing-schedule__axis-name" x={geometry.inset.left + (geometry.width - geometry.inset.left - geometry.inset.right) / 2} y={geometry.height - 8} textAnchor="middle">
                Elapsed time
              </text>
              <text className="firing-schedule__axis-name" x={16} y={geometry.inset.top + (geometry.height - geometry.inset.top - geometry.inset.bottom) / 2} textAnchor="middle" transform={`rotate(-90 16 ${geometry.inset.top + (geometry.height - geometry.inset.top - geometry.inset.bottom) / 2})`}>
                Temperature ({temperatureUnit(displayUnit)})
              </text>
            </g>
            {showPlanned && <path className="firing-schedule__series firing-schedule__series--planned" d={geometry.path(model.plannedPoints)} />}
            {showActual && model.actualPoints.length > 1 && <path className="firing-schedule__series firing-schedule__series--actual" d={geometry.path(model.actualPoints)} />}
            {showActual && model.actualPoints.length === 1 && (
              <circle className="firing-schedule__actual-point" cx={geometry.x(model.actualPoints[0].elapsedSeconds)} cy={geometry.y(model.actualPoints[0].temperatureCelsius)} r="4" />
            )}
          </svg>
        </div>
        <ul className="firing-schedule__legend" role="list" aria-label="Visible chart series">
          {showPlanned && <li><span className="firing-schedule__legend-line firing-schedule__legend-line--planned" aria-hidden="true" />Planned</li>}
          {showActual && <li><span className="firing-schedule__legend-line firing-schedule__legend-line--actual" aria-hidden="true" />Actual {actualStatus === 'collecting' ? '(collecting)' : ''}</li>}
        </ul>
        <figcaption>{chartSummary}</figcaption>
      </figure>

      <DataTableArtwork
        caption={tableCaption}
        wrapperLabel={`${tableCaption} scroll area`}
        wrapperClassName="firing-schedule__table"
        tableClassName="firing-schedule__data-table"
      >
        <thead>
          <tr>
            <th scope="col">Segment</th>
            <th scope="col">Rate</th>
            <th scope="col">Target</th>
            <th scope="col">Hold</th>
            <th scope="col">Planned duration</th>
            {showActual && <th scope="col">Actual duration</th>}
            {showActual && <th scope="col">Reached</th>}
            {showActual && <th scope="col">Deviation</th>}
          </tr>
        </thead>
        <tbody>
          {model.segments.map((segment) => {
            const actual = actualBySegment.get(segment.segmentId);
            return (
              <tr key={segment.segmentId} data-segment-id={segment.segmentId}>
                <th scope="row" dir="auto">{segment.label}</th>
                <td><bdi>{segmentRate(segment, displayUnit, locale)}</bdi></td>
                <td><bdi>{formatTemperature(segment.targetTemperatureCelsius, displayUnit, locale)}</bdi></td>
                <td><bdi>{formatDuration(segment.holdSeconds, locale)}</bdi></td>
                <td><bdi>{formatDuration(segment.plannedDurationSeconds, locale)}</bdi></td>
                {showActual && <td><bdi>{actual ? formatDuration(actual.durationSeconds, locale) : unavailableCell()}</bdi></td>}
                {showActual && <td><bdi>{actual ? formatTemperature(actual.reachedTemperatureCelsius, displayUnit, locale) : unavailableCell()}</bdi></td>}
                {showActual && <td><bdi>{actual ? formatTemperatureDelta(actual.deviationCelsius, displayUnit, locale) : unavailableCell()}</bdi></td>}
              </tr>
            );
          })}
        </tbody>
      </DataTableArtwork>
    </Root>
  );
}
