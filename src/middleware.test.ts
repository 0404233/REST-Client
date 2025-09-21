import createMiddleware from 'next-intl/middleware';

jest.mock('next-intl/middleware', () => ({
  __esModule: true,
  default: jest.fn((routing) => ({
    __mockedMiddleware__: true,
    routing,
  })),
}));

jest.mock('./i18n/routing', () => ({
  __esModule: true,
  routing: { locales: ['en', 'ru'], defaultLocale: 'en' },
}));

describe('middleware entrypoint', () => {
  interface MockedMiddlewareResult {
    __mockedMiddleware__: boolean;
    routing: { locales: string[]; defaultLocale: string };
  }

  let middleware: MockedMiddlewareResult;
  let config: { matcher: string };

  beforeAll(async () => {
    const mod = await import('./middleware');

    middleware = mod.default as unknown as MockedMiddlewareResult;
    config = mod.config;
  });

  it('calls createMiddleware with the routing object', () => {
    expect(createMiddleware).toHaveBeenCalledTimes(1);
    expect(createMiddleware).toHaveBeenCalledWith({
      locales: ['en', 'ru'],
      defaultLocale: 'en',
    });
  });

  it('default export is the result of createMiddleware()', () => {
    expect(middleware).toEqual({
      __mockedMiddleware__: true,
      routing: { locales: ['en', 'ru'], defaultLocale: 'en' },
    });
  });

  it('exports the correct config.matcher', () => {
    expect(config).toEqual({
      matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
    });
  });
});
