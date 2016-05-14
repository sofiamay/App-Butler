import React from 'react';
import { reduxForm } from 'redux-form';
export const fields = ['repo', 'privacy', 'description'];

/* Form validation function */
const validate = values => {
  const errors = {};
  if (!values.repo) {
    errors.repo = 'Required';
  }
  return errors;
};

/* React Component */

class GithubForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  sendData = (formData) => {
    console.log(formData);
  }

  render() {
    const { fields: { repo, privacy, description }, handleSubmit, submitting } = this.props;
    return (
      <form className="githubSettings">
        <div>
          <div className="serverLabel">Repo Name</div>
          <div>
            <input className={(repo.touched && repo.error) ? 'error' : null}
              type="text" name="repo" placeholder="MyApp" required {...repo} autoFocus
            />
          </div>
          {repo.touched && repo.error && <div className="error">{repo.error}</div>}
        </div>

        <div>
          <div className="serverLabel">Desciption</div>
          <div>
            <input textarea={(description.touched && description.error) ? 'error' : null}
              name="repo" placeholder="initial commit" required {...privacy} autoFocus
            />
          </div>
          {description.touched && description.error && <div className="error">{description.error}</div>}
        </div>

        <button disabled={submitting} onClick={handleSubmit(this.sendData)}
          name="submitConfig" className="btn btn-submit"
        >Generate My Server
        </button>
      </form>
    );
  }
}

GithubForm.propTypes = {
  fields: React.PropTypes.object.isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
  submitting: React.PropTypes.bool.isRequired,
};

GithubForm = reduxForm({
  form: 'githubConfig',
  fields,
  validate,
})(GithubForm);

export default GithubForm;

