import React from 'react';
import { cn } from '@my-scope/components.lib';
import '@my-scope/components.styles';
import type { ChartTabsProps } from './chart-tabs.types.js';

export function ChartTabs({ value, options, onChange }: ChartTabsProps) {
  return (
    <div role="tablist" aria-label="Chart Type" className="chart-tabs-root">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          role="tab"
          aria-selected={value === option.value}
          onClick={() => onChange(option.value)}
          className={cn(
            'chart-tab-button',
            value === option.value && 'chart-tab-button-active'
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
