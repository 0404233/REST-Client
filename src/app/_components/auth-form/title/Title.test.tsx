import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

vi.mock('next-intl', () => ({
  __esModule: true,
  useTranslations: () => (key: string) => {
    const dict: Record<string, string> = {
      signInToRestClient: 'Sign in to Rest Client',
      createYourAccount: 'Create your account',
    }
    return dict[key] ?? key
  },
}))

import Title from './Title'

describe('Title component', () => {
  it('renders the sign-in heading when isSignIn is true', () => {
    render(<Title isSignIn={true} />)

    const heading = screen.getByRole('heading', {
      level: 1,
      name: 'Sign in to Rest Client',
    })
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveClass('text-2xl')
  })

  it('renders the sign-up heading when isSignIn is false', () => {
    render(<Title isSignIn={false} />)

    const heading = screen.getByRole('heading', {
      level: 1,
      name: 'Create your account',
    })
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveClass('text-2xl')
  })
})
