import type {
  ChartType,
  DataPoint,
  InfoConfig,
  LegendItem,
  NavigationHandler,
  SeriesConfig,
  SliderItem,
} from '@my-scope/components.lib';

export type ChartTabOption = {
  label: string;
  value: ChartType;
};

export type ChartVariantConfig = {
  subtitle?: string;
  frames: Record<string, DataPoint[]>;
  sliderItems: SliderItem[];
  series: SeriesConfig[];
  legendItems?: LegendItem[];
  plotTitle?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  actionLabel?: string;
  height?: number;
  innerRadius?: number;
  outerRadius?: number;
};

export type ChartProps = {
  title: string;
  subtitle?: string;
  frames?: Record<string, DataPoint[]>;
  sliderItems?: SliderItem[];
  series?: SeriesConfig[];
  legendItems?: LegendItem[];
  info?: InfoConfig;
  onNavigate?: NavigationHandler;
  onFrameChange?: (key: string) => void;
  onChartTypeChange?: (value: ChartType) => void;
  defaultChartType?: ChartType;
  chartTypeOptions?: ChartTabOption[];
  sliderEnabledDefault?: boolean;
  plotTitle?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  actionLabel?: string;
  height?: number;
  innerRadius?: number;
  outerRadius?: number;
  variants?: Partial<Record<ChartType, ChartVariantConfig>>;
};
