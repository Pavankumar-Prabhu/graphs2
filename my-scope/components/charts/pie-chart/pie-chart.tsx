import React from 'react';
import '@my-scope/components.styles';
import { Cell, Pie, PieChart as RechartsPieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { ChartTooltip } from '@my-scope/components.ui.chart-tooltip';
import type { PieChartProps } from './pie-chart.types.js';

export function PieChartView({
  data,
  series,
  onPointClick,
  height = 360,
  innerRadius = 0,
  outerRadius = 120,
  plotTitle,
}: PieChartProps) {
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
            onClick={(entry) => onPointClick?.(entry as unknown as typeof data[number])}
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
