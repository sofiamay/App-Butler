import React from 'react';

// React DnD Functionality
// Sets up BlockArea as a place to drop items
import { DropTarget } from 'react-dnd';

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

@DropTarget('router', blockTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  isOverCurrent: monitor.isOver({ shallow: true }),
}))
export default class CanvasContainer extends React.Component {
  static propTypes = {
    connectDropTarget: React.PropTypes.func.isRequired,
    isOver: React.PropTypes.bool.isRequired,
    isOverCurrent: React.PropTypes.bool.isRequired,
    children: React.PropTypes.node,
  }

  constructor(props) {
    super(props);
    this.state = {
      hasDropped: false,
      hasDroppedOnChild: false,
    };
  }

  render() {
    const { isOverCurrent, connectDropTarget } = this.props;
    // const { hasDropped, hasDroppedOnChild } = this.state;

    let backgroundColor;
    if (isOverCurrent) {
      backgroundColor = '#E9F4F5';
    }

    return connectDropTarget(
      <div className="blockArea" style={{ backgroundColor }}>
      <a className="btn btn-default"><i className="fa fa-plus" aria-hidden="true"></i> Add Router</a>
      </div>
    );
  }
}
