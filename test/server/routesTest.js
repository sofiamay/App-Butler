const chai = require('chai');
chai.should();
const expect = require('chai').expect;
const { it } = require('arrow-mocha/es5');
const supertest = require('supertest');

/* Set up */
import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import { port } from '../../server/build/config.js';
import { generateFiles } from '../../server/build/controllers/generateServer';

const server = express();

server.use(session({
  secret: 'plankton',
  resave: false,
  saveUninitialized: true,
}));

server.use(bodyParser.json());
server.post('/config', generateFiles);

const runningServer = server.listen(port, () => {
  console.log(`The server is running at http://localhost:${port}`);
});

/* Tests */

describe('Routes', () => {
  describe('Generating files', () => {
    it('Should return error, when the request has no body', (done) => {
      supertest(server)
      .post('/config')
      .expect(400)
      .end((err, res) => {
        if (err) { done(); }
      });
    });
  });
});

/* Clean up */
runningServer.close();
