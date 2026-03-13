import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ChartLegend } from './chart-legend.js';

describe('ChartLegend', () => {
  it('renders legend items', () => {
    render(
      <ChartLegend items={[{ key: 'north', label: 'North', colorVar: '--chart-series-1' }]} />
    );
    expect(screen.getByText('North')).toBeInTheDocument();
  });

  it('renders legend container', () => {
    render(<ChartLegend items={[]} />);
    expect(screen.getByLabelText('Chart legend')).toBeInTheDocument();
  });
});
