import { useEffect } from 'react';
import usePostRequest from '../../hooks/post';
import './posts.css';
import { useNavigate, useParams } from 'react-router-dom';

export const Posts = ({ selectedCommunity }) => {
  const { communityId } = useParams();
  const { response, post } = usePostRequest('/posts/get');
  const navigate = useNavigate();
  useEffect(() => {
    post({ communityId });
  }, []);
  return (
    <div className='community-posts'>
      {response?.map((post, i) => (
        <div key={i} onClick={() => navigate(`./${post._id}`)} className='post'>
          <div className='post-header'>
            <img
              src={selectedCommunity?.logo || 'https://upload.wikimedia.org/wikipedia/commons/5/59/Empty.png'}
              alt=''
              className='community-logo'
            />
            <h3 className='post-title'>{post.title}</h3>
          </div>
          <div className='post-info'>
            <div className='post-timestamp'>{post.timestamp}</div>
            <div className='post-author'>Posted by {post.author}</div>
            <div className='post-likes'>{post.likes} likes</div>
          </div>
          <div className='post-content'>{post.content}</div>
        </div>
      ))}
    </div>
  );
};
