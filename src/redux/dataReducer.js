import { UPDATECOMMUNITIES } from './actions';

const initialState = {
  communities: null,
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATECOMMUNITIES:
      return {
        ...state,
        communities: action.payload.data,
      };
    default:
      return state;
  }
};

export default dataReducer;
