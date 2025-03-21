import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './screens/login';
import UserRegister from './screens/user_register';
import ForgotPassword from './screens/forgot_password';
import Errorpage from './screens/error_page';
import HomePage from './screens/homepage';
import CartPage from './screens/cart_page';
import AboutPage from './screens/about_page';
import DarkwoodPage from './screens/ride descriptions/darkwood';
import WickedWheelPage from './screens/ride descriptions/wicked_wheel';
import WaterAmazePage from './screens/ride descriptions/water_amaze';
import ThrillChillParkPage from './screens/ride descriptions/thrill_chill_park';


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
          <Route path="/errorland" element={<Errorpage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/darkwoodDetail" element={<DarkwoodPage />} />
          <Route path="/wickedWheelDetail" element={<WickedWheelPage />} />
          <Route path="/waterAmazeDetail" element={<WaterAmazePage />} />
          <Route path="/thrillChillParkDetail" element={<ThrillChillParkPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
