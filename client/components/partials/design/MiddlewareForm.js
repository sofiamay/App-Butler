import React from 'react';

export default class MiddlewareForm extends React.Component {
  static propTypes = {
    morgan: React.PropTypes.object.isRequired,
    cookieparser: React.PropTypes.object.isRequired,
    bodyparserJson: React.PropTypes.object.isRequired,
    bodyparserUrlencoded: React.PropTypes.object.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {};
  }
  // Initialize middleware to false
  componentWillMount = () => {
    for (const prop in this.props) {
      if (this.props.hasOwnProperty(prop)) {
        this.props[prop].onChange(false);
      }
    }
  }

  handleClick = (event) => {
    if (event.target.checked) { this.props[event.target.name].onChange(true); } else {
      this.props[event.target.name].onChange(false);
    }
  }

  render() {
    return (
      <div className="middlwareForm">
        <div className="serverLabel">Middleware</div>
        <div className="serverLabel">
          <input type="checkbox" name="morgan" onClick={this.handleClick} />
          <span className="small">Morgan</span>
        </div>
        <div className="serverLabel">
          <input type="checkbox" name="cookieparser" onClick={this.handleClick} />
          <span className="small">CookieParser</span>
        </div>
        <div className="serverLabel">
          <input type="checkbox" name="bodyparserUrlencoded" onClick={this.handleClick} />
          <span className="small"> BodyParser </span>
        </div>
        <div className="serverLabel">
          <input type="checkbox" name="bodyparserJson" onClick={this.handleClick} />
          <span className="small">BodyParser(JSON)</span>
        </div>
        <hr />
      </div>
    );
  }
}

export default MiddlewareForm;
