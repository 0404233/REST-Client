import React from 'react';
import { render, screen, cleanup, waitFor } from '@testing-library/react';
import { describe, it, beforeEach, afterEach, vi, expect } from 'vitest';
import Header from './Header';

vi.mock('./navbar/NavBar', () => ({
  __esModule: true,
  default: () => <div data-testid="nav-bar" />,
}));

describe('Header Component', () => {
  let addSpy: ReturnType<typeof vi.spyOn>;
  let removeSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
    addSpy = vi.spyOn(window, 'addEventListener');
    removeSpy = vi.spyOn(window, 'removeEventListener');
    Object.defineProperty(window, 'scrollY', {
      configurable: true,
      writable: true,
      value: 0,
    });
  });

  afterEach(() => {
    addSpy.mockRestore();
    removeSpy.mockRestore();
  });

  it('renders NavBar and applies default header classes when not scrolled', () => {
    render(<Header />);
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
    expect(screen.getByTestId('nav-bar')).toBeInTheDocument();
    expect(header).toHaveClass('sticky', 'top-0', 'px-4');
    expect(header).not.toHaveClass('bg-gray-950');
  });

  it('attaches and detaches the scroll event listener on mount and unmount', () => {
    const { unmount } = render(<Header />);
    expect(addSpy).toHaveBeenCalledWith('scroll', expect.any(Function), { passive: true });
    unmount();
    expect(removeSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
  });

  it('adds scrolled classes when window is scrolled past threshold', async () => {
    render(<Header />);
    Object.defineProperty(window, 'scrollY', {
      configurable: true,
      writable: true,
      value: 100,
    });
    window.dispatchEvent(new Event('scroll'));

    await waitFor(() => {
      const header = screen.getByRole('banner');
      expect(header).toHaveClass('bg-gray-950', 'transition', 'duration-200');
    });
  });
});
