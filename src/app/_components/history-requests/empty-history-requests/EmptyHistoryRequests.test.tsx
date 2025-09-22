// src/app/_components/history-requests/EmptyHistoryRequests.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, beforeAll, vi, expect } from 'vitest';
import EmptyHistoryRequests from './EmptyHistoryRequests';
import { useTranslations } from 'next-intl';

// Mock next-intl
vi.mock('next-intl', () => ({
  __esModule: true,
  useTranslations: vi.fn(),
}));
const mockedUseTranslations = vi.mocked(useTranslations);

vi.mock('i18n/navigation', () => ({
  __esModule: true,
  Link: ({ href, children, className }: any) => (
    <a data-testid="rest-link" href={href} className={className}>
      {children}
    </a>
  ),
}));

describe('EmptyHistoryRequests', () => {
  beforeAll(() => {
    const t = ((key: string) => key) as any;
    t.rich = t;
    t.markup = t;
    t.raw = t;
    t.has = () => true;
    mockedUseTranslations.mockReturnValue(t);
  });

  it('renders wrapper with correct layout classes', () => {
    const { container } = render(<EmptyHistoryRequests />);
    const wrapper = container.firstChild as HTMLElement;

    expect(wrapper).toHaveClass('flex', 'flex-col', 'gap-4');
  });

  it('renders heading with translation key "noRequests"', () => {
    render(<EmptyHistoryRequests />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('noRequests');
  });

  it('renders a Link to "/rest" with translation key "restClient" and correct classes', () => {
    render(<EmptyHistoryRequests />);
    const link = screen.getByTestId('rest-link');

    expect(link).toHaveTextContent('restClient');
    expect(link).toHaveAttribute('href', '/rest');
    expect(link).toHaveClass(
      'flex',
      'flex-col',
      'gap-4',
      'transition-text',
      'duration-200',
      'hover:text-[#f02eaa]'
    );
  });
});
