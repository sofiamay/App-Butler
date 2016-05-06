import React from 'react';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      server: null,
    };
  }

  selectServerType(event) {
    this.setState({ server: event.target.value });
  }
  // Methods for opening & closing sidebar
  // Redux wasn't used here since it's irrelevant to the global state
  // getSidebarWidth() {
  //   return this.state.open ? '200px' : '25px';
  // }

  // displayContent() {
  //   return this.state.open ? 'block' : 'none';
  // }

  // showCarrots() {
  //   return this.state.open ? 'fa fa-caret-left' : 'fa fa-caret-right';
  // }

  // togglePanel() {
  //   this.setState({
  //     open: !this.state.open,
  //   });
  // }

  render() {
    // let sidebarWidth = { width: this.getSidebarWidth() };
    // let displayContent = { display: this.displayContent() };
    // let carrots = this.showCarrots();
    return (
      <div className="form">
        <div>
          App Name
          <input type="text" name="appName" />
        </div>
        <div>
          Server Type<br />
          <select>
            <option onChange={this.selectServerType} value="express">Express</option>
          </select>
        </div>

      </div>
    );
  }
}

Form.propTypes = {

};

export default Form;

