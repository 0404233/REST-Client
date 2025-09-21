import { describe, it, expect, vi } from 'vitest';

vi.mock('next-intl/middleware', () => {
  const createMiddlewareMock = vi.fn().mockReturnValue('MIDDLEWARE');
  return {
    __esModule: true,
    default: createMiddlewareMock,
  };
});

import createMiddleware from 'next-intl/middleware';
import middleware, { config } from '../../../middleware';
import { routing } from '../../../i18n/routing';

describe('i18n middleware module', () => {
  it('should call createMiddleware with the routing config', () => {
    expect(createMiddleware).toHaveBeenCalledTimes(1);
    expect(createMiddleware).toHaveBeenCalledWith(routing);
  });

  it('should export the value returned by createMiddleware as default', () => {
    expect(middleware).toBe('MIDDLEWARE');
  });

  it('should export the correct matcher config', () => {
    expect(config).toEqual({
      matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
    });
  });
});
