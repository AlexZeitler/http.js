# http.js

http.js provides AJAX functionality for the browser.

## Quick start

Basically, using http.js is easy. All you need to do is to add a reference to it within your application:

```html
<script type="text/javascript" src="https://raw.github.com/goloroden/http.js/master/http.js"></script>
```

Now you are able to send AJAX requests. All you need to do is access the `http` object and use its functions:

<table>
  <tr><th>Function</th><th>Description</th></tr>
  <tr><td>http.get(url, data, headers, callback)</td><td>Sends a GET request to the specified url.</td></tr>
  <tr><td>http.post(url, data, headers, callback)</td><td>Sends a POST request to the specified url.</td></tr>
  <tr><td>http.put(url, data, headers, callback)</td><td>Sends a PUT request to the specified url.</td></tr>
  <tr><td>http.delete(url, data, headers, callback)</td><td>Sends a DELETE request to the specified url.</td></tr>
  <tr><td>http.auth(username, password)</td><td>Sets credentials that are to be used for each request.</td></tr>
</table>

### Sending data

The `data` parameter allows you to send additional information, using either a string or an object. When sending
a GET request, the `data` parameter is sent using the query string, otherwise it is transferred hidden within the
request's body.

Both the `data` and `headers` parameters are optional.

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