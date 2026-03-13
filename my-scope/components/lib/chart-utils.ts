import type { DataPoint, LegendItem, SeriesConfig } from './chart-types';

export function getLegendItems(series: SeriesConfig[]): LegendItem[] {
  return series.map((item) => ({
    key: item.key,
    label: item.label,
    colorVar: item.colorVar,
  }));
}

export function getActiveFrameData<T extends Record<string, unknown>>(
  frames: Record<string, T[]>,
  activeFrameKey?: string
): T[] {
  if (!activeFrameKey) {
    const firstKey = Object.keys(frames)[0];
    return firstKey ? frames[firstKey] : [];
  }
  return frames[activeFrameKey] ?? [];
}

export function getNumericValue(point: DataPoint, key: string): number {
  const value = point[key];
  const num = typeof value === 'number' ? value : Number(value);
  return Number.isNaN(num) ? 0 : num;
}

export function getMaxValue(data: DataPoint[], keys: string[]): number {
  return Math.max(
    0,
    ...data.map((point) => keys.reduce((sum, key) => sum + getNumericValue(point, key), 0))
  );
}
