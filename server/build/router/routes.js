'use strict';

var _githubAuth = require('./../passport/githubAuth');

var _githubAuth2 = _interopRequireDefault(_githubAuth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (app, express) {
  app.use(express.static(__dirname + './../../../../client'));

  app.get('/auth/github', _githubAuth2.default.handleLogin);

  app.get('/auth/github/callback', _githubAuth2.default.authenticateLogin, function (req, res) {
    res.redirect('/home');
  });
};