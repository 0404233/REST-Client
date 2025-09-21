import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, beforeEach, expect, vi } from 'vitest';
import HeaderRow, { Header } from './HeaderRow';

vi.mock('react', async () => {
  const actual = (await vi.importActual('react')) as typeof React;
  return {
    ...actual,
    useId: () => 'test-id',
  };
});

describe('HeaderRow', () => {
  const header: Header = { id: 'h1', key: 'Key1', value: 'Val1' };
  let onChange: ReturnType<typeof vi.fn>;
  let onRemove: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    onChange = vi.fn();
    onRemove = vi.fn();
  });

  it('renders two inputs and a remove button with initial values', () => {
    render(<HeaderRow header={header} onChange={onChange} onRemove={onRemove} />);

    const keyInput = screen.getByPlaceholderText('key') as HTMLInputElement;
    const valueInput = screen.getByPlaceholderText('value') as HTMLInputElement;
    const removeBtn = screen.getByRole('button', { name: '×' });

    expect(keyInput).toBeInTheDocument();
    expect(keyInput.value).toBe('Key1');

    expect(valueInput).toBeInTheDocument();
    expect(valueInput.value).toBe('Val1');

    expect(removeBtn).toBeInTheDocument();
  });

  it('calls onChange with (id, "key", newKey) when key input changes', () => {
    render(<HeaderRow header={header} onChange={onChange} onRemove={onRemove} />);

    const keyInput = screen.getByPlaceholderText('key');
    fireEvent.change(keyInput, { target: { value: 'NewKey' } });

    expect(onChange).toHaveBeenCalledWith('h1', 'key', 'NewKey');
  });

  it('calls onChange with (id, "value", newValue) when value input changes', () => {
    render(<HeaderRow header={header} onChange={onChange} onRemove={onRemove} />);

    const valueInput = screen.getByPlaceholderText('value');
    fireEvent.change(valueInput, { target: { value: 'NewVal' } });

    expect(onChange).toHaveBeenCalledWith('h1', 'value', 'NewVal');
  });

  it('calls onRemove with id when remove button is clicked', () => {
    render(<HeaderRow header={header} onChange={onChange} onRemove={onRemove} />);

    const removeBtn = screen.getByRole('button', { name: '×' });
    fireEvent.click(removeBtn);

    expect(onRemove).toHaveBeenCalledWith('h1');
  });
});
