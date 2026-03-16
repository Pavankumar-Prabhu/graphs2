import React, { useEffect, useMemo, useState } from 'react';
import {
  getActiveFrameData,
  getLegendItems,
  navigateToPoint,
  type DataPoint,
} from '@my-scope/components.lib';
import '@my-scope/components.styles';
import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { ChartContainer } from '@my-scope/components.ui.chart-container';
import { ChartHeader } from '@my-scope/components.ui.chart-header';
import { ChartInfo } from '@my-scope/components.ui.chart-info';
import { ChartLegend } from '@my-scope/components.ui.chart-legend';
import { ChartSlider } from '@my-scope/components.ui.chart-slider';
import { ChartToggle } from '@my-scope/components.ui.chart-toggle';
import { ChartTooltip } from '@my-scope/components.ui.chart-tooltip';
import type { BarChartProps } from './bar-chart.types.js';

function getPointByLabel(data: DataPoint[], label: string) {
  return data.find((point) => point.label === label);
}

type BarChartCanvasProps = Pick<
  BarChartProps,
  'height' | 'plotTitle' | 'series' | 'xAxisLabel' | 'yAxisLabel'
> & {
  data: DataPoint[];
  onPointClick?: (point: DataPoint) => void;
};

function BarChartCanvas({
  data,
  series,
  onPointClick,
  height = 360,
  plotTitle,
  xAxisLabel,
  yAxisLabel,
}: BarChartCanvasProps) {
  const firstSeries = series[0];

  return (
    <div
      className="chart-canvas"
      aria-label="Bar chart"
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
        <RechartsBarChart data={data} margin={{ top: 46, right: 12, left: 28, bottom: 28 }}>
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
          <Bar
            dataKey={firstSeries?.key ?? 'value'}
            radius={[4, 4, 0, 0]}
            barSize={82}
            onClick={(entry) => onPointClick?.(entry as unknown as DataPoint)}
          >
            {data.map((point, index) => {
              const colorVar =
                typeof point.colorVar === 'string'
                  ? point.colorVar
                  : firstSeries?.colorVar ?? '--chart-series-1';

              return <Cell key={`${point.label}-${index}`} fill={`var(${colorVar})`} />;
            })}
          </Bar>
        </RechartsBarChart>
      </ResponsiveContainer>
      {xAxisLabel ? <div className="chart-axis-label chart-axis-label-x">{xAxisLabel}</div> : null}
    </div>
  );
}

export function BarChartView({
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
}: BarChartProps) {
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
      <BarChartCanvas
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
        <BarChartCanvas
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
