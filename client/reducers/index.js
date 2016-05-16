import { combineReducers } from 'redux';
import ui from './ui.js';
import routers from './routers.js';
import { reducer as form } from 'redux-form';

const appReducer = combineReducers({
  ui,
  routers,
  form,
});

// This allows us to use top-level reducers
// Thus, we can reset the state to default values
export default (state, action) => {
  if (action.type === 'RESET_STATE') {
    state = undefined;
  }

  return appReducer(state, action);
};
