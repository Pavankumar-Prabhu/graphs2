import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PieChartView } from './pie-chart.js';

describe('PieChartView', () => {
  it('renders aria label', () => {
    render(
      <PieChartView
        data={[{ label: 'North', value: 40 }]}
        series={[{ key: 'value', label: 'Value', colorVar: '--chart-series-1' }]}
      />
    );

    expect(screen.getByLabelText('Pie chart')).toBeInTheDocument();
  });

  it('renders shared chart UI when frames are provided', () => {
    render(
      <PieChartView
        title="Sales overview"
        subtitle="Regional split"
        data={[{ label: 'North', value: 40 }]}
        frames={{ q1: [{ label: 'North', value: 40 }] }}
        sliderItems={[{ key: 'q1', label: 'Q1' }]}
        series={[{ key: 'value', label: 'Value', colorVar: '--chart-series-1' }]}
        info={{ description: 'Helpful details' }}
      />
    );

    expect(screen.getByText('Sales overview')).toBeInTheDocument();
    expect(screen.getByText('Regional split')).toBeInTheDocument();
    expect(screen.getByText('Q1')).toBeInTheDocument();
  });
});
