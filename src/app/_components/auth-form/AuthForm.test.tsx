import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

vi.mock('./title/Title', () => ({
  __esModule: true,
  default: (props: any) =>
    React.createElement('div', {
      'data-testid': 'title',
      'data-issignin': String(props.isSignIn),
    }),
}))

vi.mock('./input/Input', () => ({
  __esModule: true,
  default: (props: any) =>
    React.createElement('input', {
      'data-testid': 'input',
      'data-type': props.type,
    }),
}))

vi.mock('./button/Button', () => ({
  __esModule: true,
  default: () =>
    React.createElement('button', {
      'data-testid': 'button',
    }),
}))

import AuthForm from './AuthForm'

describe('AuthForm component', () => {
  it('passes isSignIn=true to Title', () => {
    render(<AuthForm isSignIn={true} />)
    const title = screen.getByTestId('title')
    expect(title).toHaveAttribute('data-issignin', 'true')
  })

  it('passes isSignIn=false to Title', () => {
    render(<AuthForm isSignIn={false} />)
    const title = screen.getByTestId('title')
    expect(title).toHaveAttribute('data-issignin', 'false')
  })

  it('renders exactly two Input components with correct types', () => {
    render(<AuthForm isSignIn={true} />)
    const inputs = screen.getAllByTestId('input')
    expect(inputs).toHaveLength(2)
    expect(inputs[0]).toHaveAttribute('data-type', 'email')
    expect(inputs[1]).toHaveAttribute('data-type', 'password')
  })

  it('renders a Button component inside the form', () => {
    render(<AuthForm isSignIn={true} />)
    expect(screen.getByTestId('button')).toBeInTheDocument()
  })
})
