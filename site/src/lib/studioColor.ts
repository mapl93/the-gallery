/** Supported sRGB authoring forms. Other CSS colors stay in the complete text editor. */
export interface StudioColorValue {
  channels: [number, number, number];
  alpha: number;
  hex: string;
}

const clamp = (value: number, max: number) => Math.max(0, Math.min(max, value));
const scalar = /^[-+]?(?:\d+\.?\d*|\.\d+)%?$/;

function colorValue(channels: [number, number, number], alpha: number): StudioColorValue {
  return {
    channels,
    alpha,
    hex: `#${channels.map((channel) => Math.round(channel).toString(16).padStart(2, '0')).join('')}`,
  };
}

export function parseStudioColor(value: string): StudioColorValue | null {
  const source = value.trim().toLowerCase();
  if (source === 'transparent') return colorValue([0, 0, 0], 0);
  const hex = source.match(/^#([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/)?.[1];
  if (hex) {
    const expanded = hex.length < 5 ? [...hex].map((digit) => digit + digit).join('') : hex;
    return colorValue(
      [0, 2, 4].map((offset) => parseInt(expanded.slice(offset, offset + 2), 16)) as [number, number, number],
      expanded.length === 8 ? parseInt(expanded.slice(6), 16) / 255 : 1
    );
  }

  const body = source.match(/^rgba?\(([^()]*)\)$/)?.[1];
  if (!body) return null;
  let parts: string[];
  if (body.includes(',')) {
    if (body.includes('/')) return null;
    parts = body.split(',').map((part) => part.trim());
    if (parts.length !== 3 && parts.length !== 4) return null;
    // Legacy syntax requires consistent channel units.
    if (new Set(parts.slice(0, 3).map((part) => part.endsWith('%'))).size !== 1) return null;
  } else {
    const [rgb, alpha, ...extra] = body.split('/');
    if (extra.length) return null;
    parts = rgb.trim().split(/\s+/);
    if (parts.length !== 3) return null;
    if (alpha !== undefined) parts.push(alpha.trim());
  }
  if (!parts.every((part) => scalar.test(part) && Number.isFinite(parseFloat(part)))) return null;
  const channels = parts.slice(0, 3).map((part) => (
    clamp(part.endsWith('%') ? parseFloat(part) / 100 * 255 : parseFloat(part), 255)
  )) as [number, number, number];
  const alpha = parts[3] === undefined ? 1
    : clamp(parseFloat(parts[3]) / (parts[3].endsWith('%') ? 100 : 1), 1);
  return colorValue(channels, alpha);
}

export function serializeStudioColor(value: StudioColorValue): string {
  // Keep fractional source channels when only opacity changes.
  return `rgba(${value.channels.join(', ')}, ${value.alpha})`;
}
