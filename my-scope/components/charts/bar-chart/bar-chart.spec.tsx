import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { BarChartView } from './bar-chart.js';

describe('BarChartView', () => {
  it('renders aria label', () => {
    render(
      <BarChartView
        data={[{ label: 'North', sales: 40 }]}
        series={[{ key: 'sales', label: 'Sales', colorVar: '--chart-series-1' }]}
      />
    );

    expect(screen.getByLabelText('Bar chart')).toBeInTheDocument();
  });

  it('renders shared chart UI when frames are provided', () => {
    render(
      <BarChartView
        title="Sales overview"
        subtitle="Quarterly comparison"
        data={[{ label: 'North', sales: 40 }]}
        frames={{ q1: [{ label: 'North', sales: 40 }] }}
        sliderItems={[{ key: 'q1', label: 'Q1' }]}
        series={[{ key: 'sales', label: 'Sales', colorVar: '--chart-series-1' }]}
        info={{ description: 'Helpful details' }}
      />
    );

    expect(screen.getByText('Sales overview')).toBeInTheDocument();
    expect(screen.getByText('Quarterly comparison')).toBeInTheDocument();
    expect(screen.getByText('Q1')).toBeInTheDocument();
  });
});
