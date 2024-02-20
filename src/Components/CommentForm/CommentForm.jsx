import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import usePostRequest from '../../hooks/post';
import { useParams } from 'react-router-dom';
import { reset } from '../../redux/actions';

export const CommentForm = ({ refresh }) => {
  const { post, response } = usePostRequest('/comment/add');
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const { username } = useSelector((state) => state.user);
  const { postId } = useParams();
  const token = localStorage.getItem('token');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const comment = event.target.elements.comment.value;
    await post({ token, comment, postId, author: username });
  };

  useEffect(() => {
    if (response?.message === 'success') {
      refresh();
    } else {
      setError(response?.message);
    }
  }, [response]);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='comment'>Your Comment:</label>
        <textarea name='comment' rows={4} placeholder='Type your comment here...' />
        <div className='comment-error'>{error}</div>
      </div>
      <input type='submit' value={'Submit Comment'}></input>
    </form>
  );
};
