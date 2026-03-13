import type { ChartType } from '@my-scope/components.lib';

export type ChartTabsProps = {
  value: ChartType;
  options: Array<{ label: string; value: ChartType }>;
  onChange: (value: ChartType) => void;
};
