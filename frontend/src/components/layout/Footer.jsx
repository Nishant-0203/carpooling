import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Navigation } from 'lucide-react';

const Footer = () => {
  const footerLinks = {
    Company: ['About Us', 'Careers', 'Press', 'Blog'],
    Support: ['Help Center', 'Safety', 'Contact Us', 'Community'],
    Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Accessibility']
  };

  return (
    <footer className="relative py-20 px-4 mt-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Newsletter signup */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-2xl mx-auto glass-strong p-8 rounded-2xl neumorphic">
            <h3 className="text-2xl font-bold text-white mb-4">
              Stay Updated with CoGo
            </h3>
            <p className="text-gray-300 mb-6">
              Get the latest updates on new features, safety tips, and exclusive offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="glass border-white/20 text-white placeholder:text-gray-300 focus:border-cyan-400 flex-1"
              />
              <Button className="bg-gradient-to-r from-cyan-400 to-purple-500 hover:from-cyan-500 hover:to-purple-600 text-white">
                Subscribe
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center">
                <Navigation className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">CoGo</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Redefining shared transportation with premium experiences for eco-conscious urban professionals.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <span className="sr-only">Twitter</span>
                <div className="w-8 h-8 rounded-full glass flex items-center justify-center hover:glow-cyan transition-all">
                  🐦
                </div>
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <span className="sr-only">LinkedIn</span>
                <div className="w-8 h-8 rounded-full glass flex items-center justify-center hover:glow-cyan transition-all">
                  💼
                </div>
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <span className="sr-only">Instagram</span>
                <div className="w-8 h-8 rounded-full glass flex items-center justify-center hover:glow-cyan transition-all">
                  📷
                </div>
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <span className="sr-only">Facebook</span>
                <div className="w-8 h-8 rounded-full glass flex items-center justify-center hover:glow-cyan transition-all">
                  📘
                </div>
              </a>
            </div>
          </motion.div>

          {/* Footer links */}
          {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 + categoryIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-white font-semibold mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-cyan-400 transition-colors text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom section */}
        <motion.div
          className="pt-8 border-t border-white/10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2024 CoGo. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                Privacy
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                Terms
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                Accessibility
              </a>
            </div>
          </div>
        </motion.div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-px h-20 bg-gradient-to-b from-cyan-400 to-transparent opacity-50"></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
