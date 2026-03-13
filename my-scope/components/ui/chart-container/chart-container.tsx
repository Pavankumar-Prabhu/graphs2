import React from 'react';
import { cn } from '@my-scope/components.lib';
import '@my-scope/components.styles';
import type { ChartContainerProps } from './chart-container.types.js';

export function ChartContainer({ className, children }: ChartContainerProps) {
  return <div className={cn('chart-container-root', className)}>{children}</div>;
}
