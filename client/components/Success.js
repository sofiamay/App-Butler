import React from 'react';
import { Link } from 'react-router';

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
            Repo Created!
          </div>
          <div className="successContent">
            You can view your created repo at:
            <a className="successRepo" target="_blank" href={ `https://github.com/${user}/${repoName}` }>
            { ` github.com/${user}/${repoName} ` }
            <i className="fa fa-external-link" aria-hidden="true"></i>
            </a>
            <div className="successContent-button">
              <Link className="btn btn-submit" to={'/design'}>Create Another?</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
