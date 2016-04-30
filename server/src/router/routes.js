import githubAuth from './../passport/githubAuth';


module.exports = (app, express) => {
  app.use(express.static(__dirname + './../../../../client'));

  app.get('/auth/github', githubAuth.handleLogin);

  app.get('/auth/github/callback', githubAuth.authenticateLogin, (req, res) => {
    res.redirect('/home');
  });
};

