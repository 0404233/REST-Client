import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, beforeEach, vi, expect } from 'vitest'
import RssLogo from './RssLogo'

vi.mock('i18n/navigation', () => ({
  Link: ({ children, ...props }: any) => (
    <a data-testid="rss-link" {...props}>
      {children}
    </a>
  ),
}))

vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img data-testid="rss-img" {...props} />,
}))

describe('RssLogo Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders a link with correct href and target', () => {
    render(<RssLogo />)

    const link = screen.getByTestId('rss-link')
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute(
      'href',
      'https://rs.school/courses/reactjs'
    )
    expect(link).toHaveAttribute('target', '_blank')
  })

  it('renders an image with correct src, alt, dimensions and classes', () => {
    render(<RssLogo />)

    const img = screen.getByTestId('rss-img') as HTMLImageElement
    expect(img.getAttribute('src')).toBe('/rss-logo.svg')
    expect(img).toHaveAttribute('alt', 'RSS Logo')
    expect(img).toHaveAttribute('width', '40')
    expect(img).toHaveAttribute('height', '40')
    expect(img).toHaveClass(
      'cursor-pointer',
      'rounded-[30]',
      'transition-shadow',
      'duration-200',
      'hover:shadow-[0_0_7px_2px_var(--foreground)]'
    )
  })

  it('wraps the image inside the link', () => {
    render(<RssLogo />)

    const link = screen.getByTestId('rss-link')
    const img = screen.getByTestId('rss-img')
    expect(link.contains(img)).toBe(true)
  })
})
