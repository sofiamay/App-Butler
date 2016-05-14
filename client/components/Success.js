import React from 'react';

// Shared partial components
import Nav from './partials/Nav.js';

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="container">
        <Nav />
        <div className="content">
          <div className="successBanner">
            <span className="successBanner-check">
              <i className="fa fa-check" aria-hidden="true"></i>
            </span>
            Success!
          </div>
          <div className="successContent">
            You can view your created repo at:
          </div>
        </div>
      </div>
    );
  }
}
