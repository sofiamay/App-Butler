import { createStore } from 'redux';
import Reducers from './reducers';

// Import local persisted state if available
import storage from './storage.js';

// Redux Setup
const defaultState = {
  ui: {
    currentCategory: 'SERVER',
  },
  routers: [],
  form: {},
};

export default createStore(
  Reducers,
  storage.get('app_state') || defaultState,
  window.devToolsExtension ? window.devToolsExtension() : f => f
);
