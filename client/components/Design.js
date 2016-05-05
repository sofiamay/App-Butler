import React from 'react';

// Import Required Components
import Nav from './partials/Nav.js';
import Sidebar from './partials/design/Sidebar.js';
import BlockArea from './partials/design/BlockArea.js';

// Import React DnD
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="container">
        <Nav />
        <div className="content">
          <div className="row">
          <Sidebar />
          <BlockArea />
        </div>
        </div>
      </div>
);
  }
}

export default DragDropContext(HTML5Backend)(Index);

