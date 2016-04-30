'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _prettyError = require('pretty-error');

var _prettyError2 = _interopRequireDefault(_prettyError);

var _config = require('./config.js');

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _routes = require('./router/routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var server = (0, _express2.default)();
var router = _routes2.default;

server.use(_passport2.default.initialize());
router(server, _express2.default);

server.use(_express2.default.static(__dirname + '/../../client'));

server.use(_bodyParser2.default.urlencoded({ extended: true }));
server.use(_bodyParser2.default.json());

server.listen(_config.port, function () {
  console.log('The server is running at http://localhost:' + _config.port);
});