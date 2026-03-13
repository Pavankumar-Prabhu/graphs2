import React, { useState } from 'react';
import '@my-scope/components.styles';
import type { ChartInfoProps } from './chart-info.types.js';

export function ChartInfo({ title = 'Info', description }: ChartInfoProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="chart-info-root"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button type="button" aria-label="Chart information" className="chart-info-button">
        i
      </button>

      {open ? (
        <div role="tooltip" className="chart-info-popover">
          <div className="chart-info-popover-title">{title}</div>
          <p className="chart-info-popover-description">{description}</p>
        </div>
      ) : null}
    </div>
  );
}
