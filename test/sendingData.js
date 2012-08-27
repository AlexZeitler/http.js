suite('Sending data', function () {
  test('POST /json with data', function (done) {
    http.post('/json', { data: { foo: 'bar' } }, function (status, data) {
      expect({
        status: status,
        data: data.json()
      }).to.eql({
        status: 200,
        data: {
          name: 'http.js',
          data: {
            foo: 'bar'
          }
        }
      });
      done();
    });
  });
});