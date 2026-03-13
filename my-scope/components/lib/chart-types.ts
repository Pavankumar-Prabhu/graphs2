export type ChartType = 'pie' | 'bar' | 'line' | 'stacked-bar';

export type Primitive = string | number;

export type SliderItem = {
  key: string;
  label: string;
};

export type SeriesConfig = {
  key: string;
  label: string;
  colorVar: string;
};

export type DataPoint = {
  label: string;
  href?: string;
  [key: string]: Primitive | undefined;
};

export type TooltipRow = {
  label: string;
  value: string | number;
  colorVar?: string;
};

export type InfoConfig = {
  title?: string;
  description: string;
};

export type LegendItem = {
  key: string;
  label: string;
  colorVar: string;
};
