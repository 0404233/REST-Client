import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, beforeEach, expect } from 'vitest';
import Status from './Status';

describe('Status Component', () => {
  beforeEach(() => {
    cleanup();
  });

  it('renders nothing when status is undefined', () => {
    const { container } = render(<Status />);
    expect(container.firstChild).toBeNull();
  });

  it('renders nothing when status is 0', () => {
    const { container } = render(<Status status={0} />);
    expect(container.firstChild).toBeNull();
  });

  it('displays OK message and green code when ok is true and status > 0', () => {
    render(<Status status={200} ok={true} />);

    const statusText = screen.getByText('Status: OK');
    expect(statusText).toBeInTheDocument();
    expect(statusText.tagName).toBe('P');
    expect(statusText).toHaveClass('text-lg');

    const codeLine = screen.getByText(/^Code:/);
    expect(codeLine).toBeInTheDocument();

    const codeValue = screen.getByText('200');
    expect(codeValue).toBeInTheDocument();
    expect(codeValue.tagName).toBe('SPAN');
    expect(codeValue).toHaveClass('text-green-500');
  });

  it('displays FAIL message and red code when ok is false', () => {
    render(<Status status={404} ok={false} />);

    const statusText = screen.getByText('Status: FAIL');
    expect(statusText).toBeInTheDocument();
    expect(statusText).toHaveClass('text-lg');

    const codeLine = screen.getByText(/^Code:/);
    expect(codeLine).toBeInTheDocument();

    const codeValue = screen.getByText('404');
    expect(codeValue).toBeInTheDocument();
    expect(codeValue).toHaveClass('text-red-400');
  });
});
