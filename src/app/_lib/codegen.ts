import { RequestHeader, RequestMethod } from '@/_types/request';

type GenerateCodeParams = {
  url: string;
  method: RequestMethod;
  headers: RequestHeader[];
  body?: string;
};

function formatHeaders(headers: RequestHeader[]): string[] {
  return headers
    .filter(h => h.key && h.value)
    .map(h => `${h.key}: ${h.value}`);
}

function escapeString(str: string): string {
  return str.replace(/"/g, '\\"');
}

export function generateCodeSnippet({ url, method, headers, body }: GenerateCodeParams): Record<string, string> {
  if (!url || !method) return {};

  const formattedHeaders = formatHeaders(headers);
  const headerCurl = formattedHeaders.map(h => `-H "${h}"`).join(' ');
  const headerJS = formattedHeaders.map(h => `"${h.split(':')[0].trim()}": "${h.split(':')[1].trim()}"`).join(',\n    ');
  const bodyLine = body ? `-d '${body}'` : '';
  const bodyJS = body ? `body: JSON.stringify(${body}),` : '';
  const bodyRaw = body ? body : '';

  return {
    curl: `curl -X ${method} ${headerCurl} ${bodyLine} "${url}"`,

    javascript_fetch: `fetch("${url}", {
  method: "${method}",
  headers: {
    ${headerJS}
  },
  ${bodyJS}
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));`,

    python: `import requests

url = "${url}"
headers = {
    ${formattedHeaders.map(h => `"${h.split(':')[0].trim()}": "${h.split(':')[1].trim()}"`).join(',\n    ')}
}
${body ? `data = ${body}\n` : ''}
response = requests.request("${method}", url, headers=headers${body ? ', json=data' : ''})
print(response.text)`,

    nodejs: `const https = require('https');

const options = {
  method: '${method}',
  headers: {
    ${headerJS}
  }
};

const req = https.request("${url}", options, res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => console.log(data));
});

${body ? `req.write(JSON.stringify(${body}));` : ''}
req.end();`,

    go: `package main

import (
  "fmt"
  "net/http"
  "strings"
  "io/ioutil"
)

func main() {
  client := &http.Client{}
  req, err := http.NewRequest("${method}", "${url}", ${body ? `strings.NewReader("${escapeString(bodyRaw)}")` : 'nil'})
  if err != nil {
    panic(err)
  }

  ${formattedHeaders.map(h => `req.Header.Set("${h.split(':')[0].trim()}", "${h.split(':')[1].trim()}")`).join('\n  ')}

  resp, err := client.Do(req)
  if err != nil {
    panic(err)
  }
  defer resp.Body.Close()
  body, _ := ioutil.ReadAll(resp.Body)
  fmt.Println(string(body))
}`,

    java: `import java.io.*;
import java.net.*;
import java.util.*;

public class Main {
  public static void main(String[] args) throws Exception {
    URL url = new URL("${url}");
    HttpURLConnection conn = (HttpURLConnection) url.openConnection();
    conn.setRequestMethod("${method}");
    ${formattedHeaders.map(h => `conn.setRequestProperty("${h.split(':')[0].trim()}", "${h.split(':')[1].trim()}");`).join('\n    ')}

    ${body ? `conn.setDoOutput(true);
    OutputStream os = conn.getOutputStream();
    os.write("${escapeString(bodyRaw)}".getBytes());
    os.flush();
    os.close();` : ''}

    BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
    String inputLine;
    StringBuffer content = new StringBuffer();
    while ((inputLine = in.readLine()) != null) {
      content.append(inputLine);
    }
    in.close();
    System.out.println(content.toString());
  }
}`,

    csharp: `using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

class Program {
  static async Task Main() {
    var client = new HttpClient();
    var request = new HttpRequestMessage {
      Method = HttpMethod.${method.toLowerCase()},
      RequestUri = new Uri("${url}"),
      ${body ? `Content = new StringContent("${escapeString(bodyRaw)}", Encoding.UTF8, "application/json"),` : ''}
    };

    ${formattedHeaders.map(h => `request.Headers.Add("${h.split(':')[0].trim()}", "${h.split(':')[1].trim()}");`).join('\n    ')}

    var response = await client.SendAsync(request);
    var responseBody = await response.Content.ReadAsStringAsync();
    Console.WriteLine(responseBody);
  }
}`
  };
}
