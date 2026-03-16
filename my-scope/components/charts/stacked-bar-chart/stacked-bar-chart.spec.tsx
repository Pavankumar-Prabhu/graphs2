import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { StackedBarChartView } from './stacked-bar-chart.js';

describe('StackedBarChartView', () => {
  it('renders aria label', () => {
    render(
      <StackedBarChartView
        data={[{ label: 'North', a: 10, b: 15 }]}
        series={[
          { key: 'a', label: 'A', colorVar: '--chart-series-1' },
          { key: 'b', label: 'B', colorVar: '--chart-series-2' },
        ]}
      />
    );

    expect(screen.getByLabelText('Stacked bar chart')).toBeInTheDocument();
  });

  it('renders shared chart UI when frames are provided', () => {
    render(
      <StackedBarChartView
        title="Sales overview"
        subtitle="Product mix"
        data={[{ label: 'North', a: 10, b: 15 }]}
        frames={{ q1: [{ label: 'North', a: 10, b: 15 }] }}
        sliderItems={[{ key: 'q1', label: 'Q1' }]}
        series={[
          { key: 'a', label: 'A', colorVar: '--chart-series-1' },
          { key: 'b', label: 'B', colorVar: '--chart-series-2' },
        ]}
        info={{ description: 'Helpful details' }}
      />
    );

    expect(screen.getByText('Sales overview')).toBeInTheDocument();
    expect(screen.getByText('Product mix')).toBeInTheDocument();
    expect(screen.getByText('Q1')).toBeInTheDocument();
  });
});
