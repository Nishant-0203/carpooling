// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import ContactPage from './pages/Contact';
import BookRidePage from "./pages/BookRidePage";
import Blog from './pages/Blog';
import Register from './pages/Register';
import RideList from './pages/RideList';
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
        <Route path="/Contact" element={<ContactPage />} />
        <Route path="/RideList" element={<RideList />} />
        <Route path="/rides" element={<RidesPage />} />
        <Route path="/Blog" element={<Blog />} />
        <Route path="/OfferRide" element={<PublishRide />} />
          <Route path="/Register" element={<Register />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
