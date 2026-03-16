import React, { useEffect, useMemo, useState } from 'react';
import {
  ChartContainer,
  ChartHeader,
  ChartInfo,
  ChartLegend,
  ChartSlider,
  ChartToggle,
  ChartTooltip,
  cn,
  getActiveFrameData,
  getLegendItems,
  navigateToPoint,
  type DataPoint,
} from './chart.shared.js';
import { Cell, Pie, PieChart as RechartsPieChart, ResponsiveContainer, Tooltip } from 'recharts';
import type { PieChartProps } from './pie-chart.types.js';

type PieChartCanvasProps = Pick<
  PieChartProps,
  'height' | 'innerRadius' | 'outerRadius' | 'plotTitle' | 'series'
> & {
  data: DataPoint[];
  onPointClick?: (point: DataPoint) => void;
};

function PieChartCanvas({
  data,
  series,
  onPointClick,
  height = 360,
  innerRadius = 0,
  outerRadius = 120,
  plotTitle,
}: PieChartCanvasProps) {
  const valueKey = series[0]?.key ?? 'value';

  return (
    <div className="chart-canvas chart-canvas-pie" aria-label="Pie chart">
      {plotTitle ? <div className="chart-plot-title chart-plot-title-pie">{plotTitle}</div> : null}
      <ResponsiveContainer width="100%" height={height}>
        <RechartsPieChart>
          <Pie
            data={data}
            dataKey={valueKey}
            nameKey="label"
            cx="50%"
            cy="52%"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            stroke="transparent"
            onClick={(entry) => onPointClick?.(entry as unknown as DataPoint)}
          >
            {data.map((entry, index) => {
              const explicitColorVar =
                typeof entry.colorVar === 'string'
                  ? entry.colorVar
                  : series[index]?.colorVar ?? series[0]?.colorVar ?? '--chart-series-1';

              return <Cell key={`${entry.label}-${index}`} fill={`var(${explicitColorVar})`} />;
            })}
          </Pie>
          <Tooltip
            content={({ active, payload }) => {
              if (!active || !payload?.length) {
                return null;
              }

              const point = payload[0]?.payload as Record<string, unknown>;
              const pointColorVar =
                typeof point.colorVar === 'string' ? point.colorVar : series[0]?.colorVar;

              return (
                <ChartTooltip
                  title={String(point.label ?? '')}
                  rows={[
                    {
                      label: String(point.label ?? series[0]?.label ?? 'Value'),
                      value: String(point[valueKey] ?? '0'),
                      colorVar: pointColorVar,
                    },
                  ]}
                />
              );
            }}
          />
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  );
}

export function PieChartView({
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
  innerRadius = 0,
  outerRadius = 120,
  plotTitle,
}: PieChartProps) {
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
      <PieChartCanvas
        data={activeData}
        series={series}
        onPointClick={handlePointClick}
        height={height}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        plotTitle={plotTitle}
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

      <ChartContainer className={cn('chart-main-panel', 'chart-main-panel-centered')}>
        <PieChartCanvas
          data={activeData}
          series={series}
          onPointClick={handlePointClick}
          height={height}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          plotTitle={plotTitle}
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
