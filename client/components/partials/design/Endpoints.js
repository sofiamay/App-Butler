import React from 'react';
import Endpoint from './Endpoint.js';

export default class RouterBlock extends React.Component {
  static propTypes = {
    endpoints: React.PropTypes.array.isRequired,
    routerId: React.PropTypes.string.isRequired,
    moveEndpoint: React.PropTypes.func.isRequired,
    routerIndex: React.PropTypes.number.isRequired,
    endpointMethods: React.PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { endpoints, routerId, moveEndpoint, routerIndex, endpointMethods } = this.props;
    return (
      <div className="endpointsContainer">
        {endpoints.map((endpoint, index) => (
          <Endpoint key={endpoint.id}
            data={endpoint}
            routerId={routerId}
            endpointIndex={index}
            routerIndex={routerIndex}
            onMove={moveEndpoint}
            methods={endpointMethods}
          />
          ))}
      </div>
      );
  }
}
