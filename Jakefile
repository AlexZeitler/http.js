var path = require('path'),
    _ = require('underscore');

var folder = {
  base: __dirname,
  build: path.join(__dirname, 'web')
};

var deployItems = [
  'package.json',

  'server/app.js',
  'server/Procfile',
  'server/routes.js',

  'server/public/',
  'server/views/'

  // lib/http.js and test/* are copied manually
];

desc('Rebuilds the website.');
task('default', ['rebuild'], function () {});

desc('Rebuilds the website.');
task('rebuild', ['clean', 'build'], function () {});

desc('Builds the website.');
task('build', function () {
  jake.mkdirP(folder.build);
  _.each(deployItems, function (deployItem) {
    jake.cpR(path.join(folder.base, deployItem), folder.build);
  });
  
  jake.cpR(path.join(folder.base, '/lib/http.js'), path.join(folder.build, '/public/scripts'));
  jake.cpR(path.join(folder.base, '/test'), path.join(folder.build, '/public'));
});

desc('Cleans the build folder.');
task('clean', function () {
  jake.rmRf(folder.build);
});

desc('Packages http.js (remember to update version in current.json).');
task('package', function () {
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
    'git subtree push --prefix web heroku master'
  ]);
});