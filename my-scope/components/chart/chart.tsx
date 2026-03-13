import React from 'react';
import { cn, navigateToPoint, getLegendItems } from '@my-scope/components.lib';
import '@my-scope/components.styles';
import { BarChartView } from '@my-scope/components.charts.bar-chart';
import { LineChartView } from '@my-scope/components.charts.line-chart';
import { PieChartView } from '@my-scope/components.charts.pie-chart';
import { StackedBarChartView } from '@my-scope/components.charts.stacked-bar-chart';
import { ChartContainer } from '@my-scope/components.ui.chart-container';
import { ChartHeader } from '@my-scope/components.ui.chart-header';
import { ChartInfo } from '@my-scope/components.ui.chart-info';
import { ChartLegend } from '@my-scope/components.ui.chart-legend';
import { ChartSlider } from '@my-scope/components.ui.chart-slider';
import { ChartTabs } from '@my-scope/components.ui.chart-tabs';
import { ChartToggle } from '@my-scope/components.ui.chart-toggle';
import { useChartState } from './chart.hooks.js';
import type { ChartProps, ChartVariantConfig } from './chart.types.js';
import { getDefaultChartTabs } from './chart.utils.js';
import './chart.styles.css';

export function Chart({
  title,
  subtitle,
  frames,
  sliderItems,
  series,
  legendItems,
  info,
  onNavigate,
  onFrameChange,
  onChartTypeChange,
  defaultChartType = 'line',
  chartTypeOptions,
  sliderEnabledDefault = true,
  plotTitle,
  xAxisLabel,
  yAxisLabel,
  actionLabel,
  height,
  innerRadius,
  outerRadius,
  variants,
}: ChartProps) {
  const availableTabs = chartTypeOptions ?? getDefaultChartTabs(variants);
  const resolvedDefaultChartType =
    variants && !variants[defaultChartType]
      ? (availableTabs[0]?.value ?? defaultChartType)
      : defaultChartType;

  const fallbackConfig: ChartVariantConfig = {
    subtitle,
    frames: frames ?? {},
    sliderItems: sliderItems ?? [],
    series: series ?? [],
    legendItems,
    plotTitle,
    xAxisLabel,
    yAxisLabel,
    actionLabel,
    height,
    innerRadius,
    outerRadius,
  };

  const {
    activeChartType,
    setActiveChartType,
    sliderEnabled,
    setSliderEnabled,
    activeFrameKey,
    setActiveFrameKey,
    activeConfig,
    activeSliderItems,
    activeData,
  } = useChartState({
    defaultChartType: resolvedDefaultChartType,
    sliderEnabledDefault,
    fallbackConfig,
    variants,
  });

  const activeSeries = activeConfig.series;
  const activeLegendItems = activeConfig.legendItems ?? getLegendItems(activeSeries);
  const activeSubtitle = activeConfig.subtitle ?? subtitle;

  const handlePointClick = (point: Record<string, unknown>) => {
    navigateToPoint(typeof point.href === 'string' ? point.href : undefined, point, onNavigate);
  };

  const renderActiveChart = () => {
    switch (activeChartType) {
      case 'pie':
        return (
          <PieChartView
            data={activeData}
            series={activeSeries}
            onPointClick={handlePointClick}
            height={activeConfig.height ?? 360}
            innerRadius={activeConfig.innerRadius ?? 0}
            outerRadius={activeConfig.outerRadius ?? 132}
            plotTitle={activeConfig.plotTitle}
          />
        );
      case 'bar':
        return (
          <BarChartView
            data={activeData}
            series={activeSeries}
            onPointClick={handlePointClick}
            height={activeConfig.height ?? 420}
            plotTitle={activeConfig.plotTitle}
            xAxisLabel={activeConfig.xAxisLabel}
            yAxisLabel={activeConfig.yAxisLabel}
          />
        );
      case 'stacked-bar':
        return (
          <StackedBarChartView
            data={activeData}
            series={activeSeries}
            onPointClick={handlePointClick}
            height={activeConfig.height ?? 420}
            plotTitle={activeConfig.plotTitle}
            xAxisLabel={activeConfig.xAxisLabel}
            yAxisLabel={activeConfig.yAxisLabel}
          />
        );
      case 'line':
      default:
        return (
          <LineChartView
            data={activeData}
            series={activeSeries}
            onPointClick={handlePointClick}
            height={activeConfig.height ?? 420}
            plotTitle={activeConfig.plotTitle}
            xAxisLabel={activeConfig.xAxisLabel}
            yAxisLabel={activeConfig.yAxisLabel}
          />
        );
    }
  };

  return (
    <section className="chart-root chart-theme-root">
      <div className="chart-top-row">
        <div className="chart-heading-stack">
          <ChartHeader title={title} subtitle={activeSubtitle} />

          <div className="chart-tabs-block">
            <div className="chart-tabs-label">Chart Type</div>
            <ChartTabs
              value={activeChartType}
              options={availableTabs}
              onChange={(value) => {
                setActiveChartType(value);
                onChartTypeChange?.(value);
              }}
            />
          </div>
        </div>

        <div className="chart-top-side">
          {info ? <ChartInfo {...info} /> : null}
          {activeLegendItems.length ? (
            <ChartLegend items={activeLegendItems} orientation="vertical" />
          ) : null}
          {activeConfig.actionLabel ? (
            <button type="button" className="chart-action-button">
              <span className="chart-action-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path
                    d="M20 12a8 8 0 1 1-2.34-5.66"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path d="M20 4v6h-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span>{activeConfig.actionLabel}</span>
            </button>
          ) : null}
        </div>
      </div>

      <ChartContainer
        className={cn(
          'chart-main-panel',
          activeChartType === 'pie' && 'chart-main-panel-centered'
        )}
      >
        {renderActiveChart()}
      </ChartContainer>

      <div className="chart-footer-row">
        <div className="chart-footer-slider">
          <ChartSlider
            items={activeSliderItems}
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
    </section>
  );
}
