import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, beforeEach, vi, expect } from 'vitest';

vi.mock('../../../auth-links/AuthLinks', () => ({
  __esModule: true,
  default: () => <div data-testid="auth-links" />,
}));

vi.mock('./language-switcher/LanguageSwitcher', () => ({
  __esModule: true,
  default: () => <div data-testid="language-switcher" />,
}));

import UserAuthLanguageBar from './UserAuthLanguageBar';

describe('UserAuthLanguageBar', () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('renders AuthLinks and LanguageSwitcher components', () => {
    render(<UserAuthLanguageBar />);
    expect(screen.getByTestId('auth-links')).toBeInTheDocument();
    expect(screen.getByTestId('language-switcher')).toBeInTheDocument();
  });

  it('applies the correct layout classes on the wrapper div', () => {
    const { container } = render(<UserAuthLanguageBar />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('flex', 'gap-4');
  });

  it('renders children in the correct order: AuthLinks first, then LanguageSwitcher', () => {
    const { container } = render(<UserAuthLanguageBar />);
    const wrapper = container.firstChild as HTMLElement;
    const children = Array.from(wrapper.children);
    expect(children[0]).toHaveAttribute('data-testid', 'auth-links');
    expect(children[1]).toHaveAttribute('data-testid', 'language-switcher');
  });
});
