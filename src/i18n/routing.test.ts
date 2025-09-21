import { defineRouting } from 'next-intl/routing';

jest.mock('next-intl/routing', () => ({
  __esModule: true,
  defineRouting: jest.fn((config) => ({
    ...config,
    __mockedResult__: true,
  })),
}));

describe('i18n routing module', () => {
  interface MockedRouting {
    locales: string[];
    defaultLocale: string;
    __mockedResult__: true;
  }

  let routing: MockedRouting;

  beforeAll(async () => {
    const mod = await import('./routing');
    routing = mod.routing as unknown as MockedRouting;
  });

  it('calls defineRouting with correct locales and defaultLocale', () => {
    expect(defineRouting).toHaveBeenCalledTimes(1);
    expect(defineRouting).toHaveBeenCalledWith({
      locales: ['en', 'ru'],
      defaultLocale: 'en',
    });
  });

  it('exports the value returned by defineRouting', () => {
    expect(routing).toEqual({
      locales: ['en', 'ru'],
      defaultLocale: 'en',
      __mockedResult__: true,
    });
  });
});
