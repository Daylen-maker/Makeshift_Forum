import { useEffect, useState } from 'react';
import usePostRequest from '../../hooks/post';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export const AddCommunity = () => {
  const { response, post } = usePostRequest('/community/add');
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const handleCreateCommunity = (event) => {
    event.preventDefault();
    const target = event.target.elements;
    const name = target.name.value;
    const description = target.description.value;
    const logo = target.logo.value;
    const backgroundImage = target.backgroundImg.value;
    const token = localStorage.getItem('token');
    post({ name, description, token, logo, backgroundImage });
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
    <form onSubmit={handleCreateCommunity} className='creation-form creation-form_community'>
      <input type='text' name='name' placeholder='Community name' required />
      <input type='text' name='description' placeholder='Community description' required />
      <input type='text' name='logo' placeholder='Community logo' />
      <input type='text' name='backgroundImg' placeholder='Background Image' />
      <div>{error}</div>
      <input type='submit' />
    </form>
  );
};
