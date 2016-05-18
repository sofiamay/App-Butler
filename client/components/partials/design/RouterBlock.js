import React from 'react';
import Endpoints from './Endpoints.js';
import Editable from './Editable.js';

// Redux Functionality
import {
  moveRouter,
  deleteRouter,
  createEndpoint,
  updateEndpoint,
  mountEndpoint,
  moveEndpoint,
  deleteEndpoint,
  updateRouter,
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
  updateRouter: (endpoint) => {
    dispatch(updateRouter(endpoint));
  },
  moveRouter: (endpoint) => {
    dispatch(moveRouter(endpoint));
  },
  deleteRouter: (endpoint) => {
    dispatch(deleteRouter(endpoint));
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
  endpointMethods: {
    updateEndpoint: (data) => {
      dispatch(updateEndpoint(data));
    },
    deleteEndpoint: (data) => {
      dispatch(deleteEndpoint(data));
    },
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
    routers: React.PropTypes.array,
    connectDropTarget: React.PropTypes.func.isRequired,
    connectDragSource: React.PropTypes.func.isRequired,
    deleteRouter: React.PropTypes.func,
    createEndpoint: React.PropTypes.func.isRequired,
    moveEndpoint: React.PropTypes.func.isRequired,
    mountEndpoint: React.PropTypes.func.isRequired,
    endpointMethods: React.PropTypes.object,
    data: React.PropTypes.object,
    routerIndex: React.PropTypes.number,
    id: React.PropTypes.string,
    isDragging: React.PropTypes.bool,
    createPrompt: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  confirmDelete(id) {
    this.props.createPrompt(
      'Warning! Deleting a router is permanent.',
      'Delete Router',
      () => {
        this.props.deleteRouter(id);
      }
    );
  }

  validateStartPoint(value, id) {
    console.log(this.props.routers);
    return this.props.routers.reduce((prev, router) => {
      if (prev === false) {
        return false;
      }

      if (router.id !== id && router.startPoint === value) {
        return false;
      }

      return true;
    }, true);
  }

  validateRouterName(value, id) {
    return this.props.routers.reduce((prev, router) => {
      if (prev === false) {
        return false;
      }

      if (router.id !== id && router.name === value) {
        return false;
      }

      return true;
    }, true);
  }

  render() {
    const {
      connectDropTarget,
      connectDragSource,
      updateRouter,
      data,
      id,
      isDragging,
      createEndpoint,
      moveEndpoint,
      deleteRouter,
      routerIndex,
      endpointMethods,
    } = this.props;

    return connectDragSource(connectDropTarget(
      <div className="routerContainer">
      <div className="block block-lg" style={{ opacity: isDragging ? 0 : 1 }}>
        <div className="block-settings">
          <div className="block-name">
            <Editable
              editing={data.editingName}
              validate={(...args) => this.validateRouterName(...args)}
              inputClass={'routerName'}
              value={data.name}
              removeSpaces={true}
              onValueClick={
                () => updateRouter({
                  id,
                  updates: { editingName: true },
                }
                )}
              update={
                (update) => updateRouter({
                  id,
                  updates: { editingName: false, name: update },
                }
                )}
              id={data.id}
            />
          </div>
        <i className="fa fa-info-circle" aria-hidden="true"></i>
        <a
          onClick={() => data.endpoints.length > 0 ? this.confirmDelete(id) : deleteRouter(id)}
        >
          <i className="fa fa-remove" aria-hidden="true"></i>
        </a>
        </div>
        <div className="block-info">
        <div className="block-icon"><i className="fa fa-random" aria-hidden="true"></i></div>
        <div className="block-text">
          <Editable
            editing={data.editingStartPoint}
            validate={(...args) => this.validateStartPoint(...args)}
            inputClass={'routerName'}
            value={data.startPoint}
            removeSpaces={true}
            onValueClick={
              () => updateRouter({
                id,
                updates: { editingStartPoint: true },
              }
              )}
            update={
              (update) => updateRouter({
                id,
                updates: { editingStartPoint: false, startPoint: update },
              }
              )}
            id={data.id}
          />
        </div>
        <div style={{ marginTop: '7px' }}>
          <button className="btn btn-default"
            onClick={() => createEndpoint({
              routerId: id,
            })}
          >
          <i className="fa fa-plus" aria-hidden="true"></i> Add Endpoint
          </button>
        </div>
        <Endpoints
          endpoints={data.endpoints}
          endpointMethods={endpointMethods}
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
