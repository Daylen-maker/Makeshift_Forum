import { useEffect, useState } from 'react';
import usePostRequest from '../../../hooks/post';
import './SideToolbar.css';
import { useDispatch } from 'react-redux';
import { updateCommunities } from '../../../redux/actions';
import { useNavigate } from 'react-router-dom';
export const SideToolbar = () => {
  const { response, post } = usePostRequest('/community/get', 'NAV_COMMUNITIES');
  const [communities, setCommunities] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    post();
  }, []);

  useEffect(() => {
    if (response) {
      setCommunities(response);
      dispatch(updateCommunities(response));
    }
  }, [response, dispatch]);
  const handleOpenNewTab = (url) => {
    window.open(`${window.location.origin}${url}`, '_blank');
  };
  return (
    <div className='side-toolbar toolbar'>
      <button onClick={() => navigate('/')} className='home-menu'>
        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6zUzZVSOfVgFxsFEO0aWTSqCWajGpGomw3g&usqp=CAU' alt='' />
        HOME
      </button>
      <div className='divider'></div>
      <div>COMMUNITIES</div>
      <div className='community-select_container'>
        {communities.map((community, i) => (
          <div onClick={() => navigate(`/community/${community._id}`)} className='community-select' key={i}>
            <img src={community.logo} alt={`${community.name} logo`} />
            <div>{community.name}</div>
          </div>
        ))}
      </div>
      <div className='divider'></div>
      <div className='policy-container'>
        <div>RESOURCES</div>
        <div>
          <div onClick={() => handleOpenNewTab('/contentPolicy')} className='policy-select'>
            Content Policy
          </div>
          <div onClick={() => handleOpenNewTab('/privacyPolicy')} className='policy-select'>
            Privacy Policy
          </div>
          <div onClick={() => handleOpenNewTab('/userAgreement')} className='policy-select'>
            User Agreement
          </div>
        </div>
      </div>

      <div className='divider'></div>
      <div></div>
    </div>
  );
};
