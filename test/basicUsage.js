suite('Basic usage', function () {
  suite('GET', function () {
    test('Requesting text ', function (done) {
      http.get('/basicUsage/text', function (status, data) {
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

    test('Requesting JSON', function (done) {
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
  });

  suite('POST', function () {
    test('Requesting text ', function (done) {
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

    test('Requesting JSON', function (done) {
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
  });

  suite('PUT', function () {
    test('Requesting text ', function (done) {
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

    test('Requesting JSON', function (done) {
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
  });

  suite('DELETE', function () {
    test('Requesting text ', function (done) {
      http.delete('/basicUsage/text', function (status, data) {
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

    test('Requesting JSON', function (done) {
      http.delete('/basicUsage/json', function (status, data) {
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
});