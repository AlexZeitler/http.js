suite('Sending headers', function () {
  suite('GET', function () {
    test('Sending additional headers returns JSON.', function (done) {
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