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
    'git subtree push --prefix server heroku master'
  ]);
});