suite('Sending headers', function () {
  suite('GET', function () {
    test('Sending additional request headers returns JSON.', function (done) {
      http.headers();
      http.get('/sendingHeaders/get', { headers: { sentBy: 'http.js' } }, function (status, data) {
        expect({
          status: status,
          data: data.json()
        }).to.eql({
          status: 200,
          data: {
            sentBy: 'http.js'
          }
        });
        done();
      });
    });    

    test('Sending additional default headers returns JSON.', function (done) {
      http.headers({ sentBy: 'http.js' });
      http.get('/sendingHeaders/get', function (status, data) {
        expect({
          status: status,
          data: data.json()
        }).to.eql({
          status: 200,
          data: {
            sentBy: 'http.js'
          }
        });
        done();
      });
    });    

    test('Sending additional request headers overwriting default headers returns JSON.', function (done) {
      http.headers({ sentBy: 'foo' });
      http.get('/sendingHeaders/get', { headers: { sentBy: 'http.js' } }, function (status, data) {
        expect({
          status: status,
          data: data.json()
        }).to.eql({
          status: 200,
          data: {
            sentBy: 'http.js'
          }
        });
        done();
      });
    });    
  });
});