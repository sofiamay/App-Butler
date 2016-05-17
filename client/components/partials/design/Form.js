import React from 'react';
import GithubForm from './GithubForm.js';
import { reduxForm } from 'redux-form';
import { hashHistory } from 'react-router';

// Import storage to reset it
import storage from '../../../storage.js';
import { connect } from 'react-redux';

export const fields = [
  'appName',
  'port',
  'github.privacy',
  'github.description',
];

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
  const githubErrors = {};
  if (values.github.description.length > 200) {
    githubErrors.description = 'Description should be 200 characters or fewer';
  }
  errors.github = githubErrors;
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
    this.state = {
      serverType: null,
    };
  }

  sendData = (formData) => {
    hashHistory.push('/loading');
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
        github: {
          privacy: formData.github.privacy || false,
          description: formData.github.description,
        },
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

  render() {
    const { fields: { appName, port, github }, handleSubmit, submitting } = this.props;
    return (
      <form className="serverSettings">
        <div>
          <div className="serverLabel">App Name</div>
          <div>
            {appName.touched && appName.error && <div className="error">{appName.error}</div>}
            <input className={(appName.touched && appName.error) ? 'error' : null}
              type="text" name="appName" placeholder="MyApp" required {...appName} autoFocus
            />
          </div>
        </div>
        <div className="express">
          <div className="serverLabel">Port</div>
          <div>
            {port.touched && port.error && <div>{port.error}</div>}
            <input className={(port.touched && port.error) ? 'error' : null}
              type="text" name="port" placeholder="8000" {...port}
            />
            <br />
          </div>
        </div>
        <GithubForm {...github} />
        <button disabled={submitting} onClick={handleSubmit(this.sendData)}
          name="submitConfig" className="btn btn-submit"
        >Build Server
        </button>
      </form>
    );
  }
}
