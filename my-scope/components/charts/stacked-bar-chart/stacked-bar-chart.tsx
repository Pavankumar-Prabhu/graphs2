import React from 'react';
import '@my-scope/components.styles';
import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { ChartTooltip } from '@my-scope/components.ui.chart-tooltip';
import type { DataPoint } from '@my-scope/components.lib';
import type { StackedBarChartProps } from './stacked-bar-chart.types.js';

function getPointByLabel(data: DataPoint[], label: string) {
  return data.find((point) => point.label === label);
}

export function StackedBarChartView({
  data,
  series,
  onPointClick,
  height = 360,
  plotTitle,
  xAxisLabel,
  yAxisLabel,
}: StackedBarChartProps) {
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
              onClick={(entry) => onPointClick?.(entry as unknown as typeof data[number])}
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
