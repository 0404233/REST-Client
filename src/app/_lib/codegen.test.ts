import { describe, it, expect } from 'vitest';
import { formatHeaders, formatBody, generateCodeSnippet } from './codegen';
import type { RequestHeader, RequestMethod } from '@/_types/request';

describe('formatHeaders', () => {
  it('returns empty array when no headers', () => {
    expect(formatHeaders([])).toEqual([]);
  });

  it('filters out headers with empty key or value', () => {
    const headers: RequestHeader[] = [
      { id: '1', key: 'Accept', value: 'application/json' },
      { id: '2', key: '', value: 'no-key' },
      { id: '3', key: 'no-value', value: '' },
    ];
    expect(formatHeaders(headers)).toEqual(['Accept: application/json']);
  });

  it('formats valid headers as "key: value"', () => {
    const headers: RequestHeader[] = [
      { id: 'a', key: 'X-Custom', value: '123' },
      { id: 'b', key: 'Host', value: 'example.com' },
    ];
    expect(formatHeaders(headers)).toEqual(['X-Custom: 123', 'Host: example.com']);
  });
});

describe('formatBody', () => {
  it('stringifies body without id', () => {
    const raw = 'hello';
    expect(formatBody(raw)).toBe(JSON.stringify(raw));
  });

  it('stringifies body with id and userId when id provided', () => {
    const raw = 'payload';
    const result = formatBody(raw, '42');
    const obj = JSON.parse(result);
    expect(obj).toEqual({ body: raw, id: '42', userId: '42' });
  });
});

describe('generateCodeSnippet', () => {
  const url = 'https://api.test/endpoint';
  const method = 'POST' as RequestMethod;

  it('returns empty object when url or method is missing', () => {
    expect(generateCodeSnippet({ url: '', method, headers: [], body: null })).toEqual({});
    expect(
      generateCodeSnippet({
        url,
        method: '' as RequestMethod,
        headers: [],
        body: null,
      })
    ).toEqual({});
  });

  it('outputs all language keys', () => {
    const snippet = generateCodeSnippet({
      url,
      method,
      headers: [],
      body: null,
    });
    expect(Object.keys(snippet).sort()).toEqual(
      ['csharp', 'curl', 'go', 'java', 'javascript_fetch', 'nodejs', 'python'].sort()
    );
  });

  it('includes curl command with method and url', () => {
    const snippet = generateCodeSnippet({
      url,
      method: 'GET' as RequestMethod,
      headers: [],
      body: null,
    });
    const curlLines = snippet.curl;
    expect(curlLines[0]).toBe(`curl -X GET`);
    expect(curlLines[curlLines.length - 1]).toBe(`"${url}"`);
  });

  it('embeds headers and body in snippets when provided', () => {
    const headers: RequestHeader[] = [{ id: 'h1', key: 'Auth', value: 'token' }];
    const rawBody = '{"foo":"bar"}';
    const snippet = generateCodeSnippet({ url, method, headers, body: rawBody });

    const serialized = JSON.stringify(rawBody);

    expect(snippet.curl).toContain(`-H "Auth: token"`);
    expect(snippet.curl[2]).toBe(serialized);

    const js = snippet.javascript_fetch.join('\n');
    expect(js).toMatch(/"Auth": "token"/);
    expect(js).toMatch(serialized);

    expect(snippet.python).toContain(`data = ${serialized}`);
    const pythonStr = snippet.python.join('\n');
    expect(pythonStr).toMatch(
      new RegExp(`requests\\.request\\("${method}", url, headers=headers, json=data\\)`)
    );

    const nodeStr = snippet.nodejs.join('\n');
    expect(nodeStr).toContain(`req.write(${serialized});`);
  });

  it('escapes quotes in Go and Java bodies', () => {
    const headers: RequestHeader[] = [];
    const rawBody = '{"a":"b"}';
    const snippet = generateCodeSnippet({ url, method, headers, body: rawBody });

    const serialized = JSON.stringify(rawBody);
    const escaped = serialized.replace(/"/g, '\\"');

    const goCode = snippet.go.join('\n');
    expect(goCode).toContain(`strings.NewReader(\`${escaped}\`)`);

    const javaCode = snippet.java.join('\n');
    expect(javaCode).toContain(`os.write("${escaped}".getBytes());`);
  });
});
