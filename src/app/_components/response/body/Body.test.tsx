import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, beforeEach, vi, expect } from 'vitest';
import Body from './Body';

vi.mock('react-json-pretty', () => ({
  __esModule: true,
  default: (props: any) => (
    <pre data-testid="json-pretty" className={props.className}>
      {JSON.stringify(props.data)}
    </pre>
  ),
}));

describe('Body Component', () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('renders error message when error prop is provided', () => {
    render(<Body error="network failure" />);

    const errorDiv = screen.getByText('No data available');
    expect(errorDiv).toBeInTheDocument();
    expect(errorDiv).toHaveClass('text-xl', 'text-gray-500', 'p-2');

    expect(screen.queryByTestId('json-pretty')).toBeNull();
    expect(screen.queryByText('Response Body:')).toBeNull();
  });

  it('renders nothing when result is undefined or empty and no error', () => {
    render(<Body />);
    expect(screen.queryByTestId('json-pretty')).toBeNull();
    expect(screen.queryByText('Response Body:')).toBeNull();
    cleanup();

    render(<Body result={[]} />);
    expect(screen.queryByTestId('json-pretty')).toBeNull();
    expect(screen.queryByText('Response Body:')).toBeNull();
  });

  it('renders heading, container, and JSONPretty when result has items', () => {
    const sample = [{ name: 'Alice' }, { name: 'Bob' }];
    const { container } = render(<Body result={sample} />);

    const heading = screen.getByRole('heading', { name: 'Response Body:' });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass('text-lg', 'font-semibold', 'mb-3');

    const wrapper = heading.parentElement;
    expect(wrapper).toHaveClass('rounded-lg', 'border', 'p-4');

    const jsonContainer = container.querySelector('.json-container');
    expect(jsonContainer).toBeInTheDocument();

    const pre = screen.getByTestId('json-pretty');
    expect(pre).toHaveTextContent(JSON.stringify(sample));
    expect(pre).toHaveClass('text-sm', 'overflow-auto', 'max-h-96');
  });
});
