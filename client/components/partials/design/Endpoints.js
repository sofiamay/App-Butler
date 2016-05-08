import React from 'react';
import Endpoint from './Endpoint.js';

export default class RouterBlock extends React.Component {
  static propTypes = {
    endpoints: React.PropTypes.array,
    routerId: React.PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { endpoints, routerId } = this.props;
    return (
      <div className="endpointsContainer">
        {endpoints.map(endpoint => (
          <Endpoint data={endpoint} routerId={routerId} />
          ))}
      </div>
      );
  }
}
