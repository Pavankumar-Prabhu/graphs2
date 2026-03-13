import React from 'react';
import '@my-scope/components.styles';
import { ChartLegend } from '@my-scope/components.ui.chart-legend';
import { PieChartView } from './pie-chart.js';

const data = [
  { label: 'South', value: 24, colorVar: '--chart-accent-orange' },
  { label: 'East', value: 34, colorVar: '--chart-accent-teal' },
  { label: 'West', value: 42, colorVar: '--chart-accent-sage' },
];

const legendItems = [
  { key: 'south', label: 'South', colorVar: '--chart-accent-orange' },
  { key: 'east', label: 'East', colorVar: '--chart-accent-teal' },
  { key: 'west', label: 'West', colorVar: '--chart-accent-sage' },
];

const series = [{ key: 'value', label: 'Quarter Sales($1000s)', colorVar: '--chart-accent-teal' }];

export const BasicPieChart = () => {
  return (
    <div className="chart-theme-root" style={{ maxWidth: '48rem', padding: '1.5rem' }}>
      <PieChartView
        data={data}
        series={series}
        plotTitle="Quarter Sales($1000s)"
        height={360}
        outerRadius={138}
      />
      <div style={{ marginTop: '0.8rem' }}>
        <ChartLegend items={legendItems} orientation="horizontal" />
      </div>
    </div>
  );
};
