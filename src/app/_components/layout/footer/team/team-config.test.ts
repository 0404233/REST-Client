import { describe, it, expect } from 'vitest';
import { teamConfig } from './team-config';

describe('teamConfig', () => {
  it('is an array of three entries', () => {
    expect(Array.isArray(teamConfig)).toBe(true);
    expect(teamConfig).toHaveLength(3);
  });

  it('each entry has all required properties with correct types', () => {
    for (const item of teamConfig) {
      expect(item).toHaveProperty('href');
      expect(typeof item.href).toBe('string');
      expect(item.href).toMatch(/^https:\/\/github\.com\//);

      expect(item).toHaveProperty('target');
      expect(item.target).toBe('_blank');

      expect(item).toHaveProperty('src');
      expect(typeof item.src).toBe('string');
      expect(item.src).toMatch(/\.\w+$/);

      expect(item).toHaveProperty('width');
      expect(typeof item.width).toBe('number');
      expect(item.width).toBeGreaterThan(0);

      expect(item).toHaveProperty('height');
      expect(typeof item.height).toBe('number');
      expect(item.height).toBeGreaterThan(0);

      expect(item).toHaveProperty('alt');
      expect(typeof item.alt).toBe('string');
      expect(item.alt.length).toBeGreaterThan(0);

      expect(item).toHaveProperty('className');
      expect(typeof item.className).toBe('string');
      expect(item.className).toContain('cursor-pointer');
    }
  });

  it('hrefs are unique across entries', () => {
    const hrefs = teamConfig.map((i) => i.href);
    const unique = new Set(hrefs);
    expect(unique.size).toBe(hrefs.length);
  });
});
