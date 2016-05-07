import React from 'react';

// Import Required Components
import Nav from './partials/Nav.js';
import Sidebar from './partials/design/Sidebar.js';
import CanvasContainer from './partials/design/CanvasContainer.js';
import BlockArea from './partials/design/BlockArea.js';
import Form from './partials/design/Form.js';


// Import React DnD
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

// Decorate Design Component as a Drop Context
@DragDropContext(HTML5Backend)
export default class Design extends React.Component {
  constructor(props) {
    super(props);
    // Holds the state of the server config
    this.state = {
    };
  }

  updateServerConfig = (options) => {
    let stateUpdate = {};
    Object.keys(options).forEach((key) => {
      stateUpdate[key] = options[key];
    });
    this.setState({ stateUpdate });
  }

  submitServerConfig = () => {
    console.log(this.state);
    if (this.state.server === 'express') {
      console.log('server type looks good');
    } else {
      console.log('form error!');
    }
    console.log('Send to server!');
  }

  render() {
    return (
      <div className="container">
        <Nav />
        <div className="content">
          <div className="row">
          <Sidebar>
            <Form updateConfig={this.updateServerConfig} submitConfig={this.submitServerConfig} />
          </Sidebar>
          <CanvasContainer />
        </div>
        </div>
      </div>
   );
  }
}
