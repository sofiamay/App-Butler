import chai, { expect } from 'chai';
import { it } from 'arrow-mocha/es5';

import supertest from 'supertest';

import express from 'express';

chai.should();

const server = express();
const runningServer = server.listen(8000, () => {
  console.log('Server running at 8000');
});

describe('GET /auth/github', () => {
  it('should redirect to github authentication', done => {
    // expect(true).to.equal(true);
    supertest(server)
    .get('/auth/github')
    .set('Accept', 'text/html')
    .expect('Content-Type', /html/)
    .end((err, res) => {
      expect(res.res.statusCode).to.be(200);
      done();
    });
  });
  it('should return the content of the html', done => {
    supertest(server)
    .get('/')
    .expect(200, /<input/, done);
  });
});

runningServer.close();
