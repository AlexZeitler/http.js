suite('Authenticating requests', function () {
  suite('GET', function () {
    test('Requesting with HTTP Basic returns protected ressource.', function (done) {
      http.authBasic('secret', 'secret');
      http.get('/authenticatingRequests', function (status, data) {
        expect({
          status: status,
          data: data.text()
        }).to.eql({
          status: 200,
          data: 'http.js with HTTP Basic authentication'
        });
        done();
      });
    });
  });
});