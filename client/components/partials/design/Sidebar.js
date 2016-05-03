import React from 'react';

export default () => (
  <div className="sidebar">
    <div className="sidebar-top">
    <i className="fa fa-caret-left" aria-hidden="true"></i><i className="fa fa-caret-left" aria-hidden="true"></i>
    </div>
    <div className="sidebar-content">
      <div className="categories">
        <a href="#" className="btn-block btn-default">Server</a>
        <a href="#" className="btn-block btn-default">Routers</a>
      </div>
      <hr></hr>

      <div className="blocks">
        <div className="block block-lg">
          <div className="block-settings">
          <i className="fa fa-info-circle" aria-hidden="true"></i><i className="fa fa-sliders" aria-hidden="true"></i>
          </div>
          <div className="block-info">
          <span className="block-icon"><i className="fa fa-random" aria-hidden="true"></i></span>
          <span className="block-text">Router</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);
