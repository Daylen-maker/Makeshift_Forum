// actions.js
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const login = (username, token) => ({
  type: LOGIN,
  payload: { username, token },
});

export const logout = () => ({
  type: LOGOUT,
});
