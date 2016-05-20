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
  it('Renders without problems', () => {
    const app = TestUtils.renderIntoDocument(<Index />);
    expect(app).to.exist;
  });
});

describe('Design Page', () => {
  const design = TestUtils.renderIntoDocument(<Provider store={Store}><Design /></Provider>);
  it('Renders without problems', () => {
    expect(design).to.exist;
  });

  describe('Router Functionality', () => {
    it('Creates a Router when button is clicked', () => {
      // First, we find the button
      var routerButton = TestUtils.findRenderedDOMComponentWithClass(
        design,
        'btn btn-primary'
      );
      // Simulate a click on the button
      TestUtils.Simulate.click(routerButton);
      // Find the generated router
      var router = TestUtils.findRenderedDOMComponentWithClass(
        design,
        'routerContainer'
      );

      expect(router).to.exist;
    });

    it('Creates a Endpoint when button on Router is clicked', () => {
      // First, we find the button
      var endpointButton = TestUtils.findRenderedDOMComponentWithClass(
        design,
        'btn btn-default'
      );
      // Simulate a click on the button
      TestUtils.Simulate.click(endpointButton);
      // Find the generated router
      var endpoint = TestUtils.findRenderedDOMComponentWithClass(
        design,
        'block block-endpoint'
      );

      expect(endpoint).to.exist;
    });
  });
});

