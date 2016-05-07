import { combineReducers } from 'redux';
import ui from './ui.js';
import routers from './routers.js';
import serverConfig from './serverConfig.js';

export default combineReducers({
  ui,
  routers,
  serverConfig,
});
