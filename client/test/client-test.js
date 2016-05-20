import { expect } from 'chai';
import React from 'react';
import TestUtils from 'react-addons-test-utils';

// Required Redux Components
import { Provider } from 'react-redux';
import Store from '../store.js';

// Tested Components
import Index from '../components/Index.js';
import Design from '../components/Design.js';

describe('Index', () => {
  it('renders without problems', () => {
    const app = TestUtils.renderIntoDocument(<Index />);
    expect(app).to.exist;
  });
});

describe('Design Page', () => {
  it('renders without problems', () => {
    const design = TestUtils.renderIntoDocument(<Provider store={Store}><Design /></Provider>);
    expect(design).to.exist;
  });
});

