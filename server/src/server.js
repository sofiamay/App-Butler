import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
// import PrettyError from 'pretty-error';
import { port } from './config.js';
import passport from 'passport';
import routes from './router/routes';
import mongoose from 'mongoose';
import session from 'express-session';
// import browserSync from 'browser-sync';

const server = express();
const router = routes;

mongoose.connect('mongodb://localhost/AppButler');

server.use(session({
  secret: 'plankton',
  resave: false,
  saveUninitialized: true,
}));

const pe = new PrettyError();
pe.start();

server.use(express.static(`${__dirname}/../../client`));

server.use(cookieParser('Hope nobody sees this')); // FOR DEV, STORE SECRET PROPERLY IN PROD

server.use(bodyParser.json());

server.use(passport.initialize());
router(server, express);

server.listen(port, () => {
  console.log(`The server is running at http://localhost:${port}`);
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

export default server;
