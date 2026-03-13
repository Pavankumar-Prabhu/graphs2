import { useEffect, useMemo, useState } from 'react';
import { getActiveFrameData } from '@my-scope/components.lib';
import type { ChartType } from '@my-scope/components.lib';
import type { ChartVariantConfig } from './chart.types.js';

type UseChartStateArgs = {
  defaultChartType: ChartType;
  sliderEnabledDefault: boolean;
  fallbackConfig: ChartVariantConfig;
  variants?: Partial<Record<ChartType, ChartVariantConfig>>;
};

export function useChartState({
  defaultChartType,
  sliderEnabledDefault,
  fallbackConfig,
  variants,
}: UseChartStateArgs) {
  const [activeChartType, setActiveChartType] = useState<ChartType>(defaultChartType);
  const [sliderEnabled, setSliderEnabled] = useState(sliderEnabledDefault);
  const activeConfig = variants?.[activeChartType] ?? fallbackConfig;
  const frames = activeConfig.frames;
  const sliderItems = activeConfig.sliderItems;
  const firstFrameKey = sliderItems[0]?.key ?? Object.keys(frames)[0] ?? '';
  const [activeFrameKey, setActiveFrameKey] = useState(firstFrameKey);

  useEffect(() => {
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
    () => getActiveFrameData(frames, activeFrameKey),
    [activeFrameKey, frames]
  );

  return {
    activeChartType,
    setActiveChartType,
    sliderEnabled,
    setSliderEnabled,
    activeFrameKey,
    setActiveFrameKey,
    activeConfig,
    activeSliderItems: sliderItems,
    activeData,
  };
}
