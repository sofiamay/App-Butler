import React from 'react';

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="fullscreen">
        <div className="logo">
          <img src="../img/logo.svg" height="20px" alt="App Butler" />
        </div>
        <div className="jumbotron">
          <div className="jumbo-text">
            <h2>Build Faster.</h2>
            <div className="jumbo-tagline">The premier drag and drop Node.js server builder.</div>
            <a href="/auth/github" className="btn btn-jumbo">
            <i className="fa fa-github" aria-hidden="true"></i>
            <span>  Login with GitHub</span>
            </a>
          </div>
          <img src="./../img/butler.svg" className="jumbo-image" />
        </div>
        <div className="about">

          <div className="feature">
            <div className="feature--img-container">
              <span className="feature--img">
                <i className="fa fa-clock-o" aria-hidden="true"></i>
              </span>
            </div>
            <div className="feature--title">Servers in minutes, not hours.</div>
            <div className="feature--desc">
            Sign up, enter your settings, design. A click of a button later your server is done.
            </div>
          </div>

          <div className="feature">
            <div className="feature--img-container">
              <span className="feature--img">
                <i className="fa fa-save" aria-hidden="true"></i>
              </span>
            </div>
            <div className="feature--title">Save once, use forever.</div>
            <div className="feature--desc">
            Save your configs to use later. Want to use your go-to API setup? Load it up and create away!
            </div>
          </div>

          <div className="feature">
            <div className="feature--img-container">
              <span className="feature--img">
                <i className="fa fa-github-alt" aria-hidden="true"></i>
              </span>
            </div>
            <div className="feature--title">Build straight to GitHub.</div>
            <div className="feature--desc">
            Done designing your server? Simply hit the Build button to create a repo with all yours files. It&#39;s that easy.
            </div>
          </div>

        </div>
      </div>
    );
  }
}
