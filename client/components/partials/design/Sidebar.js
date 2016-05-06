import React from 'react';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
    };
  }
  // Methods for opening & closing sidebar
  // Redux wasn't used here since it's irrelevant to the global state
  getSidebarWidth() {
    return this.state.open ? '200px' : '25px';
  }

  displayContent() {
    return this.state.open ? 'block' : 'none';
  }

  showCarrots() {
    return this.state.open ? 'fa fa-caret-left' : 'fa fa-caret-right';
  }

  togglePanel() {
    this.setState({
      open: !this.state.open,
    });
  }

  render() {
    let sidebarWidth = { width: this.getSidebarWidth() };
    let displayContent = { display: this.displayContent() };
    let carrots = this.showCarrots();
    return (
      <div className="sidebar" style={sidebarWidth}>
        <div className="sidebar-top">
        <a onClick={this.togglePanel.bind(this)} className="toggleLink"><i className={carrots} aria-hidden="true"></i>
        <i className={carrots} aria-hidden="true"></i></a>
        </div>
        <div className="sidebar-content" style={displayContent}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

Sidebar.propTypes = {
  children: React.PropTypes.element.isRequired,
};

export default Sidebar;

