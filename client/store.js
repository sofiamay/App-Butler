import { createStore } from 'redux';

// Redux Setup
const defaultState = {
  design: {
    currentCategory: 'SERVER',
  },
};

import DesignReducers from './reducers/DesignReducers.js';
export default createStore(DesignReducers, defaultState);
