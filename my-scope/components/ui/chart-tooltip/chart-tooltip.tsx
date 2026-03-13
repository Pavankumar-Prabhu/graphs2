import React from 'react';
import '@my-scope/components.styles';
import type { ChartTooltipProps } from './chart-tooltip.types.js';

export function ChartTooltip({ title, rows }: ChartTooltipProps) {
  return (
    <div role="tooltip" className="chart-tooltip-root">
      {title ? <div className="chart-tooltip-title">{title}</div> : null}
      <ul className="chart-tooltip-rows">
        {rows.map((row) => (
          <li key={`${row.label}-${row.value}`} className="chart-tooltip-row">
            <span className="chart-tooltip-row-left">
              {row.colorVar ? (
                <span
                  aria-hidden="true"
                  className="chart-tooltip-row-dot"
                  style={{ background: `var(${row.colorVar})` }}
                />
              ) : null}
              <span>{row.label}</span>
            </span>
            <span className="chart-tooltip-row-value">{row.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
