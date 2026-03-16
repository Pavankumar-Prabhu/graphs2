import type {
  DataPoint,
  InfoConfig,
  LegendItem,
  NavigationHandler,
  SeriesConfig,
  SliderItem,
} from './chart.shared.js';

export type LineChartProps = {
  title?: string;
  subtitle?: string;
  data: DataPoint[];
  frames?: Record<string, DataPoint[]>;
  sliderItems?: SliderItem[];
  series: SeriesConfig[];
  legendItems?: LegendItem[];
  legendOrientation?: 'horizontal' | 'vertical';
  info?: InfoConfig;
  onNavigate?: NavigationHandler;
  onPointClick?: (point: DataPoint) => void;
  onFrameChange?: (key: string) => void;
  sliderEnabledDefault?: boolean;
  height?: number;
  plotTitle?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
};
