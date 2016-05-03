'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _prettyError = require('pretty-error');

var _prettyError2 = _interopRequireDefault(_prettyError);

var _config = require('./config.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import browserSync from 'browser-sync';

var server = (0, _express2.default)();

var pe = new _prettyError2.default();
pe.start();

server.use(_express2.default.static(__dirname + '/../../client'));
server.use(_bodyParser2.default.urlencoded({ extended: true }));
server.use(_bodyParser2.default.json());

server.listen(_config.port, function () {
  console.log('The server is running at http://localhost:' + _config.port);
  // Listen for the `init` event
  // browserSync({
  //   proxy: `localhost:${port}`,
  //   files: [
  //     `${__dirname}/../../client/**/*.{js}`,
  //     {
  //       match: ['wp-content/themes/**/*.php'],
  //     },
  //   ],
  // });
});