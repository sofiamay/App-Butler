import React from 'react';

export default class Editable extends React.Component {
  static propTypes = {
    value: React.PropTypes.string.isRequired,
    onValueClick: React.PropTypes.func.isRequired,
    editing: React.PropTypes.bool.isRequired,
    update: React.PropTypes.func.isRequired,
    id: React.PropTypes.string.isRequired,
    validate: React.PropTypes.func,
    removeSpaces: React.PropTypes.bool,
    inputClass: React.PropTypes.string,
  }

  finishEdit = (e) => {
    const value = e.target.value;
    // If validation is present & returns false update w/ original val
    if (this.props.validate && !this.props.validate(value)) {
      return this.props.update(this.props.value);
    }

    if (this.props.update && value.trim()) {
      this.props.update(this.props.removeSpaces ? value.replace(/ /g, '') : value);
    }
  };
  checkEnter = (e) => {
    if (e.key === 'Enter') {
      this.finishEdit(e);
    }
  };
  renderEdit = () => {
    const inputClass = this.props.inputClass || '';
    return (
      <input type="text"
        ref={
          (e) => e ? e.selectionStart = this.props.value.length : null
        }
        className={inputClass}
        autoFocus={true}
        defaultValue={this.props.value}
        onBlur={this.finishEdit}
        onKeyPress={this.checkEnter}
      />
    );
  };
  renderValue = () => (
    <span
      onClick={() => this.props.onValueClick(this.props.id)}
      className="value"
    >
    {this.props.value}
    </span>
  );

  render() {
    const { value, update, editing, ...props } = this.props;

    return (
      <div {...props}>
        {editing ? this.renderEdit() : this.renderValue()}
      </div>
    );
  }
}
