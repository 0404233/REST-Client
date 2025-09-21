import React from 'react'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { describe, it, beforeEach, vi, expect } from 'vitest'
import HeadersTable from './HeadersTable'

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}))

vi.mock('./header-row/HeaderRow', () => ({
  __esModule: true,
  default: ({ header, onChange, onRemove }: any) => (
    <div data-testid={`row-${header.id}`}>
      <span data-testid={`key-display-${header.id}`}>{header.key}</span>
      <span data-testid={`value-display-${header.id}`}>{header.value}</span>
      <button
        data-testid={`change-key-${header.id}`}
        onClick={() => onChange(header.id, 'key', header.key + '_X')}
      >
        change-key
      </button>
      <button
        data-testid={`change-value-${header.id}`}
        onClick={() => onChange(header.id, 'value', header.value + '_Y')}
      >
        change-value
      </button>
      <button
        data-testid={`remove-${header.id}`}
        onClick={() => onRemove(header.id)}
      >
        remove
      </button>
    </div>
  ),
}))

describe('HeadersTable Component', () => {
  let handleChangeHeaders: ReturnType<typeof vi.fn>

  beforeEach(() => {
    cleanup()
    vi.clearAllMocks()
    vi.spyOn(Date, 'now').mockReturnValue(123)
    handleChangeHeaders = vi.fn()
  })

  it('renders three initial HeaderRow components and calls handleChangeHeaders once on mount', () => {
    render(<HeadersTable handleChangeHeaders={handleChangeHeaders} />)
    expect(screen.getByTestId('row-1')).toBeInTheDocument()
    expect(screen.getByTestId('row-2')).toBeInTheDocument()
    expect(screen.getByTestId('row-3')).toBeInTheDocument()
    expect(handleChangeHeaders).toHaveBeenCalledTimes(1)
    const firstArg = handleChangeHeaders.mock.calls[0][0]
    expect(Array.isArray(firstArg)).toBe(true)
    expect(firstArg).toHaveLength(3)
  })

  it('adds a new header when the add button is clicked and calls handleChangeHeaders again', () => {
    render(<HeadersTable handleChangeHeaders={handleChangeHeaders} />)
    const addBtn = screen.getByRole('button', { name: '+ addHeader' })
    fireEvent.click(addBtn)

    expect(screen.getByTestId('row-123')).toBeInTheDocument()

    expect(handleChangeHeaders).toHaveBeenCalledTimes(2)
    const secondArg = handleChangeHeaders.mock.calls[1][0]
    expect(secondArg).toHaveLength(4)
    const newHeader = secondArg.find((h: any) => h.id === '123')
    expect(newHeader).toMatchObject({ key: '', value: '' })
  })

  it('updates a header when change-key or change-value is clicked and calls handleChangeHeaders', () => {
    render(<HeadersTable handleChangeHeaders={handleChangeHeaders} />)
    handleChangeHeaders.mockClear()

    fireEvent.click(screen.getByTestId('change-key-2'))
    expect(handleChangeHeaders).toHaveBeenCalledTimes(1)
    let updated = handleChangeHeaders.mock.calls[0][0].find((h: any) => h.id === '2')
    expect(updated.key).toBe('Content-Type_X')

    handleChangeHeaders.mockClear()

    fireEvent.click(screen.getByTestId('change-value-3'))
    expect(handleChangeHeaders).toHaveBeenCalledTimes(1)
    updated = handleChangeHeaders.mock.calls[0][0].find((h: any) => h.id === '3')
    expect(updated.value).toBe('application/json_Y')
  })

  it('removes a header when remove is clicked and calls handleChangeHeaders', () => {
    render(<HeadersTable handleChangeHeaders={handleChangeHeaders} />)
    handleChangeHeaders.mockClear()

    fireEvent.click(screen.getByTestId('remove-1'))

    expect(screen.queryByTestId('row-1')).toBeNull()
    expect(handleChangeHeaders).toHaveBeenCalledTimes(1)
    const arg = handleChangeHeaders.mock.calls[0][0]
    expect(arg.find((h: any) => h.id === '1')).toBeUndefined()
    expect(arg).toHaveLength(2)
  })
})
