// exampleReducer.js
import { LOGIN, LOGOUT } from './actions';

const initialState = {
  username: null,
  role: null,
  token: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        username: action.payload.username,
        role: action.payload.role,
        token: action.payload.token,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default userReducer;
