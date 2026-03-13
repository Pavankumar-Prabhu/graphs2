import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ChartHeader } from './chart-header.js';

describe('ChartHeader', () => {
  it('renders title', () => {
    render(<ChartHeader title="Sales Performance overview" />);
    expect(screen.getByText('Sales Performance overview')).toBeInTheDocument();
  });

  it('renders subtitle when provided', () => {
    render(<ChartHeader title="A" subtitle="B" />);
    expect(screen.getByText('B')).toBeInTheDocument();
  });
});
