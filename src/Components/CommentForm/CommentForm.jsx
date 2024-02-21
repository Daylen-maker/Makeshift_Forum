import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import usePostRequest from '../../hooks/post';
import { useParams } from 'react-router-dom';
import './commentForm.css';
export const CommentForm = ({ refresh }) => {
  const { post, response } = usePostRequest('/comment/add');
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
    <form className='comment-form' onSubmit={handleSubmit}>
      <div className='comment-textarea'>
        <textarea name='comment' rows={4} placeholder='Type your comment here...' />
        <div className='comment-error'>{error}</div>
      </div>
      <input className='addComment-button' type='submit' value={'Submit Comment'}></input>
    </form>
  );
};
