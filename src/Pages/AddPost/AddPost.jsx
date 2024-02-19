import React, { useState, useEffect } from 'react';
import usePostRequest from '../../hooks/post'; // Assuming this hook is adjusted to handle both GET and POST requests
import { useNavigate } from 'react-router-dom';

export const AddPost = () => {
  const [communities, setCommunities] = useState([]);
  const { response, post } = usePostRequest();
  const navigate = useNavigate();

  return (
    <form className='creation-form creation-form_post'>
      <input type='text' name='title' placeholder='Post Title' required />
      <textarea name='content' placeholder='Post Content' required></textarea>
      {/* Include inputs for images or other content as needed */}
      <input type='submit' value='Create Post' />
    </form>
  );
};
