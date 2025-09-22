import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, beforeEach, vi, expect } from 'vitest';

vi.mock('../../../[locale]/rest/page', () => ({
  __esModule: true,
  BASE_URL: 'http://api.example.com',
}));

import Endpoint from './Endpoint';

describe('Endpoint component', () => {
  let handleChangeURL: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    handleChangeURL = vi.fn();
  });

  it('renders an input pre-filled with BASE_URL', () => {
    render(<Endpoint handleChangeURL={handleChangeURL} />);

    const input = screen.getByDisplayValue('http://api.example.com') as HTMLInputElement;

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveAttribute('placeholder', 'Enter endpoint');
  });

  it('calls handleChangeURL and updates its own state when the user types', async () => {
    render(<Endpoint handleChangeURL={handleChangeURL} />);

    const input = screen.getByDisplayValue('http://api.example.com') as HTMLInputElement;

    await userEvent.clear(input);
    await userEvent.type(input, 'https://new-url.com');

    expect(input.value).toBe('https://new-url.com');

    expect(handleChangeURL).toHaveBeenLastCalledWith('https://new-url.com');
  });

  it('calls handleChangeURL once when using a single change event', () => {
    render(<Endpoint handleChangeURL={handleChangeURL} />);

    const input = screen.getByDisplayValue('http://api.example.com') as HTMLInputElement;

    fireEvent.change(input, { target: { value: '/foo/bar' } });

    expect(input.value).toBe('/foo/bar');
    expect(handleChangeURL).toHaveBeenCalledTimes(1);
    expect(handleChangeURL).toHaveBeenCalledWith('/foo/bar');
  });
});
