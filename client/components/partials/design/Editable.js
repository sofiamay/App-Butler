import React from 'react';

export default class Editable extends React.Component {
  static propTypes = {
    value: React.PropTypes.string.isRequired,
    onValueClick: React.PropTypes.func.isRequired,
    editing: React.PropTypes.bool.isRequired,
    update: React.PropTypes.func.isRequired,
    routerIndex: React.PropTypes.number,
    id: React.PropTypes.string.isRequired,
  }

  finishEdit = (e) => {
    const value = e.target.value;

    if (this.props.update && value.trim()) {
      this.props.update(value);
    }
  };
  checkEnter = (e) => {
    if (e.key === 'Enter') {
      this.finishEdit(e);
    }
  };
  renderEdit = () => (
    <input type="text"
      ref={
        (e) => e ? e.selectionStart = this.props.value.length : null
      }
      autoFocus={true}
      defaultValue={this.props.value}
      onBlur={this.finishEdit}
      onKeyPress={this.checkEnter}
    />
  );
  renderValue = () => (
    <div onClick={() => this.props.onValueClick(this.props.id)}>
      <span className="value">{this.props.value}</span>
    </div>
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
