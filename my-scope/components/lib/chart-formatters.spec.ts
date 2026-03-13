import { describe, expect, it } from 'vitest';
import { formatCurrency, formatNumber } from './chart-formatters';

describe('chart-formatters', () => {
  it('formats numbers', () => {
    expect(formatNumber(1000)).toContain('1');
  });

  it('formats currency', () => {
    expect(formatCurrency(1000, 'USD')).toContain('1');
  });

  it('returns dash for empty values', () => {
    expect(formatNumber(undefined)).toBe('-');
  });
});
