import { combineReducers } from 'redux';
import login from './Login';
import captcha from './Captcha';

const session = combineReducers({
  login: login,
  captcha: captcha,
});

export default session;
