// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import Login from './pages/Login/User-Login';
import ContactPage from './pages/Contact';
import RoleSelection from './pages/Login/Role-Selection';
import BookRidePage from "./pages/BookRidePage";
import Blog from './pages/Blog';
import Register from './pages/Login/User-Register';
import AdminRegister from './pages/Login/Admin-Register';
import AdminLogin from './pages/Login/Admin-Login';
import AdminDashboard from './pages/AdminDashbar';
import RiderDashboard from './pages/Login/DriverDashboard';
import About from './pages/About';
import RidesPage from './pages/Ride';
import Footer from './components/layout/Footer';
import PublishRide from './pages/OfferRidePage';
const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/book-ride/:id" element={<BookRidePage />} />
        <Route path="/Role-Selection" element={<RoleSelection />} />
        <Route path="/Contact" element={<ContactPage />} />
        <Route path="/rides" element={<RidesPage />} />
        <Route path="/Blog" element={<Blog />} />
        <Route path="/OfferRide" element={<PublishRide />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/admin-register" element={<AdminRegister />} />
          <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/rider-dashboard" element={<RiderDashboard />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
