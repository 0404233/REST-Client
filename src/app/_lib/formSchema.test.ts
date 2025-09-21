import { describe, it, expect } from 'vitest'
import { authFormSchema, loginFormSchema } from './formSchema'

describe('authFormSchema', () => {
  it('parses a valid payload', () => {
    const payload = {
      email: 'user@example.com',
      password: 'supersecret',
      confirmPassword: 'supersecret',
    }
    const result = authFormSchema.safeParse(payload)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data).toEqual(payload)
    }
  })

  it('rejects invalid email with custom message', () => {
    const payload = {
      email: 'not-an-email',
      password: 'supersecret',
      confirmPassword: 'supersecret',
    }
    const result = authFormSchema.safeParse(payload)
    expect(result.success).toBe(false)
    if (!result.success) {
      const issue = result.error.issues.find(i => i.path[0] === 'email')
      expect(issue).toBeDefined()
      expect(issue?.message).toBe('Incorrect email')
    }
  })

  it('rejects too-short passwords with custom message', () => {
    const payload = {
      email: 'user@example.com',
      password: 'short',
      confirmPassword: 'short',
    }
    const result = authFormSchema.safeParse(payload)
    expect(result.success).toBe(false)
    if (!result.success) {
      const issue = result.error.issues.find(i => i.path[0] === 'password')
      expect(issue).toBeDefined()
      expect(issue?.message).toBe('The password is too short')
    }
  })
})

describe('loginFormSchema', () => {
  it('parses a valid payload', () => {
    const payload = {
      email: 'foo@bar.com',
      password: 'x',
    }
    const result = loginFormSchema.safeParse(payload)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data).toEqual(payload)
    }
  })

  it('rejects invalid email with custom message', () => {
    const payload = { email: 'foo-at-bar', password: 'x' }
    const result = loginFormSchema.safeParse(payload)
    expect(result.success).toBe(false)
    if (!result.success) {
      const issue = result.error.issues.find(i => i.path[0] === 'email')
      expect(issue).toBeDefined()
      expect(issue?.message).toBe('Incorrect email')
    }
  })

  it('rejects empty password with custom message', () => {
    const payload = { email: 'foo@bar.com', password: '' }
    const result = loginFormSchema.safeParse(payload)
    expect(result.success).toBe(false)
    if (!result.success) {
      const issue = result.error.issues.find(i => i.path[0] === 'password')
      expect(issue).toBeDefined()
      expect(issue?.message).toBe('Password is required')
    }
  })
})
