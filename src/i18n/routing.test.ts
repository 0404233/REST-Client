import { describe, it, expect } from 'vitest';
import { routing } from './routing';

describe('routing configuration', () => {
  it('exposes the correct locales array', () => {
    expect(routing.locales).toEqual(['en', 'ru']);
  });

  it('uses the correct default locale', () => {
    expect(routing.defaultLocale).toBe('en');
  });

  it('ensures defaultLocale is one of the locales', () => {
    expect(routing.locales).toContain(routing.defaultLocale);
  });
});
