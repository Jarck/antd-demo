import { combineReducers } from 'redux';
import login from './Login';

const session = combineReducers({
  login: login,
});

export default session;
