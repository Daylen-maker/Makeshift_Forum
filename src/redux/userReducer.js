import { LOGIN, LOGOUT, RESET } from './actions';

const initialState = {
  username: null,
  role: null,
  reset: { page: null, shouldReset: false },
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
    case RESET:
      return {
        ...state,
        reset: {
          page: action.payload.page,
          shouldReset: !state.reset.shouldReset,
        },
      };
    default:
      return state;
  }
};

export default userReducer;
