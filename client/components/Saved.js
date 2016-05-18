import React from 'react';

export default class Saved extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    fetch('/api/config', {
      method: 'GET',
      credentials: 'same-origin',
    }).then(res => res.json()).then(config => {
      console.log(config);
    });
  }

  render() {
    return (
      <div>
        Hello world!
      </div>
    );
  }
}
