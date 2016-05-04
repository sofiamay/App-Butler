import React from 'react';

export default class BlockItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="block block-lg">
        <div className="block-settings">
        <i className="fa fa-info-circle" aria-hidden="true"></i><i className="fa fa-sliders" aria-hidden="true"></i>
        </div>
        <div className="block-info">
        <span className="block-icon"><i className={this.props.data.icon} aria-hidden="true"></i></span>
        <span className="block-text">{this.props.data.name}</span>
        </div>
      </div>
    );
  }
}

BlockItem.propTypes = {
  data: React.PropTypes.object,
};
