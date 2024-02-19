import { useEffect, useState } from 'react';
import usePostRequest from '../../../hooks/post';
import './SideToolbar.css';
export const SideToolbar = () => {
  const { response, post } = usePostRequest('/community/get', 'NAV_COMMUNITIES');
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    post();
  }, []);

  useEffect(() => {
    if (response) {
      setCommunities(response);
    }
  }, [response]);
  return (
    <div className='side-toolbar toolbar'>
      <div> Community's </div>
      <div className='divider'></div>
      <div className='community-select_container'>
        {communities.map((community, i) => (
          <div className='community-select' key={i}>
            <img src={community.logo} alt={`${community.name} logo`} />
            <div>{community.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
