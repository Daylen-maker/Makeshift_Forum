import { useEffect, useState } from 'react';
import usePostRequest from '../../hooks/post';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/actions';
import { GoogleLogin } from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import { gapi } from 'gapi-script';
import './login.css';

export const Login = () => {
  const clientId = '1008424428159-jjha99kdc7n7orcv6oivc9pfe56hvkp6.apps.googleusercontent.com';
  const { response, post } = usePostRequest('http://localhost:2020/login');
  const dispatch = useDispatch();
  const [autoLogin, setAutoLogin] = useState();
  const [loginError, setLoginError] = useState();
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    const email = event.target.elements.email.value;
    const password1 = event.target.elements.password.value;
    const autoLoginCheck = event.target.elements.autoLogin.checked;
    setAutoLogin(autoLoginCheck);
    post({ email, password1 });
  };

  const handleGoogleLoginSuccess = async (response) => {
    console.log(response.profileObj.email);
    const email = response.profileObj.email;
    post({ email, token: 'google' });
  };
  const handleGoogleLoginFailure = (error) => {
    console.log(error);
  };

  useEffect(() => {
    if (response) {
      if (response.message !== 'success') {
        setLoginError(response.message);
      } else {
        dispatch(login(response.username, response.role));
        localStorage.setItem('token', response.token);
        localStorage.setItem('autoLogin', autoLogin);
        console.log(response, 'successful login ');
        navigate('/main');
      }
    }
  }, [response]);

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: '',
      });
    }
    gapi.load('client: auth2', start);
  }, []);
  return (
    <div className='authentication-form'>
      <h3>Log in</h3>
      <p>
        By continuing, you agree to our
        <a className='link' href={`${window.location.origin}/UserAgreement`} target='_blank' rel='noopener noreferrer'>
          User Agreement
        </a>
        and acknowledge that you understand the
        <a className='link' href={`${window.location.origin}/PrivacyPolicy`} target='_blank' rel='noopener noreferrer'>
          Privacy Policy
        </a>
        .
      </p>
      <GoogleLogin
        clientId={clientId}
        buttonText='Continue with Google'
        onSuccess={handleGoogleLoginSuccess}
        onFailure={handleGoogleLoginFailure}
        cookiePolicy={'single_host_origin'}
      />
      <div className='or-divider'>
        <div className='line'></div>
        <span className='or-text'>OR</span>
        <div className='line'></div>
      </div>
      <form className='form' onSubmit={handleLogin}>
        <input className={loginError && `input-error`} type='text' placeholder='Email' name='email' />
        <input className={loginError && `input-error`} type='password' placeholder='Password' name='password' />
        <div className='error'>{loginError}</div>
        <div className='checkbox'>
          <input type='checkbox' name='autoLogin' />
          <div>Keep me logged in</div>
        </div>

        <p>
          Forgot your
          <p className='link' onClick={() => navigate('/recover')}>
            Password
          </p>
          ?
        </p>
        <p>
          New to Reddit ?
          <p className='link' onClick={() => navigate('/register')}>
            Sign Up
          </p>
        </p>
        <input className='submit-button' type='submit' value='Log in' />
      </form>
    </div>
  );
};
