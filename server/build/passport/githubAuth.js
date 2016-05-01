'use strict';

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _passportGithub = require('passport-github');

var _passportGithub2 = _interopRequireDefault(_passportGithub);

// var _USERMODELPATH = require('USERMODELPATH');

// var _USERMODELPATH2 = _interopRequireDefault(_USERMODELPATH);

var _GITHUBKEYS = require('./../GITHUBKEYS.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports.handleLogin = _passport2.default.authenticate('github', { scope: 'user, public_repo, repo, delete_repo, admin:repo_hook, admin:org' });

module.exports.authenticateLogin = _passport2.default.authenticate('github', { failureRedirect: '/login' });

_passport2.default.serializeUser(function (user, done) {
  done(null, user.id);
});

_passport2.default.deserializeUser(function (id, done) {
  _USERMODELPATH2.default.findById(id, function (err, user) {
    done(err, user);
  });
});

_passport2.default.use(new _passportGithub2.default({

  clientID: _GITHUBKEYS.GITHUB_ID,
  clientSecret: _GITHUBKEYS.GITHUB_SECRET,
  callbackURL: '/auth/github/callback',
  passReqToCallback: true
}, function (req, accessToken, refreshToken, profile, done) {
  console.log(profile);
  console.log(accessToken);
  done(null);
  // User.findOne({ github: profile.id }, (err, existingUser) => {
  //   if (existingUser) {
  //     // Login the user
  //     done(null, existingUser);
  //   } else { // store user into database
  //     User.findById(req.user.id, (err2, user) => {
  //       user.github = profile.id;
  //       user.tokens.push({
  //         kind: 'github',
  //         accessToken,
  //       });
  //       user.profile.name = user.profile.name || profile.displayName;
  //       user.profile.picture = user.profile.picture || profile._json.avatar_url;
  //       user.profile.location = user.profile.location || profile._json.location;
  //       user.profile.website = user.profile.website || profile._json.blog;
  //       user.save(err3 => {
  //         req.flash('info', { msg: 'GitHub account has been linked.' });
  //         done(err3, user);
  //       });
  //     });
  //   }
  // });
}));