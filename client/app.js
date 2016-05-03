import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';

// Components
import Index from './components/Index.js';
import Design from './components/Design.js';
import NoMatch from './components/NoMatch.js';

render((
  <Router history={hashHistory}>
    <Route path="/" component={Index} />
    <Route path="/design" component={Design} />
    <Route path="/*" component={NoMatch} />
  </Router>
), document.getElementById('app'));
