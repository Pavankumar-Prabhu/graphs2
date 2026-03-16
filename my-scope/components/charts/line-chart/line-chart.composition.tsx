import React from 'react';
import { LineChartView } from './line-chart.js';

const sliderItems = [
  { key: 'q1', label: 'Q1' },
  { key: 'q2', label: 'Q2' },
  { key: 'q3', label: 'Q3' },
  { key: 'q4', label: 'Q4' },
];

const frames = {
  q1: [
    { label: 'North', sales: 21.5, colorVar: '--chart-accent-red' },
    { label: 'South', sales: 30.5, colorVar: '--chart-accent-orange' },
    { label: 'East', sales: 23.4, colorVar: '--chart-accent-green' },
    { label: 'West', sales: 30.4, colorVar: '--chart-accent-lime' },
    { label: 'Central', sales: 16.4, colorVar: '--chart-accent-blue' },
  ],
  q2: [
    { label: 'North', sales: 24.2, colorVar: '--chart-accent-red' },
    { label: 'South', sales: 29.1, colorVar: '--chart-accent-orange' },
    { label: 'East', sales: 21.8, colorVar: '--chart-accent-green' },
    { label: 'West', sales: 31.0, colorVar: '--chart-accent-lime' },
    { label: 'Central', sales: 18.9, colorVar: '--chart-accent-blue' },
  ],
  q3: [
    { label: 'North', sales: 25.8, colorVar: '--chart-accent-red' },
    { label: 'South', sales: 28.4, colorVar: '--chart-accent-orange' },
    { label: 'East', sales: 22.6, colorVar: '--chart-accent-green' },
    { label: 'West', sales: 29.7, colorVar: '--chart-accent-lime' },
    { label: 'Central', sales: 20.2, colorVar: '--chart-accent-blue' },
  ],
  q4: [
    { label: 'North', sales: 33.1, colorVar: '--chart-accent-red' },
    { label: 'South', sales: 26.5, colorVar: '--chart-accent-orange' },
    { label: 'East', sales: 21.7, colorVar: '--chart-accent-green' },
    { label: 'West', sales: 29.9, colorVar: '--chart-accent-lime' },
    { label: 'Central', sales: 26.5, colorVar: '--chart-accent-blue' },
  ],
};

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
    <LineChartView
      title="Sales Performance overview"
      subtitle="Sales trend across regions"
      data={frames.q1}
      frames={frames}
      sliderItems={sliderItems}
      series={series}
      legendItems={legendItems}
      info={{ description: 'Quarterly sales trend by region.' }}
      plotTitle="Quarter Sales($ 1000s)"
      xAxisLabel="Region"
      yAxisLabel="sales (In $ 1000)"
      height={420}
    />
  );
};
