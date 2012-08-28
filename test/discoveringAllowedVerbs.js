suite('Discovering allowed verbs', function () {
  test('Verify if GET is allowed.', function (done) {
    http.isAllowed('/discoveringAllowedVerbs', 'GET', function (isAllowed) {
      expect(isAllowed).to.eql(true);
      done();
    });
  });

  test('Verify if POST is allowed.', function (done) {
    http.isAllowed('/discoveringAllowedVerbs', 'POST', function (isAllowed) {
      expect(isAllowed).to.eql(false);
      done();
    });
  });
});