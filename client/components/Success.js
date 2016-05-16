import React from 'react';

// Shared partial components
import Nav from './partials/Nav.js';

export default class Index extends React.Component {
  static propTypes = {
    params: React.PropTypes.object.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { user, repoName } = this.props.params;
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
            <a target="_blank" href={ `https://github.com/${user}/${repoName}` }>{ `github.com/${user}/${repoName}` }</a>
          </div>
        </div>
      </div>
    );
  }
}
