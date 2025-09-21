import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, beforeEach, vi, expect } from 'vitest';
import ImageTemplate from './ImageTemplate';

vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img data-testid="image-template-img" {...props} />,
}));

describe('ImageTemplate Component', () => {
  const src = '/icon.png';
  const lang = 'en';
  let setLangMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    cleanup();
    setLangMock = vi.fn();
    vi.clearAllMocks();
  });

  it('renders active shadow class when activeLang matches lang', () => {
    render(<ImageTemplate src={src} lang={lang} activeLang={lang} setLang={setLangMock} />);

    const img = screen.getByTestId('image-template-img');
    expect(img).toHaveClass('shadow-[0_0_7px_2px_var(--foreground)]');
    expect(img).not.toHaveClass('hover:shadow-[0_0_7px_2px_var(--foreground)]');
  });

  it('calls setLang callback with lang on click', () => {
    render(<ImageTemplate src={src} lang={lang} activeLang="fr" setLang={setLangMock} />);

    const img = screen.getByTestId('image-template-img');
    fireEvent.click(img);
    expect(setLangMock).toHaveBeenCalledTimes(1);
    expect(setLangMock).toHaveBeenCalledWith(lang);
  });
});
