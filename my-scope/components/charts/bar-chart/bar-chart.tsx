import React from 'react';
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
import { ChartTooltip } from '@my-scope/components.ui.chart-tooltip';
import type { DataPoint } from '@my-scope/components.lib';
import type { BarChartProps } from './bar-chart.types.js';

function getPointByLabel(data: DataPoint[], label: string) {
  return data.find((point) => point.label === label);
}

export function BarChartView({
  data,
  series,
  onPointClick,
  height = 360,
  plotTitle,
  xAxisLabel,
  yAxisLabel,
}: BarChartProps) {
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
            onClick={(entry) => onPointClick?.(entry as unknown as typeof data[number])}
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
