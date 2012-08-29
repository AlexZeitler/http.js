desc('Builds http.js.');
task('default', [ 'package', 'deploy' ], function () {
});

desc('Minifies, obfuscates and packages http.js.');
task('package', function () {
  jake.exec([
    'smoosh ./current.json',
    'smoosh ./latest.json'
  ]);
});

desc('Deploys http.js to Heroku')
task('deploy', function () {
  jake.exec([
    // The subtree addin must be installed for this to work.
    // Get it from https://github.com/apenwarr/git-subtree
    'git subtree push --prefix server heroku master'
  ]);
});