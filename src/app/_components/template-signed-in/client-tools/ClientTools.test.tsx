import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, beforeEach, vi, expect } from 'vitest';
import { useTranslations } from 'next-intl';

vi.mock('next-intl', () => ({
  useTranslations: vi.fn(),
}));
const mockedUseTranslations = vi.mocked(useTranslations);

vi.mock('i18n/navigation', () => ({
  Link: ({ children, ...props }: any) => (
    <a data-testid={`link-${props.href}`} {...props}>
      {children}
    </a>
  ),
}));

import ClientTools from './ClientTools';

describe('ClientTools Component', () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
    const t = ((key: string) => `translated-${key}`) as any;
    t.rich = t;
    t.markup = t;
    t.raw = t;
    t.has = () => true;
    mockedUseTranslations.mockReturnValue(t);
  });

  it('calls useTranslations with no namespace', () => {
    render(<ClientTools />);
    expect(mockedUseTranslations).toHaveBeenCalledWith();
  });

  it('renders a flex container with gap-4', () => {
    const { container } = render(<ClientTools />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('flex', 'gap-4');
  });

  it('renders three links with correct href, classes, and translated text', () => {
    render(<ClientTools />);
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(3);

    const expected = [
      { href: '/rest', text: 'translated-restClient' },
      { href: '/history', text: 'translated-history' },
      { href: '/variables', text: 'translated-variables' },
    ];

    links.forEach((link, idx) => {
      expect(link).toHaveAttribute('href', expected[idx].href);
      expect(link).toHaveClass(
        'border-1',
        'border-transparent',
        'duration-300',
        'hover:border-b-[var(--border-b)]'
      );
      expect(link).toHaveTextContent(expected[idx].text);
    });
  });
});
