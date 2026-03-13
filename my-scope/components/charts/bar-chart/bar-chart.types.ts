import type { DataPoint, SeriesConfig } from '@my-scope/components.lib';

export type BarChartProps = {
  data: DataPoint[];
  series: SeriesConfig[];
  onPointClick?: (point: DataPoint) => void;
  height?: number;
  plotTitle?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
};
