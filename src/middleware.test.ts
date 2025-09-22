import { describe, it, expect, vi } from 'vitest';
import { routing } from './i18n/routing';

const { createMiddlewareStub } = vi.hoisted(() => ({
  createMiddlewareStub: vi.fn((...args: any[]) => 'MIDDLEWARE'),
}));

vi.mock('next-intl/middleware', () => ({
  __esModule: true,
  default: createMiddlewareStub,
}));

import middleware, { config } from './middleware';

describe('i18n middleware setup', () => {
  it('calls createMiddleware with the routing config', () => {
    expect(createMiddlewareStub).toHaveBeenCalledTimes(1);
    expect(createMiddlewareStub).toHaveBeenCalledWith(routing);
  });

  it('exports the middleware function returned by createMiddleware', () => {
    expect(middleware).toBe('MIDDLEWARE');
  });

  it('exports the correct matcher config', () => {
    expect(config).toEqual({
      matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
    });
  });
});
