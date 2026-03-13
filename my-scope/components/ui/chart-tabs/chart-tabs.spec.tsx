import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ChartTabs } from './chart-tabs.js';

describe('ChartTabs', () => {
  it('renders all tabs', () => {
    render(
      <ChartTabs
        value="pie"
        onChange={() => undefined}
        options={[
          { label: 'Pie', value: 'pie' },
          { label: 'Bar', value: 'bar' },
        ]}
      />
    );

    expect(screen.getByText('Pie')).toBeInTheDocument();
    expect(screen.getByText('Bar')).toBeInTheDocument();
  });

  it('calls onChange when a tab is clicked', () => {
    const onChange = vi.fn();
    render(
      <ChartTabs
        value="pie"
        onChange={onChange}
        options={[
          { label: 'Pie', value: 'pie' },
          { label: 'Bar', value: 'bar' },
        ]}
      />
    );

    fireEvent.click(screen.getByText('Bar'));
    expect(onChange).toHaveBeenCalledWith('bar');
  });
});
