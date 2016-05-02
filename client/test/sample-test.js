import { expect } from 'chai';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import App from '../app.js';

describe('app', () => {
  it('renders without problems', () => {
    const app = TestUtils.renderIntoDocument(<App />);
    expect(app).to.exist;
  });
});

