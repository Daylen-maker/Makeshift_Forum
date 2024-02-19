export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const login = (username, role) => ({
  type: LOGIN,
  payload: { username, role },
});

export const logout = () => ({
  type: LOGOUT,
});
