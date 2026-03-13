import React from 'react';
import { ChartTooltip } from './chart-tooltip.js';

export const BasicChartTooltip = () => {
  return (
    <ChartTooltip
      title="North"
      rows={[
        { label: 'Sales', value: 20 },
        { label: 'Growth', value: '12%' },
      ]}
    />
  );
}
