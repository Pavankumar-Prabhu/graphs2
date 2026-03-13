import React from 'react';
import '@my-scope/components.styles';
import type { ChartHeaderProps } from './chart-header.types.js';

export function ChartHeader({ title, subtitle }: ChartHeaderProps) {
  return (
    <div>
      <h2 className="chart-header-title">{title}</h2>
      {subtitle ? <p className="chart-header-subtitle">{subtitle}</p> : null}
    </div>
  );
}
