import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, beforeEach, afterEach, vi, expect } from 'vitest';
import NavBar from './NavBar';

vi.mock('../logo/Logo', () => ({
  __esModule: true,
  default: () => <div data-testid="logo" />,
}));
vi.mock('../user-auth-language-bar/UserAuthLanguageBar', () => ({
  __esModule: true,
  default: () => <div data-testid="user-auth-language-bar" />,
}));

describe('NavBar Component', () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('renders a <nav> with role="navigation"', () => {
    render(<NavBar />);
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
  });

  it('applies the correct layout classes to the <nav>', () => {
    render(<NavBar />);
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveClass('flex', 'justify-between', 'items-center');
  });

  it('renders the Logo and UserAuthLanguageBar children', () => {
    render(<NavBar />);
    expect(screen.getByTestId('logo')).toBeInTheDocument();
    expect(screen.getByTestId('user-auth-language-bar')).toBeInTheDocument();
  });

  it('renders children in the correct order: Logo first, then UserAuthLanguageBar', () => {
    render(<NavBar />);
    const nav = screen.getByRole('navigation');
    const children = Array.from(nav.children);
    expect(children[0]).toHaveAttribute('data-testid', 'logo');
    expect(children[1]).toHaveAttribute('data-testid', 'user-auth-language-bar');
  });
});
