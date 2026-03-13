import { describe, expect, it } from 'vitest';
import { getActiveFrameData, getLegendItems, getMaxValue, getNumericValue } from './chart-utils';

describe('chart-utils', () => {
  it('maps legend items', () => {
    expect(
      getLegendItems([{ key: 'sales', label: 'Sales', colorVar: '--chart-series-1' }])
    ).toHaveLength(1);
  });

  it('gets first frame data when no key is provided', () => {
    const data = { jan: [{ label: 'North', sales: 10 }], feb: [{ label: 'South', sales: 20 }] };
    expect(getActiveFrameData(data)).toEqual([{ label: 'North', sales: 10 }]);
  });

  it('gets numeric value safely', () => {
    expect(getNumericValue({ label: 'North', sales: '20' }, 'sales')).toBe(20);
  });

  it('computes max stacked value', () => {
    expect(
      getMaxValue(
        [
          { label: 'Jan', a: 10, b: 20 },
          { label: 'Feb', a: 5, b: 8 },
        ],
        ['a', 'b']
      )
    ).toBe(30);
  });
});
