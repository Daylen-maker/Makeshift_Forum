import { useEffect, useState } from 'react';
import usePostRequest from '../../hooks/post';
import './profile.css';
export const Profile = () => {
  const token = localStorage.getItem('token');
  const { response: profileData, post: getProfile, isLoading: loadingProfile } = usePostRequest('/user/get');
  const { post: updateProfile } = usePostRequest('/user/update');
  const userData = profileData?.data;

  const [updateUser, setUpdateUser] = useState({
    username: false,
    age: false,
    firstName: false,
    lastName: false,
    gender: false,
    image: false,
  });

  const [formData, setFormData] = useState({
    username: '',
    age: '',
    firstName: '',
    lastName: '',
    gender: '',
    image: '',
  });

  useEffect(() => {
    if (token) {
      getProfile({ token });
    }
  }, [updateUser, token]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateUser = (event, dataType) => {
    event.preventDefault();
    const updateData = { [dataType]: formData[dataType] };
    updateProfile({ token, user: updateData }).then(() => {
      setUpdateUser((prev) => ({ ...prev, [dataType]: false }));
      getProfile({ token });
    });
  };

  const toggleEdit = (dataType) => {
    setUpdateUser((prev) => ({ ...prev, [dataType]: !prev[dataType] }));
    setFormData((prev) => ({ ...prev, [dataType]: userData[dataType] || '' }));
  };

  return (
    <div>
      {loadingProfile ? (
        <div></div>
      ) : (
        <div>
          <div className='profile-info'>
            <div className='profile-user'>
              <img className='profile-image' src={userData?.image} alt='user profile'></img>
              <h3 className='profile-username'>{userData?.username}</h3>
            </div>
            <div className='profile-email'>Email: {userData?.email}</div>
            <div className='profile-age'> Age: {userData?.age}</div>
            <div className='profile-firstName'>Name:{userData?.firstName}</div>
            <div className='profile-lastName'>Surname:{userData?.lastName}</div>
            <div className='profile-gender'>Gender: {userData?.gender}</div>
            <div className='profile-role'>Role: {userData?.role}</div>
          </div>
          <div className='divider'></div>
          <div className='edit-profile'>
            {Object.keys(updateUser).map((field) =>
              updateUser[field] ? (
                <div key={field}>
                  {field === 'gender' ? (
                    <form onSubmit={(e) => handleUpdateUser(e, field)} className='edit-form'>
                      <select name={field} value={formData[field]} onChange={handleInputChange} className='edit-select edit-input'>
                        <option value=''>Select Gender</option>
                        <option value='male'>Male</option>
                        <option value='female'>Female</option>
                      </select>
                      <input type='submit' value='Update' className='edit-submit' />
                    </form>
                  ) : (
                    <form onSubmit={(e) => handleUpdateUser(e, field)} className='edit-form'>
                      <input
                        type={field === 'age' ? 'number' : 'text'}
                        name={field}
                        value={formData[field]}
                        onChange={handleInputChange}
                        className='edit-input'
                      />
                      <input type='submit' value='Update' className='edit-submit' />
                    </form>
                  )}
                </div>
              ) : (
                <button onClick={() => toggleEdit(field)} className={`edit-button edit-${field}-button`}>
                  Edit {field}
                </button>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};
