import { useEffect, useState } from 'react';
import usePostRequest from '../../hooks/post';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { reset } from '../../redux/actions';
import './addCommunity.css';
export const AddCommunity = () => {
  const { response, post } = usePostRequest('/community/add');
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const handleCreateCommunity = async (event) => {
    event.preventDefault();
    const target = event.target.elements;
    const name = target.name.value;
    const description = target.description.value;
    const logo = target.logo.value;
    const backgroundImage = target.backgroundImg.value;
    const token = localStorage.getItem('token');
    await post({ name, description, token, logo, backgroundImage });
    dispatch(reset('NAV_COMMUNITIES'));
  };

  useEffect(() => {
    if (response) {
      if (response.message !== 'success') {
        setError(response.message);
      } else {
        navigate('/');
      }
    }
  }, [response]);

  return (
    <div className='creation-form'>
      <h3>Create your community</h3>

      <form className='creation-form_container' onSubmit={handleCreateCommunity}>
        <input type='text' name='name' placeholder='Community name up to 14 letters' maxLength='14' required />
        <input type='text' name='logo' placeholder='Community logo url*' />
        <input type='text' name='backgroundImg' placeholder='Background banner url*' />{' '}
        <textarea
          className='description'
          name='description'
          placeholder='Community description up to 600 letters'
          maxLength='600'
          required
        />
        <p className=''>*ARE OPTIONAL</p>
        <div>{error}</div>
        <input className='submit-button' type='submit' />
      </form>
    </div>
  );
};
