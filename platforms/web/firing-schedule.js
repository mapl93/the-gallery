/**
 * Target-agnostic Firing Schedule model.
 *
 * The helper derives planned elapsed time and chart points from one normalized
 * Celsius/seconds program. It does not connect to, poll, program, or control a
 * kiln. Targets remain responsible for technically reviewed source data,
 * applicability, provenance, safety content, localization, and observed-data
 * delivery.
 */

const isFiniteNumber = (value) => typeof value === 'number' && Number.isFinite(value);

function normalizeActualSamples(samples) {
  if (!Array.isArray(samples) || samples.length === 0) return [];

  const normalized = [];
  let previousElapsed = -1;

  for (const sample of samples) {
    const elapsedSeconds = sample?.elapsedSeconds;
    const temperatureCelsius = sample?.temperatureCelsius;
    if (
      !isFiniteNumber(elapsedSeconds)
      || elapsedSeconds < 0
      || elapsedSeconds <= previousElapsed
      || !isFiniteNumber(temperatureCelsius)
    ) return [];

    normalized.push({ elapsedSeconds, temperatureCelsius });
    previousElapsed = elapsedSeconds;
  }

  return normalized;
}

function normalizeActualSummaries(summaries, segmentIds) {
  if (!Array.isArray(summaries)) return [];

  const normalized = [];
  const seen = new Set();

  for (const summary of summaries) {
    const segmentId = typeof summary?.segmentId === 'string' ? summary.segmentId.trim() : '';
    if (
      !segmentId
      || !segmentIds.has(segmentId)
      || seen.has(segmentId)
      || !isFiniteNumber(summary.durationSeconds)
      || summary.durationSeconds < 0
      || !isFiniteNumber(summary.reachedTemperatureCelsius)
      || !isFiniteNumber(summary.deviationCelsius)
    ) continue;

    seen.add(segmentId);
    normalized.push({
      segmentId,
      durationSeconds: summary.durationSeconds,
      reachedTemperatureCelsius: summary.reachedTemperatureCelsius,
      deviationCelsius: summary.deviationCelsius,
    });
  }

  return normalized;
}

export function createFiringScheduleModel({
  startingTemperatureCelsius,
  segments,
  actualSamples = [],
  actualSummaries = [],
}) {
  if (!isFiniteNumber(startingTemperatureCelsius) || !Array.isArray(segments) || segments.length === 0) {
    return null;
  }

  const normalizedSegments = [];
  const segmentIds = new Set();
  const plannedPoints = [{ elapsedSeconds: 0, temperatureCelsius: startingTemperatureCelsius }];
  let elapsedSeconds = 0;
  let currentTemperatureCelsius = startingTemperatureCelsius;

  for (const [index, segment] of segments.entries()) {
    const segmentId = typeof segment?.segmentId === 'string' ? segment.segmentId.trim() : '';
    const targetTemperatureCelsius = segment?.targetTemperatureCelsius;
    const holdSeconds = segment?.holdSeconds;
    const rate = segment?.rateCelsiusPerHour;

    if (
      !segmentId
      || segmentIds.has(segmentId)
      || !isFiniteNumber(targetTemperatureCelsius)
      || !isFiniteNumber(holdSeconds)
      || holdSeconds < 0
    ) return null;

    let rampSeconds;
    let estimated = false;

    if (rate === 'full') {
      if (!isFiniteNumber(segment.estimatedRampSeconds) || segment.estimatedRampSeconds <= 0) return null;
      rampSeconds = segment.estimatedRampSeconds;
      estimated = true;
    } else {
      if (!isFiniteNumber(rate) || rate <= 0) return null;
      rampSeconds = Math.abs(targetTemperatureCelsius - currentTemperatureCelsius) / rate * 3600;
    }

    if (!isFiniteNumber(rampSeconds) || rampSeconds < 0 || rampSeconds + holdSeconds <= 0) return null;

    const startSeconds = elapsedSeconds;
    const rampEndSeconds = startSeconds + rampSeconds;
    const endSeconds = rampEndSeconds + holdSeconds;
    const label = typeof segment.label === 'string' && segment.label.trim()
      ? segment.label.trim()
      : `Segment ${index + 1}`;

    normalizedSegments.push({
      segmentId,
      label,
      rateCelsiusPerHour: rate,
      estimatedRampSeconds: estimated ? rampSeconds : null,
      startTemperatureCelsius: currentTemperatureCelsius,
      targetTemperatureCelsius,
      holdSeconds,
      rampSeconds,
      startSeconds,
      rampEndSeconds,
      endSeconds,
      plannedDurationSeconds: rampSeconds + holdSeconds,
    });

    segmentIds.add(segmentId);
    plannedPoints.push({ elapsedSeconds: rampEndSeconds, temperatureCelsius: targetTemperatureCelsius });
    if (holdSeconds > 0) {
      plannedPoints.push({ elapsedSeconds: endSeconds, temperatureCelsius: targetTemperatureCelsius });
    }

    elapsedSeconds = endSeconds;
    currentTemperatureCelsius = targetTemperatureCelsius;
  }

  const normalizedSamples = normalizeActualSamples(actualSamples);
  const normalizedSummaries = normalizeActualSummaries(actualSummaries, segmentIds);
  const allTemperatures = [
    ...plannedPoints.map((point) => point.temperatureCelsius),
    ...normalizedSamples.map((point) => point.temperatureCelsius),
  ];

  return {
    startingTemperatureCelsius,
    segments: normalizedSegments,
    plannedPoints,
    actualPoints: normalizedSamples,
    actualSummaries: normalizedSummaries,
    totalPlannedSeconds: elapsedSeconds,
    totalActualSeconds: normalizedSamples.length
      ? normalizedSamples[normalizedSamples.length - 1].elapsedSeconds
      : 0,
    minimumTemperatureCelsius: Math.min(...allTemperatures),
    maximumTemperatureCelsius: Math.max(...allTemperatures),
  };
}

export function resolveFiringScheduleView(requestedView, hasActual) {
  if (!hasActual) return 'planned';
  if (requestedView === 'planned' || requestedView === 'actual' || requestedView === 'both') {
    return requestedView;
  }
  return 'both';
}

export function convertFiringTemperature(celsius, displayUnit = 'celsius') {
  return displayUnit === 'fahrenheit' ? (celsius * 9 / 5) + 32 : celsius;
}

export function convertFiringRate(celsiusPerHour, displayUnit = 'celsius') {
  return displayUnit === 'fahrenheit' ? celsiusPerHour * 9 / 5 : celsiusPerHour;
}
