import React from 'react';

export default class Index extends React.Component {
  static propTypes = {
    params: React.PropTypes.object.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="container container--blue">
        <div className="loadingContainer">
          Serving up your app...
        </div>
      </div>
    );
  }
}
