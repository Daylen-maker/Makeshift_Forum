import { useEffect } from 'react';
import usePostRequest from '../post';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/actions';

export const useAutoLogin = () => {
  const { response, post } = usePostRequest('/autoLogin');
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const autoLogin = localStorage.getItem('autoLogin');

  useEffect(() => {
    if (autoLogin === 'true') {
      post({ token });
    }
  }, []);

  useEffect(() => {
    if (response) {
      if (response.message === 'Auto-login successful') {
        dispatch(login(response.user.username, response.user.role));
        console.log('successful login ');
      }
    }
  }, [response]);
};
