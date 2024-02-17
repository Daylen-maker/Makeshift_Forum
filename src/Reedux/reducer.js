// reducers.js
import { combineReducers } from 'redux';
import userReducer from './userReducer';
// other reducers...

const rootReducer = combineReducers({
  user: userReducer,
  // other reducers...
});

export default rootReducer;
