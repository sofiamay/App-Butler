import React from 'react';
import RouterBlock from './RouterBlock.js';

export default class CanvasContainer extends React.Component {
  static propTypes = {
    routers: React.PropTypes.array,
    createPrompt: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { routers, createPrompt } = this.props;
    return (
      <div className="serverCanvas">
        {routers.map((router, index) => (
          <RouterBlock
            key={router.id}
            id={router.id}
            data={router}
            routerIndex={index}
            createPrompt={createPrompt}
          />
        ))}
      </div>
    );
  }
}
