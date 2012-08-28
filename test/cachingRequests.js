suite('Caching requests', function () {
  suite('GET', function () {
    test('Requesting with caching disabled returns true.', function (done) {
      http.get('/cachingRequests/get', function (status, data) {
        expect({
          status: status,
          data: data.text()
        }).to.eql({
          status: 200,
          data: 'true'
        });
        done();
      });
    });    

    test('Requesting with caching enabled returns false.', function (done) {
      http.get('/cachingRequests/get', { cache: true }, function (status, data) {
        expect({
          status: status,
          data: data.text()
        }).to.eql({
          status: 200,
          data: 'false'
        });
        done();
      });
    });    
  });
});