import React from 'react';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      serverType: null,
    };
  }

  selectServerType = (event) => {
    this.setState({ serverType: event.target.value });
    this.props.updateConfig({ serverType: event.target.value });
  }

  updateServerConfig = (event) => {
    let updateObj = {};
    updateObj[event.target.name] = event.target.value;
    return this.props.updateConfig(updateObj);
  }

  submitServerConfig = (event) => {
    event.preventDefault();
    this.props.submitConfig();
    return false;
  }

  currentServerDisplay = () => {
    switch (this.state.serverType) {
      case 'express':
        return (
          <div className="express">
            <div className="serverLabel">Port</div>
            <input type="text" name="port" onBlur={this.updateServerConfig} /><br />
            <div className="serverLabel">Express name</div>
            <input type="text" name="expressName"
              placeholder="app=express()"
              onBlur={this.updateServerConfig}
            />
          </div>
          );
      default:
        return (
          <div>
          </div>
          );
    }
  }

  render() {
    const currentServerDisplay = this.currentServerDisplay();
    return (
      <form className="serverSettings">
        <div>
          <div className="serverLabel">App Name</div>
          <input type="text" name="appName" required onBlur={this.updateServerConfig} />
        </div>
        <div>
          <div className="serverLabel">Server Type</div>
          <select onChange={this.selectServerType}>
            <option value="null"></option>
            <option value="express">Express</option>
          </select>
        </div>
        <hr />
        {currentServerDisplay}
        <button onClick={this.submitServerConfig} name="submitConfig" className="btn btn-submit">Build Server</button>
      </form>
    );
  }
}

Form.propTypes = {
  updateConfig: React.PropTypes.func.isRequired,
  submitConfig: React.PropTypes.func.isRequired,
};

export default Form;

