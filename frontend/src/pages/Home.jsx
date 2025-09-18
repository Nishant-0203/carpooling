import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import HeroSection from '../components/Section/HeroSection';
import TrustedBy from '../components/Section/TrustedBy';
import HowItWorks from '../components/Section/HowItWorks';
import LiveRides from '../components/Section/LiveRides';
import WhyRideSphere from '../components/Section/WhyRideSphere';
import Testimonials from '../components/Section/Testimonials';

const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <motion.div 
      className="min-h-screen bg-gradient-space relative overflow-x-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 1 }}
    >
      {/* Animated background elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-sparkle opacity-60"></div>
        <div
          className="absolute top-3/4 right-1/4 w-1 h-1 bg-purple-400 rounded-full animate-sparkle opacity-40"
          style={{ animationDelay: '1s' }}
        ></div>
        <div
          className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-green-400 rounded-full animate-sparkle opacity-50"
          style={{ animationDelay: '2s' }}
        ></div>
        <div
          className="absolute top-1/6 right-1/6 w-1 h-1 bg-cyan-300 rounded-full animate-sparkle opacity-30"
          style={{ animationDelay: '0.5s' }}
        ></div>
      </div>

      <HeroSection />
      <TrustedBy />
      <HowItWorks />
      <LiveRides />
      <WhyRideSphere />
      <Testimonials />
    </motion.div>
  );
};

export default Home;
