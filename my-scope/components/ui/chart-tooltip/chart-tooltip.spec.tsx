import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ChartTooltip } from './chart-tooltip.js';

describe('ChartTooltip', () => {
  it('renders tooltip title', () => {
    render(<ChartTooltip title="North" rows={[]} />);
    expect(screen.getByText('North')).toBeInTheDocument();
  });

  it('renders tooltip rows', () => {
    render(<ChartTooltip rows={[{ label: 'Sales', value: 20 }]} />);
    expect(screen.getByText('Sales')).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();
  });
});
