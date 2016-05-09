import React from 'react';
import { reduxForm } from 'redux-form';
export const fields = ['appName', 'port', 'expressName', 'serverType'];

/* Form validation function */
const validate = values => {
  const errors = {};
  if (!values.appName) {
    errors.appName = 'Required';
  } else if (values.appName.length > 15) {
    errors.appName = 'Must be 15 characters or less';
  }
  if (!/^\s*\d{1,4}\s*$/.test(values.port)) {
    errors.port = 'Port must be an integer between 0 and 9999';
  } else if (values.port.length > 5) {
    errors.port = 'Must be 5 characters or less';
  }
  if (values.expressName && values.expressName.length > 15) {
    errors.appName = 'Must be 15 characters or less';
  }
  return errors;
};

/* React Component */

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      serverType: null,
    };
  }

  selectServerType = (event) => {
    const { fields: { serverType } } = this.props;
    serverType.onChange(event.target.value);
    this.setState({ serverType: event.target.value });
  }

  testSubmitButton = (data) => {
    console.log('The data', data);
  }

  currentServerDisplay = () => {
    const { fields: { port, expressName } } = this.props;
    switch (this.state.serverType) {
      case 'express':
        return (
          <div className="express">
            <div className="serverLabel">Port</div>
            <input type="text" name="port" {...port} /><br />
            {port.touched && port.error && <div>{port.error}</div>}
            <div className="serverLabel">Express name</div>
            <input type="text" name="expressName"
              placeholder="app=express()"
              {...expressName}
            />
            {expressName.touched && expressName.error && <div>{expressName.error}</div>}
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
    const { fields: { appName }, handleSubmit, submitting } = this.props;
    return (
      <form className="serverSettings">
        <div>
          <div className="serverLabel">App Name</div>
          <input type="text" name="appName" required {...appName} />
          {appName.touched && appName.error && <div>{appName.error}</div>}
        </div>
        <div>
          <div className="serverLabel">Server Type</div>
          <select onChange={this.selectServerType} >
            <option value="null"></option>
            <option value="express">Express</option>
          </select>
        </div>
        <hr />
        {currentServerDisplay}
        <button disabled={submitting} onClick={handleSubmit(this.testSubmitButton)}
          name="submitConfig" className="btn btn-submit"
        >Build Server
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  fields: React.PropTypes.object.isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
  submitting: React.PropTypes.bool.isRequired,
};

Form = reduxForm({
  form: 'config',
  fields,
  validate,
})(Form);

export default Form;

