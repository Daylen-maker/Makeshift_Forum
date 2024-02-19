import './App.css';
import { Login } from './Pages/Login/login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Main } from './Pages/Main/main';
import { Register } from './Pages/Register/register';
import { UserAgreement } from './Pages/Policy/userAgreement';
import { PrivacyPolicy } from './Pages/Policy/privacy';
import { Toolbar } from './Components/Toolbar/Toolbar';
import { AddCommunity } from './Pages/AddCommunity/AddComunity';
import { useAutoLogin } from './hooks/AutoLogin/AutoLogin';

function App() {
  useAutoLogin();
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/UserAgreement' element={<UserAgreement />} />
          <Route path='/PrivacyPolicy' element={<PrivacyPolicy />} />
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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
