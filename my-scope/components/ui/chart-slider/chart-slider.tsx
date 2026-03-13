import React from 'react';
import { cn } from '@my-scope/components.lib';
import '@my-scope/components.styles';
import type { ChartSliderProps } from './chart-slider.types.js';

export function ChartSlider({ items, activeKey, disabled, onChange }: ChartSliderProps) {
  return (
    <div aria-label="Chart slider" className="chart-slider-root">
      <div className={cn('chart-slider-track', disabled && 'chart-slider-track-disabled')}>
        {items.map((item) => (
          <button
            key={item.key}
            type="button"
            disabled={disabled}
            aria-pressed={activeKey === item.key}
            onClick={() => onChange(item.key)}
            className={cn('chart-slider-stop', activeKey === item.key && 'chart-slider-stop-active')}
          >
            <span aria-hidden="true" className="chart-slider-stop-dot" />
            <span className="chart-slider-stop-label">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
