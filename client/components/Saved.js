import React from 'react';
import Nav from './partials/Nav.js';

export default class Saved extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    fetch('/api/config', {
      method: 'GET',
      credentials: 'same-origin',
    }).then(res => res.json()).then(config => {
      this.configs = config;
      console.log(this.configs);
    });
  }

  render() {
    return (
      <div className="container">
        <Nav />
        sexy page
      </div>
    );
  }
}
