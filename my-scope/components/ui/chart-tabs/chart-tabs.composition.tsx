import React, { useState } from 'react';
import type { ChartType } from '@my-scope/components.lib';
import { ChartTabs } from './chart-tabs.js';

export const BasicChartTabs = () => {
  const [value, setValue] = useState<ChartType>('line');

  return (
    <ChartTabs
      value={value}
      onChange={setValue}
      options={[
        { label: 'Pie', value: 'pie' },
        { label: 'Bar', value: 'bar' },
        { label: 'Line', value: 'line' },
      ]}
    />
  );
}
