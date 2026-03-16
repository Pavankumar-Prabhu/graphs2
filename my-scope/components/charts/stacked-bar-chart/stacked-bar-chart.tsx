import React, { useEffect, useMemo, useState } from 'react';
import {
  ChartContainer,
  ChartHeader,
  ChartInfo,
  ChartLegend,
  ChartSlider,
  ChartToggle,
  ChartTooltip,
  getActiveFrameData,
  getLegendItems,
  navigateToPoint,
  type DataPoint,
} from './chart.shared.js';
import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { StackedBarChartProps } from './stacked-bar-chart.types.js';

function getPointByLabel(data: DataPoint[], label: string) {
  return data.find((point) => point.label === label);
}

type StackedBarChartCanvasProps = Pick<
  StackedBarChartProps,
  'height' | 'plotTitle' | 'series' | 'xAxisLabel' | 'yAxisLabel'
> & {
  data: DataPoint[];
  onPointClick?: (point: DataPoint) => void;
};

function StackedBarChartCanvas({
  data,
  series,
  onPointClick,
  height = 360,
  plotTitle,
  xAxisLabel,
  yAxisLabel,
}: StackedBarChartCanvasProps) {
  return (
    <div
      className="chart-canvas"
      aria-label="Stacked bar chart"
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
        <RechartsBarChart data={data} margin={{ top: 24, right: 18, left: 38, bottom: 28 }}>
          <CartesianGrid stroke="var(--chart-grid)" vertical={false} />
          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={false}
            tick={{ fill: 'var(--chart-text-secondary)', fontSize: 14, fontWeight: 500 }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            domain={[0, 100]}
            tickFormatter={(value) => `${value}%`}
            tick={{ fill: 'var(--chart-text-secondary)', fontSize: 14, fontWeight: 500 }}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (!active || !payload?.length) {
                return null;
              }

              const point = payload[0]?.payload as Record<string, unknown>;

              return (
                <ChartTooltip
                  title={String(point.label ?? '')}
                  rows={series.map((item) => ({
                    label: item.label,
                    value: `${String(point[item.key] ?? '0')}%`,
                    colorVar: item.colorVar,
                  }))}
                />
              );
            }}
          />
          {series.map((item, index) => (
            <Bar
              key={item.key}
              dataKey={item.key}
              stackId="stack"
              fill={`var(${item.colorVar})`}
              radius={index === series.length - 1 ? [4, 4, 0, 0] : [0, 0, 0, 0]}
              barSize={34}
              onClick={(entry) => onPointClick?.(entry as unknown as DataPoint)}
            />
          ))}
        </RechartsBarChart>
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

export function StackedBarChartView({
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
}: StackedBarChartProps) {
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
      <StackedBarChartCanvas
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
        <StackedBarChartCanvas
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
