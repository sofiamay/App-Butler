import { combineReducers } from 'redux';
import ui from './ui.js';
import routers from './routers.js';
import serverConfig from './serverConfig.js';
import { reducer as form } from 'redux-form';

export default combineReducers({
  ui,
  routers,
  serverConfig,
  form,
});
