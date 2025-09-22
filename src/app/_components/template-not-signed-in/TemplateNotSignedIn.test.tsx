import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, beforeEach, vi, expect } from 'vitest';
import { useTranslations } from 'next-intl';

vi.mock('next-intl', () => ({
  useTranslations: vi.fn(),
}));
const mockedUseTranslations = vi.mocked(useTranslations);

vi.mock('../auth-links/AuthLinks', () => ({
  __esModule: true,
  default: () => <div data-testid="auth-links" />,
}));

import TemplateNotSignedIn from './TemplateNotSignedIn';

describe('TemplateNotSignedIn Component', () => {
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

  it('calls useTranslations with the "common" namespace', () => {
    render(<TemplateNotSignedIn />);
    expect(mockedUseTranslations).toHaveBeenCalledWith('common');
  });

  it('renders a wrapper with the correct layout classes', () => {
    const { container } = render(<TemplateNotSignedIn />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('flex', 'flex-col', 'items-center', 'gap-3');
  });

  it('renders a heading with the translated welcome text and correct class', () => {
    render(<TemplateNotSignedIn />);
    const heading = screen.getByRole('heading', {
      name: 'translated-welcome',
    });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass('text-3xl');
  });

  it('renders the AuthLinks component below the heading', () => {
    const { container } = render(<TemplateNotSignedIn />);
    const wrapper = container.firstChild as HTMLElement;
    const [heading, authLinks] = Array.from(wrapper.children);
    expect(heading.tagName).toBe('H1');
    expect(authLinks).toHaveAttribute('data-testid', 'auth-links');
  });
});
