import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import usePostRequest from '../../hooks/post';
import { useNavigate, useParams } from 'react-router-dom';
import './community.css';
import { Posts } from '../../Components/Posts/Posts';
export const Community = () => {
  const { communityId } = useParams();
  const { response, isLoading, post } = usePostRequest('/posts/get');
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const communities = useSelector((state) => state.data.communities);
  const selectedCommunity = communities?.find((community) => community._id === communityId);

  useEffect(() => {
    post({ communityId });
  }, [communityId]);
  useEffect(() => {
    if (response) {
      setPosts(response);
    }
  }, [response]);
  console.log(selectedCommunity);
  console.log(posts);
  if (isLoading || !response || !selectedCommunity) {
    return null;
  }
  return (
    <div className='community_container'>
      <div className='community-summary'>
        <div className='community-banner' style={{ backgroundImage: `url(${selectedCommunity.backgroundImage})` }}>
          <img className='community-logo' src={selectedCommunity.logo} alt='' />
        </div>
        <div className='d-flex'>
          <h2 className='community-name'>{selectedCommunity.name}</h2>
          <button className='toolbar-button' onClick={() => navigate('/add/post')}>
            Create a post
          </button>
        </div>

        <div className='community-description'>{selectedCommunity.description}</div>
      </div>
      <div className='divider'></div>
      <Posts posts={posts} selectedCommunity={selectedCommunity} />
    </div>
  );
};
