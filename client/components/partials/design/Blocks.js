import React from 'react';

export default class Blocks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="blocks">
      {this.props.currentCategory}
        <div className="block block-lg">
          <div className="block-settings">
          <i className="fa fa-info-circle" aria-hidden="true"></i><i className="fa fa-sliders" aria-hidden="true"></i>
          </div>
          <div className="block-info">
          <span className="block-icon"><i className="fa fa-random" aria-hidden="true"></i></span>
          <span className="block-text">Router</span>
          </div>
        </div>
      </div>
    );
  }
}
