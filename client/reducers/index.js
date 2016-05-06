import { combineReducers } from 'redux';
import ui from './ui';
import routes from './routes';

export default combineReducers({
  ui,
  routes,
});
