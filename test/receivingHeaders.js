suite('Receiving headers', function () {
  suite('GET', function () {
    test('Requesting text returns { 200, text, text/html; charset=utf-8 }.', function (done) {
      http.get('/basicUsage/text', function (status, data, header) {
        expect({
          status: status,
          data: data.text(),
          header: header('Content-Type')
        }).to.eql({
          status: 200,
          data: 'http.js',
          header: 'text/html; charset=utf-8'
        });
        done();
      });
    });

    test('Requesting JSON returns { 200, JSON, application/json; charset=utf-8 }.', function (done) {
      http.get('/basicUsage/json', function (status, data, header) {
        expect({
          status: status,
          data: data.json(),
          header: header('Content-Type')
        }).to.eql({
          status: 200,
          data: { name: 'http.js' },
          header: 'application/json; charset=utf-8'
        });
        done();
      });
    });
});