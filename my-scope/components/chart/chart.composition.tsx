import React from 'react';
import { Chart } from './chart.js';

const sliderItems = [
  { key: 'q1', label: 'Q1' },
  { key: 'q2', label: 'Q2' },
  { key: 'q3', label: 'Q3' },
  { key: 'q4', label: 'Q4' },
];

const pieVariants = {
  q1: [
    { label: 'South', value: 24, colorVar: '--chart-accent-orange' },
    { label: 'East', value: 34, colorVar: '--chart-accent-teal' },
    { label: 'West', value: 42, colorVar: '--chart-accent-sage' },
  ],
  q2: [
    { label: 'South', value: 22, colorVar: '--chart-accent-orange' },
    { label: 'East', value: 36, colorVar: '--chart-accent-teal' },
    { label: 'West', value: 42, colorVar: '--chart-accent-sage' },
  ],
  q3: [
    { label: 'South', value: 26, colorVar: '--chart-accent-orange' },
    { label: 'East', value: 33, colorVar: '--chart-accent-teal' },
    { label: 'West', value: 41, colorVar: '--chart-accent-sage' },
  ],
  q4: [
    { label: 'South', value: 25, colorVar: '--chart-accent-orange' },
    { label: 'East', value: 35, colorVar: '--chart-accent-teal' },
    { label: 'West', value: 40, colorVar: '--chart-accent-sage' },
  ],
};

const regionalLegend = [
  { key: 'north', label: 'North', colorVar: '--chart-accent-red' },
  { key: 'south', label: 'South', colorVar: '--chart-accent-orange' },
  { key: 'east', label: 'East', colorVar: '--chart-accent-green' },
  { key: 'west', label: 'West', colorVar: '--chart-accent-lime' },
  { key: 'central', label: 'Central', colorVar: '--chart-accent-blue' },
];

const barLineFrames = {
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

const stackedFrames = {
  q1: [
    { label: 'Jan', productA: 40, productB: 35, productC: 25 },
    { label: 'Feb', productA: 30, productB: 52, productC: 18 },
    { label: 'Mar', productA: 22, productB: 35, productC: 43 },
    { label: 'Apr', productA: 36, productB: 30, productC: 34 },
    { label: 'May', productA: 33, productB: 57, productC: 10 },
  ],
  q2: [
    { label: 'Jan', productA: 34, productB: 38, productC: 28 },
    { label: 'Feb', productA: 29, productB: 47, productC: 24 },
    { label: 'Mar', productA: 24, productB: 31, productC: 45 },
    { label: 'Apr', productA: 32, productB: 35, productC: 33 },
    { label: 'May', productA: 31, productB: 52, productC: 17 },
  ],
  q3: [
    { label: 'Jan', productA: 37, productB: 34, productC: 29 },
    { label: 'Feb', productA: 27, productB: 49, productC: 24 },
    { label: 'Mar', productA: 21, productB: 36, productC: 43 },
    { label: 'Apr', productA: 35, productB: 31, productC: 34 },
    { label: 'May', productA: 30, productB: 55, productC: 15 },
  ],
  q4: [
    { label: 'Jan', productA: 40, productB: 35, productC: 25 },
    { label: 'Feb', productA: 30, productB: 52, productC: 18 },
    { label: 'Mar', productA: 22, productB: 35, productC: 43 },
    { label: 'Apr', productA: 36, productB: 30, productC: 34 },
    { label: 'May', productA: 33, productB: 57, productC: 10 },
  ],
};

export const BasicChart = () => {
  return (
    <Chart
      title="Sales Performance overview"
      subtitle="Distribution of sales across regions"
      defaultChartType="stacked-bar"
      sliderItems={sliderItems}
      info={{ description: 'Quarterly sales performance by product and region.' }}
      variants={{
        pie: {
          subtitle: 'Distribution of sales across regions',
          frames: pieVariants,
          sliderItems,
          series: [{ key: 'value', label: 'Quarter Sales($1000s)', colorVar: '--chart-accent-teal' }],
          legendItems: [
            { key: 'south', label: 'South', colorVar: '--chart-accent-orange' },
            { key: 'east', label: 'East', colorVar: '--chart-accent-teal' },
            { key: 'west', label: 'West', colorVar: '--chart-accent-sage' },
          ],
          plotTitle: 'Quarter Sales($1000s)',
          innerRadius: 0,
          outerRadius: 138,
          height: 360,
        },
        bar: {
          subtitle: 'Quarterly sales comparison by region',
          frames: barLineFrames,
          sliderItems,
          series: [{ key: 'sales', label: 'Sales', colorVar: '--chart-accent-red' }],
          legendItems: regionalLegend,
          plotTitle: 'Quarter Sales($ 1000s)',
          xAxisLabel: 'Region',
          yAxisLabel: 'sales (In $ 1000)',
          height: 420,
        },
        line: {
          subtitle: 'Sales trend across regions',
          frames: barLineFrames,
          sliderItems,
          series: [{ key: 'sales', label: 'Sales', colorVar: '--chart-accent-red' }],
          legendItems: regionalLegend,
          plotTitle: 'Quarter Sales($ 1000s)',
          xAxisLabel: 'Region',
          yAxisLabel: 'sales (In $ 1000)',
          height: 420,
        },
        'stacked-bar': {
          subtitle: 'Distribution of sales across regions',
          frames: stackedFrames,
          sliderItems,
          series: [
            { key: 'productA', label: 'Product A', colorVar: '--chart-product-1' },
            { key: 'productB', label: 'Product B', colorVar: '--chart-product-2' },
            { key: 'productC', label: 'Product C', colorVar: '--chart-product-3' },
          ],
          legendItems: [
            { key: 'productA', label: 'Product A', colorVar: '--chart-product-1' },
            { key: 'productB', label: 'Product B', colorVar: '--chart-product-2' },
            { key: 'productC', label: 'Product C', colorVar: '--chart-product-3' },
          ],
          xAxisLabel: 'Region',
          yAxisLabel: 'sales (In $ 1000)',
          actionLabel: 'Reload',
          height: 420,
        },
      }}
    />
  );
};
