import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../redux/actions';
import './TopToolbar.css';
export const TopToolbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.user);
  const handleSearch = () => {};
  const handleLogout = () => {
    localStorage.setItem('autoLogin', false);
    localStorage.setItem('token', null);
    dispatch(logout());
    navigate('/');
  };
  return (
    <div className='top-toolbar toolbar'>
      <div className='left_top-toolbar'>
        <img
          onClick={() => navigate('/')}
          src='https://theme.zdassets.com/theme_assets/551444/e21895715996666bf323d40a7c7b7111153885b9.png'
          alt=''
        />
      </div>
      <form onSubmit={() => handleSearch} className='top-toolbar_search' action=''>
        <input type='text' name='search' placeholder='Search for posts' />
        <button onClick={() => handleSearch()} className='search-button'>
          <img src='https://cdn-icons-png.flaticon.com/512/4570/4570468.png' alt='' />
        </button>
      </form>
      <div>
        {state.username && (
          <>
            {state.role === 'Admin' && (
              <button onClick={() => navigate('/add/community')} className='toolbar-button'>
                Add community
              </button>
            )}
            {state.role && (
              <button onClick={() => navigate('/add/post')} className='toolbar-button'>
                Add Post
              </button>
            )}
            <button onClick={() => navigate('/profile')} className='toolbar-button'>
              Profile Options
            </button>
          </>
        )}
        {state.username ? (
          <button onClick={() => handleLogout()} className='logout-button toolbar-button'>
            Logout
          </button>
        ) : (
          <button onClick={() => navigate('/login')} className=' login-button toolbar-button'>
            Login
          </button>
        )}
      </div>
    </div>
  );
};
