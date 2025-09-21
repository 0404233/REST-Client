import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, vi, expect } from 'vitest'

vi.mock('next-intl', () => ({
  __esModule: true,
  useTranslations: () => (key: string) => {
    return key === 'submit' ? 'Submit' : key
  },
}))

import Button from './Button'

describe('Button component', () => {
  it('renders the localized "submit" text', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick} />)

    const btn = screen.getByRole('button', { name: 'Submit' })
    expect(btn).toBeInTheDocument()
  })

  it('invokes onClick when clicked', async () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick} />)

    const btn = screen.getByRole('button', { name: 'Submit' })
    await userEvent.click(btn)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
