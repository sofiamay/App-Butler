import { expect } from 'chai';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import App from '../app.js';

describe('app', function () {
  it('renders without problems', function () {
    const app = TestUtils.renderIntoDocument(<App />);
    expect(app).to.exist;
  });
});

// var expect = require('chai').expect;

// describe('app', function () {
//   it('renders without problems', function () {
//     var app = "something";
//     expect(app).to.equal("something");
//   });
// });
