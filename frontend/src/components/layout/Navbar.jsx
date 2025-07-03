import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'glass-strong' : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.div
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center">
                <span className="text-sm font-bold text-white">R</span>
              </div>
              <span className="text-xl font-bold text-white">RideSphere</span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#how-it-works" className="text-gray-300 hover:text-cyan-400 transition-colors">
                How it Works
              </a>
              <a href="#why-ridesphere" className="text-gray-300 hover:text-cyan-400 transition-colors">
                Why Us
              </a>
              <a href="#testimonials" className="text-gray-300 hover:text-cyan-400 transition-colors">
                Reviews
              </a>
              <Button variant="outline" className="border-cyan-400/50 text-cyan-400 hover:bg-cyan-400 hover:text-black">
                Sign In
              </Button>
              <Button className="bg-gradient-to-r from-cyan-400 to-purple-500 hover:from-cyan-500 hover:to-purple-600 text-white">
                Get Started
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(true)}
                className="text-white hover:bg-white/10"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <motion.div
          className="fixed inset-0 z-50 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <motion.div
            className="absolute right-0 top-0 h-full w-64 glass-strong border-l border-white/20"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 20 }}
          >
            <div className="flex flex-col p-6 space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-white">Menu</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-white hover:bg-white/10"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
              <div className="flex flex-col space-y-4">
                <a href="#how-it-works" className="text-gray-300 hover:text-cyan-400 transition-colors">
                  How it Works
                </a>
                <a href="#why-ridesphere" className="text-gray-300 hover:text-cyan-400 transition-colors">
                  Why Us
                </a>
                <a href="#testimonials" className="text-gray-300 hover:text-cyan-400 transition-colors">
                  Reviews
                </a>
                <Button variant="outline" className="border-cyan-400/50 text-cyan-400 hover:bg-cyan-400 hover:text-black">
                  Sign In
                </Button>
                <Button className="bg-gradient-to-r from-cyan-400 to-purple-500 hover:from-cyan-500 hover:to-purple-600 text-white">
                  Get Started
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default Navbar;
