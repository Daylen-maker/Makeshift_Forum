import './App.css';
import { Login } from './Pages/Login/login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Main } from './Pages/Main/main';
import { Register } from './Pages/Register/register';
import { UserAgreement } from './Pages/Policy/userAgreement';
import { PrivacyPolicy } from './Pages/Policy/privacy';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/UserAgreement' element={<UserAgreement />} />
          <Route path='/PrivacyPolicy' element={<PrivacyPolicy />} />
          <Route path='*' element={<Main />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
