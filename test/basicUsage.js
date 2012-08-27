suite('Basic usage', function () {
  test('GET /text', function (done) {
    http.get('/text', function (status, data) {
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

  test('GET /json', function (done) {
    http.get('/json', function (status, data) {
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
});