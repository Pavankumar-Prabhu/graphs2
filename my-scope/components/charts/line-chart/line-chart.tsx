import React, { useEffect, useMemo, useState } from 'react';
import {
  getActiveFrameData,
  getLegendItems,
  navigateToPoint,
  type DataPoint,
} from '@my-scope/components.lib';
import '@my-scope/components.styles';
import {
  CartesianGrid,
  Line,
  LineChart as RechartsLineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  type DotProps,
} from 'recharts';
import { ChartContainer } from '@my-scope/components.ui.chart-container';
import { ChartHeader } from '@my-scope/components.ui.chart-header';
import { ChartInfo } from '@my-scope/components.ui.chart-info';
import { ChartLegend } from '@my-scope/components.ui.chart-legend';
import { ChartSlider } from '@my-scope/components.ui.chart-slider';
import { ChartToggle } from '@my-scope/components.ui.chart-toggle';
import { ChartTooltip } from '@my-scope/components.ui.chart-tooltip';
import type { LineChartProps } from './line-chart.types.js';

function ClickableDot(
  props: DotProps & { payload?: DataPoint; onPointClick?: (point: DataPoint) => void }
) {
  const { cx, cy, payload, onPointClick } = props;

  if (cx == null || cy == null) {
    return null;
  }

  const colorVar =
    typeof payload?.colorVar === 'string' ? payload.colorVar : '--chart-series-1';

  return (
    <circle
      cx={cx}
      cy={cy}
      r={6}
      fill={`var(${colorVar})`}
      stroke="var(--chart-surface)"
      strokeWidth={2}
      style={{ cursor: payload ? 'pointer' : 'default' }}
      onClick={() => payload && onPointClick?.(payload)}
    />
  );
}

function getPointByLabel(data: DataPoint[], label: string) {
  return data.find((point) => point.label === label);
}

type LineChartCanvasProps = Pick<
  LineChartProps,
  'height' | 'plotTitle' | 'series' | 'xAxisLabel' | 'yAxisLabel'
> & {
  data: DataPoint[];
  onPointClick?: (point: DataPoint) => void;
};

function LineChartCanvas({
  data,
  series,
  onPointClick,
  height = 360,
  plotTitle,
  xAxisLabel,
  yAxisLabel,
}: LineChartCanvasProps) {
  const firstSeries = series[0];

  return (
    <div
      className="chart-canvas"
      aria-label="Line chart"
      onClickCapture={(event) => {
        const target = event.target as HTMLElement;
        const label = target.textContent?.trim();

        if (!label) {
          return;
        }

        const point = getPointByLabel(data, label);
        if (point) {
          onPointClick?.(point);
        }
      }}
    >
      {plotTitle ? <div className="chart-plot-title">{plotTitle}</div> : null}
      {yAxisLabel ? <div className="chart-axis-label chart-axis-label-y">{yAxisLabel}</div> : null}
      <ResponsiveContainer width="100%" height={height}>
        <RechartsLineChart data={data} margin={{ top: 42, right: 18, left: 28, bottom: 28 }}>
          <CartesianGrid stroke="var(--chart-grid)" vertical={false} />
          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={{ stroke: 'var(--chart-axis)' }}
            tick={{ fill: 'var(--chart-text-secondary)', fontSize: 16, fontWeight: 700 }}
          />
          <YAxis
            tickLine={false}
            axisLine={{ stroke: 'var(--chart-axis)' }}
            tick={{ fill: 'var(--chart-text-secondary)', fontSize: 16, fontWeight: 700 }}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (!active || !payload?.length) {
                return null;
              }

              const point = payload[0]?.payload as Record<string, unknown>;
              const pointColorVar =
                typeof point.colorVar === 'string' ? point.colorVar : firstSeries?.colorVar;

              return (
                <ChartTooltip
                  title={String(point.label ?? '')}
                  rows={[
                    {
                      label: String(point.label ?? firstSeries?.label ?? 'Value'),
                      value: String(point[firstSeries?.key ?? 'value'] ?? '0'),
                      colorVar: pointColorVar,
                    },
                  ]}
                />
              );
            }}
          />
          <Line
            type="monotone"
            dataKey={firstSeries?.key ?? 'value'}
            stroke="var(--chart-axis)"
            strokeWidth={2}
            dot={<ClickableDot onPointClick={onPointClick} />}
            activeDot={{ r: 7, fill: 'var(--chart-surface)', stroke: 'var(--chart-axis)' }}
          />
        </RechartsLineChart>
      </ResponsiveContainer>
      {xAxisLabel ? <div className="chart-axis-label chart-axis-label-x">{xAxisLabel}</div> : null}
      <div className="chart-canvas-accessible-points">
        {data.map((point) => (
          <button
            key={point.label}
            type="button"
            className="chart-canvas-point-button"
            onClick={() => onPointClick?.(point)}
          >
            {point.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function LineChartView({
  title,
  subtitle,
  data,
  frames,
  sliderItems,
  series,
  legendItems,
  legendOrientation = 'vertical',
  info,
  onNavigate,
  onPointClick,
  onFrameChange,
  sliderEnabledDefault = true,
  height = 360,
  plotTitle,
  xAxisLabel,
  yAxisLabel,
}: LineChartProps) {
  const resolvedSliderItems =
    sliderItems?.length
      ? sliderItems
      : Object.keys(frames ?? {}).map((key) => ({ key, label: key }));
  const firstFrameKey = resolvedSliderItems[0]?.key ?? Object.keys(frames ?? {})[0] ?? '';
  const [activeFrameKey, setActiveFrameKey] = useState(firstFrameKey);
  const [sliderEnabled, setSliderEnabled] = useState(sliderEnabledDefault);

  useEffect(() => {
    if (!frames) {
      return;
    }

    if (!firstFrameKey) {
      if (activeFrameKey) {
        setActiveFrameKey('');
      }
      return;
    }

    const hasFrame = Object.prototype.hasOwnProperty.call(frames, activeFrameKey);
    if (!hasFrame) {
      setActiveFrameKey(firstFrameKey);
    }
  }, [activeFrameKey, firstFrameKey, frames]);

  const activeData = useMemo(
    () => (frames ? getActiveFrameData(frames, activeFrameKey) : data),
    [activeFrameKey, data, frames]
  );
  const activeLegendItems = legendItems ?? getLegendItems(series);
  const showTopRow = Boolean(title || subtitle || info || activeLegendItems.length);
  const showFooter = Boolean(frames && resolvedSliderItems.length);

  const handlePointClick = (point: DataPoint) => {
    onPointClick?.(point);
    navigateToPoint(
      typeof point.href === 'string' ? point.href : undefined,
      point as Record<string, unknown>,
      onNavigate
    );
  };

  if (!showTopRow && !showFooter) {
    return (
      <LineChartCanvas
        data={activeData}
        series={series}
        onPointClick={handlePointClick}
        height={height}
        plotTitle={plotTitle}
        xAxisLabel={xAxisLabel}
        yAxisLabel={yAxisLabel}
      />
    );
  }

  return (
    <section className="chart-root chart-theme-root">
      {showTopRow ? (
        <div className="chart-top-row">
          <div className="chart-heading-stack">
            {(title || subtitle) && <ChartHeader title={title ?? ''} subtitle={subtitle} />}
          </div>

          <div className="chart-top-side">
            {info ? <ChartInfo {...info} /> : null}
            {activeLegendItems.length ? (
              <ChartLegend items={activeLegendItems} orientation={legendOrientation} />
            ) : null}
          </div>
        </div>
      ) : null}

      <ChartContainer className="chart-main-panel">
        <LineChartCanvas
          data={activeData}
          series={series}
          onPointClick={handlePointClick}
          height={height}
          plotTitle={plotTitle}
          xAxisLabel={xAxisLabel}
          yAxisLabel={yAxisLabel}
        />
      </ChartContainer>

      {showFooter ? (
        <div className="chart-footer-row">
          <div className="chart-footer-slider">
            <ChartSlider
              items={resolvedSliderItems}
              activeKey={activeFrameKey}
              disabled={!sliderEnabled}
              onChange={(key) => {
                setActiveFrameKey(key);
                onFrameChange?.(key);
              }}
            />
          </div>
          <ChartToggle checked={sliderEnabled} onCheckedChange={setSliderEnabled} label="On" />
        </div>
      ) : null}
    </section>
  );
}
