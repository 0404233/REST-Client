import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
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

  it('renders a button with translated label', () => {
    const handler = vi.fn();
    render(<Button handleOpenPanel={handler} sectionName="settings" />);

    const btn = screen.getByRole('button', { name: 'settings' });
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveTextContent('settings');
  });

  it('applies the correct CSS classes', () => {
    render(<Button handleOpenPanel={vi.fn()} sectionName="profile" />);
    const btn = screen.getByRole('button', { name: 'profile' });
    expect(btn).toHaveClass(
      'cursor-pointer',
      'text-xl',
      'text-center',
      'text-gray-50',
      'font-bold',
      'hover:text-gray-400',
      'border-transparent',
      'border-1',
      'focus:border-b-gray-50',
      'transition',
      'capitalize'
    );
  });

  it('calls handleOpenPanel with the section name on click', () => {
    const handler = vi.fn();
    render(<Button handleOpenPanel={handler} sectionName="dashboard" />);

    const btn = screen.getByRole('button', { name: 'dashboard' });
    fireEvent.click(btn);
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith('dashboard');
  });
});
