import { describe, expect, it } from 'vitest';
import { cn } from './cn';

describe('cn', () => {
  it('joins valid class names', () => {
    expect(cn('a', 'b', 'c')).toBe('a b c');
  });

  it('filters falsey values', () => {
    expect(cn('a', false, undefined, null, 'b')).toBe('a b');
  });
});
