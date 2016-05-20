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
  const design = TestUtils.renderIntoDocument(<Provider store={Store}><Design /></Provider>);
  it('renders without problems', () => {
    expect(design).to.exist;
  });
  it('Creates a Router when button is clicked', () => {
    // First, we find the button container
    var routerButton = TestUtils.findRenderedDOMComponentWithClass(
      design,
      'btn btn-primary'
    );
    TestUtils.Simulate.click(routerButton);
    var router = TestUtils.findRenderedDOMComponentWithClass(
      design,
      'routerContainer'
    );
    expect(router).to.exist;
  });
});

