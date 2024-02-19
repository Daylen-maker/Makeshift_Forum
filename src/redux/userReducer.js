import { LOGIN, LOGOUT } from './actions';

const initialState = {
  username: null,
  role: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        username: action.payload.username,
        role: action.payload.role,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default userReducer;
