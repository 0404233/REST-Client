import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Input from './Input';

describe('Input component', () => {
  const renderWithType = (type: string) => {
    render(<Input type={type} />);
    const label = screen.getByText(type);
    const input = screen.getByPlaceholderText(`Enter ${type}`) as HTMLInputElement;
    return { label, input };
  };

  it('renders a label with htmlFor matching the type prop', () => {
    const { label, input } = renderWithType('email');
    expect(label).toBeInTheDocument();
    expect(label).toHaveAttribute('for', 'email');
    expect(input.id).toBe('email');
  });

  it('renders an input with the correct type attribute', () => {
    const { input } = renderWithType('password');
    expect(input).toHaveAttribute('type', 'password');
  });

  it('renders the placeholder using the type prop', () => {
    const { input } = renderWithType('username');
    expect(input).toHaveAttribute('placeholder', 'Enter username');
  });

  it('places the label and input inside a flex column container', () => {
    render(<Input type="text" />);
    const container = screen.getByText('text').closest('div');
    expect(container).toHaveClass('flex', 'flex-col');
  });
});
