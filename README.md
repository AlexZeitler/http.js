# http.js

http.js provides AJAX functionality for the browser.

## Installing

Basically, using http.js is easy. All you need to do is add a script reference within your web site. If you want
to use the latest version hosted on GitHub, use:

```html
<script type="text/javascript" src="https://raw.github.com/goloroden/http.js/master/bin/http.min.js"></script>
```

If instead you want to use a specific version hosted on GitHub, use:

```html
<script type="text/javascript" src="https://raw.github.com/goloroden/http.js/master/bin/http-[x.y.z].min.js"></script>
```

Of course you can also download any version manually and add a local reference.

If you are running Visual Studio, instead of downloading manually you can also install http.js by using the
[NuGet package](http://nuget.org/packages/http.js). For that run the following command inside the NuGet console:

    PM> Install-Package http.js

*Note: The NuGet package was created by [Alexander Zeitler](http://www.pdmlab.com). Thanks for that :-)!*

As Internet Explorer 6 and 7 do not provide JSON functionality out of the box, you have to add a reference
to [JSON3](https://github.com/bestiejs/json3) before referencing http.js:

```html
<script type="text/javascript" src="https://raw.github.com/bestiejs/json3/gh-pages/lib/json3.min.js"></script>
```

## Basic usage

Once you created the reference, you are able to use http.js. You access it by `http`, which is a global object
in your web site.

The easiest thing you can do is to `GET` data from a specific url. For that, use the `http.get` function and
provide the required parameters. In the callback you can access the HTTP status code as well as the returned
data, either formatted as plain text or - if applicable - as JSON:

```javascript
http.get(url, function (status, data) {
  console.log('HTTP status code: ' + status);
  console.log('Data (as text)  : ' + data.text());
  console.log('Data (as JSON)  : ' + data.json());
});
```

Instead of `http.get` you can also use `http.post`, `http.put` and `http.del` to send requests using the
verbs `POST`, `PUT` and `DELETE` instead of `GET`.

*Note: For advanced usage, the verbs `CONNECT`, `HEAD`, `OPTIONS`, `PATCH` and `TRACE` are also supported.
Use the appropriate named functions to access these verbs.*

## Discovering allowed verbs

If you need to find out whether a specific verb is allowed by a given url you can use the `http.isAllowed`
function as follows:

```javascript
http.isAllowed(url, 'GET', function (isAllowed) {
  console.log('GET ' + url + ' is allowed: ' + isAllowed);
});
```

Internally this performs an `OPTIONS` request on the given url and verifies whether the specified verb
is contained within the result.

## Sending data

Sometimes it is necessary to send additional data appended to a request. For that, use the `options`
parameter and supply its `data` property. You can either specify the data value using a `string` or an
`object`:

```javascript
http.get(url, { data: 'foo' }, function (status, data) {
  // ...
});

http.get(url, { data: { foo: 'bar' } }, function (status, data) {
  // ...
});
```

When doing a `GET` request, the `data` value is sent using the query string. With all other types of
requests it is sent hidden inside the request body.

## Sending headers

From time to time it may be necessary to specify additional headers that shall be sent. For that you
can use the `options` parameter as well, but this time you need to specify its `headers` property.

The value of this property is of type `object` and defines headers and their respective values:

```javascript
http.get(url, { headers: { 'accept': 'application/json' } }, function (status, data) {
  // ...
});
```

Most often this feature is used to specify `accept` and `content-type` headers.

Please note that these headers are even sent if you do not specify them explicitly. For them the
following default values are used:

```javascript
headers: {
  'accept': '*/*',
  'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
}
```

## Caching requests

Some browsers (i.e. Internet Explorer ;-)) tend to cache `GET` requests that return data with the
content-type `application/json`.

Since this is not what you want most of the times, http.js adds a query string parameter called `_`
on `GET` requests automatically. This parameter contains the current date and time so that subsequent
requests to the same url look different and the browser does not try to cache the results.

If you want to explicitly allow caching on `GET` requests, you can do so by specifying the `options`
object and its `cache` property:

```javascript
http.get(url, { cache: true }, function (status, data) {
  // ...
});
```

## Using JSONP

Sometimes you need to do cross-domain GET requests. If the requested web server does not support
[CORS](http://en.wikipedia.org/wiki/Cross-origin_resource_sharing), [JSONP](http://en.wikipedia.org/wiki/JSONP)
may be an alternative.

To use JSONP, you need to specify the `options` object and its `jsonp` property. The value of this
property is the name of the callback function:

```javascript
http.get(url, { jsonp: 'foo' });
```

When specifying the `jsonp` property, no inline callback is needed as with the normal usage of the
`http.get` function.

*Note: JSONP calls are only supported on `GET` requests.*

## Authenticating requests

*Currently under development, stay tuned.*

## Running the tests

Before running the tests for the first time, you need to install the dependencies of the Node.js application.
For that run:

    $ npm install

*Note: You need to do this only once.*

To run the tests, package and start a Node.js server using the following commands:

    $ jake
    $ node web/app.js

Next, open a browser and redirect it to `http://localhost:3000`.

Alternatively, you can run the tests remote - e.g. to test browsers on iPad, iPhone, ... For that redirect your
browser to `http://httpjs.herokuapp.com`.

http.js runs at least on the following browsers:

- Desktop browsers
    - Chrome 3 and above
    - Firefox 3.5 and above
    - Internet Explorer 6 and above
    - Opera 10.5 and above
    - Safari 4 and above
- Mobile browsers
    - Android Safari 4.0 and above
    - iPad Safari 5.1.1 and above
    - iPad Chrome 21 and above
    - iPhone Safari 5.1.1 and above
    - iPhone Chrome 21 and above

*Note: As Internet Explorer 6 and 7 do not provide JSON functionality out of the box, you have to add a reference
to [JSON3](https://raw.github.com/bestiejs/json3/gh-pages/lib/json3.min.js) before referencing http.js.*

That's it :-)!

## License

The MIT License (MIT)
Copyright (c) 2012 Golo Roden.
 
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.