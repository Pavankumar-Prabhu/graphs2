import React from 'react';
import '@my-scope/components.styles';
import { ChartLegend } from '@my-scope/components.ui.chart-legend';
import { LineChartView } from './line-chart.js';

const data = [
  { label: 'North', sales: 21.5, colorVar: '--chart-accent-red' },
  { label: 'South', sales: 30.5, colorVar: '--chart-accent-orange' },
  { label: 'East', sales: 23.4, colorVar: '--chart-accent-green' },
  { label: 'West', sales: 30.4, colorVar: '--chart-accent-lime' },
  { label: 'Central', sales: 16.4, colorVar: '--chart-accent-blue' },
];

const legendItems = [
  { key: 'north', label: 'North', colorVar: '--chart-accent-red' },
  { key: 'south', label: 'South', colorVar: '--chart-accent-orange' },
  { key: 'east', label: 'East', colorVar: '--chart-accent-green' },
  { key: 'west', label: 'West', colorVar: '--chart-accent-lime' },
  { key: 'central', label: 'Central', colorVar: '--chart-accent-blue' },
];

const series = [{ key: 'sales', label: 'Sales', colorVar: '--chart-accent-red' }];

export const BasicLineChart = () => {
  return (
    <div className="chart-theme-root" style={{ maxWidth: '56rem', padding: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.35rem' }}>
        <ChartLegend items={legendItems} orientation="vertical" />
      </div>
      <LineChartView
        data={data}
        series={series}
        plotTitle="Quarter Sales($ 1000s)"
        xAxisLabel="Region"
        yAxisLabel="sales (In $ 1000)"
        height={420}
      />
    </div>
  );
};
