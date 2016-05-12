import React from 'react';
import Editable from './Editable';
// React DnD Functionality
// Sets up BlockArea as a place to drop items
import { DragSource as dragSource, DropTarget as dropTarget } from 'react-dnd';

// Settings for Target areafor React DnD

const endpointSource = {
  beginDrag({ data, routerIndex, endpointIndex }) {
    return {
      id: data.id,
      routerIndex,
      endpointIndex,
    };
  },
  isDragging({ data }, monitor) {
    return data.id === monitor.getItem().id;
  },
};

const endpointTarget = {
  hover(targetProps, monitor) {
    const targetId = targetProps.data.id;
    const targetRouterIndex = targetProps.routerIndex;
    const targetEndpointIndex = targetProps.endpointIndex;

    const sourceProps = monitor.getItem();
    const sourceRouterIndex = sourceProps.routerIndex;
    const sourceEndpointIndex = sourceProps.endpointIndex;
    const sourceId = sourceProps.id;

    if (sourceId !== targetId) {
      targetProps.onMove({
        sourceId,
        targetId,
        sourceEndpointIndex,
        targetEndpointIndex,
        sourceRouterIndex,
        targetRouterIndex,
      });
    }
  },
};

@dragSource('endpoint', endpointSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))
@dropTarget('endpoint', endpointTarget, (connect) => ({
  connectDropTarget: connect.dropTarget(),
}))
export default class Endpoint extends React.Component {
  static propTypes = {
    connectDropTarget: React.PropTypes.func.isRequired,
    connectDragSource: React.PropTypes.func.isRequired,
    data: React.PropTypes.object.isRequired,
    methods: React.PropTypes.object.isRequired,
    routerIndex: React.PropTypes.number,
    endpointIndex: React.PropTypes.number,
    isDragging: React.PropTypes.bool,
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { connectDragSource, connectDropTarget, isDragging, data, methods } = this.props;
    return connectDragSource(connectDropTarget(
      <div className="block block-endpoint" style={{ opacity: isDragging ? 0 : 1 }}>
        <div className="block-settings">
        <i className="fa fa-info-circle" aria-hidden="true"></i>
        <i className="fa fa-sliders" aria-hidden="true"></i>
        </div>
        <div className="block-info">
        <div className="block-icon"><i className="fa fa-code-fork" aria-hidden="true"></i></div>
        <div className="block-text">
          <Editable
            editing={data.editing}
            inputClass={'endpointName'}
            value={data.endpoint}
            removeSpaces={true}
            onValueClick={
              (id) => methods.updateEndpoint({
                id,
                routerIndex: this.props.routerIndex,
                updates: { editing: true },
              }
              )}
            update={
              (update) => methods.updateEndpoint({
                id: data.id,
                routerIndex: this.props.routerIndex,
                updates: { editing: false, endpoint: update },
              }
              )}
            id={data.id}
          />
        </div>
        </div>
      </div>
    ));
  }
}
