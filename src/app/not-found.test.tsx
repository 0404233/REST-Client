import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

vi.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children, className }: any) =>
    React.createElement('a', { 'data-testid': 'link', href, className }, children),
}));

vi.mock('next-intl', () => ({
  __esModule: true,
  useTranslations: () => (key: string) => key,
}));

import NotFound from './not-found';

describe('NotFound component', () => {
  it('renders the 404 headings and messages with translated keys', () => {
    render(<NotFound />);

    const heading = screen.getByRole('heading', {
      level: 2,
      name: 'pageNotFound',
    });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass('text-5xl', 'text-rose-900');

    const message = screen.getByText('resourceNotFound');
    expect(message).toBeInTheDocument();
    expect(message).toHaveClass('text-xl', 'italic');
  });

  it('renders a link back home with correct href, text, and classes', () => {
    render(<NotFound />);

    const link = screen.getByTestId('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
    expect(link).toHaveTextContent('returnHome');

    expect(link).toHaveClass(
      'text-2xl',
      'text-amber-400',
      'cursor-pointer',
      'hover:text-yellow-200',
      'transition'
    );
  });
});
