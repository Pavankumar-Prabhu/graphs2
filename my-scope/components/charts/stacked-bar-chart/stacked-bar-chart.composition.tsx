import React from 'react';
import { StackedBarChartView } from './stacked-bar-chart.js';

const sliderItems = [
  { key: 'q1', label: 'Q1' },
  { key: 'q2', label: 'Q2' },
  { key: 'q3', label: 'Q3' },
  { key: 'q4', label: 'Q4' },
];

const frames = {
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
    <StackedBarChartView
      title="Sales Performance overview"
      subtitle="Distribution of sales by product"
      data={frames.q1}
      frames={frames}
      sliderItems={sliderItems}
      series={series}
      legendItems={legendItems}
      info={{ description: 'Quarterly product mix across months.' }}
      xAxisLabel="Month"
      yAxisLabel="sales share (%)"
      height={420}
    />
  );
};
