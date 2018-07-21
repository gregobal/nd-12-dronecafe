//jshint strict: false
module.exports = function (config) {
  config.set({

    basePath: './public',

    files: [
      'bower_components/angular/angular.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/restangular/dist/restangular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/socket.io-client/dist/socket.io.js',
      'src/*.js',
      'src/*/*.js'
    ],

    autoWatch: true,

    frameworks: ['jasmine'],

    browsers: ['Chrome'],

    plugins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine',
      'karma-junit-reporter'
    ],

    junitReporter: {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }
  });
};
