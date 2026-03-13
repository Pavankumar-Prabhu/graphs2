import React from 'react';
import { ChartLegend } from './chart-legend.js';

export const BasicChartLegend = () => {
  return (
    <ChartLegend
      items={[
        { key: 'north', label: 'North', colorVar: '--chart-series-1' },
        { key: 'south', label: 'South', colorVar: '--chart-series-2' },
      ]}
    />
  );
}
