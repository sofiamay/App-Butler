import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import { Provider } from 'react-redux';


// Components
import Index from './components/Index.js';
import Design from './components/Design.js';
import Success from './components/Success.js';
import NoMatch from './components/NoMatch.js';

// Redux Setup
import Store from './store.js';
import storage from './storage.js';

Store.subscribe(() => {
  storage.set('app_state', Store.getState());
});

const AuthCheck = (nextState, redirect, callback) => {
  // Check database to validate user cookie
  fetch('/api/users', {
    method: 'GET',
    credentials: 'same-origin',
  }).then(res => res.json()).then(user => {
    if (!user) {
      redirect({
        pathname: '/',
      });
      callback();
    }
    callback();
  });
};

render((
  <Provider store={Store}>
    <Router history={hashHistory}>
      <Route path="/" component={Index} />
      <Route path="/design" component={Design} onEnter={AuthCheck} />
      <Route path="/success" component={Success} onEnter={AuthCheck} />
      <Route path="/*" component={NoMatch} />
    </Router>
  </Provider>
), document.getElementById('app'));
