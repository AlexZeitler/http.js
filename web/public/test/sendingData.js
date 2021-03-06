suite('Sending data', function () {
  suite('POST', function () {
    test('Sending JSON returns JSON.', function (done) {
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

    test('Sending nested JSON returns nested JSON.', function (done) {
      http.post('/sendingData/json', { headers: { 'content-type': 'application/json' }, data: { foo: 'bar', nested: { foo: 'baz' } } }, function (status, data) {
        expect({
          status: status,
          data: data.json()
        }).to.eql({
          status: 200,
          data: {
            name: 'http.js',
            data: {
              foo: 'bar',
              nested: {
                foo: 'baz'
              }
            }
          }
        });
        done();
      });
    });    
  });
});