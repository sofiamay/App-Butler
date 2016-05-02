import passport from 'passport';
import { Strategy } from 'passport-github';
// import User from 'USERMODELPATH';
import { GITHUB_ID, GITHUB_SECRET } from './../GITHUBKEYS.js';


module.exports.handleLogin = passport.authenticate('github');

module.exports.authenticateLogin = passport.authenticate('github', { failureRedirect: '/login' });


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // User.findById(id, (err, user) => {
  //   done(err, user);
  // });
  done(null, id);
});

passport.use(new Strategy({

  clientID: GITHUB_ID,
  clientSecret: GITHUB_SECRET,
  callbackURL: '/auth/github/callback',
  userAgent: 'localhost:8000',
  scope: 'user, public_repo, repo, admin:org',
  // userAgent: 'AppButler.io',
  // passReqToCallback: true,
}, (accessToken, refreshToken, tokenDetails, profile, done) => {
  // refreshToken is not provided by GitHub
  console.log(profile.username + ': login successful' + ' with access token: ' + accessToken);
  done(null, profile);
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
