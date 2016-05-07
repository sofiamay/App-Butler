import React from 'react';
import Form from './Form.js';

// Redux Actions & Methods
import { updateConfig } from './../../../actions/serverConfig.js';
import { connect } from 'react-redux';

// Use Redux's connect() method to map to the class
@connect(state => ({
  serverConfig: state.serverConfig,
}), dispatch => ({
  updateConfig: (config) => {
    dispatch(updateConfig(config));
  },
}))
class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
    };
    this.submitConfig = this.submitConfig.bind(this);
    this.togglePanel = this.togglePanel.bind(this);
  }

  // Methods for opening & closing sidebar
  // Redux wasn't used here since it's irrelevant to the global state
  getSidebarWidth() {
    return this.state.open ? '200px' : '25px';
  }

  displayContent() {
    return this.state.open ? 'block' : 'none';
  }

  showCarrots() {
    return this.state.open ? 'fa fa-caret-left' : 'fa fa-caret-right';
  }

  togglePanel() {
    this.setState({
      open: !this.state.open,
    });
  }

  // Method to post serverConfig
  submitConfig() {
    console.log('store.serverconfig: This will be sent to the server');
    console.log(this.props.serverConfig);
  }

  render() {
    let sidebarWidth = { width: this.getSidebarWidth() };
    let displayContent = { display: this.displayContent() };
    let carrots = this.showCarrots();
    return (
      <div className="sidebar" style={sidebarWidth}>
        <div className="sidebar-top">
        <a onClick={this.togglePanel} className="toggleLink">
          <i className={carrots} aria-hidden="true"></i>
          <i className={carrots} aria-hidden="true"></i>
        </a>
        </div>
        <div className="sidebar-content" style={displayContent}>
          <Form updateConfig={this.props.updateConfig} submitConfig={this.submitConfig} />
        </div>
      </div>
    );
  }
}

Sidebar.propTypes = {
  updateConfig: React.PropTypes.func.isRequired,
  serverConfig: React.PropTypes.object,
};

export default Sidebar;

