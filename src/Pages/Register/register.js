import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import usePostRequest from '../../hooks/post';

export const Register = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('user');
  const [error, setError] = useState();
  const { response, post } = usePostRequest('/register');

  const handleRegister = (event) => {
    event.preventDefault();
    const target = event.target.elements;
    const role = target.role.value;
    const email = target.email.value;
    const username = target.username.value;
    const password1 = target.password1.value;
    const password2 = target.password2.value;
    if (role === 'Admin') {
      const firstName = target.firstName.value;
      const lastName = target.lastName.value;
      const address = target.address.value;
      const gender = target.gender.value;
      const age = target.age.value;
      post(role, email, username, password1, password2, firstName, lastName, address, gender, age);
      console.log('Admin');
    } else {
      post(role, email, username, password1, password2);
      console.log('User');
    }
  };
  useEffect(() => {
    if (response) {
      if (response.message !== 'success') {
        setError(response.message);
      } else {
        navigate('./login');
      }
    }
  }, [response]);
  return (
    <div className='authentication-form'>
      <h3>Register</h3>
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

      <form className='form' onSubmit={handleRegister}>
        <input type='text' placeholder='Email' name='email' required />
        <input type='text' placeholder='Username' name='username' required />
        <input type='password' placeholder='Password' name='password1' required />
        <input type='password' placeholder='Password' name='password2' required />

        <select className='' name='role' value={role} onChange={(e) => setRole(e.target.value)}>
          <option value='User'>User</option>
          <option value='Admin'>Admin</option>
        </select>

        {role === 'Admin' && (
          <>
            <input type='number' placeholder='Age' name='age' required />
            <select name='gender'>
              <option value='Male'>Male</option>
              <option value='Female'>Female</option>
            </select>
            <input type='text' placeholder='First Name' name='firstName' required />
            <input type='text' placeholder='Last Name' name='lastName' required />
            <input type='text' placeholder='Address' name='address' required />
          </>
        )}

        <div className='error'>{error}</div>
        <p>
          Already a User?
          <span className='link' onClick={() => navigate('/login')}>
            Log In
          </span>
        </p>
        <input className='submit-button' type='submit' value='Register' />
      </form>
    </div>
  );
};
