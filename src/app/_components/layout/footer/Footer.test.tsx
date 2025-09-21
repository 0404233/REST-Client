import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import { describe, it, beforeEach, vi, expect } from 'vitest'

vi.mock('./team/Team', () => ({
  __esModule: true,
  default: () => <div data-testid="team-component" />,
}))
vi.mock('./rss-logo/RssLogo', () => ({
  __esModule: true,
  default: () => <div data-testid="rss-logo-component" />,
}))

import Footer from './Footer'

describe('Footer Component', () => {
  beforeEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  it('renders the Team component', () => {
    render(<Footer />)
    expect(screen.getByTestId('team-component')).toBeInTheDocument()
  })

  it('renders the year heading with correct text and classes', () => {
    render(<Footer />)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent('2025')
    expect(heading).toHaveClass('text-2xl', 'font-bold', 'italic')
  })

  it('renders the RssLogo component', () => {
    render(<Footer />)
    expect(screen.getByTestId('rss-logo-component')).toBeInTheDocument()
  })

  it('applies correct classes to the footer element and children order', () => {
    const { container } = render(<Footer />)
    const footer = container.querySelector('footer')
    expect(footer).toHaveClass(
      'flex',
      'justify-between',
      'items-center',
      'py-2',
      'px-4'
    )
    const children = Array.from(footer!.children)
    expect(children[0]).toHaveAttribute('data-testid', 'team-component')
    expect(children[1].tagName).toBe('H1')
    expect(children[2]).toHaveAttribute('data-testid', 'rss-logo-component')
  })
})
