export type FiringScheduleView = 'planned' | 'actual' | 'both';
export type FiringScheduleDisplayUnit = 'celsius' | 'fahrenheit';
export type FiringScheduleActualStatus = 'collecting' | 'complete';

export interface FiringScheduleSegmentInput {
  segmentId: string;
  label?: string;
  rateCelsiusPerHour: number | 'full';
  targetTemperatureCelsius: number;
  holdSeconds: number;
  estimatedRampSeconds?: number;
}

export interface FiringScheduleActualSampleInput {
  elapsedSeconds: number;
  temperatureCelsius: number;
}

export interface FiringScheduleActualSummaryInput {
  segmentId: string;
  durationSeconds: number;
  reachedTemperatureCelsius: number;
  deviationCelsius: number;
}

export interface FiringScheduleSegment extends FiringScheduleSegmentInput {
  label: string;
  estimatedRampSeconds: number | null;
  startTemperatureCelsius: number;
  rampSeconds: number;
  startSeconds: number;
  rampEndSeconds: number;
  endSeconds: number;
  plannedDurationSeconds: number;
}

export interface FiringScheduleModel {
  startingTemperatureCelsius: number;
  segments: FiringScheduleSegment[];
  plannedPoints: FiringScheduleActualSampleInput[];
  actualPoints: FiringScheduleActualSampleInput[];
  actualSummaries: FiringScheduleActualSummaryInput[];
  totalPlannedSeconds: number;
  totalActualSeconds: number;
  minimumTemperatureCelsius: number;
  maximumTemperatureCelsius: number;
}

export function createFiringScheduleModel(input: {
  startingTemperatureCelsius: number;
  segments: readonly FiringScheduleSegmentInput[];
  actualSamples?: readonly FiringScheduleActualSampleInput[];
  actualSummaries?: readonly FiringScheduleActualSummaryInput[];
}): FiringScheduleModel | null;

export function resolveFiringScheduleView(
  requestedView: FiringScheduleView | undefined,
  hasActual: boolean,
): FiringScheduleView;

export function convertFiringTemperature(
  celsius: number,
  displayUnit?: FiringScheduleDisplayUnit,
): number;

export function convertFiringRate(
  celsiusPerHour: number,
  displayUnit?: FiringScheduleDisplayUnit,
): number;
