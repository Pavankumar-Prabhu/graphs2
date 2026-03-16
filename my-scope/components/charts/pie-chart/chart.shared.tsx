import React, { useState } from 'react';
import './chart.shared.css';

export type Primitive = string | number;

export type SliderItem = {
  key: string;
  label: string;
};

export type SeriesConfig = {
  key: string;
  label: string;
  colorVar: string;
};

export type DataPoint = {
  label: string;
  href?: string;
  [key: string]: Primitive | undefined;
};

export type TooltipRow = {
  label: string;
  value: string | number;
  colorVar?: string;
};

export type InfoConfig = {
  title?: string;
  description: string;
};

export type LegendItem = {
  key: string;
  label: string;
  colorVar: string;
};

export type NavigationHandler = (href: string, point?: Record<string, unknown>) => void;

export function cn(...classNames: Array<string | false | null | undefined>) {
  return classNames.filter(Boolean).join(' ');
}

export function getLegendItems(series: SeriesConfig[]): LegendItem[] {
  return series.map((item) => ({
    key: item.key,
    label: item.label,
    colorVar: item.colorVar,
  }));
}

export function getActiveFrameData<T extends Record<string, unknown>>(
  frames: Record<string, T[]>,
  activeFrameKey?: string
): T[] {
  if (!activeFrameKey) {
    const firstKey = Object.keys(frames)[0];
    return firstKey ? frames[firstKey] : [];
  }

  return frames[activeFrameKey] ?? [];
}

export function navigateToPoint(
  href: string | undefined,
  point: Record<string, unknown>,
  onNavigate?: NavigationHandler
) {
  if (!href) return;

  if (onNavigate) {
    onNavigate(href, point);
    return;
  }

  if (typeof window !== 'undefined') {
    window.location.href = href;
  }
}

type ChartContainerProps = {
  className?: string;
  children: React.ReactNode;
};

export function ChartContainer({ className, children }: ChartContainerProps) {
  return <div className={cn('chart-container-root', className)}>{children}</div>;
}

type ChartHeaderProps = {
  title: string;
  subtitle?: string;
};

export function ChartHeader({ title, subtitle }: ChartHeaderProps) {
  return (
    <div>
      <h2 className="chart-header-title">{title}</h2>
      {subtitle ? <p className="chart-header-subtitle">{subtitle}</p> : null}
    </div>
  );
}

export function ChartInfo({ title = 'Info', description }: InfoConfig) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="chart-info-root"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button type="button" aria-label="Chart information" className="chart-info-button">
        i
      </button>

      {open ? (
        <div role="tooltip" className="chart-info-popover">
          <div className="chart-info-popover-title">{title}</div>
          <p className="chart-info-popover-description">{description}</p>
        </div>
      ) : null}
    </div>
  );
}

type ChartLegendProps = {
  items: LegendItem[];
  orientation?: 'horizontal' | 'vertical';
};

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
            style={{ background: `var(${item.colorVar})` }}
          />
          <span className="chart-legend-label">{item.label}</span>
        </li>
      ))}
    </ul>
  );
}

type ChartSliderProps = {
  items: SliderItem[];
  activeKey: string;
  disabled?: boolean;
  onChange: (key: string) => void;
};

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

type ChartToggleProps = {
  checked: boolean;
  label?: string;
  onCheckedChange: (checked: boolean) => void;
};

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

type ChartTooltipProps = {
  title?: string;
  rows: TooltipRow[];
};

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
