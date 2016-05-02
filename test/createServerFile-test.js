var expect = require('chai').expect;
var httpMocks = require('node-mocks-http');

describe('Server Generator', function() {

  beforeEach(function(done) {
  });

  describe('#find()', function() {
    it('respond with matching records', function(done) {
      db.find({type: 'User'}, function(err, res) {
        if (err) return done(err);
        res.should.have.length(3);
        done();
      });
    });
  });
});
