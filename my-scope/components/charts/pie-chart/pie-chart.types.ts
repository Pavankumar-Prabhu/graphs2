import type {
  DataPoint,
  InfoConfig,
  LegendItem,
  NavigationHandler,
  SeriesConfig,
  SliderItem,
} from '@my-scope/components.lib';

export type PieChartProps = {
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
  innerRadius?: number;
  outerRadius?: number;
  plotTitle?: string;
};
