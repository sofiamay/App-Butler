import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import { Provider } from 'react-redux';


// Components
import Index from './components/Index.js';
import Design from './components/Design.js';
import NoMatch from './components/NoMatch.js';

import Store from './store.js';

const getCookie = cookieName => {
  const name = `${cookieName}=`;
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return '';
};

const AuthCheck = (nextState, redirect) => {
  // Check database to validate user cookie
  fetch('/api/users', {
    method: 'GET',
    credentials: 'same-origin',
  }).then(res => res.json()).then(user => {
    console.log(user === null);
    if (!user) {
      console.log('USER does not exist');
      console.log(redirect);
      redirect({
        pathname: '/*',
      });
    } else if (user.id !== Number(getCookie('id'))) {
      console.log('REDIRECT');
      redirect({
        pathname: '/*',
      });
    }
  });
};

render((
  <Provider store={Store}>
    <Router history={hashHistory}>
      <Route path="/" component={Index} />
      <Route path="/design" component={Design} onEnter={AuthCheck} />
      <Route path="/*" component={NoMatch} />
    </Router>
  </Provider>
), document.getElementById('app'));
