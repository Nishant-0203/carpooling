import React from 'react';
import { motion } from 'framer-motion';

const TrustedBy = () => {
  const brands = [
    { name: 'Uber', logo: '🚗' },
    { name: 'Rapido', logo: '🏍️' },
    { name: 'RedBus', logo: '🚌' },
    { name: 'BlaBlaCar', logo: '🚙' },
    { name: 'Ola', logo: '🚕' },
    { name: 'Zomato', logo: '🍔' },
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-8">
            Trusted by leading transport brands
          </h2>
        </motion.div>

        {/* Brand Logos */}
        <motion.div
          className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          {brands.map((brand, index) => (
            <motion.div
              key={brand.name}
              className="flex flex-col items-center space-y-2 group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-16 h-16 glass rounded-full flex items-center justify-center text-2xl group-hover:glow-cyan transition-all duration-300">
                {brand.logo}
              </div>
              <span className="text-sm text-gray-400 group-hover:text-cyan-400 transition-colors">
                {brand.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustedBy;
