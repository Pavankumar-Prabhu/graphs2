import React from 'react';
import { PieChartView } from './pie-chart.js';

const sliderItems = [
  { key: 'q1', label: 'Q1' },
  { key: 'q2', label: 'Q2' },
  { key: 'q3', label: 'Q3' },
  { key: 'q4', label: 'Q4' },
];

const frames = {
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

const legendItems = [
  { key: 'south', label: 'South', colorVar: '--chart-accent-orange' },
  { key: 'east', label: 'East', colorVar: '--chart-accent-teal' },
  { key: 'west', label: 'West', colorVar: '--chart-accent-sage' },
];

const series = [{ key: 'value', label: 'Quarter Sales($1000s)', colorVar: '--chart-accent-teal' }];

export const BasicPieChart = () => {
  return (
    <PieChartView
      title="Sales Performance overview"
      subtitle="Distribution of sales across regions"
      data={frames.q1}
      frames={frames}
      sliderItems={sliderItems}
      series={series}
      legendItems={legendItems}
      info={{ description: 'Quarterly sales split by region.' }}
      plotTitle="Quarter Sales($1000s)"
      height={360}
      outerRadius={138}
    />
  );
};
