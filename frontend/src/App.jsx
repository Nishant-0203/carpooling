// src/App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';
import { Toaster } from 'sonner';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/ui/LoadingSpinner';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Lazy load components for better performance
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const ContactPage = lazy(() => import('./pages/Contact'));
const Blog = lazy(() => import('./pages/Blog'));
const RidesPage = lazy(() => import('./pages/Ride'));
const Login = lazy(() => import('./pages/Login/User-Login'));
const Register = lazy(() => import('./pages/Login/User-Register'));
const DriverRegister = lazy(() => import('./pages/Login/Driver-Register'));
const DriverLogin = lazy(() => import('./pages/Login/Driver-Login'));
const RoleSelection = lazy(() => import('./pages/Login/Role-Selection'));
const RiderDashboard = lazy(() => import('./pages/Login/DriverDashboard'));
const UserDashboard = lazy(() => import('./pages/Login/UserDashboard'));
const PublishRide = lazy(() => import('./pages/OfferRidePage'));
const BookRide = lazy(() => import('./pages/BookRidePage'));

// 404 Not Found Component
const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
    <div className="text-center">
      <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">Page Not Found</h2>
      <p className="text-gray-600 mb-8">The page you're looking for doesn't exist.</p>
      <Navigate to="/" replace />
    </div>
  </div>
);

const App = () => {
  // Remove loading screen when React app loads
  useEffect(() => {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      loadingScreen.style.opacity = '0';
      setTimeout(() => loadingScreen.remove(), 300);
    }
  }, []);

  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/rides" element={<RidesPage />} />
              <Route path="/book-ride/:id" element={<BookRide />} />
              
              {/* Auth Routes */}
              <Route path="/role-selection" element={<RoleSelection />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/driver-register" element={<DriverRegister />} />
              <Route path="/driver-login" element={<DriverLogin />} />
              
              {/* Dashboard Routes */}
              <Route path="/rider-dashboard" element={<RiderDashboard />} />
              <Route path="/rider-dashboard/offer-ride" element={<PublishRide />} />
              <Route path="/user-dashboard" element={<UserDashboard />} />
              
              {/* Legacy route redirects */}
              <Route path="/About" element={<Navigate to="/about" replace />} />
              <Route path="/Contact" element={<Navigate to="/contact" replace />} />
              <Route path="/Blog" element={<Navigate to="/blog" replace />} />
              <Route path="/Login" element={<Navigate to="/login" replace />} />
              <Route path="/Register" element={<Navigate to="/register" replace />} />
              <Route path="/Role-Selection" element={<Navigate to="/role-selection" replace />} />
              <Route path="/Driver-register" element={<Navigate to="/driver-register" replace />} />
              <Route path="/Driver-login" element={<Navigate to="/driver-login" replace />} />
              <Route path="/rider-dasboard/offer-ride" element={<Navigate to="/rider-dashboard/offer-ride" replace />} />
              
              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        
        <Footer />
        
        {/* Toast notifications */}
        <Toaster 
          position="top-right" 
          toastOptions={{
            duration: 4000,
            style: {
              background: 'white',
              color: 'black',
              border: '1px solid #e5e7eb',
            },
          }}
        />
      </div>
    </ErrorBoundary>
  );
};

export default App;
