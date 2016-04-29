var expect = require('chai').expect;
var should = require('chai').should;
var mongoose = require('mongoose');
var User = require('../models/User');
var userController = require('../controllers/userController.js');
// npm install --save-dev node-mocks-http
var httpMocks = require('node-mocks-http');


var dbURI = 'mongodb://localhost/butler';

// The `clearDB` helper function, when invoked, will clear the database
var clearDB = function (done) {
  mongoose.connection.collections['users'].remove(done);
};

describe('User Controller', function () {

  // Connect to database before any tests
  before(function (done) {
    if (mongoose.connection.db) {
      return done();
    }
    mongoose.connect(dbURI, done);
  });

  // Clear database before each test and then seed it with example `users` so that you can run tests
  beforeEach(function (done) {
    clearDB(function () {
      var users = [
        {
          name: 'Jeremy',
          email: 'jeremy@jeremy.com',
          githubID: '1456CD1V76F',
          key: 'a8s79y987a869df4',
          fileIDs: [1, 3],
          files: [],
        },
        {
          name: 'Sofia',
          email: 'sofia@sofia.com',
          githubID: '67ACD5429B1',
          key: '7364929d97639416jlk3847',
          fileIDs: [],
          files: [{}],
        },
        {
          name: 'Reid',
          email: 'reid@reid.com',
          githubID: '72DA845F7E',
          key: '66785f583867j8934a',
          fileIDs: [2, 4, 5],
          files: [{}],
        },
        {
          name: 'Dylan',
          email: 'dylan@dylan.com',
          githubID: 'E498AB3652',
          key: '65kh2348yqbi2934j03',
          fileIDs: [6],
          files: [{}],
        },
        {
          name: 'Zach',
          email: 'zach@zach.com',
          githubID: '26AB346C7C',
          key: '3476q6234cad86',
          fileIDs: [9, 10],
          config: {
            serverType: 'node-express',
            files: [{}],
          },
        },
      ];

      // See http://mongoosejs.com/docs/models.html for details on the `create` method
      User.create(users, done);
    });
  });


  it('should have a method that creates a user from the information in the request body', function (done) {
    var request = httpMocks.createRequest({
      method: 'POST',
      url: '/user',
      body: {
        name: 'Bob',
        email: 'bob@bob.com',
        githubID: '528B6CE32',
      },
    });
    var response = httpMocks.createResponse();
    User.createOne(request, response);
    User.findOne({ name: 'Bob' }, function(err, user) {
      expect(err).to.not.exist();
      expect(user.email).to.equal('bob@bob.com');
      done();
    });
  });

  it('should update the attributes of the given user', function (done) {
    User.findOne({ name: 'Zach' }, function(err, user) {
      expect(err).to.not.exist();
      var userid = user.id;
      var request = httpMocks.createRequest({
        method: 'PUT',
        url: '/user',
        params: { id: userid },
        body: {
          email: 'notzach@zach.com',
        },
      });
      var response = httpMocks.createResponse();
      User.updateOne(request, response);
      User.findOne({ name: 'Zach' }, function(err, user) {
        expect(err).to.not.exist();
        expect(user.email).to.equal('notzach@zach.com');
        done();
      });
    });
  });


  it('should remove the user with the given id from the database', function (done) {
    User.findOne({ name: 'Zach' }, function(err, user) {
      expect(err).to.not.exist();
      var userid = user.id;
      var request = httpMocks.createRequest({
        method: 'DELETE',
        url: '/user',
        params: { id: userid },
      });
      var response = httpMocks.createResponse();
      User.removeOne(request, response);
      User.findOne({ name: 'Zach' }, function(err, user) {
        expect(err).to.exist();
        done();
      });
    });
  });

  it('should retrieve the user with the given id from the database', function (done) {
    User.findOne({ name: 'Zach' }, function(err, user) {
      expect(err).to.not.exist();
      var userid = user.id;
      var request = httpMocks.createRequest({
        method: 'GET',
        url: '/user',
        params: { id: userid },
      });
      var response = httpMocks.createResponse();
      User.retrieveOne(request, response);
      var data = JSON.parse(response._getData());
      expect(data.name).to.equal('Zach');
      done();
    });
  });

  it('should retrieve all the users from the database', function (done) {
    User.findOne({ name: 'Zach' }, function(err, user) {
      expect(err).to.not.exist();
      var userid = user.id;
      var request = httpMocks.createRequest({
        method: 'GET',
        url: '/user',
      });
      var response = httpMocks.createResponse();
      User.retrieveAll(request, response);
      var data = JSON.parse(response._getData());
      expect(data.length).to.equal(5);
      done();
    });
  });
});
