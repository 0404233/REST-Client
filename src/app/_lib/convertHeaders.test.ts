import { describe, it, expect } from 'vitest'
import { convertHeaders } from './convertHeaders'
import type { RequestHeader } from '@/_types/request'

describe('convertHeaders', () => {
  it('returns an empty object when given an empty array', () => {
    const result = convertHeaders([])
    expect(result).toEqual({})
  })

  it('converts a single header into an object', () => {
    const headers: RequestHeader[] = [
      { id: '1', key: 'Content-Type', value: 'application/json' },
    ]
    const result = convertHeaders(headers)
    expect(result).toEqual({
      'Content-Type': 'application/json',
    })
  })

  it('converts multiple headers into a single object', () => {
    const headers: RequestHeader[] = [
      { id: '1', key: 'Accept', value: 'text/html' },
      { id: '2', key: 'Cache-Control', value: 'no-cache' },
      { id: '3', key: 'X-Custom', value: 'foobar' },
    ]
    const result = convertHeaders(headers)
    expect(result).toEqual({
      Accept: 'text/html',
      'Cache-Control': 'no-cache',
      'X-Custom': 'foobar',
    })
  })

  it('ignores headers with empty or whitespace-only keys', () => {
    const headers: RequestHeader[] = [
      { id: '1', key: 'Valid-Key', value: '123' },
      { id: '2', key: '   ', value: 'should-ignore' },
      { id: '3', key: '', value: 'also-ignore' },
      { id: '4', key: '\t\n', value: 'ignore-too' },
    ]
    const result = convertHeaders(headers)
    expect(result).toEqual({
      'Valid-Key': '123',
    })
  })

  it('keeps keys with non-empty trimmed value, even if they contain whitespace', () => {
    const headers: RequestHeader[] = [
      { id: '1', key: '  Foo  ', value: 'bar' },
      { id: '2', key: ' Baz', value: 'qux' },
    ]
    const result = convertHeaders(headers)
    expect(result).toEqual({
      '  Foo  ': 'bar',
      ' Baz': 'qux',
    })
  })

  it('uses the last occurrence when duplicate keys appear', () => {
    const headers: RequestHeader[] = [
      { id: '1', key: 'Dup', value: 'first' },
      { id: '2', key: 'Dup', value: 'second' },
      { id: '3', key: 'Dup', value: 'final' },
    ]
    const result = convertHeaders(headers)
    expect(result).toEqual({
      Dup: 'final',
    })
  })
})
