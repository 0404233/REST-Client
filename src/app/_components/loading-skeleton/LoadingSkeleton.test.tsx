import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { describe, it, beforeEach, expect } from 'vitest';
import LoadingSkeleton from './LoadingSkeleton';

describe('LoadingSkeleton Component', () => {
  beforeEach(() => {
    cleanup();
  });

  it('renders a section with the expected layout classes', () => {
    const { container } = render(<LoadingSkeleton w={10} h={20} b={5} />);
    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
    expect(section).toHaveClass(
      'container',
      'flex',
      'flex-col',
      'items-center',
      'flex-grow',
      'justify-center'
    );
  });

  it('renders a spinner div with dynamic size and border classes based on props', () => {
    const w = 8;
    const h = 12;
    const b = 3;
    const { container } = render(<LoadingSkeleton w={w} h={h} b={b} />);
    const spinner = container.querySelector('section > div');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass(
      'animate-spin',
      'rounded-full',
      `h-${h}`,
      `w-${w}`,
      `border-b-${b}`,
      'border-rose-400'
    );
  });
});
