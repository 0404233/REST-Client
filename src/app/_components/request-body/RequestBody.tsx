import { memo } from 'react';
import BodyEditor from './body-editor/BodyEditor';
import GeneratedCode from './generated-code/GeneratedCode';

const RequestBody = () => {
  console.log('RequestBody');

  return (
    <div className="flex flex-col gap-4  border-1 p-2 rounded-sm">
      <GeneratedCode />
      <BodyEditor />
    </div>
  );
};

export default memo(RequestBody);

/* 


curl

--GET 
    curl --location 'https://jsonplaceholder.typicode.com/posts'            

--POST
    curl --location 'https://jsonplaceholder.typicode.com/posts' \            
    --form 'title="foo"' \
    --form 'body="bar"' \
    --form 'userId="1"'

--PUT
    curl --location --request PUT ''\''https://jsonplaceholder.typicode.com/posts/1'\''' \
    --form 'title="foo"' \
    --form 'body="bar"' \
    --form 'userId="1"' \
    --form 'id="1"'

--PATCH
    curl --location --request PATCH ''\''https://jsonplaceholder.typicode.com/posts/1'\''' \
    --form 'title="foo"'

--DELETE
    curl --location --request DELETE ''\''https://jsonplaceholder.typicode.com/posts/1'\'''

////////////////////////////////////////////////////////////////////////

JavaScript (Fetch api)

--GET 
    const requestOptions = {                                                  
    method: "GET",
    redirect: "follow"
  };

  fetch("https://jsonplaceholder.typicode.com/posts", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));

--POST
    const formdata = new FormData();
    formdata.append("title", "foo");
    formdata.append("body", "bar");
    formdata.append("userId", "1");

    const requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow"
    };

fetch("https://jsonplaceholder.typicode.com/posts", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));

--PUT
    const formdata = new FormData();
    formdata.append("title", "foo");
    formdata.append("body", "bar");
    formdata.append("userId", "1");
    formdata.append("id", "1");

    const requestOptions = {
      method: "PUT",
      body: formdata,
      redirect: "follow"
    };

    fetch("https://jsonplaceholder.typicode.com/posts/1", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));

--PATCH
    const formdata = new FormData();
    formdata.append("title", "foo");

    const requestOptions = {
      method: "PATCH",
      body: formdata,
      redirect: "follow"
    };

    fetch("'https://jsonplaceholder.typicode.com/posts/1'", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));

--DELETE
    const formdata = new FormData();

    const requestOptions = {
      method: "DELETE",
      body: formdata,
      redirect: "follow"
    };

    fetch("'https://jsonplaceholder.typicode.com/posts/1'", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));   

////////////////////////////////////////////////////////////////////////
  JavaScript (XHR)

--GET
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function() {
      if(this.readyState === 4) {
        console.log(this.responseText);
      }
    });

    xhr.open("GET", "https://jsonplaceholder.typicode.com/posts");

    xhr.send();

--POST
    // WARNING: For POST requests, body is set to null by browsers.
    var data = new FormData();
    data.append("title", "foo");
    data.append("body", "bar");
    data.append("userId", "1");

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function() {
      if(this.readyState === 4) {
        console.log(this.responseText);
      }
    });

    xhr.open("POST", "https://jsonplaceholder.typicode.com/posts");

    xhr.send(data);

--PUT
    var data = new FormData();
    data.append("title", "foo");
    data.append("body", "bar");
    data.append("userId", "1");
    data.append("id", "1");

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function() {
      if(this.readyState === 4) {
        console.log(this.responseText);
      }
    });

    xhr.open("PUT", "https://jsonplaceholder.typicode.com/posts/1");

    xhr.send(data);

--PATCH
    var data = new FormData();
    data.append("title", "foo");

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function() {
      if(this.readyState === 4) {
        console.log(this.responseText);
      }
    });

    xhr.open("PATCH", "'https://jsonplaceholder.typicode.com/posts/1'");

    xhr.send(data);

--DELETE
    var data = new FormData();

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function() {
      if(this.readyState === 4) {
        console.log(this.responseText);
      }
    });

    xhr.open("DELETE", "'https://jsonplaceholder.typicode.com/posts/1'");

    xhr.send(data);
////////////////////////////////////////////////////////////////////////

NodeJS
--GET  
    var request = require('request');
    var options = {
      'method': 'GET',
      'url': 'https://jsonplaceholder.typicode.com/posts',
      'headers': {
      },
      formData: {

      }
    };
    request(options, function (error, response) {
      if (error) throw new Error(error);
      console.log(response.body);
    });

--POST
      var request = require('request');
      var options = {
        'method': 'POST',
        'url': 'https://jsonplaceholder.typicode.com/posts',
        'headers': {
        },
        formData: {
          'title': 'foo',
          'body': 'bar',
          'userId': '1'
        }
      };
      request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
      });

--PUT    
    var request = require('request');
    var options = {
      'method': 'PUT',
      'url': '\'https://jsonplaceholder.typicode.com/posts/1\'',
      'headers': {
      },
      formData: {
        'title': 'foo',
        'body': 'bar',
        'userId': '1',
        'id': '1'
      }
    };
    request(options, function (error, response) {
      if (error) throw new Error(error);
      console.log(response.body);
    });


--PATCH
    var request = require('request');
    var options = {
      'method': 'PATCH',
      'url': '\'https://jsonplaceholder.typicode.com/posts/1\'',
      'headers': {
      },
      formData: {
        'title': 'foo'
      }
    };
    request(options, function (error, response) {
      if (error) throw new Error(error);
      console.log(response.body);
    });

--DELETE
    var request = require('request');
    var options = {
      'method': 'DELETE',
      'url': '\'https://jsonplaceholder.typicode.com/posts/1\'',
      'headers': {
      },
      formData: {

      }
    };
    request(options, function (error, response) {
      if (error) throw new Error(error);
      console.log(response.body);
    });

////////////////////////////////////////////////////////////////////////

Python
--GET
    import requests

    url = "https://jsonplaceholder.typicode.com/posts"

    payload = {}
    files={}
    headers = {}

    response = requests.request("GET", url, headers=headers, data=payload, files=files)

    print(response.text)

--POST
    import requests

    url = "https://jsonplaceholder.typicode.com/posts"

    payload = {'title': 'foo',
    'body': 'bar',
    'userId': '1'}
    files=[

    ]
    headers = {}

    response = requests.request("POST", url, headers=headers, data=payload, files=files)

    print(response.text)

--PUT
    import requests

    url = "https://jsonplaceholder.typicode.com/posts/1"

    payload = {'title': 'foo',
    'body': 'bar',
    'userId': '1',
    'userId': '1'}
    files=[

    ]
    headers = {}

    response = requests.request("PUT", url, headers=headers, data=payload, files=files)

    print(response.text)

--PATCH
    import requests

    url = "'https://jsonplaceholder.typicode.com/posts/1'"

    payload = {'title': 'foo'}
    files=[

    ]
    headers = {}

    response = requests.request("PATCH", url, headers=headers, data=payload, files=files)

    print(response.text)


--DELETE
    import requests

    url = "'https://jsonplaceholder.typicode.com/posts/1'"

    payload = {}
    files={}
    headers = {}

    response = requests.request("DELETE", url, headers=headers, data=payload, files=files)

    print(response.text)

////////////////////////////////////////////////////////////////////////

Java

--GET
    OkHttpClient client = new OkHttpClient().newBuilder()
    .build();
    MediaType mediaType = MediaType.parse("text/plain");
    RequestBody body = RequestBody.create(mediaType, "");
    Request request = new Request.Builder()
      .url("https://jsonplaceholder.typicode.com/posts")
      .method("GET", body)
      .build();
    Response response = client.newCall(request).execute();

--POST
    OkHttpClient client = new OkHttpClient().newBuilder()
      .build();
    MediaType mediaType = MediaType.parse("text/plain");
    RequestBody body = new MultipartBody.Builder().setType(MultipartBody.FORM)
      .addFormDataPart("title","foo")
      .addFormDataPart("body","bar")
      .addFormDataPart("userId","1")
      .build();
    Request request = new Request.Builder()
      .url("https://jsonplaceholder.typicode.com/posts")
      .method("POST", body)
      .build();
    Response response = client.newCall(request).execute();

--PUT
    OkHttpClient client = new OkHttpClient().newBuilder()
      .build();
    MediaType mediaType = MediaType.parse("text/plain");
    RequestBody body = new MultipartBody.Builder().setType(MultipartBody.FORM)
      .addFormDataPart("title","foo")
      .addFormDataPart("body","bar")
      .addFormDataPart("userId","1")
      .addFormDataPart("id","1")
      .build();
    Request request = new Request.Builder()
      .url("https://jsonplaceholder.typicode.com/posts/1")
      .method("PUT", body)
      .build();
    Response response = client.newCall(request).execute();


--PATCH
    OkHttpClient client = new OkHttpClient().newBuilder()
      .build();
    MediaType mediaType = MediaType.parse("text/plain");
    RequestBody body = new MultipartBody.Builder().setType(MultipartBody.FORM)
      .addFormDataPart("title","foo")
      .build();
    Request request = new Request.Builder()
      .url("'https://jsonplaceholder.typicode.com/posts/1'")
      .method("PATCH", body)
      .build();
    Response response = client.newCall(request).execute();

--DELETE
    OkHttpClient client = new OkHttpClient().newBuilder()
      .build();
    MediaType mediaType = MediaType.parse("text/plain");
    MediaType JSON = MediaType.parse("application/json; charset=utf-8");
    RequestBody body = RequestBody.create(JSON, "{}");
    Request request = new Request.Builder()
      .url("'https://jsonplaceholder.typicode.com/posts/1'")
      .method("DELETE", body)
      .build();
    Response response = client.newCall(request).execute();
////////////////////////////////////////////////////////////////////////

C#

--GET
    var client = new HttpClient();
    var request = new HttpRequestMessage(HttpMethod.Get, "https://jsonplaceholder.typicode.com/posts");
    var response = await client.SendAsync(request);
    response.EnsureSuccessStatusCode();
    Console.WriteLine(await response.Content.ReadAsStringAsync());


--POST
    var client = new HttpClient();
    var request = new HttpRequestMessage(HttpMethod.Post, "https://jsonplaceholder.typicode.com/posts");
    var content = new MultipartFormDataContent();
    content.Add(new StringContent("foo"), "title");
    content.Add(new StringContent("bar"), "body");
    content.Add(new StringContent("1"), "userId");
    request.Content = content;
    var response = await client.SendAsync(request);
    response.EnsureSuccessStatusCode();
    Console.WriteLine(await response.Content.ReadAsStringAsync());


--PUT
    var client = new HttpClient();
    var request = new HttpRequestMessage(HttpMethod.Put, "https://jsonplaceholder.typicode.com/posts/1");
    var content = new MultipartFormDataContent();
    content.Add(new StringContent("foo"), "title");
    content.Add(new StringContent("bar"), "body");
    content.Add(new StringContent("1"), "userId");
    content.Add(new StringContent("1"), "id");
    request.Content = content;
    var response = await client.SendAsync(request);
    response.EnsureSuccessStatusCode();
    Console.WriteLine(await response.Content.ReadAsStringAsync());


--PATCH
    var client = new HttpClient();
    var request = new HttpRequestMessage(HttpMethod.Patch, "'https://jsonplaceholder.typicode.com/posts/1'");
    var content = new MultipartFormDataContent();
    content.Add(new StringContent("foo"), "title");
    request.Content = content;
    var response = await client.SendAsync(request);
    response.EnsureSuccessStatusCode();
    Console.WriteLine(await response.Content.ReadAsStringAsync());

--DELETE
    var client = new HttpClient();
    var request = new HttpRequestMessage(HttpMethod.Delete, "'https://jsonplaceholder.typicode.com/posts/1'");
    var response = await client.SendAsync(request);
    response.EnsureSuccessStatusCode();
    Console.WriteLine(await response.Content.ReadAsStringAsync());

////////////////////////////////////////////////////////////////////////

Go

--GET
    package main

    import (
    "fmt"
    "net/http"
    "io"
    )

    func main() {

      url := "https://jsonplaceholder.typicode.com/posts"
      method := "GET"

      client := &http.Client {
      }
      req, err := http.NewRequest(method, url, nil)

      if err != nil {
        fmt.Println(err)
        return
      }
      res, err := client.Do(req)
      if err != nil {
        fmt.Println(err)
        return
      }
      defer res.Body.Close()

      body, err := io.ReadAll(res.Body)
      if err != nil {
        fmt.Println(err)
        return
      }
      fmt.Println(string(body))
    }

--POST
    package main

    import (
      "fmt"
      "bytes"
      "mime/multipart"
      "net/http"
      "io"
    )

    func main() {

      url := "https://jsonplaceholder.typicode.com/posts"
      method := "POST"

      payload := &bytes.Buffer{}
      writer := multipart.NewWriter(payload)
      _ = writer.WriteField("title", "foo")
      _ = writer.WriteField("body", "bar")
      _ = writer.WriteField("userId", "1")
      err := writer.Close()
      if err != nil {
        fmt.Println(err)
        return
      }


      client := &http.Client {
      }
      req, err := http.NewRequest(method, url, payload)

      if err != nil {
        fmt.Println(err)
        return
      }
      req.Header.Set("Content-Type", writer.FormDataContentType())
      res, err := client.Do(req)
      if err != nil {
        fmt.Println(err)
        return
      }
      defer res.Body.Close()

      body, err := io.ReadAll(res.Body)
      if err != nil {
        fmt.Println(err)
        return
      }
      fmt.Println(string(body))
    }

--PUT
    package main

    import (
      "fmt"
      "bytes"
      "mime/multipart"
      "net/http"
      "io"
    )

    func main() {

      url := "https://jsonplaceholder.typicode.com/posts/1"
      method := "PUT"

      payload := &bytes.Buffer{}
      writer := multipart.NewWriter(payload)
      _ = writer.WriteField("title", "foo")
      _ = writer.WriteField("body", "bar")
      _ = writer.WriteField("userId", "1")
      _ = writer.WriteField("id", "1")
      err := writer.Close()
      if err != nil {
        fmt.Println(err)
        return
      }


      client := &http.Client {
      }
      req, err := http.NewRequest(method, url, payload)

      if err != nil {
        fmt.Println(err)
        return
      }
      req.Header.Set("Content-Type", writer.FormDataContentType())
      res, err := client.Do(req)
      if err != nil {
        fmt.Println(err)
        return
      }
      defer res.Body.Close()

      body, err := io.ReadAll(res.Body)
      if err != nil {
        fmt.Println(err)
        return
      }
      fmt.Println(string(body))
    }

--PATCH
    package main

    import (
      "fmt"
      "bytes"
      "mime/multipart"
      "net/http"
      "io"
    )

    func main() {

      url := "'https://jsonplaceholder.typicode.com/posts/1'"
      method := "PATCH"

      payload := &bytes.Buffer{}
      writer := multipart.NewWriter(payload)
      _ = writer.WriteField("title", "foo")
      err := writer.Close()
      if err != nil {
        fmt.Println(err)
        return
      }


      client := &http.Client {
      }
      req, err := http.NewRequest(method, url, payload)

      if err != nil {
        fmt.Println(err)
        return
      }
      req.Header.Set("Content-Type", writer.FormDataContentType())
      res, err := client.Do(req)
      if err != nil {
        fmt.Println(err)
        return
      }
      defer res.Body.Close()

      body, err := io.ReadAll(res.Body)
      if err != nil {
        fmt.Println(err)
        return
      }
      fmt.Println(string(body))
    }

--DELETE
    package main

    import (
      "fmt"
      "bytes"
      "mime/multipart"
      "net/http"
      "io"
    )

    func main() {

      url := "'https://jsonplaceholder.typicode.com/posts/1'"
      method := "DELETE"

      payload := &bytes.Buffer{}
      writer := multipart.NewWriter(payload)
      err := writer.Close()
      if err != nil {
        fmt.Println(err)
        return
      }


      client := &http.Client {
      }
      req, err := http.NewRequest(method, url, payload)

      if err != nil {
        fmt.Println(err)
        return
      }
      req.Header.Set("Content-Type", writer.FormDataContentType())
      res, err := client.Do(req)
      if err != nil {
        fmt.Println(err)
        return
      }
      defer res.Body.Close()

      body, err := io.ReadAll(res.Body)
      if err != nil {
        fmt.Println(err)
        return
      }
      fmt.Println(string(body))
    }
*/
