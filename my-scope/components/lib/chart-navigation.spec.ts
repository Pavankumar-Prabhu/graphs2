import { describe, expect, it, vi } from 'vitest';
import { navigateToPoint } from './chart-navigation';

describe('chart-navigation', () => {
  it('calls onNavigate when provided', () => {
    const onNavigate = vi.fn();
    navigateToPoint('/north', { label: 'North' }, onNavigate);
    expect(onNavigate).toHaveBeenCalledWith('/north', { label: 'North' });
  });

  it('does nothing when href is missing', () => {
    const onNavigate = vi.fn();
    navigateToPoint(undefined, { label: 'North' }, onNavigate);
    expect(onNavigate).not.toHaveBeenCalled();
  });
});
