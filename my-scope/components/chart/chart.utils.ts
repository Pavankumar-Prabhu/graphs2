import type { ChartType } from '@my-scope/components.lib';
import type { ChartTabOption } from './chart.types.js';

const ALL_TABS: ChartTabOption[] = [
  { label: 'Pie', value: 'pie' },
  { label: 'Bar', value: 'bar' },
  { label: 'Line', value: 'line' },
  { label: 'Stacked Bar', value: 'stacked-bar' },
];

export function getDefaultChartTabs(
  variants?: Partial<Record<ChartType, unknown>>
): ChartTabOption[] {
  if (!variants) {
    return ALL_TABS;
  }

  const available = new Set(Object.keys(variants) as ChartType[]);
  if (!available.size) {
    return ALL_TABS;
  }

  return ALL_TABS.filter((tab) => available.has(tab.value));
}
