import './App.css';
import { Login } from './Pages/Login/login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Register } from './Pages/Register/register';
import { UserAgreement } from './Pages/Policy/userAgreement';
import { PrivacyPolicy } from './Pages/Policy/privacy';
import { Toolbar } from './Components/Toolbar/Toolbar';
import { AddCommunity } from './Pages/AddCommunity/AddComunity';
import { useAutoLogin } from './hooks/AutoLogin/AutoLogin';
import { ContentPolicy } from './Pages/Policy/contentPolicy';
import { AddPost } from './Pages/AddPost/AddPost';
import { Community } from './Pages/Community/community';
import { Main } from './Pages/Main/Main';
import { Post } from './Pages/Post/post';
import { Profile } from './Pages/Profile/Profile';

function App() {
  useAutoLogin();
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/userAgreement' element={<UserAgreement />} />
          <Route path='/privacyPolicy' element={<PrivacyPolicy />} />
          <Route path='/contentPolicy' element={<ContentPolicy />} />
          <Route
            path='/community/:communityId/:postId'
            element={
              <Toolbar>
                <Post />
              </Toolbar>
            }
          />
          <Route
            path='/'
            element={
              <Toolbar>
                <Main />
              </Toolbar>
            }
          />
          <Route
            path='/add/community'
            element={
              <Toolbar>
                <AddCommunity />
              </Toolbar>
            }
          />
          <Route
            path='/profile'
            element={
              <Toolbar>
                <Profile />
              </Toolbar>
            }
          />
          <Route
            path='/add/post'
            element={
              <Toolbar>
                <AddPost />
              </Toolbar>
            }
          />
          <Route
            path='community/:communityId'
            element={
              <Toolbar>
                <Community />
              </Toolbar>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
