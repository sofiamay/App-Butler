import React from 'react';
import Nav from './partials/Nav.js';
// import storage from '../storage.js';
import { connect } from 'react-redux';
import { setState } from '../actions/saved.js';

@connect(null, dispatch => ({
  setState: (config) => {
    dispatch(setState(config));
  },
}))

export default class Saved extends React.Component {
  static propTypes = {
    setState: React.PropTypes.func.isRequired,
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
      this.setState({
        configurations: config,
      });
    });
  }

  setConfig = (currConfig) => {
    const invokeSet = () => {
      this.props.setState(currConfig);
    };
    return invokeSet;
  }

  deleteConfig = (currConfig) => {
    const invokeDelete = () => {
      fetch('/api/config', {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(currConfig),
        credentials: 'same-origin',
      }).then(res => res.json()).then(config => {
        this.setState({
          configurations: config,
        });
      });
    };
    return invokeDelete;
  }

  render() {
    return (
      <div className="container">
        <Nav />
        <div className="saved-container">
          <h1 className="saved-heading">My Configs</h1>
          <div className="config-list">
            {this.state.configurations.map(config =>
              <div className="config">
                <div className="config-header">
                  <a onClick={this.deleteConfig(config)}>
                    <i className="fa fa-remove" aria-hidden="true"></i>
                  </a>
                </div>
                <a onClick={this.setConfig(config)} href="/#/design" className="appName">
                  {config.data.appName}
                  <p className="description">{config.data.github.description}</p>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
