import chai, { should, expect } from 'chai';
import { it } from 'arrow-mocha/es5';
import httpMocks from 'node-mocks-http';
import supertest from 'supertest';

import express from 'express';
import bodyParser from 'body-parser';
import routes from './../../server/src/router/routes';

const server = express();
const runningServer = server.listen(1337, () => {
  console.log('Server running at 1337');
});

describe('GET /auth/github', () => {
  it('should redirect to github authentication', done => {
    supertest(server)
    .get('/auth/github')
    .expect('Content-Type', /html/)
    .end((err, res) => {
      console.log(res);
      console.log(err);
      done();
    });
  });
});

runningServer.close();
