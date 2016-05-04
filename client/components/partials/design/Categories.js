import React from 'react';

export default (props) => (
  <div className="categories">
          <a onClick={() => props.changeCategory('SERVER')} className="btn-block btn-default">Server</a>
          <a onClick={() => props.changeCategory('ROUTERS')} className="btn-block btn-default">Routers</a>
  </div>
);
