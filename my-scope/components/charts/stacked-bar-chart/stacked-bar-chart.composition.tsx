import React from 'react';
import '@my-scope/components.styles';
import { ChartLegend } from '@my-scope/components.ui.chart-legend';
import { StackedBarChartView } from './stacked-bar-chart.js';

const data = [
  { label: 'Jan', productA: 40, productB: 35, productC: 25 },
  { label: 'Feb', productA: 30, productB: 52, productC: 18 },
  { label: 'Mar', productA: 22, productB: 35, productC: 43 },
  { label: 'Apr', productA: 36, productB: 30, productC: 34 },
  { label: 'May', productA: 33, productB: 57, productC: 10 },
];

const legendItems = [
  { key: 'productA', label: 'Product A', colorVar: '--chart-product-1' },
  { key: 'productB', label: 'Product B', colorVar: '--chart-product-2' },
  { key: 'productC', label: 'Product C', colorVar: '--chart-product-3' },
];

const series = [
  { key: 'productA', label: 'Product A', colorVar: '--chart-product-1' },
  { key: 'productB', label: 'Product B', colorVar: '--chart-product-2' },
  { key: 'productC', label: 'Product C', colorVar: '--chart-product-3' },
];

export const BasicStackedBarChart = () => {
  return (
    <div className="chart-theme-root" style={{ maxWidth: '56rem', padding: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.35rem' }}>
        <ChartLegend items={legendItems} orientation="vertical" />
      </div>
      <StackedBarChartView
        data={data}
        series={series}
        xAxisLabel="Region"
        yAxisLabel="sales (In $ 1000)"
        height={420}
      />
    </div>
  );
};
