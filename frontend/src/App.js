import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './screens/login';
import UserRegister from './screens/user_register';
import ForgotPassword from './screens/forgot_password';
import Errorpage from './screens/error_page';
import HomePage from './screens/homepage';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />   
          <Route path="/homepage" element={<HomePage />} />      
          <Route path="/userRegister" element={<UserRegister />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/errorland" element={<Errorpage/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
