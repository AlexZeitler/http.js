suite('Using JSONP', function () {
  test('Requesting a callback with text.', function (done) {
    // Introduce a global function called 'verify'. This is by intention.
    verify = function (text) {
      expect(text).to.eql('http.js');
      done();
    };

    http.get('/usingJsonp/text', { jsonp: 'verify' });
  });    
});