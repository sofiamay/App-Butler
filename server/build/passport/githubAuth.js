'use strict';

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _passportGithub = require('passport-github');

var _passportGithub2 = _interopRequireDefault(_passportGithub);

// var _USERMODELPATH = require('USERMODELPATH');

// var _USERMODELPATH2 = _interopRequireDefault(_USERMODELPATH);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports.handleLogin = _passport2.default.authenticate('github');

module.exports.authenticateLogin = _passport2.default.authenticate('github', { failureRedirect: '/login' }, function (req, res) {
  res.redirect('/');
});

_passport2.default.serializeUser(function (user, done) {
  done(null, user.id);
});

_passport2.default.deserializeUser(function (id, done) {
  _USERMODELPATH2.default.findById(id, function (err, user) {
    done(err, user);
  });
});

process.env.GITHUB_ID = 'cb448b1d4f0c743a1e36';
process.env.GITHUB_SECRET = '815aa4606f476444691c5f1c16b9c70da6714dc6';
console.log(process.env.GITHUB_ID);
_passport2.default.use(new _passportGithub2.default({

  clientID: process.env.GITHUB_ID,
  clientSecret: process.env.GITHUB_SECRET,
  callbackURL: '/auth/github/callback',
  passReqToCallback: true
}, function (req, accessToken, refreshToken, profile, done) {
  if (req.user) {
    // MODEL NAME?
    _USERMODELPATH2.default.findOne({ github: profile.id }, function (err, existingUser) {
      if (existingUser) {
        req.flash('errors', { msg: 'There is already a Github account that belongs to you. Sign in with that account or delete it, then link it with your current account.' });
        done(err);
      } else {
        _USERMODELPATH2.default.findById(req.user.id, function (err2, user) {
          user.github = profile.id;
          user.tokens.push({
            kind: 'github',
            accessToken: accessToken
          });
          user.profile.name = user.profile.name || profile.displayName;
          user.profile.picture = user.profile.picture || profile._json.avatar_url;
          user.profile.location = user.profile.location || profile._json.location;
          user.profile.website = user.profile.website || profile._json.blog;
          user.save(function (err3) {
            req.flash('info', { msg: 'GitHub account has been linked.' });
            done(err3, user);
          });
        });
      }
    });
  } else {
    _USERMODELPATH2.default.findOne({ github: profile.id }, function (err, existingUser) {
      if (existingUser) {
        return done(null, existingUser);
      }
      _USERMODELPATH2.default.findOne({ email: profile._json.email }, function (err2, existingEmailUser) {
        if (existingEmailUser) {
          req.flash('errors', { msg: 'There is already an account using this email address. Sign in to that account and link it with Github manually from Account Settings.' });
          done(err2);
        } else {
          (function () {
            var user = new _USERMODELPATH2.default();
            user.email = profile._json.email;
            user.github = profile.id;
            user.tokens.push({
              kind: 'github',
              accessToken: accessToken
            });
            user.profile.name = profile.displayName;
            user.profile.picture = profile._json.avatar_url;
            user.profile.website = profile._json.blog;
            user.save(function (err3) {
              done(err3, user);
            });
          })();
        }
      });
    });
  }
}));