import { createStore } from 'redux';

// Redux Setup
const defaultState = {
  designer: {
    currentCategory: 'SERVER',
    routers: [],
  },
};

import Reducers from './reducers';
export default createStore(Reducers, defaultState);
