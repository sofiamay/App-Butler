import React from 'react';
import { Link } from 'react-router';

const logout = () => {
  const cookies = document.cookie.split(';');

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf('=');
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  }
};
const avatar = decodeURIComponent(
  document.cookie.replace(/(?:(?:^|.*;\s*)avatar\s*\=\s*([^;]*).*$)|^.*$/, '$1')
  );
const user = document.cookie.replace(/(?:(?:^|.*;\s*)user\s*\=\s*([^;]*).*$)|^.*$/, '$1');

export default () => (
  <div className="navContainer">
    <div className="nav">
      <ul>
        <li><Link to={'/design'}>App Butler</Link></li>
      </ul>
      <ul className="rightNav">
        <li><a href={`https://github.com/${user}`} target="_blank">
        <div className="avatar" style={{ backgroundImage: `url('${avatar}')` }}>{ user }</div>
        </a></li>
        <li>
          <a href="#" onClick={logout} className="logout">
          <span className="leave">Logout</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
);
