import React from 'react';
import Categories from './Categories';
import Blocks from './Blocks';

// Redux
import { changeCategory } from './../../../actions/DesignActions.js';
import { connect } from 'react-redux';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
    };
  }

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
    console.log('Props', this.props.currentCategory);
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
          <Categories changeCategory={this.props.changeCategory} />
          <hr></hr>

          <Blocks currentCategory={this.props.currentCategory} />
        </div>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    currentCategory: state.design.currentCategory,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeCategory: (category) => {
      dispatch(changeCategory(category));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
