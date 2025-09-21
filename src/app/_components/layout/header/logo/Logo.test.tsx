import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, beforeEach, vi, expect } from 'vitest'

vi.mock('i18n/navigation', () => ({
  Link: ({ children, ...props }: any) => (
    <a data-testid="link" {...props}>
      {children}
    </a>
  ),
}))

vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img data-testid="image" {...props} />,
}))

import Logo from './Logo'

describe('Logo Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders a link with correct href', () => {
    render(<Logo />)
    const link = screen.getByTestId('link')
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/')
  })

  it('wraps the image inside the link element', () => {
    render(<Logo />)
    const link = screen.getByTestId('link')
    const img = screen.getByTestId('image')
    expect(link.contains(img)).toBe(true)
  })
})
