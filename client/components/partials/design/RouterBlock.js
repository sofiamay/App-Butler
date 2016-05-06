import React from 'react';

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

@DropTarget(['endpoint', 'router'], blockTarget, (connect, monitor) => ({
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
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { isOverCurrent, connectDropTarget } = this.props;

    let backgroundColor;
    if (isOverCurrent) {
      backgroundColor = '#E9F4F5';
    }

    return connectDropTarget(
      <div className="blockArea" style={{ backgroundColor }}>
      </div>
    );
  }
}
