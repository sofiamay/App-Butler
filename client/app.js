import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

// Components
import Index from './components/Index.js';
import Design from './components/Design.js';
import NoMatch from './components/NoMatch.js';

// Redux Setup
const defaultState = {
  ui: {
    panel: {
      open: true,
    },
  },
};

import DesignReducers from './reducers/DesignReducers.js';
let store = createStore(DesignReducers, defaultState);

render((
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={Index} />
      <Route path="/design" component={Design} />
      <Route path="/*" component={NoMatch} />
    </Router>
  </Provider>
), document.getElementById('app'));
