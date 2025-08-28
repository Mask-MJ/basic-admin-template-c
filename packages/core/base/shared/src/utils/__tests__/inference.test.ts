import { describe, expect, it } from 'vitest';

import { getFirstNonNullOrUndefined, isHttpUrl, isWindow } from '../inference';

describe('isHttpUrl', () => {
  it("should return true when given 'http://example.com'", () => {
    expect(isHttpUrl('http://example.com')).toBe(true);
  });

  it("should return true when given 'https://example.com'", () => {
    expect(isHttpUrl('https://example.com')).toBe(true);
  });

  it("should return false when given 'ftp://example.com'", () => {
    expect(isHttpUrl('ftp://example.com')).toBe(false);
  });

  it("should return false when given 'example.com'", () => {
    expect(isHttpUrl('example.com')).toBe(false);
  });
});

describe('isWindow', () => {
  it('should return true for the window object', () => {
    expect(isWindow(window)).toBe(true);
  });

  it('should return false for other objects', () => {
    expect(isWindow({})).toBe(false);
    expect(isWindow([])).toBe(false);
    expect(isWindow(null)).toBe(false);
  });
});

describe('getFirstNonNullOrUndefined', () => {
  describe('getFirstNonNullOrUndefined', () => {
    it('should return the first non-null and non-undefined value for a number array', () => {
      expect(getFirstNonNullOrUndefined<number>(undefined, null, 0, 42)).toBe(
        0,
      );
      expect(getFirstNonNullOrUndefined<number>(null, undefined, 42, 123)).toBe(
        42,
      );
    });

    it('should return the first non-null and non-undefined value for a string array', () => {
      expect(
        getFirstNonNullOrUndefined<string>(undefined, null, '', 'hello'),
      ).toBe('');
      expect(
        getFirstNonNullOrUndefined<string>(null, undefined, 'test', 'world'),
      ).toBe('test');
    });

    it('should return undefined if all values are null or undefined', () => {
      expect(getFirstNonNullOrUndefined(undefined, null)).toBeUndefined();
      expect(getFirstNonNullOrUndefined(null)).toBeUndefined();
    });

    it('should work with a single value', () => {
      expect(getFirstNonNullOrUndefined(42)).toBe(42);
      expect(getFirstNonNullOrUndefined()).toBeUndefined();
      expect(getFirstNonNullOrUndefined(null)).toBeUndefined();
    });

    it('should handle mixed types correctly', () => {
      expect(
        getFirstNonNullOrUndefined<number | object | string>(
          undefined,
          null,
          'test',
          123,
          { key: 'value' },
        ),
      ).toBe('test');
      expect(
        getFirstNonNullOrUndefined<number | object | string>(
          null,
          undefined,
          [1, 2, 3],
          'string',
        ),
      ).toEqual([1, 2, 3]);
    });
  });
});
