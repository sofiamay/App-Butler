var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');
webpackConfig.entry = {};

module.exports = function (config) {
  config.set({
    browsers: [process.env.TRAVIS ? 'Firefox' : 'Chrome'], // run in Firefox when using Travis
    singleRun: true, // just run once by default
    frameworks: ['chai', 'mocha'], // use the mocha test framework
    files: [
      'client/test/tests.webpack.js', // just load this file
    ],
    preprocessors: {
      'client/test/tests.webpack.js': ['webpack', 'sourcemap'],
    },
    reporters: ['dots'], // report results in this format
    webpack: webpackConfig,
    webpackServer: {
      noInfo: true, // please don't spam the console when running in karma!
    },
  });
};