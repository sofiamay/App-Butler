import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';

// Components


const App = React.createClass({

  render() {
    return <h1>Hello, World</h1>;
  },

});

render((
  <Router history={hashHistory}>
    <Route path="/" component={Index}>
      <Route path="about" component={About}/>
      <Route path="*" component={NoMatch}/>
    </Route>
  </Router>
), document.body);

export default App;
