import githubAuth from './../passport/githubAuth';
import { generateServer } from '../controllers/generateServer.js';


module.exports = (app, express) => {
  app.use(express.static(`${__dirname}/../../../../client`));

  app.get('/auth/github', githubAuth.handleLogin);

  app.get('/auth/github/callback', githubAuth.authenticateLogin, (req, res) => {
    console.log(req.user._json);
    res.cookie('user', req.user._json.login);
    res.cookie('logged_in', true);
    res.redirect('/');
  });
  app.post('/config', generateServer);
};

