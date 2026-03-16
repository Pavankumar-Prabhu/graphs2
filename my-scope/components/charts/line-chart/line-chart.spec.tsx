import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { LineChartView } from './line-chart.js';

describe('LineChartView', () => {
  it('renders aria label', () => {
    render(
      <LineChartView
        data={[{ label: 'North', sales: 40 }]}
        series={[{ key: 'sales', label: 'Sales', colorVar: '--chart-series-1' }]}
      />
    );

    expect(screen.getByLabelText('Line chart')).toBeInTheDocument();
  });

  it('renders shared chart UI when frames are provided', () => {
    render(
      <LineChartView
        title="Sales overview"
        subtitle="Regional trend"
        data={[{ label: 'North', sales: 40 }]}
        frames={{ q1: [{ label: 'North', sales: 40 }] }}
        sliderItems={[{ key: 'q1', label: 'Q1' }]}
        series={[{ key: 'sales', label: 'Sales', colorVar: '--chart-series-1' }]}
        info={{ description: 'Helpful details' }}
      />
    );

    expect(screen.getByText('Sales overview')).toBeInTheDocument();
    expect(screen.getByText('Regional trend')).toBeInTheDocument();
    expect(screen.getByText('Q1')).toBeInTheDocument();
  });
});
