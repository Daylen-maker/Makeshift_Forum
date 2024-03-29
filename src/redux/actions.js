export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const RESET = 'RESET';
export const UPDATECOMMUNITIES = 'UPDATECOMMUNITIES';

export const login = (username, role) => ({
  type: LOGIN,
  payload: { username, role },
});

export const logout = () => ({
  type: LOGOUT,
});

export const reset = (page) => ({
  type: RESET,
  payload: { page },
});
export const updateCommunities = (data) => ({
  type: UPDATECOMMUNITIES,
  payload: { data },
});
