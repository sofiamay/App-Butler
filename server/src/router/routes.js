import githubAuth from './../passport/githubAuth';
import { generateServer } from '../controllers/generateServer.js';


module.exports = (app, express) => {
  app.use(express.static(`${__dirname}/../../../../client`));

  app.get('/auth/github', githubAuth.handleLogin);

  app.get('/auth/github/callback', githubAuth.authenticateLogin, (req, res) => {
    res.redirect('/');
  });
  app.post('/config', generateServer);
};

