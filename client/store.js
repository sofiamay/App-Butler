import { createStore } from 'redux';

// Redux Setup
const defaultState = {
  ui: {
    currentCategory: 'SERVER',
  },
  routers: [],
  serverConfig: {
    appName: null,
    serverType: null,
    port: null,
    expressName: null,
  },
};

import Reducers from './reducers';
export default createStore(Reducers, defaultState);
