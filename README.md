# http.js

http.js provides AJAX functionality for the browser.

## Quick start

Basically, using http.js is easy. All you need to do is to add a reference to it within your application:

```html
<script type="text/javascript" src="https://raw.github.com/goloroden/http.js/master/bin/http-[x.y.z].min.js"></script>
```

Now you are able to send AJAX requests. All you need to do is access the `http` object and use its functions:

<table>
  <tr><th>Function</th><th>Description</th></tr>
  <tr><td>http.allowed(url, verb, callback)</td><td>Gets whether the specified verb is allowed for the given url, or not.</td></tr>
  <tr><td>http.auth(username, password)</td><td>Sets credentials that are to be used for each request.</td></tr>
  <tr><td>http.connect(url, options, callback)</td><td>Sends a CONNECT request to the specified url.</td></tr>
  <tr><td>http.delete(url, options, callback)</td><td>Sends a DELETE request to the specified url.</td></tr>
  <tr><td>http.get(url, options, callback)</td><td>Sends a GET request to the specified url.</td></tr>
  <tr><td>http.head(url, options, callback)</td><td>Sends a HEAD request to the specified url.</td></tr>
  <tr><td>http.options(url, options, callback)</td><td>Sends a OPTIONS request to the specified url.</td></tr>
  <tr><td>http.patch(url, options, callback)</td><td>Sends a PATCH request to the specified url.</td></tr>
  <tr><td>http.post(url, options, callback)</td><td>Sends a POST request to the specified url.</td></tr>
  <tr><td>http.put(url, options, callback)</td><td>Sends a PUT request to the specified url.</td></tr>
  <tr><td>http.trace(url, options, callback)</td><td>Sends a TRACE request to the specified url.</td></tr>
</table>

### Sending additional data

The optional `options` parameter allows you to send additional information. It uses the following structure:

```javascript
{
  cache,
  data,
  headers,
  jsonp
}
```

The meaning and usage of the individual parameters is as follows:

<table>
  <tr><th>Property</th><th>Type(s)</th><th>Usage</th><th>Default</th></tr>
  <tr><th colspan="4">Description</th></tr>
  <tr>
    <td>cache</td><td>boolean</td><td>optional</td><td>false</td>
  </tr>
  <tr>
    <td colspan="4">
      This property decides whether the response may be cached by the browser or not. By default, caching is
      avoided by sending a query string containing the current date and time. Please note that this property
      only affects GET requests.
    </td>
  </tr>
  <tr>
    <td>data</td><td>string, object</td><td>optional</td><td>-</td>
  </tr>
  <tr>
    <td colspan="4">
      This property contains additional data that is to be sent to the server. In GET requests, this property is
      sent using the query string, otherwise it is transferred hidden within the request's body.
    </td>
  </tr>
  <tr>
    <td>headers</td><td>object</td><td>optional</td><td>
      {<br />
        'accept': '*/*',<br />
        'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'<br />
      }
    </td>
  </tr>
  <tr>
    <td colspan="4">
      This property contains arbitrary headers that shall be sent.
    </td>
  </tr>
  <tr>
    <td>jsonp</td><td>string</td><td>optional</td><td>-</td>
  </tr>
  <tr>
    <td colspan="4">
      This property contains a function name that shall be used as callback on a JSONP request. When this property
      is specified no callback is required. Please note that this property only works on GET requests.
    </td>
  </tr>
</table>

### Handling the result

Once the result has been received, the specified `callback` function is called. Its `data` parameter provides two
functions, `text` and `json` which return the result in the desired format:

```javascript
http.get('/text', function (status, data) {
  console.log('HTTP status code: ' + status);
  console.log('Data (as text):   ' + data.text());
});

http.get('/json', function (status, data) {
  console.log('HTTP status code: ' + status);
  console.log('Data (as JSON):   ' + data.json());
});
```

### Authentication

If necessary you can use the `auth` function to set credentials once that are then used for each request:

```javascript
http.auth('golo', 'secret');
```

That's it :-)!

## License

The MIT License (MIT)
Copyright (c) 2012 Golo Roden.
 
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.