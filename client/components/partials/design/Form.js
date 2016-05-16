import React from 'react';
import { reduxForm } from 'redux-form';
<<<<<<< HEAD
<<<<<<< HEAD
import { hashHistory } from 'react-router';

// Import storage to reset it
import storage from '../../../storage.js';
import { connect } from 'react-redux';

=======
import showGithubForm from './GithubForm.js';
>>>>>>> Create a redux-form component that stores github info
=======
>>>>>>> Get rid of github form component. Start integrating it into the regular form
export const fields = ['appName', 'port', 'expressName', 'serverType'];

/* Form validation function */
const validate = values => {
  const errors = {};
  if (!values.appName) {
    errors.appName = 'Required';
  } else if (values.appName.length > 15) {
    errors.appName = 'Must be 15 characters or less';
  }
  if (!/^\d{1,4}\s*$/.test(values.port) && values.port !== '') {
    errors.port = 'Port must be an integer between 0 and 9999';
  } else if (values.port.length > 5) {
    errors.port = 'Must be 5 characters or less';
  }
  if (values.expressName && values.expressName.length > 15) {
    errors.appName = 'Must be 15 characters or less';
  }
  if (!values.serverType) {
    errors.serverType = 'Please select a serverType';
  }
  return errors;
};

@connect(null, dispatch => ({
  resetState: () => {
    dispatch({ type: 'RESET_STATE' });
  },
}))
@reduxForm({
  form: 'config',
  fields,
  validate,
})
export default class Form extends React.Component {
  static propTypes = {
    fields: React.PropTypes.object.isRequired,
    handleSubmit: React.PropTypes.func.isRequired,
    submitting: React.PropTypes.bool.isRequired,
    routers: React.PropTypes.array,
    resetState: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    // this.state = {
    //   serverType: null,
    // };
  }

  selectServerType = (event) => {
    const { fields: { serverType } } = this.props;
    serverType.onChange(event.target.value);
    this.setState({ serverType: event.target.value });
  }

  sendData = (formData) => {
    const resetState = this.props.resetState;
    const jsonData = {
      data: {
        serverType: formData.serverType,
        appName: formData.appName,
        serverSettings: {
          port: formData.port,
          expressName: formData.expressName,
        },
        routers: this.props.routers,
      },
    };

    fetch('/serve', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(jsonData),
      credentials: 'same-origin',
    })
    .then(response => {
      response.json().then(obj => {
        resetState();
        storage.remove('app_state');
        hashHistory.push(`/success/${obj.user}/${obj.repoName}/`);
      });
    })
    .catch(err => console.log('darn:  ', err));
  }

  currentServerDisplay = () => {
    const { fields: { port, expressName } } = this.props;
    switch (this.state.serverType) {
      case 'express':
        return (
          <div className="express">
            <div className="serverLabel">Port</div>
            <div>
              <input className={(port.touched && port.error) ? 'error' : null}
                type="text" name="port" placeholder="8000" {...port}
              />
              <br />
            </div>
            {port.touched && port.error && <div>{port.error}</div>}
            <div className="serverLabel">Express name</div>
            <div><input className={(expressName.touched && expressName.error) ? 'error' : null}
              type="text" name="expressName"
              placeholder="app=express()"
              {...expressName}
            />
            </div>
            {expressName.touched && expressName.error &&
              <div className="error">{expressName.error}</div>
            }
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
    // const currentServerDisplay = this.currentServerDisplay();
    const { fields: { appName, port, expressName }, handleSubmit, submitting } = this.props;
    return (
      <form className="serverSettings">
        <div>
          <div className="serverLabel">App Name</div>
          <div>
            <input className={(appName.touched && appName.error) ? 'error' : null}
              type="text" name="appName" placeholder="MyApp" required {...appName} autoFocus
            />
          </div>
          {appName.touched && appName.error && <div className="error">{appName.error}</div>}
        </div>
        <div className="express">
          <div className="serverLabel">Port</div>
          <div>
            <input className={(port.touched && port.error) ? 'error' : null}
              type="text" name="port" placeholder="8000" {...port}
            />
            <br />
          </div>
          {port.touched && port.error && <div>{port.error}</div>}
          <div className="serverLabel">Express name</div>
          <div><input className={(expressName.touched && expressName.error) ? 'error' : null}
            type="text" name="expressName"
            placeholder="app=express()"
            {...expressName}
          />
          </div>
          {expressName.touched && expressName.error &&
            <div className="error">{expressName.error}</div>
          }
        </div>
        <button disabled={submitting} onClick={handleSubmit(this.sendData)}
          name="submitConfig" className="btn btn-submit"
        >Build Server
        </button>
      </form>
    );
  }
}
<<<<<<< HEAD
=======

Form.propTypes = {
  fields: React.PropTypes.object.isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
  submitting: React.PropTypes.bool.isRequired,
  routers: React.PropTypes.array,
};

Form = reduxForm({
  form: 'config',
  fields,
  validate,
})(Form);

export default Form;

>>>>>>> Create a redux-form component that stores github info
