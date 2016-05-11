import React from 'react';
import Endpoints from './Endpoints.js';

// Redux Functionality
import {
  moveRouter,
  createEndpoint,
  mountEndpoint,
  moveEndpoint,
} from './../../../actions/routers.js';
import { connect } from 'react-redux';

// React DnD Functionality
// Sets up BlockArea as a place to drop items
import { DragSource as dragSource, DropTarget as dropTarget } from 'react-dnd';

const routerSource = {
  beginDrag({ id, routerIndex }) {
    return {
      id,
      routerIndex,
      isRouter: true,
    };
  },
};

const routerTarget = {
  hover(targetProps, monitor) {
    const targetId = targetProps.id;
    const sourceProps = monitor.getItem();
    const sourceId = sourceProps.id;

    if (!sourceProps.isRouter && !targetProps.data.endpoints.length) {
      const sourceRouterIndex = sourceProps.routerIndex;
      const sourceEndpointIndex = sourceProps.endpointIndex;
      targetProps.mountEndpoint({
        targetId,
        sourceId,
        sourceRouterIndex,
        sourceEndpointIndex,
      });
    }

    if (sourceProps.isRouter && sourceId !== targetId) {
      targetProps.moveRouter({
        targetId,
        sourceId,
      });
    }
  },
};

@connect(state => ({
  routers: state.routers,
}), dispatch => ({
  moveRouter: (endpoint) => {
    dispatch(moveRouter(endpoint));
  },
  createEndpoint: (endpoint) => {
    dispatch(createEndpoint(endpoint));
  },
  moveEndpoint: (data) => {
    dispatch(moveEndpoint(data));
  },
  mountEndpoint: (data) => {
    dispatch(mountEndpoint(data));
  },
}))
@dragSource('router', routerSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))
@dropTarget(['endpoint', 'router'], routerTarget, (connect) => ({
  connectDropTarget: connect.dropTarget(),
}))
export default class RouterBlock extends React.Component {
  static propTypes = {
    connectDropTarget: React.PropTypes.func.isRequired,
    connectDragSource: React.PropTypes.func.isRequired,
    createEndpoint: React.PropTypes.func.isRequired,
    moveEndpoint: React.PropTypes.func.isRequired,
    mountEndpoint: React.PropTypes.func.isRequired,
    data: React.PropTypes.object,
    routerIndex: React.PropTypes.number,
    id: React.PropTypes.string,
    isDragging: React.PropTypes.bool,
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { connectDropTarget, connectDragSource, data, id, isDragging, createEndpoint, moveEndpoint, routerIndex } = this.props;

    return connectDragSource(connectDropTarget(
      <div className="routerContainer">
      <div className="block block-lg" style={{ opacity: isDragging ? 0 : 1 }}>
        <div className="block-settings">
        <i className="fa fa-info-circle" aria-hidden="true"></i>
        <i className="fa fa-sliders" aria-hidden="true"></i>
        </div>
        <div className="block-info">
        <span className="block-icon"><i className="fa fa-random" aria-hidden="true"></i></span>
        <span className="block-text">{this.props.data.name}</span>
        <div style={{ marginTop: '7px' }}>
          <button className="btn btn-default"
            onClick={createEndpoint.bind(null, {
              routerId: id,
            })}
          >
          <i className="fa fa-plus" aria-hidden="true"></i> Add Endpoint
          </button>
        </div>
        <Endpoints
          endpoints={data.endpoints}
          routerId={data.id}
          routerIndex={routerIndex}
          moveEndpoint={moveEndpoint}
        />
        </div>
      </div>
      </div>
    ));
  }
}
