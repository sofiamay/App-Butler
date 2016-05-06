import React from 'react';
import ServerCanvas from './ServerCanvas.js';

// Redux Actions & Methods
import { createRouter } from './../../../actions/routers.js';
import { connect } from 'react-redux';

// Use Redux's connect() method to map to the class
@connect(state => ({
  routers: state.routers,
}), {
  createRouter,
})
export default class CanvasContainer extends React.Component {
  static propTypes = {
    connectDropTarget: React.PropTypes.func.isRequired,
    isOver: React.PropTypes.bool.isRequired,
    isOverCurrent: React.PropTypes.bool.isRequired,
    children: React.PropTypes.node,
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="blockArea">
      <a className="btn btn-default">
      <i className="fa fa-plus" aria-hidden="true"></i>
       Add Router
      </a>

      <ServerCanvas />
      </div>
    );
  }
}
