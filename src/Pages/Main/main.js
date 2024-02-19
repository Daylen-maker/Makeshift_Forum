import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export const Main = () => {
  const state = useSelector((state) => state);
  console.log(state.user.username, 'state');
  useEffect(() => {}, []);
  return <h1>Welcome {state.user.username}</h1>;
};
