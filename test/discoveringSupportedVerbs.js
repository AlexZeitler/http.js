suite('Discovering supported verbs', function () {
  test('isAllowed GET /discoveringSupportedVerbs', function (done) {
    http.isAllowed('/discoveringSupportedVerbs', 'GET', function (isAllowed) {
      expect(isAllowed).to.eql(true);
      done();
    });
  });

  test('isAllowed POST /discoveringSupportedVerbs', function (done) {
    http.isAllowed('/discoveringSupportedVerbs', 'POST', function (isAllowed) {
      expect(isAllowed).to.eql(false);
      done();
    });
  });
});