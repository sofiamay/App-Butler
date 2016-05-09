import React from 'react';
import Endpoints from './Endpoints.js';

// Redux Functionality
import { createEndpoint } from './../../../actions/routers.js';
import { connect } from 'react-redux';

// React DnD Functionality
// Sets up BlockArea as a place to drop items
import { DragSource, DropTarget } from 'react-dnd';

// Settings for Target areafor React DnD
const blockTarget = {
  drop(props, monitor, component) {
    const hasDroppedOnChild = monitor.didDrop();
    if (hasDroppedOnChild) {
      return;
    }

    component.setState({
      hasDropped: true,
      hasDroppedOnChild,
    });
  },
};

const boxSource = {
  beginDrag() {
    return {};
  },
};

@connect(state => ({
  routers: state.routers,
}), dispatch => ({
  createEndpoint: (endpoint) => {
    dispatch(createEndpoint(endpoint));
  },
}))
@DropTarget('endpoint', blockTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  isOverCurrent: monitor.isOver({ shallow: true }),
}))
@DragSource('router', boxSource, (connect) => ({
  connectDragSource: connect.dragSource(),
}))
export default class RouterBlock extends React.Component {
  static propTypes = {
    connectDropTarget: React.PropTypes.func.isRequired,
    isOver: React.PropTypes.bool.isRequired,
    isOverCurrent: React.PropTypes.bool.isRequired,
    children: React.PropTypes.node,
    data: React.PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { isOverCurrent, connectDropTarget, data, id, createEndpoint} = this.props;

    return connectDropTarget(
      <div className="block block-lg">
        <div className="block-settings">
        <i className="fa fa-info-circle" aria-hidden="true"></i><i className="fa fa-sliders" aria-hidden="true"></i>
        </div>
        <div className="block-info">
        <span className="block-icon"><i className="fa fa-random" aria-hidden="true"></i></span>
        <span className="block-text">{this.props.data.name}</span>
        <Endpoints endpoints={data.endpoints} />
        <button className="btn btn-default"
          onClick={createEndpoint.bind(null, {
            routerId: id,
          })}>
        <i className="fa fa-plus" aria-hidden="true"></i> Add Endpoint
        </button>
        </div>
      </div>
    );
  }
}
