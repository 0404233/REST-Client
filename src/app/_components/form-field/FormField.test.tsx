import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import FormField from './FormField'
import type { UseFormRegister } from 'react-hook-form'
import type { FieldError } from 'react-hook-form'

describe('FormField Component', () => {
  const registerMock = vi.fn()
  const fakeRegister = registerMock as unknown as UseFormRegister<{
    username: string
  }>

  const errorMock = {
    type: 'required',
    message: 'This field is required',
    ref: {} as any,
  } as FieldError

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders label, input and calls register without error', async () => {
    render(
      <FormField
        type="text"
        name="username"
        label="Username"
        register={fakeRegister}
        placeholder="Enter username"
        error={undefined}
      />
    )

    expect(registerMock).toHaveBeenCalledWith('username')

    expect(screen.getByText('Username')).toBeInTheDocument()
    expect(screen.getByText('*')).toBeInTheDocument()

    const input = screen.getByPlaceholderText('Enter username') as HTMLInputElement
    expect(input).toHaveAttribute('type', 'text')
    expect(input).toHaveAttribute('id', 'username')

    await userEvent.type(input, 'Alice')
    expect(input.value).toBe('Alice')

    expect(screen.queryByText('This field is required')).toBeNull()
  })

  it('renders error message when error prop is passed', () => {
    render(
      <FormField
        type="email"
        name="email"
        label="Email"
        register={fakeRegister as any}
        placeholder="Enter email"
        error={errorMock}
      />
    )

    expect(screen.getByText(errorMock.message!)).toBeInTheDocument()
  })
})
