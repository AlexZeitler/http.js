suite('Discovering supported verbs', function () {
  test('isAllowed GET /text', function (done) {
    http.isAllowed('/text', 'GET', function (isAllowed) {
      expect(isAllowed).to.eql(true);
      done();
    });
  });

  test('isAllowed POST /text', function (done) {
    http.isAllowed('/text', 'POST', function (isAllowed) {
      expect(isAllowed).to.eql(false);
      done();
    });
  });

  test('isAllowed GET /json', function (done) {
    http.isAllowed('/json', 'GET', function (isAllowed) {
      expect(isAllowed).to.eql(true);
      done();
    });
  });

  test('isAllowed POST /json', function (done) {
    http.isAllowed('/json', 'POST', function (isAllowed) {
      expect(isAllowed).to.eql(true);
      done();
    });
  });
});