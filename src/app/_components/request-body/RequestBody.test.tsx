import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, beforeEach, vi, expect } from 'vitest';
import RequestBody from './RequestBody';

describe('RequestBody Component', () => {
  let setBodyMock: ReturnType<typeof vi.fn>;
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    cleanup();
    setBodyMock = vi.fn();
    user = userEvent.setup();
  });

  it('renders a label with the correct text and styles', () => {
    render(<RequestBody setBody={setBodyMock} />);

    const label = screen.getByText('Request Body (JSON or TEXT Editor)');
    expect(label).toBeInTheDocument();
    expect(label.tagName).toBe('LABEL');
    expect(label).toHaveAttribute('for', 'request-body');
    expect(label).toHaveClass('text-lg', 'font-semibold', 'italic');
  });

  it('renders a textarea with the correct attributes and initial value', () => {
    render(<RequestBody setBody={setBodyMock} />);

    const textarea = screen.getByPlaceholderText(
      '{"title": "Hello", "body": "World"} or text'
    ) as HTMLTextAreaElement;

    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveAttribute('id', 'request-body');
    expect(textarea.value).toBe('');
    expect(textarea).toHaveClass(
      'w-full',
      'min-h-[120px]',
      'p-2',
      'border',
      'rounded-md',
      'text-sm',
      'font-mono'
    );
  });
});
