import passport from 'passport';
import GitHubStrategy from 'passport-github';
import User from 'USERMODELPATH';


passport.use(new GitHubStrategy({

  clientID: process.env.GITHUB_ID,
  clientSecret: process.env.GITHUB_SECRET,
  callbackURL: '/auth/github/callback',
  passReqToCallback: true,
}, (req, accessToken, refreshToken, profile, done) => {
  if (req.user) {
    // MODEL NAME?
    User.findOne({ github: profile.id }, (err, existingUser) => {
      if (existingUser) {
        req.flash('errors', { msg: 'There is already a Github account that belongs to you. Sign in with that account or delete it, then link it with your current account.' });
        done(err);
      } else {
        User.findById(req.user.id, (err2, user) => {
          user.github = profile.id;
          user.tokens.push({
            kind: 'github',
            accessToken: accessToken
          });
          user.profile.name = user.profile.name || profile.displayName;
          user.profile.picture = user.profile.picture || profile._json.avatar_url;
          user.profile.location = user.profile.location || profile._json.location;
          user.profile.website = user.profile.website || profile._json.blog;
          user.save(err3 => {
            req.flash('info', { msg: 'GitHub account has been linked.' });
            done(err3, user);
          });
        });
      }
    });
  } else {
    User.findOne({ github: profile.id }, (err, existingUser) => {
      if (existingUser) {
        return done(null, existingUser);
      }
      User.findOne({ email: profile._json.email }, (err, existingEmailUser) => {
        if (existingEmailUser) {
          req.flash('errors', { msg: 'There is already an account using this email address. Sign in to that account and link it with Github manually from Account Settings.' });
          done(err);
        } else {
          const user = new User();
          user.email = profile._json.email;
          user.github = profile.id;
          user.tokens.push({ kind: 'github', accessToken: accessToken });
          user.profile.name = profile.displayName;
          user.profile.picture = profile._json.avatar_url;
          user.profile.website = profile._json.blog;
          user.save(err => {
            done(err, user);
          });
        }
      });
    }
  )
}));
