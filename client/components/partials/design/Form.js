import React from 'react';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      server: null,
    };
  }

  selectServerType = (event) => {
    this.setState({ server: event.target.value });
  }

  currentServerDisplay = () => {
    switch (this.state.server) {
      case 'express':
        return (
          <div className="express">
            Port<br />
            <input type="text" name="port" /><br />
            Express name
            <input type="text" name="express-instantiation"
              placeholder="app=express()"
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
    let currentServerDisplay = this.currentServerDisplay();
    return (
      <form action="" method="post">
        <div>
          App Name
          <input type="text" name="appName" required />
        </div>
        <div>
          Server Type<br />
          <select onChange={this.selectServerType}>
            <option value="null"></option>
            <option value="express">Express</option>
          </select>
        </div>
        <hr />
        {currentServerDisplay}
      </form>
    );
  }
}

Form.propTypes = {

};

export default Form;

