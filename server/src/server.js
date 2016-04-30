import express from 'express';
import bodyParser from 'body-parser';
import PrettyError from 'pretty-error';
import { port } from './config.js';
import passport from 'passport';
import routes from './router/routes';

const server = express();
const router = routes;

server.use(passport.initialize());
router(server, express);

server.use(express.static(__dirname + '/../../client'));

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());


server.listen(port, () => {
  console.log(`The server is running at http://localhost:${port}`);
});