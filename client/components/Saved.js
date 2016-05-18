import React from 'react';
import Nav from './partials/Nav.js';

export default class Saved extends React.Component {
  static propTypes = {
    configurations: React.PropTypes.array,
  }

  constructor(props) {
    super(props);
    this.state = {
      configurations: [],
    };

    fetch('/api/config', {
      method: 'GET',
      credentials: 'same-origin',
    }).then(res => res.json()).then(config => {
      console.log(config);
      this.setState({
        configurations: config,
      });
    });
  }

  render() {
    return (
      <div className="container">
        <Nav />
        <h1>...your saved configurations</h1>
        <br />
        {this.state.configurations.map(config =>
          <div className="config-list">
            <a href="/#/design" className="appName">{config.data.appName}</a>
          </div>
        )}
      </div>
    );
  }
}
