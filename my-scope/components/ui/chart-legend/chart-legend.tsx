import React from 'react';
import { cn } from '@my-scope/components.lib';
import '@my-scope/components.styles';
import type { ChartLegendProps } from './chart-legend.types.js';

export function ChartLegend({ items, orientation = 'vertical' }: ChartLegendProps) {
  return (
    <ul
      aria-label="Chart legend"
      data-orientation={orientation}
      className={cn(
        'chart-legend-root',
        orientation === 'horizontal' ? 'chart-legend-horizontal' : 'chart-legend-vertical'
      )}
    >
      {items.map((item) => (
        <li key={item.key} className="chart-legend-item">
          <span
            aria-hidden="true"
            className="chart-legend-dot"
            style={{
              background: `var(${item.colorVar})`,
            }}
          />
          <span className="chart-legend-label">{item.label}</span>
        </li>
      ))}
    </ul>
  );
}
