import type { DataPoint, SeriesConfig } from '@my-scope/components.lib';

export type PieChartProps = {
  data: DataPoint[];
  series: SeriesConfig[];
  onPointClick?: (point: DataPoint) => void;
  height?: number;
  innerRadius?: number;
  outerRadius?: number;
  plotTitle?: string;
};
