import React from 'react';
import { cn } from '@my-scope/components.lib';
import '@my-scope/components.styles';
import type { ChartToggleProps } from './chart-toggle.types.js';

export function ChartToggle({ checked, label = 'On', onCheckedChange }: ChartToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onCheckedChange(!checked)}
      className={cn('chart-toggle-root', checked && 'chart-toggle-root-on')}
    >
      <span className="chart-toggle-label">{label}</span>
      <span aria-hidden="true" className="chart-toggle-thumb" />
    </button>
  );
}
