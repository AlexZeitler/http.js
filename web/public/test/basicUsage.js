suite('Basic usage', function () {
  suite('GET', function () {
    test('Requesting text returns { 200, text, text/html; charset=utf-8 }.', function (done) {
      http.get('/basicUsage/text', function (status, data, header) {
        expect({
          status: status,
          data: data.text(),
          header: data.header('Content-Type')
        }).to.eql({
          status: 200,
          data: 'http.js',
          header: 'text/html; charset=utf-8'
        });
        done();
      });
    });

    test('Requesting JSON returns { 200, JSON }.', function (done) {
      http.get('/basicUsage/json', function (status, data) {
        expect({
          status: status,
          data: data.json()
        }).to.eql({
          status: 200,
          data: { name: 'http.js' }
        });
        done();
      });
    });

    test('Requesting text from a JSON ressource returns { 200, JSON as text }.', function (done) {
      var removeAnyWhitespace = function (text) {
        return text.replace(/\s+/g, '');
      };

      http.get('/basicUsage/json', function (status, data) {
        expect({
          status: status,
          data: removeAnyWhitespace(data.text())
        }).to.eql({
          status: 200,
          data: removeAnyWhitespace(JSON.stringify({ name: 'http.js' }))
        });
        done();
      });
    });

    test('Requesting JSON from a text ressource throws an exception.', function (done) {
      http.get('/basicUsage/text', function (status, data) {
        expect(function () {
          data.json();
        }).to.throwException();
        done();
      });
    });

    test('Requesting a non-existing resource returns 404.', function (done) {
      http.get('/nonExisting/text', function (status, data) {
        expect(status).to.eql(404);
        done();
      });
    });
  });

  suite('POST', function () {
    test('Requesting text returns { 200, text }.', function (done) {
      http.post('/basicUsage/text', function (status, data) {
        expect({
          status: status,
          data: data.text()
        }).to.eql({
          status: 200,
          data: 'http.js'
        });
        done();
      });
    });

    test('Requesting JSON returns { 200, JSON }.', function (done) {
      http.post('/basicUsage/json', function (status, data) {
        expect({
          status: status,
          data: data.json()
        }).to.eql({
          status: 200,
          data: { name: 'http.js' }
        });
        done();
      });
    });    

    test('Requesting a non-existing resource returns 404.', function (done) {
      http.post('/nonExisting/text', function (status, data) {
        expect(status).to.eql(404);
        done();
      });
    });
  });

  suite('PUT', function () {
    test('Requesting text returns { 200, text }.', function (done) {
      http.put('/basicUsage/text', function (status, data) {
        expect({
          status: status,
          data: data.text()
        }).to.eql({
          status: 200,
          data: 'http.js'
        });
        done();
      });
    });

    test('Requesting JSON returns { 200, JSON }.', function (done) {
      http.put('/basicUsage/json', function (status, data) {
        expect({
          status: status,
          data: data.json()
        }).to.eql({
          status: 200,
          data: { name: 'http.js' }
        });
        done();
      });
    });    

    test('Requesting a non-existing resource returns 404.', function (done) {
      http.put('/nonExisting/text', function (status, data) {
        expect(status).to.eql(404);
        done();
      });
    });
  });

  suite('DELETE', function () {
    test('Requesting text returns { 200, text }.', function (done) {
      http.del('/basicUsage/text', function (status, data) {
        expect({
          status: status,
          data: data.text()
        }).to.eql({
          status: 200,
          data: 'http.js'
        });
        done();
      });
    });

    test('Requesting JSON returns { 200, JSON }.', function (done) {
      http.del('/basicUsage/json', function (status, data) {
        expect({
          status: status,
          data: data.json()
        }).to.eql({
          status: 200,
          data: { name: 'http.js' }
        });
        done();
      });
    });    

    test('Requesting a non-existing resource returns 404.', function (done) {
      http.del('/nonExisting/text', function (status, data) {
        expect(status).to.eql(404);
        done();
      });
    });
  });
});