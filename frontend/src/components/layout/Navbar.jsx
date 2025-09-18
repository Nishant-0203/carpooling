"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Navigation } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate();

  // Replace isDriverLoggedIn with isLoggedIn and update logic
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!sessionStorage.getItem("userId") || !!sessionStorage.getItem("driverId")
  );
  
  useEffect(() => {
    setIsLoggedIn(
      !!sessionStorage.getItem("userId") || !!sessionStorage.getItem("driverId")
    );
  }, [location]);
  
  // Listen for storage changes (multi-tab support)
  useEffect(() => {
    const handleStorage = () => {
      setIsLoggedIn(
        !!sessionStorage.getItem("userId") || !!sessionStorage.getItem("driverId")
      );
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  // Trap focus in mobile menu when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Rides", href: "/rides" },
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-white/80 border-b border-white/20 shadow-lg"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 group focus-visible:outline-2 focus-visible:outline-blue-600 rounded-lg"
            aria-label="CoGo - Go to homepage"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
              <Navigation className="w-5 h-5 text-white" aria-hidden="true" />
            </div>
            <span className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors duration-200">
              CoGo
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8" role="menubar">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`font-medium transition-colors duration-200 relative focus-visible:outline-2 focus-visible:outline-blue-600 rounded px-2 py-1 ${
                  pathname === item.href
                    ? "text-blue-600"
                    : "text-slate-700 hover:text-blue-600"
                }`}
                role="menuitem"
                aria-current={pathname === item.href ? "page" : undefined}
              >
                {item.name}
                {pathname === item.href && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                    layoutId="activeTab"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {!isLoggedIn && (
              <Link to="/role-selection">
                <Button 
                  variant="ghost" 
                  className="text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl focus-visible:outline-2 focus-visible:outline-blue-600"
                >
                  Sign In
                </Button>
              </Link>
            )}
            <Button 
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              onClick={() => navigate('/rides')}
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/20 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-blue-600"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-slate-700" aria-hidden="true" />
            ) : (
              <Menu className="w-6 h-6 text-slate-700" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            className="md:hidden fixed inset-0 top-16 backdrop-blur-xl bg-white/95 z-40"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
          >
            <div className="flex flex-col h-full">
              <div className="flex-1 px-4 py-8">
                <nav className="space-y-6" role="menubar" aria-orientation="vertical">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Link
                        to={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`block text-2xl font-semibold py-3 px-4 rounded-xl transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-blue-600 ${
                          pathname === item.href
                            ? "text-blue-600 bg-blue-50"
                            : "text-slate-700 hover:text-blue-600 hover:bg-blue-50"
                        }`}
                        role="menuitem"
                        aria-current={pathname === item.href ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                </nav>
              </div>

              <div className="p-4 border-t border-slate-200 space-y-4">
                {!isLoggedIn && (
                  <Link to="/role-selection">
                    <Button
                      variant="outline"
                      className="w-full py-3 text-lg rounded-xl border-2 border-blue-200 hover:bg-blue-50 bg-transparent focus-visible:outline-2 focus-visible:outline-blue-600"
                      onClick={() => setIsOpen(false)}
                    >
                      Sign In
                    </Button>
                  </Link>
                )}
                <Button
                  className="w-full py-3 text-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  onClick={() => {
                    setIsOpen(false);
                    navigate('/rides');
                  }}
                >
                  Get Started
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
