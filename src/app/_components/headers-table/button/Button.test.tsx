import React from 'react';
import { render, screen, fireEvent, cleanup, waitFor } from '@testing-library/react';
import { describe, it, beforeEach, vi, expect } from 'vitest';
import Button from './Button';
import { useTranslations } from 'next-intl';

vi.mock('next-intl', () => ({
  useTranslations: vi.fn(),
}));
const mockedUseTranslations = vi.mocked(useTranslations);

describe('Button Component', () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
    const t = ((key: string) => key) as any;
    t.rich = t;
    t.markup = t;
    t.raw = t;
    t.has = () => true;
    mockedUseTranslations.mockReturnValue(t);
  });

  it('renders a button with translated text and aria-label', () => {
    const clickHandler = vi.fn();
    render(<Button handleChangeOpenTable={clickHandler} />);

    const btn = screen.getByRole('button', { name: 'headers' });
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveTextContent('headers');
    expect(btn).toHaveAttribute('aria-label', 'headers');
  });

  it('applies the expected CSS classes', () => {
    render(<Button handleChangeOpenTable={vi.fn()} />);
    const btn = screen.getByRole('button', { name: 'headers' });
    expect(btn).toHaveClass('w-full');
    expect(btn).toHaveClass('cursor-pointer');
    expect(btn).toHaveClass('text-xl');
    expect(btn).toHaveClass('text-start');
    expect(btn).toHaveClass('text-orange-300');
    expect(btn).toHaveClass('border-transparent');
    expect(btn).toHaveClass('border-1');
    expect(btn).toHaveClass('transition');
  });

  it('calls handleChangeOpenTable when clicked', async () => {
    const clickHandler = vi.fn();
    render(<Button handleChangeOpenTable={clickHandler} />);

    const btn = screen.getByRole('button', { name: 'headers' });
    fireEvent.click(btn);

    await waitFor(() => {
      expect(clickHandler).toHaveBeenCalledTimes(1);
    });
  });
});
