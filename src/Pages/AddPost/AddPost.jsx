import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import usePostRequest from '../../hooks/post';
import './addPost.css';

export const AddPost = () => {
  const { communityId } = useParams();
  const navigate = useNavigate();
  const { response, post } = usePostRequest('/posts/add');
  const [error, setError] = useState('');
  const author = useSelector((state) => state.user.username);
  const data = useSelector((state) => state.data);

  const handleCreatePost = async (event) => {
    event.preventDefault();
    const communityId = event.target.elements.communityId.value;
    const title = event.target.elements.title.value;
    const content = event.target.elements.content.value;
    const token = localStorage.getItem('token');
    await post({ communityId, author, title, content, token });
  };

  useEffect(() => {
    if (response) {
      if (response.message !== 'success') {
        setError(response.message);
      } else {
        navigate(`/`);
      }
    }
  }, [response, navigate]);

  return (
    <div className='creation-form'>
      <h3>Create a Post</h3>
      <form className='creation-form_container' onSubmit={handleCreatePost}>
        <select className='creation-form_select' name='communityId'>
          <option value='' disabled selected>
            Select Community
          </option>
          {data.communities.map((x, i) => (
            <option key={x._id} value={x._id}>
              {x.name}
            </option>
          ))}
        </select>
        <input type='text' name='title' placeholder='Post title' required />
        <textarea name='content' placeholder='Post content' rows={'10'} required />

        {error && <div className='error'>{error}</div>}
        <input className='submit-button' type='submit' value='Create Post' />
      </form>
    </div>
  );
};
