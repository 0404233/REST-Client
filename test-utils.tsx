import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';

export function renderWithIntl(
  ui: React.ReactElement,
  { locale = 'en', messages = {} } = {},
  options?: RenderOptions
) {
  return render(
    <NextIntlClientProvider locale={locale} messages={messages}>
      {ui}
    </NextIntlClientProvider>,
    options
  );
}
