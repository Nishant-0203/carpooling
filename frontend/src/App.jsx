// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import Login from './pages/Login/User-Login';
import ContactPage from './pages/Contact';
import RoleSelection from './pages/Login/Role-Selection';
import Blog from './pages/Blog';
import Register from './pages/Login/User-Register';
import DriverRegister from './pages/Login/Driver-Register';
import DriverLogin from './pages/Login/Driver-Login';
import RiderDashboard from './pages/Login/DriverDashboard';
import About from './pages/About';
import RidesPage from './pages/Ride';
import Footer from './components/layout/Footer';
import PublishRide from './pages/OfferRidePage';
const App = () => {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
          <Route path="/Login" element={<Login />} />
        <Route path="/Role-Selection" element={<RoleSelection />} />
        <Route path="/Contact" element={<ContactPage />} />
        <Route path="/rides" element={<RidesPage />} />
        <Route path="/Blog" element={<Blog />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Driver-register" element={<DriverRegister />} />
          <Route path="/Driver-login" element={<DriverLogin />} />
        <Route path="/rider-dashboard" element={<RiderDashboard />} />
          <Route path="/rider-dasboard/offer-ride" element={<PublishRide />} />
      </Routes>
      <Footer/>
    </>
  );
};

export default App;
