import { combineReducers } from 'redux';

import session from './login';

const rootReducer = combineReducers({
  session,
})

export default rootReducer;
