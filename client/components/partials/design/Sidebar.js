import React from 'react';
import Categories from './Categories';
import Blocks from './Blocks';

import { connect } from 'react-redux';
import { togglePanel } from './../../../actions/DesignActions.js';

@connect(state => ({ state: state.todos }))
class Sidebar extends React.Component {
  getSidebarWidth() {
    // return this.state.open ? '200px' : '25px';
  }

  displayContent() {
    // return this.state.open ? 'block' : 'none';
  }

  showCarrots() {
    // return this.state.open ? 'fa fa-caret-left' : 'fa fa-caret-right';
  }

  togglePanel() {
    console.log('props', this.props.state);

    // dispatch(togglePanel());

    // this.setState({
    //   open: !this.state.open,
    // });
  }

  render() {
    let sidebarWidth = { width: '200px' };
    let displayContent = { display: 'block' };
    let carrots = 'fa fa-caret-left';
    return (
      <div className="sidebar" style={sidebarWidth}>
        <div className="sidebar-top">
        <a onClick={this.togglePanel.bind(this)} className="toggleLink"><i className={carrots} aria-hidden="true"></i>
        <i className={carrots} aria-hidden="true"></i></a>
        </div>
        <div className="sidebar-content" style={displayContent}>
          <Categories />
          <hr></hr>

          <Blocks />
        </div>
      </div>
    );
  }
}

export default Sidebar;
