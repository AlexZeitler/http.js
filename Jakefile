desc('Builds http.js.');
task('default', function () {
  jake.exec([
    'smoosh ./current.json',
    'smoosh ./latest.json'
  ]);
});

desc('Deploys http.js to Heroku.')
task('deploy', function () {
  jake.exec([
    // The subtree addin must be installed for this to work.
    // Get it from https://github.com/apenwarr/git-subtree
    'git subtree push --prefix server heroku master'
  ]);
});