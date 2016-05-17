import React from 'react';

export default class GithubForm extends React.Component {
  static propTypes = {
    repoName: React.PropTypes.object.isRequired,
    privacy: React.PropTypes.object.isRequired,
    description: React.PropTypes.object.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleClick = (event) => {
    const { privacy } = this.props;
    if (event.target.checked) {
      privacy.onChange(true);
    }
  }

  render() {
    const { repoName, description } = this.props;
    return (
      <div className="githubForm">
        <div>
          <div className="serverLabel">Repo Name</div>
          <div>
            <input
              type="text" name="repoName" placeholder="MyNewRepo" required {...repoName} autoFocus
            />
            {repoName.touched && repoName.error && <div className="error">{repoName.error}</div>}
          </div>
        </div>
        <div className="serverLabel"><input type="checkbox" onClick={this.handleClick} />Make private?</div>
        <div>
          <div className="serverLabel">Description</div>
          <div>
            <textarea
              cols="25" rows="4" name="description" placeholder="a description" {...description}
            />
            {description.touched && description.error && <div className="error">{description.error}</div>}
          </div>
        </div>
      </div>
    )
  }
}

export default GithubForm;
