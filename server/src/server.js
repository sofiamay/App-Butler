import express from 'express';
import bodyParser from 'body-parser';
import PrettyError from 'pretty-error';
import { port } from './config.js';
<<<<<<< 61680302140cfa5634cd0d38a3a8c8cdb22ee93c
import passport from 'passport';
import routes from './router/routes';
import mongoose from 'mongoose';
import session from 'express-session';
=======
// import browserSync from 'browser-sync';
>>>>>>> Implement Rendering on separate router pages

const server = express();
const router = routes;

mongoose.connect('mongodb://localhost/AppButler');

server.use(session({
  secret: 'plankton',
  resave: false,
  saveUninitialized: true,
}));

<<<<<<< 61680302140cfa5634cd0d38a3a8c8cdb22ee93c
server.use(express.static(__dirname + '/../../client'));
=======
const pe = new PrettyError();
pe.start();

server.use(express.static(`${__dirname}/../../client`));
server.use(bodyParser.urlencoded({ extended: true }));
>>>>>>> Implement Rendering on separate router pages
server.use(bodyParser.json());
// server.use(bodyParser.urlencoded({ extended: true }));

<<<<<<< 61680302140cfa5634cd0d38a3a8c8cdb22ee93c
server.use(passport.initialize());
router(server, express);

server.listen(port, () => {
  console.log(`The server is running at http://localhost:${port}`);
});

export default server;
=======
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

>>>>>>> Implement Rendering on separate router pages
