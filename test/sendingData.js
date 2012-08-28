suite('Sending data', function () {
  suite('POST', function () {
    test('Sending JSON data', function (done) {
      http.post('/sendingData/json', { data: { foo: 'bar' } }, function (status, data) {
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
});