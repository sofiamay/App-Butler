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

  deleteConfig = (currConfig) => {
    const invokeDelete = () => {
      console.log('hi');
      console.log(currConfig);
      fetch('/api/config', {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(currConfig),
      }).then(res => res.json()).then(config => {
        // this.setState({
        //   configurations: config,
        // });
        // console.log(config);
      });
    };
    return invokeDelete;
  }

  render() {
    return (
      <div className="container">
        <Nav />
        <div className="saved-container">
          <h1 className="saved-heading">...your saved configurations</h1>
          <br />
          {this.state.configurations.map(config =>
            <div className="config-list">
              <i onClick={this.deleteConfig(config)} className="fa fa-remove remove-saved" aria-hidden="true"></i>
              <a href="/#/design" className="appName">
                {config.data.appName}
                <p className="description">{config.data.github.description}</p>
              </a>
            </div>
          )}
        </div>
      </div>
    );
  }
}
