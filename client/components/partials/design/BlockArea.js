import React from 'react';

// React DnD Functionality
// Sets up BlockArea as a place to drop items
import { DropTarget } from 'react-dnd';

class Blocks extends React.Component {
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
      </div>
    );
  }
}
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

export default DropTarget('server', blockTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  isOverCurrent: monitor.isOver({ shallow: true }),
}))(Blocks);
