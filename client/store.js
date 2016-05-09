import { createStore } from 'redux';
import Reducers from './reducers';

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
  form: {},
};

export default createStore(Reducers, defaultState, window.devToolsExtension ? window.devToolsExtension() : f => f);
