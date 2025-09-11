import { RequestHeader, RequestMethod } from '@/_types/request';

type GenerateCodeParams = {
  url: string;
  method: RequestMethod;
  headers: RequestHeader[];
  body?: Record<string, string>;
};

type FormatBody = {
  body?: Record<string, string>;
  id?: string;
};

function formatHeaders(headers: RequestHeader[]): string[] {
  return headers.filter((h) => h.key && h.value).map((h) => `${h.key}: ${h.value}`);
}

export function formatBody(data: FormatBody): string {
  let bodyStr;

  if (data.body && Object.keys(data.body).length) {
    if (data.id) {
      bodyStr = JSON.stringify({ ...data.body, id: data.id, userId: data.id });
    } else {
      bodyStr = JSON.stringify(data.body);
    }
  } else {
    bodyStr = '';
  }

  return bodyStr;
}

function escapeString(str: string): string {
  return str.replace(/"/g, '\\"');
}

export function generateCodeSnippet({
  url,
  method,
  headers,
  body,
}: GenerateCodeParams): Record<string, string[]> {
  if (!url || !method) return {};

  const formattedHeaders = formatHeaders(headers);
  const formattedBody = body ? formatBody({ body }) : '';

  const headerCurl = formattedHeaders.map((h) => `-H "${h}"`).join('\n');
  const headerJS = formattedHeaders
    .map((h) => `"${h.split(':')[0].trim()}": "${h.split(':')[1].trim()}"`)
    .join(',\n    ');
  const bodyLine = formattedBody;
  const bodyJS = formattedBody;
  const bodyRaw = formattedBody;

  return {
    curl: [`curl -X ${method}`, `${headerCurl}`, `${bodyLine}`, `"${url}"`],

    javascript_fetch: [
      `fetch("${url}", {`,
      `  method: "${method}",`,
      '  headers: {',
      '    ' + headerJS,
      '  }' + (body ? `,` : ''),
      body ? `  ${bodyJS}` : '',
      '})',
      '  .then(response => response.json())',
      '  .then(data => console.log(data))',
      '  .catch(error => console.error(error));',
    ],

    python: [
      'import requests',
      '',
      `url = "${url}"`,
      'headers = {',
      ...formattedHeaders.map((h) => {
        const [key, value] = h.split(':').map((part) => part.trim());
        return `    "${key}": "${value}"`;
      }),
      '}',
      formattedBody ? `data = ${formattedBody}` : '',
      '',
      `response = requests.request("${method}", url, headers=headers${body ? ', json=data' : ''})`,
      'print(response.text)',
    ],

    nodejs: [
      "const https = require('https');",
      '',
      'const options = {',
      `  method: '${method}',`,
      '  headers: {',
      ...formattedHeaders.map((h) => {
        const [key, value] = h.split(':').map((part) => part.trim());
        return `    "${key}": "${value}"`;
      }),
      '  }',
      '};',
      '',
      `const req = https.request("${url}", options, res => {`,
      "  let data = '';",
      "  res.on('data', chunk => data += chunk);",
      "  res.on('end', () => console.log(data));",
      '});',
      formattedBody ? `req.write(${formattedBody});` : '',
      'req.end();',
    ],

    go: [
      'package main',
      '',
      'import (',
      '  "fmt"',
      '  "net/http"',
      '  "strings"',
      '  "io/ioutil"',
      ')',
      '',
      'func main() {',
      '  client := &http.Client{}',
      `  req, err := http.NewRequest("${method}", "${url}", ${formattedBody}`,
      ` ? strings.NewReader(\`${escapeString(bodyRaw)}\`) : 'nil'})`,
      '  if err != nil {',
      '    panic(err)',
      '  }',
      '',
      ...formattedHeaders.map((h) => {
        const [key, value] = h.split(':').map((part) => part.trim());
        return `  req.Header.Set("${key}", "${value}")`;
      }),
      '',
      '  resp, err := client.Do(req)',
      '  if err != nil {',
      '    panic(err)',
      '  }',
      '  defer resp.Body.Close()',
      '',
      '  body, _ := ioutil.ReadAll(resp.Body)',
      '  fmt.Println(string(body))',
      '}',
    ],

    java: [
      'import java.io.*;',
      'import java.net.*;',
      'import java.util.*;',
      '',
      'public class Main {',
      '  public static void main(String[] args) throws Exception {',
      `    URL url = new URL("${url}");`,
      '    HttpURLConnection conn = (HttpURLConnection) url.openConnection();',
      `    conn.setRequestMethod("${method}");`,
      ...formattedHeaders.map((h) => {
        const [key, value] = h.split(':').map((part) => part.trim());
        return `    conn.setRequestProperty("${key}", "${value}");`;
      }),
      formattedBody
        ? [
            '    conn.setDoOutput(true);',
            '    OutputStream os = conn.getOutputStream();',
            `    os.write("${escapeString(bodyRaw)}".getBytes());`,
            '    os.flush();',
            '    os.close();',
          ].join('\n')
        : '',
      '',
      '    BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()));',
      '    String inputLine;',
      '    StringBuffer content = new StringBuffer();',
      '    while ((inputLine = in.readLine()) != null) {',
      '      content.append(inputLine);',
      '    }',
      '    in.close();',
      '    System.out.println(content.toString());',
      '  }',
      '}',
    ],

    csharp: [
      'using System;',
      'using System.Net.Http;',
      'using System.Text;',
      'using System.Threading.Tasks;',
      '',
      'class Program {',
      '  static async Task Main() {',
      '    var client = new HttpClient();',
      '    var request = new HttpRequestMessage {',
      `      Method = HttpMethod.${method.charAt(0).toUpperCase() + method.slice(1).toLowerCase()},`,
      `      RequestUri = new Uri("${url}"),`,
      formattedBody
        ? `      Content = new StringContent("${escapeString(bodyRaw)}", Encoding.UTF8, "application/json"),`
        : '',
      '    };',
      ...formattedHeaders.map((h) => {
        const [key, value] = h.split(':').map((part) => part.trim());
        return `    request.Headers.Add("${key}", "${value}");`;
      }),
      '',
      '    var response = await client.SendAsync(request);',
      '    var responseBody = await response.Content.ReadAsStringAsync();',
      '    Console.WriteLine(responseBody);',
      '  }',
      '}',
    ],
  };
}
