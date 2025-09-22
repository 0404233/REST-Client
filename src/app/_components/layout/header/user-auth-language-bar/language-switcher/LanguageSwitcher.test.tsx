import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, beforeEach, vi, expect } from 'vitest';
import LanguageSwitcher from './LanguageSwitcher';

const usePathnameMock = vi.fn();
const replaceMock = vi.fn();
vi.mock('next/navigation', () => ({
  usePathname: () => usePathnameMock(),
  useRouter: () => ({ replace: replaceMock }),
}));
vi.mock('./image-template/ImageTemplate', () => ({
  __esModule: true,
  default: ({ lang, activeLang }: any) => (
    <span data-testid={`img-${lang}`} data-active={String(activeLang === lang)}>
      {lang}
    </span>
  ),
}));

describe('LanguageSwitcher Component', () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('renders two buttons with correct images and active state', () => {
    usePathnameMock.mockReturnValue('/en/home');
    render(<LanguageSwitcher />);
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(2);
    const enImg = screen.getByTestId('img-en');
    const ruImg = screen.getByTestId('img-ru');
    expect(enImg).toHaveAttribute('data-active', 'true');
    expect(ruImg).toHaveAttribute('data-active', 'false');
  });

  it('switches locale to "en" when first button clicked', () => {
    usePathnameMock.mockReturnValue('/ru/page');
    render(<LanguageSwitcher />);
    fireEvent.click(screen.getAllByRole('button')[0]);
    expect(replaceMock).toHaveBeenCalledWith('/en/page');
  });

  it('switches locale to "ru" when second button clicked', () => {
    usePathnameMock.mockReturnValue('/en/section');
    render(<LanguageSwitcher />);
    fireEvent.click(screen.getAllByRole('button')[1]);
    expect(replaceMock).toHaveBeenCalledWith('/ru/section');
  });

  it('defaults activeLang to "en" when pathname has no locale segment', () => {
    usePathnameMock.mockReturnValue('/');
    render(<LanguageSwitcher />);

    const enImg = screen.getByTestId('img-en');
    expect(enImg).toHaveAttribute('data-active', 'true');
  });
});
